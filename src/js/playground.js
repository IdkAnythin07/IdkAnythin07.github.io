import { createPythonEditor, createCEditor } from "./editor.js";
import "../css/styles.css";
import { initPyodide, runPython, killWorker } from "./pyodide.js";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

// Warm up the worker immediately on page load
initPyodide();

const pyEditor = createPythonEditor(document.getElementById("py-editor"));
const cEditor = createCEditor(document.getElementById("c-editor"));

const terminalConfig = {
    cursorBlink: true,
    theme: {
        background: '#11111b',
        foreground: '#cdd6f4',
        cursor: '#cba6f7',
    },
    fontSize: 13,
    lineHeight: 1.6,
    cols: 80,
    rows: 12
};

const pyTerminal = new Terminal(terminalConfig);
const cTerminal = new Terminal(terminalConfig);

const pyTerminalContainer = document.getElementById("py-output");
const cTerminalContainer = document.getElementById("c-output");

pyTerminal.open(pyTerminalContainer);
cTerminal.open(cTerminalContainer);

const pyFitAddon = new FitAddon();
const cFitAddon = new FitAddon();

pyTerminal.loadAddon(pyFitAddon);
cTerminal.loadAddon(cFitAddon);

pyFitAddon.fit();
cFitAddon.fit();

let waitingForInput = null;
let inputBuffer = "";

pyTerminal.onData((data) => {
    if (!waitingForInput) return;

    if (data.includes('\r') || data.includes('\n')) {
        pyTerminal.write('\r\n');
        const line = inputBuffer + '\n';
        inputBuffer = "";
        const resolve = waitingForInput;
        waitingForInput = null;
        resolve(line);
        return;
    }

    if (data === '\u007F' || data === '\b') {
        if (inputBuffer.length > 0) {
            inputBuffer = inputBuffer.slice(0, -1);
            pyTerminal.write('\b \b');
        }
        return;
    }

    if (data === '\u0003') {
        inputBuffer = "";
        const res = waitingForInput;
        waitingForInput = null;
        pyTerminal.write('^C\r\n');
        res('\u0003');
        return;
    }

    for (let i = 0; i < data.length; i++) {
        const char = data[i];
        if (char >= String.fromCharCode(32) && char <= String.fromCharCode(126)) {
            pyTerminal.write(char);
            inputBuffer += char;
        }
    }
});

globalThis.readLine = () => {
    return new Promise((resolve) => {
        inputBuffer = "";  
        waitingForInput = resolve;  
        
        pyTerminalContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        requestAnimationFrame(() => {
            pyTerminal.focus();
            pyTerminalContainer.querySelector('.xterm-screen')?.focus();
        });
    });
};

const tabs = document.querySelectorAll(".lang-tab");
const panels = {
    python: document.getElementById("panel-python"),
    c: document.getElementById("panel-c")
};
const pyCaption = document.getElementById("py-caption");
const status = document.getElementById("py-status");

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
                pyEditor.layout();
                pyFitAddon.fit();
            } else {
                cEditor.layout();
                cFitAddon.fit();
            }
        });
    });
});

const pyRunBtn = document.getElementById("py-run");
const pyStopBtn = document.getElementById("py-stop");

pyRunBtn.onclick = async () => {
    const code = pyEditor.getValue();
    pyTerminal.clear();
    waitingForInput = null;
    inputBuffer = "";

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
        waitingForInput = null;
        inputBuffer = "";
        
        // Restore UI state
        pyRunBtn.disabled = false;
        pyStopBtn.disabled = true;
    }
};

pyStopBtn.onclick = () => {
    killWorker();
    
    // Break the terminal input wait if it was paused on input()
    if (waitingForInput) {
        const res = waitingForInput;
        waitingForInput = null;
        res('\u0003'); // Send a break signal
    }
};

document.getElementById("c-run").onclick = () => {
    cTerminal.clear();
    cTerminal.write(`\r\nC execution isn't available yet.\r\n\r\nA browser-based LLVM/WASI compiler is currently being integrated.\r\n\r\nComing soon!\r\n`);
};