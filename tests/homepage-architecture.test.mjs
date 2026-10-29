import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const page = new URL("app/page.tsx", root);
function source(file) {
  return ts.createSourceFile(
    file.pathname,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
}
function isClient(file) {
  return source(file).statements.some(
    (node) =>
      ts.isExpressionStatement(node) &&
      ts.isStringLiteral(node.expression) &&
      node.expression.text === "use client",
  );
}

test("homepage is a server composer, not a page-wide client boundary", () => {
  assert.equal(
    isClient(page),
    false,
    "static homepage content must not enter the client import graph",
  );
  const text = readFileSync(page, "utf8");
  assert.doesNotMatch(
    text,
    /\b(useState|useEffect|useRef|useMemo|window|document)\b/,
  );
  for (const name of [
    "HomeHero",
    "HomeServices",
    "HomeGallery",
    "HomeReviews",
    "HomeFaq",
    "HomeContact",
    "StickyBooking",
  ]) {
    assert.match(text, new RegExp("<" + name + "\\b"));
  }
});

test("homepage client islands cannot import static page sections", () => {
  const visited = new Set();
  const forbidden =
    /\/(Home(Header|Hero|Services|PricePreview|WhyNoblu|About|Reviews|Location|Instagram|Faq|Contact)|SalonTeam|SalonHygiene)\.tsx$/;
  function walk(file) {
    if (visited.has(file.href)) return;
    visited.add(file.href);
    assert.equal(forbidden.test(file.pathname), false, file.pathname);
    for (const node of source(file).statements) {
      if (
        !ts.isImportDeclaration(node) ||
        node.importClause?.isTypeOnly ||
        !ts.isStringLiteral(node.moduleSpecifier)
      )
        continue;
      const name = node.moduleSpecifier.text;
      if (!name.startsWith(".")) continue;
      const target = [".tsx", ".ts"]
        .map((ext) => new URL(name + ext, file))
        .find((url) => {
          try {
            readFileSync(url);
            return true;
          } catch {
            return false;
          }
        });
      assert.ok(target, name);
      walk(target);
    }
  }
  // A page-wide client boundary must be followed too; it is the regression this
  // test guards against, not just the intended island file names.
  const boundary = isClient(page)
    ? [page]
    : source(page)
        .statements.filter(ts.isImportDeclaration)
        .filter(
          (node) =>
            ts.isStringLiteral(node.moduleSpecifier) &&
            node.moduleSpecifier.text.startsWith("."),
        )
        .map((node) => new URL(node.moduleSpecifier.text + ".tsx", page))
        .filter((file) => {
          try {
            return isClient(file);
          } catch {
            return false;
          }
        });
  for (const file of boundary) walk(file);
});
