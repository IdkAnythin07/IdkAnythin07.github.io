import "../css/styles.css";
import { initPyodide, runPython, killWorker, uploadFileToWorker } from "./pyodide.js";
import { createTerminal, setupPythonTerminal } from "./terminal.js";

// Warm up the worker immediately on page load
initPyodide();

let pyEditor, cEditor;

const pyTerminalContainer = document.getElementById("py-output");
const cTerminalContainer = document.getElementById("c-output");

const { terminal: pyTerminal, fitAddon: pyFitAddon } = createTerminal(pyTerminalContainer);
const { terminal: cTerminal, fitAddon: cFitAddon } = createTerminal(cTerminalContainer);

const pyInputManager = setupPythonTerminal(pyTerminal, pyTerminalContainer);

const tabs = document.querySelectorAll(".lang-tab");
const panels = {
    python: document.getElementById("panel-python"),
    c: document.getElementById("panel-c")
};
const pyCaption = document.getElementById("py-caption");
const status = document.getElementById("py-status");
const pyRunBtn = document.getElementById("py-run");
const pyStopBtn = document.getElementById("py-stop");
const pyUploadBtn = document.getElementById("py-upload-btn");
const pyFileUpload = document.getElementById("py-file-upload");
const pyFilesStatus = document.getElementById("py-files-status");

pyRunBtn.disabled = true; // Disable until editor is loaded

pyUploadBtn.onclick = () => pyFileUpload.click();

let uploadedFileNames = [];
pyFileUpload.addEventListener("change", async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        uploadFileToWorker(file.name, arrayBuffer);
        if (!uploadedFileNames.includes(file.name)) {
            uploadedFileNames.push(file.name);
        }
    }
    
    pyFilesStatus.textContent = `${uploadedFileNames.length} file(s) loaded`;
    
    // Reset input so the same file can be uploaded again if needed
    pyFileUpload.value = "";
});

// Lazy load the editor
import("./editor.js").then(({ createPythonEditor, createCEditor }) => {
    pyEditor = createPythonEditor(document.getElementById("py-editor"));
    cEditor = createCEditor(document.getElementById("c-editor"));
    pyRunBtn.disabled = false;
}).catch(err => {
    console.error("Failed to load Monaco editor:", err);
    status.textContent = "Editor Failed to Load";
});

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.setAttribute("aria-selected", t === tab ? "true" : "false"));
        
        const lang = tab.dataset.lang;
        
        Object.entries(panels).forEach(([name, panel]) => {
            panel.hidden = name !== lang;
        });
        
        if (pyCaption) pyCaption.hidden = lang !== "python";

        requestAnimationFrame(() => {
            if (lang === "python") {
                if (pyEditor) pyEditor.layout();
                pyFitAddon.fit();
            } else {
                if (cEditor) cEditor.layout();
                cFitAddon.fit();
            }
        });
    });
});

pyRunBtn.onclick = async () => {
    if (!pyEditor) return;
    const code = pyEditor.getValue();
    pyTerminal.clear();
    pyInputManager.clearInput();

    // Toggle UI state to running
    pyRunBtn.disabled = true;
    pyStopBtn.disabled = false;

    try {
        await runPython(code, pyTerminal, status);
    } catch (err) {
        pyTerminal.write(`\r\n\x1b[31mError: ${String(err)}\x1b[0m\r\n`);
        status.textContent = "Error / Terminated";
        console.error(err);
    } finally {
        pyInputManager.clearInput();
        
        // Restore UI state
        pyRunBtn.disabled = false;
        pyStopBtn.disabled = true;
    }
};

pyStopBtn.onclick = () => {
    pyStopBtn.disabled = true;
    killWorker();
    pyInputManager.breakInput();
};

document.getElementById("c-run").onclick = () => {
    cTerminal.clear();
    cTerminal.write(`\r\nC execution isn't available yet.\r\n\r\nA browser-based LLVM/WASI compiler is currently being integrated.\r\n\r\nComing soon!\r\n`);
};

// Handle Window Resizing for Editors and Terminals
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const activeTab = document.querySelector('.lang-tab[aria-selected="true"]');
        if (!activeTab) return;
        
        const lang = activeTab.dataset.lang;
        if (lang === "python") {
            if (pyEditor) pyEditor.layout();
            pyFitAddon.fit();
        } else {
            if (cEditor) cEditor.layout();
            cFitAddon.fit();
        }
    }, 100);
});