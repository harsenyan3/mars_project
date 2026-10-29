# mars-project

Marketing site for MARS Project, an Atlanta-based live band (marsprojectatl). Single-page React app: one scrolling page with four full-screen sections (Home, Shows, About, Contact) and a scroll-spy navbar. Vite + TypeScript, no router, no backend — the contact form posts straight to EmailJS from the browser.

Read this file before exploring the codebase; it should cover most orientation questions without needing to open every file. It's the single source of agent instructions: `CLAUDE.md` only imports it (`@AGENTS.md`), so edit this file, not that one.

## Project docs (`docs/`)

| File | What it holds | When to update |
|---|---|---|
| `docs/app_requirements.md` | What the site must do and look like: sections, behavior, design, quality bars, out of scope | Before changing behavior or design. If a request contradicts a requirement, update the requirement in the same change. |
| `docs/Lessons.md` | Hard-won gotchas, dated, each with *what happened → rule going forward* | Whenever something non-obvious costs time (a failed approach, a surprising tool behavior). Add new entries at the top. |
| `docs/Sources.md` | External references: design inspiration, library docs, font/CDN origins, security advisories fixed | When adding a dependency or external service, or acting on an outside reference |

Check `docs/Lessons.md` before touching anything it mentions (fonts, tests setup, dependency upgrades, screenshots).

## Stack

- **Node 24 LTS**, pinned in `.nvmrc` (`24`) and `package.json` `engines` (`"24.x"`), with `@types/node` ^24 to match. Local dev, CI and Vercel all run the same major version.
  - **Why not 26:** Vercel only offers 24.x and 22.x (as of 2026-10). `engines.node` overrides the dashboard setting, so `>=26` made every deploy fail. Move to 26 only once Vercel lists it; see `docs/Lessons.md`.
  - **Floor:** `jsdom@30` needs `^24.15`, and `vitest@5` needs `^24`. Node 20 is EOL and won't run the tests.
  - In a non-interactive shell, npm may not be on PATH; use `~/.nvm/versions/node/v24.*/bin`.
