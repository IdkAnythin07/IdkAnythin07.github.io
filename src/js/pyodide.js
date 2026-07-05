let pyodidePromise = null;

async function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = globalThis.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.28.2/full/"
    });
  }
  return pyodidePromise;
}

export async function runPython(code, output, status) {
  status.textContent = "Loading...";
  const pyodide = await getPyodide();
  const buffer = [];

  pyodide.setStdout({
    batched(msg) {
      buffer.push(msg);
      output.textContent = buffer.join("\n");
    }
  });

  pyodide.setStderr({
    batched(msg) {
      buffer.push(msg);
      output.textContent = buffer.join("\n");
    }
  });

  status.textContent = "Running...";

  await pyodide.loadPackagesFromImports(code);
  await pyodide.runPythonAsync(code);

  status.textContent = "Done";
}
