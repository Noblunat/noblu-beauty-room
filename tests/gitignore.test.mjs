import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("gitignore is plain UTF-8 and excludes local artifacts without weakening secret ignores", () => {
  const bytes = readFileSync(new URL("../.gitignore", import.meta.url));
  assert.equal(bytes.includes(0), false, "no UTF-16/NUL tail");
  const lines = bytes.toString("utf8").split(/\r?\n/);
  for (const pattern of [".env*", "/node_modules", ".vercel", "/output/", "/.tmp/", "/tmp/"]) {
    assert.ok(lines.includes(pattern), pattern);
  }
});
