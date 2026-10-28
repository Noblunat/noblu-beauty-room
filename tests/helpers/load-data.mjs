import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const modules = new Map();

export function loadDataModule(specifier, importer) {
  const file = new URL(specifier + ".ts", importer);
  if (modules.has(file.href)) return modules.get(file.href);
  const m = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, {
    module: m, exports: m.exports,
    require(name) { return loadDataModule(name, file); },
  });
  modules.set(file.href, m.exports);
  return m.exports;
}
