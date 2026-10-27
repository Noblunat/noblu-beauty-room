import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

export function loadDataModule(specifier, importer) {
  const file = new URL(specifier + ".ts", importer);
  const m = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, {
    module: m, exports: m.exports,
    require(name) { return loadDataModule(name, file); },
  });
  return m.exports;
}
