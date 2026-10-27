import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { loadDataModule } from "./load-data.mjs";

export function renderPage(file) {
  const m = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    module: m, exports: m.exports,
    require(name) {
      if (name === "react/jsx-runtime") return {jsx: (type, props) => ({type, props}), jsxs: (type, props) => ({type, props})};
      if (/(bookingServices|booksyCatalog|priceCatalog|contentRevisions)$/.test(name)) return loadDataModule(name, file);
      return {default: () => null};
    },
  });
  return m.exports.default();
}

export function nodes(node) {
  if (!node || typeof node !== "object") return [];
  if (typeof node.type === "function") return nodes(node.type(node.props));
  return [node, ...[node.props?.children].flat(Infinity).flatMap(nodes)];
}

export function nodeText(node) {
  if (typeof node === "string" || typeof node === "number") return String(node);
  return node && typeof node === "object" ? [node.props?.children].flat(Infinity).map(nodeText).join(" ") : "";
}