- **Vercel** (hosting): `vercel.json` pins `framework: vite`, `npm ci`, `npm run build` and `outputDirectory: build`. It overrides the dashboard, so the non-default `build/` output folder can't break deploys.
- Vite 8 (build tool/dev server) + TypeScript. Migrated off Create React App in Aug 2026 because `react-scripts` was pinning ~22 deprecated transitive packages.
- **TypeScript is pinned to exactly `6.0.3`, on purpose.** TS 7 is out, but `typescript-eslint` 8.x declares `typescript >=4.8.4 <6.1.0`. Don't bump to 7 until typescript-eslint supports it.
- React 19, function components + hooks only. **No `forwardRef`.** Section components take `ref` as a regular prop (`ref?: Ref<HTMLElement>`), which is React 19's replacement.
- Plain CSS per component (no CSS-in-JS, no Tailwind, no CSS modules), driven by design tokens in `src/styles/tokens.css`.
- `lucide-react` (v1.x) for UI icons (Mail, Phone, Link, ArrowUpRight). **v1 dropped all brand/logo icons**, so the Instagram and TikTok glyphs are hand-rolled SVGs in `components/common/SocialIcons.tsx`.
- EmailJS (`api.emailjs.com/api/v1.0/email/send`) for the contact form. Its IDs live in `src/config/emailjs.ts` and are client-safe by design (EmailJS's model), not secrets. If they ever need to vary per environment, use Vite's `import.meta.env.VITE_*` (not CRA's `REACT_APP_*`).
- Testing: Vitest 5 (jsdom) + `@testing-library/react` + `@testing-library/jest-dom` 7. The setup file is `src/test/setup.ts`; it imports `@testing-library/jest-dom/vitest`, which is jest-dom 7's Vitest entry, and stubs `IntersectionObserver`. `globals: true`, so `test`/`expect`/`describe` need no imports. The matcher types come from `"types": [..., "@testing-library/jest-dom"]` in `tsconfig.json`.
- Linting: flat-config ESLint 10 using core `defineConfig`/`globalIgnores` from `eslint/config`. **Not** `tseslint.config()`, which is deprecated. `typescript-eslint` recommended + `eslint-plugin-react-hooks`, deliberately limited to `rules-of-hooks` (error) and `exhaustive-deps` (warn) rather than the v7 `recommended` preset. That preset adds React-Compiler rules (`react-hooks/refs`, `react-hooks/set-state-in-effect`) that flag two intentional patterns: section refs passed as props from `App.tsx`, and the module-level scroll-direction singleton in `AnimatedSection.tsx`. Revisit those two spots before "upgrading" the preset.
- Removed as unused CRA leftovers: `web-vitals` (`reportWebVitals()` was called with no callback) and `@testing-library/user-event` (never imported). Re-add `user-event@14` if you write form-interaction tests.
- Dependency status as of 2026-10-28: every package is at its latest version (except TS, see above), `npm audit` reports 0 vulnerabilities, and a clean install prints no deprecation warnings.
- `package.json` has `"allowScripts": { "fsevents": false }` (npm 11's install-script approvals). fsevents, Vite's macOS file watcher, ships a prebuilt `fsevents.node`, so its implicit `node-gyp rebuild` never needs to run. The deny entry just silences npm's "install scripts not yet covered" warning.

## Commands

- `npm run dev` (or `npm start`) — dev server
- `npm run build` — type-checks (`tsc -b`) then builds via Vite into `build/` (kept as `build/` rather than Vite's default `dist/` to match prior hosting assumptions)
- `npm run preview` — serves the production build locally
- `npm test` — Vitest single run; `npm run test:watch` for watch mode
- `npm run lint` — ESLint
- CI (`.github/workflows/ci.yml`, GitHub Actions) runs on pushes to `main`, on every PR, weekly (Mon 13:00 UTC) and manually. It has two jobs:
  - `verify`: `npm ci` → lint → test → build. The build includes `tsc -b`.
  - `audit`: `npm audit --audit-level=moderate`.

  Node comes from `.nvmrc`, so bumping Node means editing only that file. The weekly run exists to catch new advisories against unchanged deps. If `audit` goes red without a code change, that's why.
- `npx tsc -b` — type-check only. Uses build-mode project references: `tsconfig.json` covers `src/`, `tsconfig.node.json` covers `vite.config.ts`. Both write their `.tsbuildinfo` into `node_modules/.tmp/`, so nothing lands at the repo root.

## Structure

The root holds only files that tools require there: `index.html` (Vite entry, loads `/src/main.tsx` and the web fonts), `vite.config.ts` (Vite + Vitest config), `tsconfig*.json`, `eslint.config.js`, `package*.json`, `.nvmrc`, plus `public/` and `src/`. Editor folders (`.idea/`, `.vscode/`) and `.DS_Store` are gitignored.

```
src/
  main.tsx                   entry: createRoot + StrictMode, imports styles/tokens.css + styles/global.css
  App.tsx                    composition only: section refs, scroll spy, mobile-menu open state, layout
  vite-env.d.ts              vite/client ambient types (image imports, import.meta.env)

  config/emailjs.ts          EmailJS service/template/user IDs
  types/index.ts             Concert, BandMember, ContactFormData, SectionKey
  data/
    concerts.ts              hardcoded show list → exports `upcomingConcerts` (past shows filtered out,
                              soonest first, evaluated at page load). Old entries stay as a record.
    bandMembers.ts           roster + member photo imports
    socials.ts               Instagram / TikTok / Linktree — single source for every social link on the site
    contact.ts               CONTACT_EMAIL + contactMethods (email, phone, Instagram)
    navigation.ts            NAV_ITEMS (shared by Navbar + MobileMenu)
  hooks/
    useInView.ts             IntersectionObserver wrapper, used by AnimatedSection
    useScrollSpy.ts          returns the active SectionKey (the section covering the top ~40% of the viewport)
    useContactForm.ts        contact form state, validation, submit, success flash
  services/sendContactEmail.ts   the EmailJS fetch call
  utils/
    formatPhone.ts (+ .test)     "(404) 555-1234" input masking, phoneDigits()
    concertDates.ts (+ .test)    parseConcertDate, isUpcoming, formatConcertDate → { monthDay: 'NOV 13', year }
  styles/
    tokens.css               :root design tokens: colors, fonts, glass, radii, easing, --nav-h, --gutter …
    global.css               reset, html scroll-snap, body, fadeIn keyframe
  test/setup.ts              jest-dom matchers + IntersectionObserver stub

  components/
    ui/                      design-system primitives (each .tsx + .css)
      Section                full-screen <section> shell: ref, id, variant 'image' | 'plain', backgroundImage,
                              backdrop (optional layer painted beneath the photo; Home uses it for the logo),
                              mobileBackgroundImage (phone-only photo via <picture>; each device downloads one)
      SectionTitle           Rockybilly heading (h2, or h3 via `as`), optional subtitle, align center|left
      GlassPanel             frosted translucent container (+ .glass-title label style)
      Button / ButtonLink    glass pill, variants primary | outline | glass (liquid-glass, used by Home's
                              "Next Shows"), sizes md | sm
    common/
      AnimatedSection.tsx    scroll-reveal wrapper. Tracks global scroll direction via a module-level variable
                              + `window` scroll listener registered at import time (not inside a hook). That's
                              intentional; keep it that way. It's a true singleton for direction-aware exits.
      SocialIcons.tsx        <InstagramIcon>/<TikTokIcon> (className-sized SVGs)
      SocialLinks.tsx/.css   renders data/socials.ts; variant 'icons' (round buttons) | 'pills' (icon + handle)
      SuccessFlash.tsx/.css  full-screen "message sent" overlay
    layout/
      Navbar.tsx/.css        fixed, always-transparent top nav (logo, NavLinks, hamburger <768px)
      NavLinks.tsx/.css      the section links: hover = underline grows in, active section = red
      MobileMenu.tsx/.css    floating glass sheet with NavLinks (column) + SocialLinks
      Footer.tsx/.css        slim strip after Contact (not a full screen)

  sections/                  the four scroll sections (not routed pages)
    Home/                    Home: layered dark base -> big logo-light.png as Section backdrop -> band photo at
                              40% opacity (130% tall, shifted up 30%, so faces sit ~39% down) -> "Next Shows"
                              glass CTA + socials near the bottom. Phones use home-hero-portrait.jpg instead
                              (all 5 fit the width), faces placed between the logo and the button (~62% down). The logo is decorative (alt=""), so a
                              visually hidden <h1> (.sr-only in global.css) carries the page title.
    Shows/                   Shows, ConcertRow (date · city/venue · tickets), ShowsEmptyState
    About/                   About (story panel + members), MemberCarousel (3×2 grid on desktop; centered carousel
                              with arrows on mobile, selected = tile nearest the scroll center), MemberTile
    Contact/                 Contact, ContactMethods, ContactForm. Contact calls useContactForm() and renders
                              SuccessFlash *outside* its Section, so the fixed overlay isn't trapped in the
                              section's stacking context.

  assets/images/
    site/                    logo.png (original master: black outlines, unused directly), logo-light.png (Home: black
                              recolored to white for dark backgrounds, reds untouched), logo-inverted.png (red outlines — navbar,
                              and the source for the public/ icons), home-hero.jpg, band-members.jpg (About bg),
                              shows-bg.jpg (Shows bg — the band's favorite; keep it. Re-encoded from a 15.7 MB PNG to
                              1800px JPEG, ~0.9 MB),
                              unused-mars-member.jpg (never referenced; safe to delete)
    band/                    one photo per member, lowercase extensions (TS's ambient `*.jpeg` module
                              declaration is case-sensitive)

public/                      served verbatim at the site root: favicon.png, apple-touch-icon.png, logo192/512.png
                              (all the band's glasses mark cropped from logo-inverted.png on black. The old
                              files were CRA's React logo), manifest.json, robots.txt
```

## Data flow / state ownership

- `App.tsx` owns the section refs and the mobile-menu open/closed flag. `useScrollSpy` derives `activeSection` from the refs.
- Contact-form state is local to the Contact section via `useContactForm`; nothing else needs it.
- There's no context and no state library.
- Section refs: `App.tsx` creates one `useRef<HTMLElement>(null)` per section and passes it as each section's `ref` prop, which `Section` forwards to its `<section>`. `useScrollSpy` reads `.offsetTop`/`.offsetHeight` off those refs on scroll. `scrollTo(section)` calls `.scrollIntoView()` on them.
- Concerts and band members are static data files. Updating the schedule or roster means editing `src/data/*.ts` and redeploying.

## Styling conventions

- **Tokens first:** colors, fonts, glass values, radii and layout constants come from `styles/tokens.css` custom properties. Don't hard-code new hex values or font stacks in component CSS.
- A style lives in the CSS file next to the component that uses it. Shared building blocks are components in `components/ui/` (Section, SectionTitle, GlassPanel, Button), not global classes. `global.css` holds only the reset, document-level behavior and shared keyframes.
- Plain CSS, BEM-ish flat class names (`.concert-row-city`, `.member-tile-caption`), no nesting.
- **One screen per section:** `Section` is `min-height: 100svh` (svh so iPhone Safari's toolbar doesn't cause jumps), with `padding-top: var(--nav-h)` to clear the fixed nav, and content centred. Each section's content is sized to fit a 1440×800 or 1280×720 laptop and a 390×844 iPhone. `min-height` (not `height`) lets unusually short windows grow instead of clipping. Short-laptop tweaks use `@media (max-height: 760–780px) and (min-width: 769px)` (square member tiles, a shorter textarea). The Shows list scrolls internally if a tour outgrows the screen.
- **Backgrounds for flow:** Home (`image`) → Shows (`image`) → About (`image`) → Contact (`plain`). Strict photo/plain alternation was the original redesign plan, but the band asked to keep the Shows photo, so three photo sections now run in a row, with soft fades between them.
  - Shows' photo is a bright daytime shot. It's dimmed harder (`brightness(0.42)`), has its original slow 25s zoom back, and its tour list sits on a dark frosted-glass panel for legibility.
  - Image sections: the photo fades to `--bg` at the top and bottom edges.
  - Plain sections: two slow-drifting red radial glows, masked out at the edges and disabled under `prefers-reduced-motion`.
  - Every section shares the single `--bg` color, so the seams are invisible. Don't remove or swap an existing section photo for the sake of a pattern without asking the band first.
- **Scroll snap:** `html { scroll-snap-type: y proximity }`, plus `scroll-snap-align: start` on sections (and `end` on the footer). This is gentle on purpose, not `mandatory`.
- **"Liquid glass" look:** translucent gradients, `backdrop-filter: blur(20px) saturate(180%)`, hairline white borders, an inset top highlight, large radii. Panels over busy photos use darker glass (About story panel, member captions) for legibility.
- **Navbar:** never gets a background (no hover or scrolled state). The links have a text-shadow, and a faint top fade under the nav keeps them legible over photos.
- `.about-section .section-title` (in `About.css`) intentionally overrides the shared `.section-title` (adds a text-shadow over the photo). Higher specificity always wins there. Don't "simplify" it away; it's deliberate scoping.
- **Fonts:** loaded via `<link>` in `index.html`, not CSS `@import`, which breaks once Vite concatenates CSS.
  - Headings: "Rockybilly" (`--font-display`), from fonts.cdnfonts.com. That's an external, somewhat fragile source; if headings render in the fallback cursive, check that CDN first. Its swashes extend far outside the glyph box, which is why `.section-title` uses `line-height: 1.8`. Don't put small labels right above or below it.
  - Body: **Space Grotesk** (`--font-body`). Oswald is gone.
  - Labels, buttons, dates and cities: Bebas Neue (`--font-label`).
- **Brand colors:** red `#ef4444` (`--red`), with `#dc2626`/`#991b1b` for darker states, on near-black `--bg` `#050506`.
- Mobile breakpoint is 768px (nav collapses to hamburger; About heading centers and members become a centered carousel with arrows; Contact methods collapse to an icon row). A secondary breakpoint at 480px tightens the gutter.

## Known follow-ups / things to be aware of

- **Security (handled 2026-08-27, verify it stayed fixed):** `src/token.txt` used to contain what looked like a live GitHub personal access token, committed to git history. It's been deleted and `.gitignore`d. The token itself still needs revoking on GitHub (Settings → Developer settings → tokens) if that hasn't happened; deleting the file doesn't remove it from past commits.
- **Image weight:** the member photos are 0.6–4 MB each (`mombay.jpeg` 3.9 MB, `jack.jpeg` 3.4 MB…), and `band-members.jpg` is 1.8 MB. Resizing them to ~800px wide WebP/JPEG would cut page weight by roughly 15 MB. `home-hero.jpg` (band in front of a packed crowd, 1448×1086, ~250 KB, `center 45%` + the 130%/-30% shift in Home.css) is already optimized; resize new photos the same way before committing.
- Tests: an App smoke test (renders, checks the home subtitle) plus unit tests for `formatPhone` and `concertDates`. There's no coverage of the contact form flow, scroll spy or section rendering yet.
- No router: adding a second real page (press kit, blog) means pulling in `react-router` rather than extending the section pattern.
