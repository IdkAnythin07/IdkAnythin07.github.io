let worker = null;
let inputState = null;
let inputBuffer = null;
let currentReject = null;
let fileCache = {};

export function initPyodide() {
    if (!worker) {
        inputBuffer = new SharedArrayBuffer(1024);
        inputState = new Int32Array(inputBuffer, 0, 2);

        worker = new Worker(new URL('./py-worker.js', import.meta.url), { type: 'module' });
        worker.postMessage({ type: 'init', buffer: inputBuffer });
        
        for (const [filename, data] of Object.entries(fileCache)) {
            worker.postMessage({ type: 'write_file', filename, data });
        }
    }
}

export function uploadFileToWorker(filename, arrayBuffer) {
    fileCache[filename] = arrayBuffer;
    if (worker) {
        worker.postMessage({ type: 'write_file', filename, data: arrayBuffer });
    }
}

export function killWorker() {
    if (worker) {
        worker.terminate();
        worker = null;
        if (currentReject) {
            currentReject(new Error("Script terminated forcefully by user."));
            currentReject = null;
        }
        // Immediately spin up a fresh worker for the next run
        initPyodide();
    }
}

export function runPython(code, terminal, status) {
    return new Promise((resolve, reject) => {
        currentReject = reject;
        status.textContent = "Running...";
        
        worker.onmessage = async (e) => {
            const { type, msg } = e.data;

            switch (type) {
                case 'ready':
                    break;
                case 'stdout':
                case 'stderr':
                    terminal.write(msg);
                    break;
                case 'request_input':
                    const userInput = await globalThis.readLine();
                    
                    // Safeguard: If the worker was killed while waiting for UI input, abort sending data.
                    if (!worker) return; 

                    const cleanInput = userInput.replace(/\r?\n$/, '');
                    const encoder = new TextEncoder();
                    const bytes = encoder.encode(cleanInput);
                    
                    const uint8View = new Uint8Array(inputBuffer, 8);
                    uint8View.set(bytes.subarray(0, 1016)); 

                    inputState[1] = Math.min(bytes.length, 1016);
                    inputState[0] = 1;
                    Atomics.notify(inputState, 0, 1);
                    break;
                case 'done':
                    status.textContent = "Done";
                    currentReject = null;
                    resolve();
                    break;
                case 'error':
                    status.textContent = "Error";
                    terminal.write(`\r\n\x1b[31m${msg}\x1b[0m\r\n`);
                    currentReject = null;
                    reject(new Error(msg));
                    break;
            }
        };

        worker.postMessage({ type: 'run', code });
    });
}