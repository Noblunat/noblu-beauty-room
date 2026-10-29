# Stage 3: Accessibility And Copy Cleanup

Scope approved by the owner: cookie-preferences dialog, semantic price lists, one Instagram action in its section, and duplicated homepage local/acquisition copy. Keep current services, prices, consent purposes, forms and page layout. Homepage server/client splitting remains stage 4.

## Steps And Acceptance

1. Publish and verify stage 2 first; retain its exact production SHA in the release record. Work on a separate `codex/` branch for stage 3. Preserve unrelated `D CLAUDE.md`.
2. Add failing `tests/e2e/accessibility.spec.ts` checks before changing UI. Test focus entering preferences, Tab/Shift+Tab staying within controls, Escape cancelling without saving, first-visit cancellation not granting consent, focus returning to the opener, and save preserving choices. Verify three viewports and add a screenshot of the open mobile/desktop dialog.
3. `app/components/CookieBanner.tsx`: keep the non-modal first layer and equal accept/reject choices; render expanded preferences with native `dialog.showModal()`, a named heading, a close icon, native inert background and explicit return-focus fallback. Do not change consent storage or Google/Meta configuration. Update existing browser assertions from region to dialog only when settings are expanded. Adapt the Node render harness to `useRef`, not weaker consent assertions.
4. `app/cennik/page.tsx`: change repeated price rows to labelled `ul`/`li` markup, preserving price/time/staff data and responsive grid. Test list names and row counts, and retain existing numeric-price/JSON-LD tests.
5. `app/page.tsx`: retain all eight Instagram images as non-interactive figures, with one existing profile CTA. Shorten duplicated SEO/location paragraphs without removing service links or approved facts. Keep the single comprehensive district list in the location section, a short location in the footer, and new-client information in FAQ. `app/components/SiteFooter.tsx` only changes the repeated district sentence.
6. Update actual homepage/shared-footer content revisions. Run `npm run check`, the complete browser suite, and the opt-in real-Google checks with collection intercepted. Review screenshots at desktop/375/414; no real appointments. Record changes, proof and remaining limitations before committing.

## References

- Native dialog: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
- Focus and Escape behavior: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- Installed Next.js guidance: `node_modules/next/dist/docs/03-architecture/accessibility.md` and `01-app/03-api-reference/01-directives/use-client.md`.

Risk: a first-layer opener can unmount when preferences opens; the return-focus fallback must target its recreated settings button rather than a detached node. Escape must not save a partial preference edit. Explicit `role=list` preserves list semantics with Tailwind's list reset.

## Local Checkpoint 2026-10-29

Implemented and verified locally: lint/build/smoke and 139 Node tests exit 0; 63 deterministic browser checks and three opt-in real-Google checks pass. Desktop/375/414 screenshots reviewed. Native focus needed the same explicit boundary cycle as the existing gallery. Step 2 is live at `f5f05ddc4a5e5fee8b85b243e1ddbe9d750c4888`. Full change walkthrough and the unresolved protected-preview tooling limitation are in `docs/releases/2026-10-29-structural-steps-2-3.md`.
