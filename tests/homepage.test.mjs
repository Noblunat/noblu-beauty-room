import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

function harness() {
  const states = [];
  const effects = [];
  let index = 0;
  let observe;
  let disconnected = false;
  const hero = {};
  const jsx = (type, props) => ({ type, props });
  const compiled = ts.transpileModule(readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const testModule = { exports: {} };
  vm.runInNewContext(compiled, {
    module: testModule, exports: testModule.exports,
    IntersectionObserver: class {
      constructor(callback) { observe = callback; }
      observe(target) { assert.equal(target, hero); }
      disconnect() { disconnected = true; }
    },
    setInterval: () => 1, clearInterval() {}, setTimeout: () => 1, clearTimeout() {},
    require(name) {
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "react") return {
        Fragment: "fragment",
        useRef: () => ({ current: hero }),
        useMemo: (fn) => fn(),
        useEffect: (fn) => effects.push(fn),
        useState(initial) {
          const key = index++;
          if (!(key in states)) states[key] = initial;
          return [states[key], (value) => { states[key] = value; }];
        },
      };
      if (name === "next/image") return { default: "image" };
      return { default: name, Pause: "pause", Play: "play" };
    },
  });
  return {
    render() { index = 0; return testModule.exports.default(); },
    effects,
    scroll(bottom, isIntersecting) { observe([{ boundingClientRect: { bottom }, isIntersecting }]); },
    get disconnected() { return disconnected; },
  };
}

function elements(tree) {
  if (!tree || typeof tree !== "object") return [];
  return [tree, ...[tree.props?.children].flat(Infinity).flatMap(elements)];
}

test("floating booking appears only after hero and disappears when scrolling back", () => {
  const h = harness();
  const sticky = (tree) => elements(tree).filter((node) =>
    node.type === "a" && node.props.href === "/rezerwacja" && node.props.className?.includes("fixed bottom"));
  assert.equal(sticky(h.render()).length, 0, "hero must not have a floating duplicate");
  const cleanups = h.effects.map((effect) => effect());
  h.scroll(-1, false);
  assert.equal(sticky(h.render()).length, 1);
  h.scroll(150, true);
  assert.equal(sticky(h.render()).length, 0);
  for (const cleanup of cleanups) cleanup?.();
  assert.equal(h.disconnected, true);
});

test("homepage is immediately usable without a timed fullscreen loader", () => {
  const tree = elements(harness().render());
  assert.equal(tree.some((node) => node.props?.className?.includes("fixed inset-0 z-[99999]")), false);
});

test("hero has only one eager responsive image for all breakpoints", () => {
  const images = elements(harness().render()).filter((node) =>
    node.type === "image" && node.props.src === "/gallery/salon/salon-beauty-krakow-noblu.webp");
  assert.equal(images.length, 1);
  assert.equal(images[0].props.sizes, "(min-width: 1024px) 58vw, 100vw");
  assert.equal(images[0].props.loading, "eager");
});
