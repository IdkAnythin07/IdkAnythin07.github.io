(function(){importScripts(`/pyodide/pyodide.js`);let e=null,t=null,n=null;self.onmessage=async r=>{let{type:i,buffer:a,code:o}=r.data;if(i===`init`&&(n=a,t=new Int32Array(n,0,2),e=loadPyodide({indexURL:`/pyodide/`}).then(async e=>(self.rawStdout=e=>postMessage({type:`stdout`,msg:e.replace(/\n/g,`\r
`)}),self.rawStderr=e=>postMessage({type:`stderr`,msg:e.replace(/\n/g,`\r
`)}),self.syncRead=()=>{postMessage({type:`request_input`}),Atomics.wait(t,0,0);let e=t[1],r=new Uint8Array(n,8,e),i=new Uint8Array(r),a=new TextDecoder().decode(i)+`
`;return t[0]=0,a},await e.runPythonAsync(`
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
            `),postMessage({type:`ready`}),e))),i===`run`){let t=await e;try{await t.loadPackagesFromImports(o),await t.runPythonAsync(o),postMessage({type:`done`})}catch(e){postMessage({type:`error`,msg:String(e)})}}if(i===`write_file`){let t=await e,{filename:n,data:i}=r.data;try{t.FS.writeFile(n,new Uint8Array(i)),postMessage({type:`file_written`,filename:n})}catch(e){console.error(`Failed to write file to Pyodide FS:`,e)}}}})();