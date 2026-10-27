import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

function elements(tree) {
  if (!tree || typeof tree !== "object") return [];
  return [tree, ...[tree.props?.children].flat(Infinity).flatMap(elements)];
}

test("team cards preserve portraits and names and show each approved personal description", () => {
  const jsx = (type, props) => ({ type, props });
  const compiled = ts.transpileModule(readFileSync(new URL("../app/components/SalonTeam.tsx", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const testModule = { exports: {} };
  vm.runInNewContext(compiled, {
    module: testModule, exports: testModule.exports,
    require(name) {
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "next/image") return { default: "image" };
      if (name === "next/link") return { default: "link" };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  const cards = elements(testModule.exports.default()).filter(node => node.type === "article");
  assert.equal(cards.length, 2);
  for (const [index, name] of ["Natalia", "Julia"].entries()) {
    const children = elements(cards[index]);
    assert.equal(children.find(node => node.type === "h3")?.props.children, name);
    const image = children.find(node => node.type === "image");
    assert.equal(image?.props.src, `/team/${name.toLowerCase()}-noblu.jpg`);
    assert.ok(image.props.alt.length > 20);
    const paragraphs = children.filter(node => node.type === "p").map(node => node.props.children);
    assert.deepEqual(paragraphs, index === 0 ? [
      "Właścicielka salonu",
      "Moim celem jest tworzenie trwałych i estetycznych stylizacji paznokci. Szczególną uwagę poświęcam skórze, ponieważ bez bezpiecznego opracowania manicure czy pedicure, żaden kolor nie będzie robił wrażenia.",
    ] : [
      "Stylistka paznokci z zamiłowaniem do szalonych stylizacji oraz zdobień 3D. Kreatywność to moje drugie imię.",
      "Zmalujmy razem coś wyjątkowego!",
    ]);
  }
});
