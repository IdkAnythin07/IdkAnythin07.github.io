import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

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

export function createTerminal(container) {
    const terminal = new Terminal(terminalConfig);
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(container);
    fitAddon.fit();
    return { terminal, fitAddon };
}

export function setupPythonTerminal(terminal, container) {
    let waitingForInput = null;
    let inputBuffer = "";

    terminal.onData((data) => {
        if (!waitingForInput) return;

        if (data.includes('\r') || data.includes('\n')) {
            terminal.write('\r\n');
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
                terminal.write('\b \b');
            }
            return;
        }

        if (data === '\u0003') {
            inputBuffer = "";
            const res = waitingForInput;
            waitingForInput = null;
            terminal.write('^C\r\n');
            res('\u0003');
            return;
        }

        for (let i = 0; i < data.length; i++) {
            const char = data[i];
            if (char >= String.fromCharCode(32) && char <= String.fromCharCode(126)) {
                terminal.write(char);
                inputBuffer += char;
            }
        }
    });

    globalThis.readLine = () => {
        return new Promise((resolve) => {
            inputBuffer = "";  
            waitingForInput = resolve;  
            
            container.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            requestAnimationFrame(() => {
                terminal.focus();
                container.querySelector('.xterm-screen')?.focus();
            });
        });
    };

    return {
        breakInput: () => {
            if (waitingForInput) {
                const res = waitingForInput;
                waitingForInput = null;
                res('\u0003');
            }
        },
        clearInput: () => {
            waitingForInput = null;
            inputBuffer = "";
        }
    };
}
