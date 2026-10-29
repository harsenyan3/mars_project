# Sources & References

External material the project relies on or was shaped by. Add an entry when you add a dependency or service, or when you act on an outside reference.

## Design references

| Reference | Used for |
|---|---|
| Three tour-page screenshots shared by the band (2026-10-28), one of them The Gringos' site | Shows section layout: dated rows, city + venue, a right-aligned tickets button, hairline dividers (SHOW-1) |
| Apple "Liquid Glass" design language (WWDC 2025) — [HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials) | Glass panels, blur/saturation, highlights, fluid motion (VIS-1) |

## Runtime services

| Service | Notes |
|---|---|
| [EmailJS](https://www.emailjs.com/docs/rest-api/send/) — REST `POST /api/v1.0/email/send` | Contact form delivery. IDs in `src/config/emailjs.ts` are public by design. |
| [Google Fonts](https://fonts.google.com/) — [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) | Body and label fonts, loaded via `<link>` in `index.html` |
| [cdnfonts — Rockybilly](https://www.cdnfonts.com/rockybilly.font) | Headline font. A fragile third-party CDN: check it first if headings fall back to cursive. |

## Tooling & libraries

| Package | Docs |
|---|---|
| Node.js 26 LTS | [Release schedule](https://nodejs.org/en/about/previous-releases) |
| React 19 | [react.dev](https://react.dev/) — [ref as a prop](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop) (why there's no `forwardRef`) |
| Vite 8 | [vite.dev](https://vite.dev/) |
| Vitest 5 | [vitest.dev](https://vitest.dev/) |
| Testing Library | [React](https://testing-library.com/docs/react-testing-library/intro/), [jest-dom (Vitest setup)](https://github.com/testing-library/jest-dom#with-vitest) |
| TypeScript 6.0 | [typescriptlang.org](https://www.typescriptlang.org/) |
| ESLint 10 flat config | [`defineConfig`](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file) |
| typescript-eslint | [Why `tseslint.config()` is deprecated](https://typescript-eslint.io/packages/typescript-eslint/#config-deprecated) |
| eslint-plugin-react-hooks | [Rules](https://react.dev/reference/eslint-plugin-react-hooks) |
| lucide-react 1.x | [lucide.dev](https://lucide.dev/) (no brand icons in v1; Instagram/TikTok are custom SVGs) |
| GitHub Actions | [actions/checkout](https://github.com/actions/checkout), [actions/setup-node](https://github.com/actions/setup-node) (both v7) |

## Security advisories resolved (2026-10-28 upgrade)

| Package | Advisories |
|---|---|
| vite ≤ 8.2.2 | [GHSA-9jrq-w75r-8gcw](https://github.com/advisories/GHSA-9jrq-w75r-8gcw), [GHSA-rq7h-c2jc-7f22](https://github.com/advisories/GHSA-rq7h-c2jc-7f22), [GHSA-vfpm-58rq-9qcg](https://github.com/advisories/GHSA-vfpm-58rq-9qcg) |
| launch-editor (via vite) | [GHSA-698v-4r3x-3vcv](https://github.com/advisories/GHSA-698v-4r3x-3vcv), [GHSA-r825-w8mm-5pxw](https://github.com/advisories/GHSA-r825-w8mm-5pxw), [GHSA-587h-7wmj-h5pm](https://github.com/advisories/GHSA-587h-7wmj-h5pm) |
| undici (via jsdom 30.0.1) | [GHSA-xjj6-f33q-929c](https://github.com/advisories/GHSA-xjj6-f33q-929c), [GHSA-4w7w-5xrc-9h26](https://github.com/advisories/GHSA-4w7w-5xrc-9h26), [GHSA-2m5v-pch6-74hx](https://github.com/advisories/GHSA-2m5v-pch6-74hx), [GHSA-qrxm-fqhp-jwvm](https://github.com/advisories/GHSA-qrxm-fqhp-jwvm), [GHSA-9fm3-97px-rjf6](https://github.com/advisories/GHSA-9fm3-97px-rjf6), [GHSA-55wc-3pg8-jfw6](https://github.com/advisories/GHSA-55wc-3pg8-jfw6) |
| zod < 4.6.6 (via eslint-plugin-react-hooks) | [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) |

## Band links

- Instagram: https://instagram.com/marsprojectatl
- TikTok: https://tiktok.com/@marsprojectatl
- Linktree: https://linktr.ee/marsprojectatl
