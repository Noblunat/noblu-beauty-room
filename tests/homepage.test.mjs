import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { loadDataModule } from "./helpers/load-data.mjs";

function harness(entry = "../app/page.tsx") {
  const states = [];
  const effects = [];
  let index = 0;
  let observe;
  let disconnected = false;
  const hero = {};
  const jsx = (type, props) => ({ type, props });
  const modules = new Map();
  function load(file) {
    if (modules.has(file.href)) return modules.get(file.href);
    const compiled = ts.transpileModule(readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    }).outputText;
    const testModule = { exports: {} };
    modules.set(file.href, testModule.exports);
    vm.runInNewContext(compiled, {
      module: testModule,
      exports: testModule.exports,
      IntersectionObserver: class {
        constructor(callback) {
          observe = callback;
        }
        observe(target) {
          assert.equal(target, hero);
        }
        disconnect() {
          disconnected = true;
        }
      },
      setInterval: () => 1,
      clearInterval() {},
      setTimeout: () => 1,
      clearTimeout() {},
      document: { getElementById: (id) => (id === "home-hero" ? hero : null) },
      require(name) {
        if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
        if (name === "react")
          return {
            Fragment: "fragment",
            useRef: () => ({ current: hero }),
            useEffect: (fn) => effects.push(fn),
            useState(initial) {
              const key = index++;
              if (!(key in states)) states[key] = initial;
              return [
                states[key],
                (value) => {
                  states[key] =
                    typeof value === "function" ? value(states[key]) : value;
                },
              ];
            },
          };
        if (name === "next/image") return { default: "image" };
        if (/\/lib\//.test(name)) return loadDataModule(name, file);
        if (
          name.startsWith(".") &&
          !/HomeGallery|StickyBooking|GalleryLightbox|ExternalContentConsent/.test(
            name,
          )
        ) {
          return load(new URL(name + ".tsx", file));
        }
        return { default: name, Pause: "pause", Play: "play", Phone: "phone" };
      },
    });
    return testModule.exports;
  }
  const component = load(new URL(entry, import.meta.url)).default;
  function expand(tree) {
    if (!tree || typeof tree !== "object") return tree;
    if (typeof tree.type === "function") return expand(tree.type(tree.props));
    return {
      ...tree,
      props: {
        ...tree.props,
        children: [tree.props?.children].flat(Infinity).map(expand),
      },
    };
  }
  return {
    render() {
      index = 0;
      return expand(component());
    },
    effects,
    scroll(bottom, isIntersecting) {
      observe([{ boundingClientRect: { bottom }, isIntersecting }]);
    },
    get disconnected() {
      return disconnected;
    },
  };
}

function elements(tree) {
  if (!tree || typeof tree !== "object") return [];
  return [tree, ...[tree.props?.children].flat(Infinity).flatMap(elements)];
}

test("floating booking appears only after hero and disappears when scrolling back", () => {
  const h = harness("../app/components/home/StickyBooking.tsx");
  const sticky = (tree) =>
    elements(tree).filter(
      (node) =>
        node.type === "a" &&
        node.props.href === "/rezerwacja" &&
        node.props.className?.includes("fixed bottom"),
    );
  assert.equal(
    sticky(h.render()).length,
    0,
    "hero must not have a floating duplicate",
  );
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
  assert.equal(
    tree.some((node) =>
      node.props?.className?.includes("fixed inset-0 z-[99999]"),
    ),
    false,
  );
});

test("brand intro restores the original logo without blocking the page or waiting for JavaScript", () => {
  const tree = elements(harness().render());
  const intro = tree.find((n) =>
    n.props?.className?.includes("noblu-brand-intro"),
  );
  assert.ok(intro);
  assert.equal(intro.props["aria-hidden"], "true");
  assert.ok(intro.props.className.includes("pointer-events-none"));
  assert.ok(
    intro.props.className.split(" ").includes("bg-[#FFFDFB]"),
    "the page is fully covered while the logo is visible",
  );
  assert.ok(
    !elements(intro).some((n) => ["a", "button", "main"].includes(n.type)),
  );
  const logo = elements(intro).find((n) => n.type === "image");
  assert.equal(logo.props.src, "/logo-footer.webp");
  assert.equal(logo.props.alt, "");
  assert.equal(logo.props.width, 226);
  assert.equal(logo.props.height, 226);
  const css = readFileSync(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );
  assert.match(css, /animation: noblu-brand-intro 900ms ease-out both/);
  assert.match(
    css,
    /@keyframes noblu-brand-intro\s*\{\s*0%, 70%\s*\{\s*opacity: 1;/,
  );
  assert.match(css, /animation: noblu-logo-fade 900ms ease-out both/);
  assert.match(
    css,
    /@keyframes noblu-logo-fade\s*\{[\s\S]*?60%, 100%\s*\{\s*opacity: 0;/,
  );
  assert.match(css, /100%\s*\{\s*opacity: 0;\s*visibility: hidden;/);
  assert.match(
    css,
    /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.noblu-brand-intro\s*\{\s*display: none;\s*animation: none;/,
  );
});

test("hero has only one eager responsive image for all breakpoints", () => {
  const images = elements(harness().render()).filter(
    (node) =>
      node.type === "image" &&
      node.props.src === "/gallery/salon/salon-beauty-krakow-noblu.webp",
  );
  assert.equal(images.length, 1);
  assert.equal(images[0].props.sizes, "(min-width: 1024px) 58vw, 100vw");
  assert.equal(images[0].props.loading, "eager");
});

test("homepage has one main landmark containing its hero but not the header", () => {
  const tree = elements(harness().render());
  const mains = tree.filter((n) => n.type === "main");
  assert.equal(mains.length, 1);
  assert.ok(elements(mains[0]).some((n) => n.type === "h1"));
  assert.equal(
    elements(mains[0]).some((n) => n.type === "header"),
    false,
  );
});

test("homepage header exposes the salon telephone alongside the booking link", () => {
  const header = elements(harness().render()).find((n) => n.type === "header");
  const links = elements(header).filter((n) => n.type === "a");
  const phone = links.find((n) => n.props.href === "tel:+48662989534");
  assert.ok(phone, "a callable salon number is present in the header");
  assert.ok(
    elements(phone).some(
      (n) => n.type === "span" && n.props.children.includes("662 989 534"),
    ),
  );
  assert.equal(phone.props["aria-label"], "Zadzwoń do salonu: 662 989 534");
  const phoneClasses = phone.props.className.split(" ");
  for (const required of [
    "rounded-full",
    "border",
    "border-[#D4B483]",
    "bg-transparent",
  ]) {
    assert.ok(
      phoneClasses.includes(required),
      `telephone has outline-only styling: ${required}`,
    );
  }
  assert.ok(
    links.some(
      (n) =>
        n.props.href === "/rezerwacja" &&
        n.props.children.join("").trim() === "Zapytaj o termin",
    ),
  );
});

test("every rotating gallery item has a unique descriptive alt", () => {
  const { galleryItems: items } = loadDataModule(
    "../app/lib/homeGallery",
    import.meta.url,
  );
  assert.equal(items.length, 30);
  const alts = items.map((item) => item.alt);
  assert.ok(alts.every((alt) => typeof alt === "string" && alt.length > 20));
  assert.equal(new Set(alts).size, items.length);
});
