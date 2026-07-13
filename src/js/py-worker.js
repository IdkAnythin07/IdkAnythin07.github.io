importScripts("https://cdn.jsdelivr.net/pyodide/v0.28.2/full/pyodide.js");

let pyodidePromise = null;
let inputState = null;
let inputBuffer = null;

self.onmessage = async (e) => {
    const { type, buffer, code } = e.data;

    // 1. INITIALIZE SYSTEM
    if (type === 'init') {
        inputBuffer = buffer;
        inputState = new Int32Array(inputBuffer, 0, 2);

        pyodidePromise = loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.28.2/full/"
        }).then(async pyodide => {
            
            // A. JavaScript-to-Terminal Writers (Real-time, Unbuffered)
            self.rawStdout = (msg) => postMessage({ type: 'stdout', msg: msg.replace(/\n/g, '\r\n') });
            self.rawStderr = (msg) => postMessage({ type: 'stderr', msg: msg.replace(/\n/g, '\r\n') });

            // B. JavaScript Synchronous Reader (Bypasses C-level byte reading)
            self.syncRead = () => {
                // Ask main thread for input
                postMessage({ type: 'request_input' });
                
                // Freeze this worker thread until main thread wakes us up
                Atomics.wait(inputState, 0, 0); 
                
                // Read the bytes out of shared memory
                const length = inputState[1];
                const sharedView = new Uint8Array(inputBuffer, 8, length);
                const localBytes = new Uint8Array(sharedView); // Prevent Security Error
                
                // Decode to string
                const decoder = new TextDecoder();
                const result = decoder.decode(localBytes) + "\n";
                
                // Reset the lock for the next input() call
                inputState[0] = 0; 
                return result;
            };

            // C. Inject Custom IO classes directly into the Python environment
            await pyodide.runPythonAsync(`
import sys
import js

# Intercepts print() and input() prompts to send them to the terminal instantly
class UnbufferedStream:
    def __init__(self, original_stream, js_writer):
        self._original_stream = original_stream
        self._js_writer = js_writer

    def write(self, text):
        self._js_writer(text)
        return len(text)

    def flush(self):
        pass

    def __getattr__(self, name):
        return getattr(self._original_stream, name)

# Intercepts input() to grab strings directly from our JavaScript freezer
class SyncInputStream:
    def __init__(self, original_stream):
        self._original_stream = original_stream

    def readline(self, size=-1):
        return js.syncRead()

    def __getattr__(self, name):
        return getattr(self._original_stream, name)

# Apply the overrides
sys.stdout = UnbufferedStream(sys.stdout, js.rawStdout)
sys.stderr = UnbufferedStream(sys.stderr, js.rawStderr)
sys.stdin = SyncInputStream(sys.stdin)
            `);

            postMessage({ type: 'ready' });
            return pyodide;
        });
    }

    // 2. EXECUTE CODE
    if (type === 'run') {
        const pyodide = await pyodidePromise;
        try {
            await pyodide.loadPackagesFromImports(code);
            await pyodide.runPythonAsync(code);
            postMessage({ type: 'done' });
        } catch (err) {
            postMessage({ type: 'error', msg: String(err) });
        }
    }
};