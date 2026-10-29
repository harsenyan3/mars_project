# MARS Project

Marketing site for **MARS Project**, a live band out of Atlanta, GA ([@marsprojectatl](https://instagram.com/marsprojectatl)).

The whole site is one scrolling page with four full-screen sections: Home, Shows, About and Contact. It's built with React 19 + TypeScript on Vite. There's no backend: the contact form sends straight to EmailJS from the browser.

## Getting started

You need **Node 26** (the version is pinned in `.nvmrc`):

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

## Deploying

Run `npm run build` and upload the contents of `build/` to any static host.
