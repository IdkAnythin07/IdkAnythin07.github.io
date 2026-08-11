import { useEffect, useRef, useState } from 'react';
import { initPyodide, runPython, killWorker, uploadFileToWorker } from './pyodide.js';
import { createTerminal, setupPythonTerminal } from './terminal.js';

export default function Playground() {
  const pyTerminalRef = useRef(null);
  const cTerminalRef = useRef(null);
  const pyEditorRef = useRef(null);
  const cEditorRef = useRef(null);
  const pyFileUploadRef = useRef(null);

  const [activeTab, setActiveTab] = useState('python');
  const [pyStatus, setPyStatus] = useState('Ready');
  const [cStatus, setCStatus] = useState('Ready');
  const [pyFilesStatus, setPyFilesStatus] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  // Store instances
  const instances = useRef({
    pyEditor: null,
    cEditor: null,
    pyTerminal: null,
    pyFitAddon: null,
    cTerminal: null,
    cFitAddon: null,
    pyInputManager: null,
    uploadedFileNames: []
  });

  useEffect(() => {
    let mounted = true;
    initPyodide();

    // Initialize terminals
    if (!instances.current.pyTerminal && pyTerminalRef.current) {
      const { terminal, fitAddon } = createTerminal(pyTerminalRef.current);
      instances.current.pyTerminal = terminal;
      instances.current.pyFitAddon = fitAddon;
      instances.current.pyInputManager = setupPythonTerminal(terminal, pyTerminalRef.current);
    }
    
    if (!instances.current.cTerminal && cTerminalRef.current) {
      const { terminal, fitAddon } = createTerminal(cTerminalRef.current);
      instances.current.cTerminal = terminal;
      instances.current.cFitAddon = fitAddon;
    }

    // Lazy load Monaco Editor
    import('./editor.js').then(({ createPythonEditor, createCEditor }) => {
      if (!mounted) return;
      if (!instances.current.pyEditor && pyEditorRef.current) {
        instances.current.pyEditor = createPythonEditor(pyEditorRef.current);
      }
      if (!instances.current.cEditor && cEditorRef.current) {
        instances.current.cEditor = createCEditor(cEditorRef.current);
      }
      setEditorLoaded(true);
    }).catch(err => {
      console.error("Failed to load Monaco editor:", err);
      if (mounted) setPyStatus("Editor Failed to Load");
    });

    return () => {
      mounted = false;
      // Clean up editors and terminals
      if (instances.current.pyEditor) {
        instances.current.pyEditor.dispose();
        instances.current.pyEditor = null;
      }
      if (instances.current.cEditor) {
        instances.current.cEditor.dispose();
        instances.current.cEditor = null;
      }
      if (instances.current.pyTerminal) {
        instances.current.pyTerminal.dispose();
        instances.current.pyTerminal = null;
      }
      if (instances.current.cTerminal) {
        instances.current.cTerminal.dispose();
        instances.current.cTerminal = null;
      }
    };
  }, []);

  useEffect(() => {
    // When tab changes, fit the visible terminal
    requestAnimationFrame(() => {
      if (activeTab === 'python') {
        instances.current.pyEditor?.layout();
        instances.current.pyFitAddon?.fit();
      } else {
        instances.current.cEditor?.layout();
        instances.current.cFitAddon?.fit();
      }
    });
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        if (activeTab === 'python') {
          instances.current.pyEditor?.layout();
          instances.current.pyFitAddon?.fit();
        } else {
          instances.current.cEditor?.layout();
          instances.current.cFitAddon?.fit();
        }
      });
    };
    
    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeTab]);

  const handleFileUploadChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      uploadFileToWorker(file.name, arrayBuffer);
      if (!instances.current.uploadedFileNames.includes(file.name)) {
        instances.current.uploadedFileNames.push(file.name);
      }
    }
    setPyFilesStatus(`${instances.current.uploadedFileNames.length} file(s) loaded`);
    if (pyFileUploadRef.current) pyFileUploadRef.current.value = "";
  };

  const handlePyRun = async () => {
    if (!instances.current.pyEditor) return;
    const code = instances.current.pyEditor.getValue();
    const { pyTerminal, pyInputManager } = instances.current;
    
    pyTerminal.clear();
    pyInputManager.clearInput();
    setIsRunning(true);
    setPyStatus("Running...");

    try {
      await runPython(code, pyTerminal, setPyStatus);
    } catch (err) {
      pyTerminal.write(`\r\n\x1b[31mError: ${String(err)}\x1b[0m\r\n`);
      setPyStatus("Error / Terminated");
      console.error(err);
    } finally {
      pyInputManager.clearInput();
      setIsRunning(false);
    }
  };

  const handlePyStop = () => {
    killWorker();
    instances.current.pyInputManager?.breakInput();
    setIsRunning(false);
    setPyStatus("Stopped");
  };

  const handleCRun = () => {
    if (!instances.current.cTerminal) return;
    instances.current.cTerminal.clear();
    instances.current.cTerminal.write(`\r\nC execution isn't available yet.\r\n\r\nA browser-based LLVM/WASI compiler is currently being integrated.\r\n\r\nComing soon!\r\n`);
  };

  return (
    <div className="animate-fade-in">
      <p className="text-subtext font-mono text-sm mb-2">idkanythin07/playground</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-mauve">Code Playground</h1>
      <p className="text-xl text-subtext leading-relaxed mb-10">
        Experiment with Python and C directly in your browser — no installation or local setup required.
      </p>

      <div className="flex border-b border-surface1 mb-6" role="tablist" aria-label="Choose a language">
        <button 
          className={`px-6 py-3 font-mono text-sm border-b-2 transition-colors ${activeTab === 'python' ? 'border-mauve text-mauve bg-surface0' : 'border-transparent text-subtext hover:bg-surface0/50'}`}
          role="tab" 
          aria-selected={activeTab === 'python'} 
          onClick={() => setActiveTab('python')}
        >🐍 main.py</button>
        <button 
          className={`px-6 py-3 font-mono text-sm border-b-2 transition-colors ${activeTab === 'c' ? 'border-mauve text-mauve bg-surface0' : 'border-transparent text-subtext hover:bg-surface0/50'}`}
          role="tab" 
          aria-selected={activeTab === 'c'} 
          onClick={() => setActiveTab('c')}
        >⚙️ main.c</button>
      </div>

      <section className="bg-surface0 rounded-xl overflow-hidden border border-surface1 shadow-xl flex flex-col" role="tabpanel" hidden={activeTab !== 'python'}>
        <div className="bg-mantle px-4 py-3 flex items-center border-b border-surface1">
          <span className="flex space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-main"></span>
            <span className="w-3 h-3 rounded-full bg-peach"></span>
            <span className="w-3 h-3 rounded-full bg-green-main"></span>
          </span>
          <span className="mx-auto text-sm font-mono text-subtext">main.py</span>
          <span className="w-12"></span>
        </div>

        <div ref={pyEditorRef} className="w-full" style={{ height: '300px' }}></div>

        <div className="bg-crust border-y border-surface1 px-4 py-3 flex justify-between items-center text-sm font-mono text-subtext">
          <div className="flex space-x-2">
              <button className="bg-surface1 hover:bg-surface0 text-text-main px-3 py-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={!editorLoaded || isRunning} onClick={handlePyRun}>▶ Run</button>
              <button className="bg-surface1 hover:bg-surface0 text-red-main px-3 py-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={!isRunning} onClick={handlePyStop}>⏹ Stop</button>
              <button className="bg-surface1 hover:bg-surface0 text-text-main px-3 py-1.5 rounded transition-colors" type="button" onClick={() => pyFileUploadRef.current?.click()}>📁 Upload</button>
              <input type="file" ref={pyFileUploadRef} multiple style={{ display: 'none' }} onChange={handleFileUploadChange} />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-subtext/70">{pyFilesStatus}</span>
            <span className={pyStatus === 'Running...' ? 'text-green-main animate-pulse' : (pyStatus === 'Error / Terminated' ? 'text-red-main' : 'text-text-main')}>{typeof pyStatus === 'string' ? pyStatus : pyStatus?.textContent || 'Ready'}</span>
          </div>
        </div>
        <div ref={pyTerminalRef} className="w-full bg-crust" style={{ height: '200px' }}></div>
      </section>

      <section className="bg-surface0 rounded-xl overflow-hidden border border-surface1 shadow-xl flex flex-col" role="tabpanel" hidden={activeTab !== 'c'}>
        <div className="bg-mantle px-4 py-3 flex items-center border-b border-surface1">
          <span className="flex space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-main"></span>
            <span className="w-3 h-3 rounded-full bg-peach"></span>
            <span className="w-3 h-3 rounded-full bg-green-main"></span>
          </span>
          <span className="mx-auto text-sm font-mono text-subtext">main.c</span>
          <span className="w-12"></span>
        </div>

        <div ref={cEditorRef} className="w-full" style={{ height: '300px' }}></div>
        
        <div className="bg-crust border-y border-surface1 px-4 py-3 flex justify-between items-center text-sm font-mono text-subtext">
          <button className="bg-surface1 hover:bg-surface0 text-text-main px-3 py-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" type="button" disabled={!editorLoaded} onClick={handleCRun}>▶ Run</button>
          <span className="text-text-main">{cStatus}</span>
        </div>
        <div ref={cTerminalRef} className="w-full bg-crust" style={{ height: '200px' }}></div>
      </section>

      {activeTab === 'python' && (
        <p className="mt-6 text-sm text-subtext text-center italic">
          Python code runs entirely inside your browser using
          <a href="https://pyodide.org" target="_blank" rel="noreferrer" className="text-mauve hover:underline not-italic font-medium ml-1">Pyodide</a>,
          which compiles Python to WebAssembly. The first run downloads the runtime
          (cached afterward), so future executions start almost instantly.
        </p>
      )}
    </div>
  );
}
