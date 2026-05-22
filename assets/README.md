# Kevin Digital — Static Site

Pure HTML, CSS, and JavaScript version of the Kevin Digital marketing site. The React app in `kevindigital/` is unchanged.

## Run locally

```bash
cd kevin-digital-static
python3 -m http.server 8080
```

Open http://localhost:8080

Or open `index.html` directly in a browser (some features work best with a local server because of asset paths).

## Structure

- `index.html` — full page markup
- `css/` — Figma tokens, components, and layout styles
- `js/` — sticky card stack and custom cursor (same behavior as the React app)
- `assets/` — copied images and SVGs from `kevindigital/src/assets/kevin/og-assets/`

## Animations

- Marquee text scroll (CSS)
- Case study image carousel (CSS)
- Spinning contact badge (CSS)
- Sticky overlapping service/case cards (JS)
- Custom cursor with gradient glow (JS, desktop only)
