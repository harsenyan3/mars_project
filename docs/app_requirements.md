# App Requirements — MARS Project website

This is the source of truth for what the site must do and look like. Implementation details live in `AGENTS.md`. Requirement IDs (e.g. `NAV-2`) can be cited in commits and PRs.

_Last updated: 2026-10-28_

## 1. Purpose & audience

The site is a marketing page for **MARS Project**, a live band from Atlanta, GA. It has three jobs:

1. Show fans when and where the band plays next.
2. Introduce the band and its members.
3. Let promoters and venues get in touch for bookings.

Its visitors are fans arriving from Instagram, TikTok or Linktree (mostly on phones) and bookers (often on laptops).

## 2. Information architecture

- **IA-1** It's a single page with four full-screen sections in this order: **Home → Shows → About → Contact**, followed by a slim footer.
- **IA-2** There's no router and no separate pages. Adding a real second page (press kit, blog) is a new requirement that needs `react-router`.
- **IA-3** Home, Shows and About have photo backgrounds; Contact is plain. Every photo fades to the base colour at its edges, so scrolling feels like one continuous flow. The Shows photo (`shows-bg.jpg`) is a band favourite and must stay.

## 3. Global layout & navigation

- **LAY-1** Each section fills **exactly one screen** on:
  - a normal laptop (verified at 1440×800 and 1280×720)
  - an iPhone (verified at 390×844)

  Content must fit without scrolling inside the section. The one exception is a Shows list that outgrows the screen, which scrolls inside its own area.
- **LAY-2** On unusually short windows, sections may grow taller than the screen. They must never clip content.
- **LAY-3** Scrolling snaps gently to sections (proximity, not mandatory). Free scrolling still works.
- **LAY-4** No horizontal page scrolling at any width ≥ 320px.
- **NAV-1** The top menu has **no solid background**, at any time: not on hover, not on scroll.
- **NAV-2** Hovering a menu item underlines it. The current section's item is **red**.
- **NAV-3** The menu stays fixed at the top and is legible over photos, using text shadows and a faint fade rather than a bar.
- **NAV-4** Below 768px, the menu collapses to a hamburger that opens a glass side sheet with the same items and the social links.
- **NAV-5** Clicking a menu item or the logo smooth-scrolls to that section.

## 4. Sections

### Home
- **HOME-1** The band logo (white-outline `logo-light.png`) is the large background, about 58% of the screen height on desktop and full width on phones. The band photo sits *in front of it* at low opacity (40%), so the logo shows through like a double exposure. Below them: a liquid-glass **"Next Shows"** button (scrolls to Shows) and social icons (Instagram, TikTok, Linktree). There's no tagline. The page keeps a screen-reader-only "MARS Project" heading.
- **HOME-2** All five members must be visible on phones too. Phones get a separate portrait photo (`home-hero-portrait.jpg`) with the faces between the logo and the button (~62% down). Desktop uses the landscape photo with the faces ~40% down, behind the logo. A scroll hint arrow shows only on screens taller than 760px.

### Shows
- **SHOW-1** A conventional band tour-date list, styled after typical touring-band sites (see `Sources.md`). Each row shows:
  - **date**: red month and day, with the year and time underneath
  - **city**: large and uppercase
  - **venue**: underneath the city
  - **action**: on the right
- **SHOW-2** The action is **"Tickets ↗"** for ticketed shows with a URL. Otherwise it's a muted label (the show's `label`, or "Free entry").
- **SHOW-3** Only **upcoming** shows are listed (today and later). Past shows stay in the data file but are hidden.
- **SHOW-4** Shows are sorted soonest first.
- **SHOW-5** With no upcoming shows, the section says "No dates announced yet" and points to Instagram.
- **SHOW-6** Shows are edited in `src/data/concerts.ts`, and changes go live on redeploy. There's no CMS.

