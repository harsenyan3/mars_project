# Lessons Learned

Non-obvious things that cost time, so they don't cost it twice. **Add new entries at the top.**

Each entry follows this format:

> ### YYYY-MM-DD — Short title
> **What happened:** …
> **Rule:** …

---

### 2026-10-28 — Rockybilly's swashes overflow their glyph box
**What happened:** Headings set in Rockybilly with a normal `line-height` (~1.1) overlapped the small label above them and the text below. The font's swashes reach about 1em above and below the baseline.
**Rule:** Keep `.section-title` at `line-height: 1.8`, and don't put small labels ("eyebrows") right above or below a Rockybilly heading. Size headings with `clamp()`, at most ~2.75rem.

### 2026-10-28 — Remote fonts via CSS `@import` break once Vite bundles CSS
**What happened:** CSS only honours `@import` at the very top of a stylesheet. Vite concatenates every component's CSS into one file, so an `@import` in any file but the first is silently dropped.
**Rule:** Load web fonts with `<link>` tags in `index.html` (with `preconnect`), never with CSS `@import`.

### 2026-10-28 — Fixed overlays inside a `Section` get trapped
**What happened:** `Section` uses `isolation: isolate` and `overflow: hidden`, which creates a stacking context. A `position: fixed` overlay rendered inside it, like `SuccessFlash`, would sit under the navbar no matter its `z-index`.
**Rule:** Render full-screen overlays as siblings of `<Section>` (see `Contact.tsx`), not as its children.

### 2026-10-28 — Check the branch right before every commit and push
**What happened:** Mid-session, the PR branch was merged and the working copy was switched to `main` and pulled (from the IDE). The uncommitted changes carried over silently. They were committed and `git push`ed straight to `origin/main` when they were meant for a PR. Fixing it meant moving the commits to a new branch and rolling `main` back with a force-push.
**Rule:** Run `git branch --show-current` (and `git status -sb`) in the same command as `git commit`/`git push`, every time, and don't trust the branch from earlier in the session. Never commit to `main` directly; this repo goes through PRs. If it does happen, push the commits to a branch *first*, then reset `main` with `git push --force-with-lease=main:<sha-you-pushed>`, so it aborts if anyone else pushed in between.

### 2026-10-28 — Don't remove existing visuals to satisfy a pattern
**What happened:** To get the strict photo/plain alternation the redesign asked for, the Shows background photo was dropped. The band liked that photo and asked for it back.
**Rule:** When a new design rule conflicts with something already on the site (a photo, a section, an effect), keep the existing thing and ask, rather than quietly removing it. Mention the trade-off in the summary.

### 2026-10-28 — Rockybilly's visual middle isn't the line box's middle
**What happened:** To make the About heading straddle the card edge, the first try pulled it up by half its 1.8em line box (`-0.9em`). The edge ended up cutting the lettering about 70% of the way down, which looked accidental.
**Rule:** The glyphs ride high in their line box, so measure; don't compute. `margin-top: -0.45em` centres the lettering on an edge. Check with a screenshot at desktop and mobile sizes.

### 2026-10-28 — Vercel deploys failed after the Node 26 upgrade
**What happened:** `package.json` had `"engines": { "node": ">=26" }`. Vercel only offers Node 24.x and 22.x, and `engines.node` overrides the dashboard setting. No available version matched, so every deploy failed.
**Rule:** The Node version is capped by the **host**, not by the newest LTS. Before bumping Node, check [Vercel's supported versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions). Use an exact major in `engines` (`"24.x"`), not an open range, and keep `.nvmrc`, `@types/node` and CI on the same major.

### 2026-10-28 — Node 20 is EOL and the test stack drops it
**What happened:** `jsdom@30` and `vitest@5` declare engines that exclude Node 20. `npm install` still "works" but tests can break.
**Rule:** Use the Node in `.nvmrc` (24; see the Vercel entry above for why not 26). In non-interactive shells npm may not be on PATH; use `~/.nvm/versions/node/v24.*/bin`.

### 2026-10-28 — `npm outdated` can lie (stale cache)
**What happened:** `npm outdated` reported older "Latest" versions (jsdom 29, vitest 4) than the registry actually had (jsdom 30.1.3, vitest 5.0.5).
**Rule:** Before an upgrade pass, confirm the real latest with `npm view <pkg> version --prefer-online`.

### 2026-10-28 — "Latest" isn't always installable: check peer ranges
**What happened:** TypeScript 7.0.2 was out, but `typescript-eslint` declares `typescript >=4.8.4 <6.1.0`.
**Rule:** Check `npm view <pkg> peerDependencies` for the tools that wrap a package before bumping its major version. TS is pinned to `6.0.3` until typescript-eslint supports 7.

### 2026-10-28 — jest-dom 7 needs its Vitest entry point
**What happened:** After upgrading to jest-dom 7, `toBeInTheDocument` stopped type-checking.
**Rule:** The test setup imports `@testing-library/jest-dom/vitest`, and `tsconfig.json` `types` includes `"@testing-library/jest-dom"`.

### 2026-10-28 — npm 11 warns about install scripts (`fsevents`)
**What happened:** A clean install printed "install scripts not yet covered by allowScripts" for `fsevents`, Vite's macOS watcher.
**Rule:** fsevents ships a prebuilt binary, so its implicit `node-gyp rebuild` is unnecessary. It's denied via `"allowScripts": { "fsevents": false }`. Review any new entries with `npm install-scripts ls` rather than blanket-approving them.

### 2026-10-28 — Verifying layout with headless Chrome: `#hash` URLs don't scroll
**What happened:** Screenshotting `http://localhost:4173/#shows` always showed Home. The browser jumps to the anchor before React has rendered the section.
**Rule:** Drive Chrome over the DevTools protocol instead: load the page, run `element.scrollIntoView()`, wait, then capture. Measure `section.offsetHeight` against `innerHeight` to confirm the one-screen requirement (LAY-1).

### 2026-10-28 — Logo transparency matters for generated assets
**What happened:** Icons cropped from `logo.png` came out nearly blank on black, because its outlines are black on transparency. Also, `sips --cropOffset` was ignored and the crop came from the centre.
**Rule:** Use `logo-inverted.png` (red outlines) for anything on a dark background. Use Pillow (`python3 -I`) for precise crops.

### 2026-08-27 — Secrets in git history
**What happened:** A GitHub token (`src/token.txt`) was committed. Deleting the file doesn't remove it from history.
**Rule:** Revoke leaked tokens at the provider. `.gitignore` blocks `*.token` and `token.txt`. EmailJS IDs are public by design and don't count as secrets.
