# Thea Rivera — Artist Portfolio

A dark expressionist artist portfolio built with React + Vite + Tailwind CSS + TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

## Other commands

```bash
npm run build      # Production build
npm run preview    # Preview the production build
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Full portfolio — Hero, About, Artworks, Process, Collaborations, Testimonials, Commissions |
| `/explore` | Gallery — 13 artworks with filter tabs and lightbox |

## Project files

```
artifacts/thea-portfolio/
  src/
    pages/        ← Home.tsx, Gallery.tsx
    components/   ← all sections (Hero, About, Artworks, etc.)
    assets/
      images/     ← all artwork images
    index.css     ← global styles and theme
    App.tsx       ← routing
    main.tsx      ← entry point
  index.html
  vite.config.ts
  package.json
  tsconfig.json
```
