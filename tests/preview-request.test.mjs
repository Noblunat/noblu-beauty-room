import assert from "node:assert/strict";
import test from "node:test";
import { loadDataModule } from "./helpers/load-data.mjs";

const { previewRequest } = loadDataModule("./e2e/preview-request", import.meta.url);

test("preview requests preserve successful responses", async () => {
  const response = { status: 200 };
  assert.equal(await previewRequest(async () => response, "test-only-secret"), response);
});

test("preview errors never expose the automation credential in their message or stack", async () => {
  const secret = "test-only-secret";
  for (const failure of [new Error(`fetch failed ${secret} twice ${secret}`), `fetch failed ${secret}`]) {
    await assert.rejects(previewRequest(async () => { throw failure; }, secret), error => {
      assert.match(error.message, /fetch failed/);
      assert.match(error.message, /\[redacted\]/);
      assert.equal(error.message.includes(secret), false);
      assert.equal(error.stack.includes(secret), false);
      assert.equal(error.cause, undefined);
      return true;
    });
  }
});
