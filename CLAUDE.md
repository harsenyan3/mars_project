# mars-project

Marketing site for MARS Project, an Atlanta-based live band (marsprojectatl). Single-page React app: one long scrollable page with four sections (Home, Shows, About, Contact) and a scroll-spy navbar. Vite + TypeScript, no router, no backend — the contact form posts straight to EmailJS from the browser.

Read this file before exploring the codebase; it should cover most orientation questions without needing to open every file.

## Stack

- Vite (build tool/dev server) + TypeScript, migrated off Create React App in Aug 2026 because `react-scripts` (unmaintained since Feb 2025) was pinning ~22 deprecated transitive packages with no way to update them short of leaving CRA
- React 19, function components + hooks only, no class components
- Plain CSS per component/page (no CSS-in-JS, no Tailwind, no CSS modules)
- `lucide-react` (v1.x) for icons (Calendar, MapPin, Mail, Phone). **v1 dropped all brand/logo icons** (Instagram, Twitter, etc. — legal reasons) — Instagram and TikTok glyphs are hand-rolled inline SVGs in `components/common/SocialIcons.tsx` and used everywhere a social icon is needed, including Contact.tsx (which used to pull `Instagram` from lucide-react; that import no longer exists in v1)
- EmailJS (`api.emailjs.com/api/v1.0/email/send`) for the contact form — no server, no API key stored anywhere (EmailJS's service/template/user IDs are client-safe by design)
- Testing: `@testing-library/react` + Vitest (jsdom environment), one smoke test in `src/App.test.tsx`. `vitest.config` lives inside `vite.config.ts`'s `test` block, with `globals: true` so `test`/`expect`/`screen` etc. work without explicit imports (same ergonomics as the old Jest setup)
- Linting: flat-config ESLint (`eslint.config.js`) with `typescript-eslint` + `eslint-plugin-react-hooks`. Deliberately pinned to only `rules-of-hooks` (error) and `exhaustive-deps` (warn) rather than `eslint-plugin-react-hooks`'s v7 `recommended` preset — that preset adds React-Compiler-readiness rules (`react-hooks/refs`, `react-hooks/set-state-in-effect`) that flag patterns this codebase uses intentionally (passing section refs to `forwardRef` pages during render; the module-level scroll-direction singleton in `AnimatedSection.tsx`). Don't "upgrade" to the full recommended preset without revisiting those two spots first.

## Commands

- `npm run dev` (or `npm start`) — dev server
- `npm run build` — type-checks (`tsc -b`) then produces a production build via Vite into `build/` (kept as `build/` rather than Vite's default `dist/` to match prior hosting assumptions/`.gitignore`)
- `npm run preview` — serves the production build locally, for a final sanity check before deploying
- `npm test` — Vitest (single run); `npm run test:watch` for watch mode
- `npm run lint` — ESLint
- `npx tsc -b` — type-check without emitting (build-mode project references: `tsconfig.json` covers `src/`, `tsconfig.node.json` covers `vite.config.ts` itself)

## Structure

```
index.html                   Vite entry HTML, now at the project root (not public/). Loads
                              /src/index.tsx as a module script directly — no %PUBLIC_URL%
                              templating, that was a CRA-ism.
vite.config.ts                Vite + Vitest config (@vitejs/plugin-react, build.outDir: 'build',
                              test.environment: 'jsdom')
tsconfig.json / tsconfig.node.json   project-reference split: tsconfig.json type-checks src/,
                              tsconfig.node.json type-checks vite.config.ts (needs Node types,
                              which src/ doesn't)

src/
  App.tsx                    top-level layout: owns all state, composes everything below
  App.css                    truly global styles only (reset, body, .app, .section shell,
                              .page-container(-small), .page-title/.section-title, .card, keyframe: fadeIn)
  index.tsx, index.css       Vite entry point (functionally unchanged from the CRA default)
  vite-env.d.ts              `/// <reference types="vite/client" />` — gives TS the image-import
                              ambient module declarations (*.png, *.jpg, etc.) and import.meta.env typing

  types/index.ts             Concert, BandMember, ContactFormData, SectionKey ('home'|'shows'|'about'|'contact')
  data/concerts.ts           hardcoded show list, auto-sorted by date (soonest first)
  data/bandMembers.ts        hardcoded roster + imports each member's photo

  hooks/useInView.ts         IntersectionObserver wrapper, used by AnimatedSection
  hooks/useScrollSpy.ts      tracks navbarScrolled + activeSection from section refs' offsetTop/offsetHeight

  components/common/
    AnimatedSection.tsx       scroll-reveal wrapper (fade/slide in on enter, slides back out on scroll-away).
                               Tracks global scroll direction via a module-level variable + `window` scroll
                               listener registered at import time (not inside a hook) — intentional, keep it
                               that way rather than "fixing" it into a hook, the behavior is scroll-direction-
                               aware exit animation and needs to be a true singleton.
    SuccessFlash.tsx/.css     full-screen "message sent" confirmation overlay
    SocialIcons.tsx           <InstagramIcon>/<TikTokIcon>, accept a `className` to size themselves.
                               These are the only source of an Instagram icon in the app now that
                               lucide-react v1 dropped brand icons.

  components/layout/
    Navbar.tsx/.css           fixed top nav, goes opaque on scroll (`navbarScrolled`), highlights active section
    MobileMenu.tsx/.css       slide-in panel shown when the navbar hamburger is tapped (<768px)
    Footer.tsx/.css           site-wide footer (social links + copyright)

  pages/{Home,Shows,About,Contact}/
    <Page>.tsx + <Page>.css   each page is a `forwardRef<HTMLElement, Props>` — App.tsx passes a section
                               ref so the scroll-spy hook can measure it and Navbar/MobileMenu can
                               `scrollIntoView` to it. These aren't routed pages, just <section>s stacked
                               in one document.

  assets/images/
    site/                     logo.png, logo-inverted.png (navbar/footer variant), home-hero.jpg,
                               band-members.jpg (About section background), shows-bg.png
    band/                     one photo per member, filenames lowercase (chuck.jpeg, mombay.jpeg — note
                               these were renamed from .JPEG to .jpeg; TypeScript's ambient `*.jpeg` module
                               declaration is case-sensitive and won't match uppercase extensions)

public/
  favicon.ico, logo192.png, logo512.png, manifest.json, robots.txt
                              Served verbatim at the site root by Vite (same convention as CRA's public/,
                              minus index.html which moved to the project root — Vite owns that file directly)
```

## Data flow / state ownership

All mutable state lives in `App.tsx` (form data, mobile menu open/closed, hovered band member, submitting flag, success flash) and is threaded down as props — no context, no state library. `useScrollSpy` owns `navbarScrolled`/`activeSection` internally and returns them.

Section refs: `App.tsx` creates one `useRef<HTMLElement>(null)` per section and passes it to each page component via the `ref` prop (page components are `forwardRef`). `useScrollSpy` reads `.offsetTop`/`.offsetHeight` off those refs on scroll to decide which nav item is "active"; `scrollTo(section)` calls `.scrollIntoView()` on the same ref.

Concerts/band members are static data files, not fetched from anywhere — updating the show schedule or roster means editing `src/data/concerts.ts` / `src/data/bandMembers.ts` directly and redeploying.

## Styling conventions

- Plain CSS, BEM-ish flat class names (`.concert-card`, `.member-photo`), no nesting frameworks.
- A style lives in the CSS file next to the component/page that uses it. It only lives in `App.css` if two or more unrelated files share it (currently: `.section`, `.page-container(-small)`, `.page-title`/`.page-subtitle`/`.section-title`, `.card`/`.card-title`, and the `fadeIn` keyframe).
- `.about-section .section-title` (in `About.css`) intentionally overrides the shared `.section-title` — higher specificity always wins there regardless of viewport width. Don't "simplify" this by renaming the class; it's deliberate scoping, not a stray duplicate.
- Brand colors: red `#ef4444` (primary accent) / `#dc2626` `#991b1b` (hover/darker states) on black (`#000`)/near-black backgrounds. Headline font is "Rockybilly" (loaded from fonts.cdnfonts.com — an external, somewhat fragile source; if headlines start rendering in the fallback cursive font, check that CDN first). Body font is Oswald (Google Fonts). Buttons/labels use Bebas Neue.
- Mobile breakpoint is 768px (nav collapses to hamburger below it); a secondary breakpoint at 480px tightens up spacing further.

## Known follow-ups / things to be aware of

- **Security (handled 2026-08-27, verify it stayed fixed):** `src/token.txt` used to contain what looked like a live GitHub personal access token, committed to git history. It's been deleted from the working tree and `.gitignore`d going forward, but the token itself needs to be revoked on GitHub (Settings → Developer settings → tokens) if that hasn't happened — deleting the file does not remove it from past commits.
- EmailJS service/template/user IDs are inlined as constants at the top of `App.tsx` (`EMAILJS_SERVICE_ID` etc.). These are meant to be client-visible (EmailJS's model), so this is fine as-is; if you want them configurable per environment, Vite's convention is `import.meta.env.VITE_*` (`.env` files, `VITE_`-prefixed vars only — not `REACT_APP_*`, that was CRA's convention).
- `assets/images/site/unused-mars-member.jpg` is not referenced by any component — it was an orphaned image in the original flat `src/` folder. Safe to delete if you don't need it, or wire it in if it was meant to be used somewhere.
- `App.test.tsx` has exactly one smoke test (renders `App`, checks the home subtitle text is present). There's no coverage of the contact form, scroll spy, or individual pages — worth adding if this project starts taking outside contributions.
- No router: adding a second real page (e.g. a press kit or blog) will require pulling in `react-router` rather than extending the single-page section pattern.
- `web-vitals` is on the v6 API (`onCLS`/`onINP`/`onFCP`/`onLCP`/`onTTFB` in `reportWebVitals.ts`) — the old `getFID`/v2-style `getCLS` etc. functions are gone; `onFID` was removed upstream too and is intentionally not called (INP replaced it as the responsiveness metric).
