import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

function renderPolicy() {
  const m = { exports: {} };
  const jsx = (type, props) => ({ type, props });
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL("../app/polityka-prywatnosci/page.tsx", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    module: m, exports: m.exports,
    require(name) {
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "next/link") return { default: "a" };
      if (name === "../components/BreadcrumbJsonLd") return { default: "breadcrumb" };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return m.exports.default();
}

function nodes(node) {
  if (!node || typeof node !== "object") return [];
  return [node, ...[node.props?.children].flat(Infinity).flatMap(nodes)];
}

function text(node) {
  if (typeof node === "string") return node;
  if (!node || typeof node !== "object") return "";
  return [node?.props?.children].flat(Infinity).map(text).join(" ");
}

test("privacy policy has an accessible table of the eight configured tools", () => {
  const tree = nodes(renderPolicy());
  const tables = tree.filter(node => node.type === "table");
  assert.equal(tables.length, 1);
  assert.ok(nodes(tables[0]).some(node => node.type === "caption" && text(node).includes("narzędzi")));
  const columns = nodes(tables[0]).filter(node => node.type === "th" && node.props.scope === "col");
  assert.equal(columns.length, 4);
  const body = nodes(tables[0]).find(node => node.type === "tbody");
  const rows = nodes(body).filter(node => node.type === "tr");
  assert.equal(rows.length, 8);
  for (const expected of ["Zapis zgód", "Vercel", "Resend", "Gmail", "Google Analytics 4", "Google Ads", "Google Maps", "Booksy"]) {
    assert.ok(rows.some(row => nodes(row).some(node => node.type === "th" && node.props.scope === "row" && text(node).includes(expected))), expected);
  }
  for (const row of rows) assert.equal(nodes(row).filter(node => node.type === "td" || node.type === "th").length, 4);
  assert.ok(tree.some(node => node.props?.role === "region" && node.props.tabIndex === 0), "horizontal table is keyboard accessible");
});

test("table distinguishes consent gates, external navigation and retention limits", () => {
  const table = nodes(renderPolicy()).find(node => node.type === "table");
  const rows = nodes(table).filter(node => node.type === "tr");
  const row = name => rows.find(node => nodes(node).some(cell => cell.type === "th" && cell.props.scope === "row" && text(cell).includes(name)));
  assert.match(text(row("Google Analytics 4")), /zgodzie analitycznej/);
  assert.match(text(row("Google Ads")), /zgodzie marketingowej/);
  assert.match(text(row("Google Maps")), /treści zewnętrzne/);
  assert.match(text(row("Booksy")), /przejściu do Booksy/);
  assert.match(text(row("Resend")), /30 dni/);
  assert.match(text(row("Zapis zgód")), /bez automatycznego/);
  assert.match(text(row("Google Analytics 4")), /odrębna/);
  assert.equal(rows.some(node => /Meta Pixel|Google Tag Manager/.test(text(node))), false, "inactive integrations are not listed as active tools");
  const links = nodes(table).filter(node => node.type === "a");
  assert.equal(links.length, 7);
  assert.ok(links.every(node => node.props.href.startsWith("https://")));
  assert.equal(nodes(renderPolicy()).some(node => node.type === "script" || node.type === "iframe"), false, "policy must not activate optional tools");
});