### About
- **ABOUT-1** A "Who Are We?" story card plus a member grid (no subheading), over the band photo. The heading deliberately straddles the card's top edge, half in and half out.
- **ABOUT-2** Each member tile shows a photo, name and role. Hover gives a subtle zoom and full colour.
- **ABOUT-3** Hovering a member must **not** change the page background.
- **ABOUT-4** Layout: on desktop, story and members sit side by side, with members in a 3×2 grid, and the story card's top and bottom edges line up exactly with the grid's. On mobile, the story comes first (heading centered) and members follow in a centered carousel: the selected member is full size with a red glow and its caption, neighbors are shrunk, dimmed and peek in from both sides. Left and right arrows step one member at a time and loop (next on the last member returns to the first, previous on the first goes to the last); swiping and tapping a neighbor also select.

### Contact
- **CON-1** Booking heading, contact methods (email, phone, Instagram) and a message form (name, email, phone, message).
- **CON-2** Validation:
  - all fields are required
  - the email must be valid
  - the phone number must be 10 US digits, auto-formatted as `(404) 555-1234`
- **CON-3** The form submits through EmailJS straight from the browser (no backend). Success shows a full-screen "Message sent" confirmation for about 2 seconds. Failure shows an error naming the fallback email address.
- **CON-4** On mobile, the contact methods collapse into a single row of icon buttons so the form fits one screen.
- **CON-5** On desktop, the contact panel also shows social links ("Follow along").

### Footer
- **FOOT-1** A slim strip after Contact, with social links and the copyright. It is not a full screen.

## 5. Visual design

- **VIS-1** The look is inspired by Apple's "Liquid Glass" design language: translucent frosted panels, hairline borders, soft highlights, large radii and smooth easing.
- **VIS-2** Brand colours: red `#ef4444` accent on near-black (`#050506`).
- **VIS-3** Typography:
  - Headlines: **Rockybilly**.
  - Body text: **Space Grotesk**, chosen as "a little more solid" than the previous Oswald.
  - Labels, buttons, dates and cities: **Bebas Neue**.
- **VIS-4** Photo sections fade into the base colour at the top and bottom, so the seams between sections are invisible.
- **VIS-5** Plain sections have a slow, subtle ambient red glow.
- **VIS-6** Motion respects `prefers-reduced-motion`: no ambient drift and no smooth scroll.
- **VIS-7** All design values come from the tokens in `src/styles/tokens.css`.

## 6. Quality requirements

- **Q-1 Platform:**
  - Node 24 LTS, the newest major Vercel offers (Vercel is the host)
  - every dependency at its latest version, unless a documented compatibility cap applies (TypeScript 6.0.x, see `AGENTS.md`)
- **Q-2 Security and deprecations:**
  - `npm audit` must report **0 vulnerabilities** at moderate severity or higher
  - a clean `npm ci` prints no deprecation warnings
- **Q-3 Gates:** CI (`.github/workflows/ci.yml`) must pass lint, tests, type-check + build, and audit on every push to `main` and every PR.
- **Q-4 Accessibility:**
  - every icon-only control has an `aria-label`
  - form fields have accessible names
  - the active nav item has `aria-current`
  - focus is visible
- **Q-5 Mobile:** form inputs are at least 16px so iOS doesn't zoom in on focus, and layouts use `svh` units so Safari's toolbar doesn't cause jumps.
- **Q-6 Tests:** pure logic (date filtering, phone formatting) has unit tests.
- **Q-7 Deploy:** every push to `main` deploys on Vercel. Local, CI and Vercel use the same Node major (see Q-1).

## 7. Out of scope (for now)

- CMS or remote data for shows and roster
- Merch store, music player, mailing-list signup
- Analytics (`web-vitals` was removed as an unused no-op)
- Server-side anything

## 8. Open items

- Image weight: member photos are 1–4 MB each. The hero photo is a 1448px live-show shot in front of a packed crowd (~250 KB).
