# MARS Project

Marketing site for **MARS Project**, a live band out of Atlanta, GA ([@marsprojectatl](https://instagram.com/marsprojectatl)).

The whole site is one scrolling page with four full-screen sections: Home, Shows, About and Contact. It's built with React 19 + TypeScript on Vite. There's no backend: the contact form sends straight to EmailJS from the browser.

## Getting started

You need **Node 24** (the version is pinned in `.nvmrc`):

```sh
nvm use          # or: nvm install
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` / `npm start` | Dev server with hot reload |
| `npm run build` | Type-checks, then builds for production into `build/` |
| `npm run preview` | Serves the production build locally, for a last check before deploying |
| `npm test` | Runs the test suite once (Vitest) — `npm run test:watch` to keep it running |
| `npm run lint` | ESLint |

## Common edits

- **Add or change a show:** edit `src/data/concerts.ts`. The list sorts itself by date and hides past shows automatically, so you can leave old entries in place. For a ticketed show, set `ticketed: true` and `tickets: '<url>'`.
- **Change the roster:** edit `src/data/bandMembers.ts` and put the photo in `src/assets/images/band/`. Use lowercase file extensions (`.jpeg`, not `.JPEG`).
- **Social links / contact details:** edit `src/data/socials.ts` and `src/data/contact.ts`.
- **Colors, fonts, glass effect:** all design tokens live in `src/styles/tokens.css`.

## Docs

- [`AGENTS.md`](AGENTS.md): architecture, conventions and gotchas for anyone (human or AI) working on the code. `CLAUDE.md` just imports it.
- [`docs/app_requirements.md`](docs/app_requirements.md): what the site must do and look like
- [`docs/Lessons.md`](docs/Lessons.md): lessons learned, newest first
- [`docs/Sources.md`](docs/Sources.md): external references, libraries and resolved advisories

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs lint, tests, type-check + build and `npm audit` on every push to `main` and every pull request. It also runs weekly to catch new security advisories.

## Deploying

The site deploys on **Vercel**. Build settings are pinned in `vercel.json` (Vite, `npm run build`, output `build/`), and the Node version comes from `package.json` `engines` (`24.x`). Pushes to `main` deploy to production; other branches get preview deploys.

It's a plain static build, so `npm run build` + uploading `build/` works on any static host too.
