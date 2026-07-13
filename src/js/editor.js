import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

// Import workers
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
    getWorker(_, label) {
        switch (label) {
            case "json":
                return new jsonWorker();
            case "css":
            case "scss":
            case "less":
                return new cssWorker();
            case "html":
            case "handlebars":
            case "razor":
                return new htmlWorker();
            case "typescript":
            case "javascript":
                return new tsWorker();
            default:
                return new editorWorker();
        }
    }
};

export {monaco};

// Define the theme ONCE
monaco.editor.defineTheme("catppuccin", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
        "editor.background": "#181825",
        "editor.foreground": "#CDD6F4",
        "editorCursor.foreground": "#F5E0DC",
        "editor.selectionBackground": "#585B7066",
        "editorLineNumber.foreground": "#6C7086",
        "editor.lineHighlightBackground": "#313244"
    }
});

export function createPythonEditor(container) {
    return monaco.editor.create(container, {
        value: `print("Hello World")`,
        language: "python",
        theme: "catppuccin",
        automaticLayout: true
    });
}

export function createCEditor(container) {
    return monaco.editor.create(container, {
        value: `#include <stdio.h>

int main() {
    printf("Hello World!");
    return 0;
}`,
        language: "c",
        theme: "catppuccin",
        automaticLayout: true
    });
}
