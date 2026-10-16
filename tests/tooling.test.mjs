import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import eslintConfig from "../eslint.config.mjs";

const require = createRequire(import.meta.url);
const { getRootDirs } = require("@next/eslint-plugin-next/dist/utils/get-root-dirs.js");

test("Next resolves tinyglobby inside this repo, never an ancestor installation", () => {
  const pluginRequire = createRequire(require.resolve("@next/eslint-plugin-next"));
  const manifest = JSON.parse(readFileSync(pluginRequire.resolve("fast-glob/package.json"), "utf8"));
  assert.equal(manifest.name, "tinyglobby");
  assert.ok(pluginRequire.resolve("fast-glob").startsWith(path.resolve("node_modules")));
});

test("development dependency tree no longer contains vulnerable braces chain", () => {
  const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url)));
  for (const key of Object.keys(lock.packages)) {
    assert.ok(!/(?:^|\/)(braces|micromatch)$/.test(key), key);
  }
});

test("Next lint keeps all rules and the supported single-application root", () => {
  // Tinyglobby expands explicit directory globs differently. This repo uses the
  // default cwd root; fail if a future monorepo config introduces rootDir globs.
  for (const entry of eslintConfig) assert.equal(entry.settings?.next?.rootDir, undefined);
  assert.deepEqual(getRootDirs({ cwd: process.cwd(), settings: {} }), [process.cwd()]);
  const rules = Object.assign({}, ...eslintConfig.map(entry => entry.rules));
  assert.ok(Object.keys(rules).filter(name => name.startsWith("@next/next/")).length >= 20);
  assert.ok(rules["@next/next/no-html-link-for-pages"]);
});
