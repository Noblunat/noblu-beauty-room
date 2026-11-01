import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
await import("../tools/legacy-minimatch.mjs");
test("lint dependencies retain callable and named minimatch interfaces on the patched engine", () => {
  const match = require("minimatch");
  const version = require("minimatch/package.json").version;
  assert.equal(version, "11.0.3");
  assert.equal(typeof match, "function");
  assert.equal(match("app/page.tsx", "**/*.tsx"), true);
  assert.equal(match("app/page.ts", "**/*.tsx"), false);
  assert.equal(match.minimatch("tests/x.test.mjs", "**/*.test.mjs"), true);
  assert.equal(new match.Minimatch("app/**").match("app/page.tsx"), true);
  assert.deepEqual(match.match(["a.ts", "b.js"], "*.ts"), ["a.ts"]);
  assert.equal(match.defaults({dot: true})(".config.js", "*.js"), true);
  assert.deepEqual(match.braceExpand("{a,b}.js"), ["a.js", "b.js"]);
});
