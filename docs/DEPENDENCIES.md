# Development dependency override

The npm override replaces `fast-glob` with maintained `tinyglobby@0.2.17`. The only fast-glob consumer in this repository is `@next/eslint-plugin-next` (16.4.3). Its get-root-dirs helper imports globSync; this application's default root uses context.cwd directly. Tinyglobby supplies the import without braces/micromatch. All Next/React rules remain enabled.

Compatibility is deliberately limited to this single-application setup. Tinyglobby expands explicit rootDir directory patterns differently from fast-glob. A test rejects an explicit settings.next.rootDir configuration; reassess or remove the override before adding a monorepo/rootDir glob. This avoids silently changing rule behavior in a future reconfiguration.

All official Next/React ESLint rules remain enabled. No npm advisory is suppressed. `braces` and `micromatch` are removed from the installed graph. Tests also assert the plugin resolves the replacement from this checkout, rather than an ancestor node_modules directory.

Reassess on every Next upgrade. If Next adds other fast-glob APIs, lint/tests must pass before release. Remove the override when the official dependency chain passes a full audit.

Sources: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm and https://github.com/SuperchupuDev/tinyglobby
