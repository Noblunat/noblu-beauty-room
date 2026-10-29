# Homepage server components

Scope: preserve the homepage DOM, copy, links, shared data, image settings and
consent behavior. Move static sections to server components; keep gallery state,
its lightbox and the scroll-dependent booking action in small client islands.
Do not change other routes, prices, consent purposes or advertising tools.

1. Record a production-build JavaScript inventory and desktop/mobile screenshots.
2. Add a failing architecture test and browser coverage for island interactions.
3. Extract static sections without changing their markup. Remove inert motion
   wrappers (they currently render ordinary divs without animations).
4. Retain gallery keyboard, pause, focus and lightbox behavior. Hide the floating
   booking action while a native dialog is open, without a page-wide React state.
5. Verify lint, unit tests, build, smoke, browser tests, visual comparisons and
   before/after JavaScript bytes. Do not infer field CWV changes from bundle size.
6. Publish through a reviewed feature branch; check the exact production release.

Visual baselines and measurements are local ignored output, not customer data.
Browser tests intercept mail submissions and third-party collection requests.
