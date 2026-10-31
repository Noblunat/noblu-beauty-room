// ESLint 9 plugins expect minimatch's callable CommonJS API. Keep that API
// in the lint process while using the patched upstream v11 engine throughout.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const id = require.resolve("minimatch");
const engine = require(id);
require.cache[id].exports = Object.assign(engine.minimatch, engine);
