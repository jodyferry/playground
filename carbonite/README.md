# Carbonite Design System

A concept design system for Carbonite web and native apps, built as a browsable documentation site with live component demos.

Live: **https://playground.jodyferry.com/carbonite**

> Concept project by Jody Ferry, inspired by the Carbonite brand. Not affiliated with or endorsed by OpenText or Carbonite.

## What's inside

- **Get started**: overview, designer and developer setup, contributing
- **Foundations**: color, typography, spacing, elevation, radius, iconography, grid, motion, accessibility, and web/native platform guidance
- **Tokens**: primitive and semantic tokens with light and dark values, searchable
- **Components**: 30 components with live demos, React and React Native code, props, usage, and accessibility notes. Each has an "Open Figma file" link (placeholder).
- **Patterns**: forms, protection status dashboard, empty states, messaging, and an interactive mobile app prototype
- **Content**: voice and tone, writing style, terminology
- **Resources**: Figma libraries, icons, changelog

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui (Radix primitives), Lucide icons, React Router, Sonner, cmdk.

## Run it locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/jodyferry/playground.git
cd playground/carbonite
npm install
npm run dev
```

Open http://localhost:5173/carbonite/

Production build and preview:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  index.css               Theme: Carbonite tokens -> shadcn variables -> Tailwind
  components/ui/          shadcn/ui components styled with Carbonite tokens
  components/native/      Web renderings of native components for demos
  components/site/        Docs site chrome (header, sidebar, preview, code blocks)
  docs/components/        Component documentation (examples, props, a11y)
  docs/registry.ts        Component list used by nav, search, and overview
  lib/tokens.ts           Token data for Foundations and Tokens pages
  pages/                  Section pages
```

### Adding a component page

1. Add the component in `src/components/ui/`.
2. Add a `ComponentDoc` entry in the matching file in `src/docs/components/`.
3. It appears automatically in the sidebar, search, and overview grid.

### Changing the brand colors

Edit the primitive values at the top of `src/index.css` (`--cb-blue-*`, `--cb-navy-*`, `--cb-orange-*`) and the matching hex values in `src/lib/tokens.ts`.

## Deploy (Netlify)

The repo root `netlify.toml` builds this app and serves it at `/carbonite`. See the root README for setup.
