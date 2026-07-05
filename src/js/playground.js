import {
  createPythonEditor,
  createCEditor
} from "./editor.js";

import "../css/styles.css";

import {runPython} from "./pyodide.js";

const tabs = document.querySelectorAll(".lang-tab");

const panels = {
    python: document.getElementById("panel-python"),
    c: document.getElementById("panel-c")
};

const pyCaption = document.getElementById("py-caption");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(t => {
            t.setAttribute("aria-selected", "false");
        });

        tab.setAttribute("aria-selected", "true");

        const lang = tab.dataset.lang;

        Object.entries(panels).forEach(([name, panel]) => {
            panel.hidden = name !== lang;
        });

        pyCaption.hidden = lang !== "python";
    });
});

const pyEditor = createPythonEditor(
  document.getElementById("py-editor")
);
const cEditor = createCEditor(
  document.getElementById("c-editor")
);

const output = document.getElementById("py-output");
const status = document.getElementById("py-status");

document.getElementById("py-run").onclick = async () => {
    const code = pyEditor.getValue();

    output.textContent = "";

    try {
        await runPython(code, output, status);
    } catch (err) {
        output.textContent = String(err);
        status.textContent = "Error";
        console.error(err);
    }
};

document.getElementById("c-run").onclick = () => {
  const output = document.getElementById("c-output");
  output.textContent =
`C execution isn't available yet.

A browser-based LLVM/WASI compiler is currently being integrated.

Coming soon!`;
};
