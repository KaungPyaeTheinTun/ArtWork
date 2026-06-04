# Thea Rivera — Artist Portfolio

A dark expressionist artist portfolio built with React 19 + Vite + Tailwind CSS v4 + TypeScript.

## Getting Started (Local)

```bash
# 1. Go into the portfolio folder
cd artifacts/thea-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

## Other commands

```bash
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run typecheck  # TypeScript check
```

## Stack

- **React 19** + **TypeScript**
- **Vite 7** — dev server & bundler
- **Tailwind CSS v4** — utility-first styling
- **GSAP** — horizontal scroll animation (Artworks section)
- **Lenis** — smooth scroll
- **Wouter** — client-side routing (`/` and `/explore`)
- **Framer Motion** — UI animations
- **Radix UI** — accessible headless components

## Pages

| Route | Description |
|-------|-------------|
| `/` | Full portfolio — Hero, About, Artworks, Process, Collaborations, Testimonials, Commissions, CTA, Footer |
| `/explore` | Gallery page — 13 artworks, filter tabs, lightbox |

## Project structure

```
src/
  pages/
    Home.tsx        ← main portfolio page
    Gallery.tsx     ← explore / gallery page
  components/
    Navbar.tsx
    HeroSection.tsx
    AboutSection.tsx
    ArtworksSection.tsx
    ProcessSection.tsx
    CollaborationsSection.tsx
    TestimonialsSection.tsx
    CommissionsSection.tsx
    CTASection.tsx
    Footer.tsx
  assets/
    images/         ← all artwork images
  hooks/
    useScrollReveal.ts
  index.css         ← global styles, Tailwind theme
  App.tsx           ← routing setup
  main.tsx          ← app entry point
```
