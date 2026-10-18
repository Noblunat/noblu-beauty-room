import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

async function securityPolicy() {
  const testModule = { exports: {} };
  const source = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, {
    module: testModule, exports: testModule.exports, process: { cwd: () => "/app" },
  });
  const entries = await testModule.exports.default.headers();
  const header = entries.find(entry => entry.source === "/:path*").headers
    .find(entry => entry.key === "Content-Security-Policy");
  return new Map(header.value.split(";").map(value => {
    const [directive, ...sources] = value.trim().split(/\s+/);
    return [directive, sources];
  }));
}

test("CSP allows the Google Ads script and transport origins without broad wildcards", async () => {
  const policy = await securityPolicy();
  for (const origin of ["https://www.googletagmanager.com", "https://www.googleadservices.com", "https://www.google.com", "https://googleads.g.doubleclick.net"]) {
    assert.ok(policy.get("script-src").includes(origin), `script-src: ${origin}`);
  }
  for (const origin of ["https://ad.doubleclick.net", "https://googleads.g.doubleclick.net", "https://pagead2.googlesyndication.com", "https://www.google.pl"]) {
    assert.ok(policy.get("connect-src").includes(origin), `connect-src: ${origin}`);
  }
  assert.ok(policy.get("frame-src").includes("https://www.googletagmanager.com"));
  for (const directive of ["script-src", "connect-src", "frame-src"]) {
    assert.ok(!policy.get(directive).includes("*"));
    assert.ok(!policy.get(directive).includes("https:"));
    assert.ok(!policy.get(directive).includes("'unsafe-eval'"));
  }
});

test("Ads compatibility retains same-origin and embedding protections", async () => {
  const policy = await securityPolicy();
  for (const directive of ["default-src", "base-uri", "form-action"]) {
    assert.equal(policy.get(directive).join(" "), "'self'");
  }
  for (const directive of ["object-src", "frame-ancestors"]) {
    assert.equal(policy.get(directive).join(" "), "'none'");
  }
  assert.ok(policy.has("upgrade-insecure-requests"));
});
