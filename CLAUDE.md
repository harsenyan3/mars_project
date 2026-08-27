# mars-project

Marketing site for MARS Project, an Atlanta-based live band (marsprojectatl).
Single-page React app: 1 long scrollable page with 4 sections (Home, Shows, About, Contact) and a scroll-spy navbar.
Create React App + TypeScript, no router, no backend — the contact form posts straight to EmailJS from the browser.

Read this file before exploring the codebase; it should cover most orientation questions without needing to open every file.

## Stack

- Create React App (`react-scripts` 5) + TypeScript (not ejected)
- React 19, function components + hooks only, no class components
- Plain CSS per component/page (no CSS-in-JS, no Tailwind, no CSS modules)
- `lucide-react` for icons (Calendar, MapPin, Mail, Phone, Instagram); Instagram/TikTok glyphs are hand-rolled inline SVGs in `components/common/SocialIcons.tsx` since lucide doesn't ship them
- EmailJS (`api.emailjs.com/api/v1.0/email/send`) for the contact form — no server, no API key stored anywhere (EmailJS's service/template/user IDs are client-safe by design)
- Testing: `@testing-library/react` + Jest (via react-scripts), one smoke test in `src/App.test.tsx`

## Commands

- `npm start` — dev server
- `npm run build` — production build
- `npm test` — Jest
- `npx tsc --noEmit` — type-check without emitting (useful before committing; CI doesn't run this separately, react-scripts type-checks during build/start too)

## Structure

```
src/
  App.tsx                    top-level layout: owns all state, composes everything below
  App.css                    truly global styles only (reset, body, .app, .section shell,
                              .page-container(-small), .page-title/.section-title, .card, keyframe: fadeIn)
  index.tsx, index.css       CRA entry point (unchanged from CRA default)
  react-app-env.d.ts         `/// <reference types="react-scripts" />` — gives TS the image-import
                              ambient module declarations (*.png, *.jpg, etc.)

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
    SocialIcons.tsx           <InstagramIcon>/<TikTokIcon>, accept a `className` to size themselves

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
- EmailJS service/template/user IDs are inlined as constants at the top of `App.tsx` (`EMAILJS_SERVICE_ID` etc.). These are meant to be client-visible (EmailJS's model), so this is fine as-is; if you want them configurable per environment, they're the natural candidates for `REACT_APP_*` env vars.
- `assets/images/site/unused-mars-member.jpg` is not referenced by any component — it was an orphaned image in the original flat `src/` folder. Safe to delete if you don't need it, or wire it in if it was meant to be used somewhere.
- `App.test.tsx` has exactly one smoke test (renders `App`, checks the home subtitle text is present). There's no coverage of the contact form, scroll spy, or individual pages — worth adding if this project starts taking outside contributions.
- No router: adding a second real page (e.g. a press kit or blog) will require pulling in `react-router` rather than extending the single-page section pattern.
