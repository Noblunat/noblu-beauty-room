import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const root = new URL("../", import.meta.url);
function load(relative) {
  const testModule = { exports: {} };
  vm.runInNewContext(ts.transpileModule(readFileSync(new URL(relative, root), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    module: testModule, exports: testModule.exports,
    require(name) {
      if (name === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      if (name === "next/link") return { default: "a" };
      return { default: () => null };
    },
  });
  return testModule.exports;
}
function nodes(node) {
  if (!node || typeof node !== "object") return [];
  if (typeof node.type === "function") return nodes(node.type(node.props));
  return [node, ...[node.props?.children].flat(Infinity).flatMap(nodes)];
}
function text(node) {
  if (typeof node === "string") return node;
  return node && typeof node === "object" ? [node.props?.children].flat(Infinity).map(text).join(" ") : "";
}

const variants = [
  ["app/manicure-krakow/page.tsx", "hybryda", "Stylizacja hybrydowa", "160 zł", 6017028],
  ["app/manicure-krakow/page.tsx", "manicure", "Manicure", "100 zł", 5209054],
  ["app/pedicure-krakow/page.tsx", "pedicure", "Pedicure kosmetyczny", "180 zł", 14208809],
  ["app/pedicure-krakow/page.tsx", "pedicure-paznokcie-hybryda", "Pedicure same paznokcie z hybrydą", "160 zł", 14208784],
  ["app/pedicure-krakow/page.tsx", "pedicure-kosmetyczny-hybryda", "Pedicure kosmetyczny z hybrydą", "200 zł", 14208789],
];

test("service landing calls to action preserve the advertised variant and price through the reservation selection", async () => {
  const reservation = load("app/rezerwacja/page.tsx").default;
  const catalog = load("app/lib/bookingServices.ts").serviceGroups.flatMap(group => group.services);
  for (const [page, slug, name, price, variantId] of variants) {
    const links = nodes(load(page).default()).filter(node => node.type === "a" && node.props?.href === `/rezerwacja?usluga=${slug}`);
    assert.ok(links.length >= 2, `${slug}: offer an explicit variant in both booking sections`);
    for (const link of links) assert.ok(text(link).includes(price), `${slug}: show the matching price`);
    const form = await reservation({ searchParams: Promise.resolve({ usluga: slug }) });
    assert.equal(form.props.initialService, name, slug);
    const service = catalog.find(item => item.name === form.props.initialService);
    assert.equal(service?.price, price, slug);
    assert.equal(service?.booksyVariantId, variantId, slug);
  }
});

test("existing service links and unknown reservation variants keep their previous meaning", async () => {
  const reservation = load("app/rezerwacja/page.tsx").default;
  for (const [slug, expected] of [["manicure", "Manicure"], ["pedicure", "Pedicure kosmetyczny"], ["rzesy", "Aplikacja rzęs 1:1"], ["nieznana-usluga", ""], [undefined, ""]]) {
    const form = await reservation({ searchParams: Promise.resolve({ usluga: slug }) });
    assert.equal(form.props.initialService, expected);
  }
});
