import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/basic-languages/python/python.contribution";
import "monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

self.MonacoEnvironment = {
    getWorker(_, label) {
        // Since we aren't doing HTML/CSS/TS, we just return the standard fast worker for everything
        return new editorWorker();
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

monaco.editor.defineTheme("catppuccin-latte", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
        "editor.background": "#eff1f5",
        "editor.foreground": "#4c4f69",
        "editorCursor.foreground": "#dc8a78",
        "editor.selectionBackground": "#acb0be66",
        "editorLineNumber.foreground": "#bcc0cc",
        "editor.lineHighlightBackground": "#e6e9ef"
    }
});

const currentTheme = localStorage.getItem('theme') === 'light' ? 'catppuccin-latte' : 'catppuccin';

window.addEventListener('themeChanged', (e) => {
    const isLight = e.detail === 'light';
    monaco.editor.setTheme(isLight ? 'catppuccin-latte' : 'catppuccin');
});

export function createPythonEditor(container) {
    return monaco.editor.create(container, {
        value: `print("Hello World")`,
        language: "python",
        theme: currentTheme,
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
        theme: currentTheme,
        automaticLayout: true
    });
}
