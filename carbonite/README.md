# Carbonite Design System

A concept design system for Carbonite backup and security products, covering responsive web apps and native iOS and Android apps. The documentation site has working component demos, code examples, and guidelines, modeled on mature internal design systems like Atlassian's.

**Live site:** [playground.jodyferry.com/carbonite](https://playground.jodyferry.com/carbonite/)

> This is a personal concept project by [Jody Ferry](https://www.jodyferry.com), inspired by the Carbonite brand. It is not affiliated with or endorsed by OpenText or Carbonite. Figma links are placeholders.

## What's inside

| Section | Contents |
| --- | --- |
| [Get started](https://playground.jodyferry.com/carbonite/get-started) | Overview, setup guides for designers and developers, contribution process |
| [Foundations](https://playground.jodyferry.com/carbonite/foundations) | Color with contrast checks, typography, spacing, elevation, radius, iconography, grid, motion, accessibility, and web and native platform guidance |
| [Tokens](https://playground.jodyferry.com/carbonite/tokens) | Primitive and semantic tokens with light and dark values, in a searchable table |
| [Components](https://playground.jodyferry.com/carbonite/components) | 30 components with live demos, React and React Native code, props, usage guidance, and accessibility notes |
| [Patterns](https://playground.jodyferry.com/carbonite/patterns) | Forms, protection status dashboard, empty states, messaging, and a clickable mobile app prototype |
| [Content](https://playground.jodyferry.com/carbonite/content) | Voice and tone, writing style, terminology |
| [Resources](https://playground.jodyferry.com/carbonite/resources) | Figma libraries, icons, changelog |

The site also has light and dark themes, ⌘K search, and a responsive layout from 320px phones to wide desktops.

## Design approach

- **Three-tier tokens.** Primitive colors feed semantic tokens (such as `--primary` and `--success`), which map to shadcn/ui variables and Tailwind utilities. Changing a primitive value restyles everything.
- **Built-in accessibility.** Every text and background pairing meets WCAG 2.2 AA in both themes. Status is always shown with color, an icon, and text together.
- **One system, two platforms.** Web components are shadcn/ui (React). Each one documents its React Native counterpart so mobile and web stay consistent.
- **Status first.** Patterns are designed around a security product's main question: am I protected?

## Stack

[React 19](https://react.dev) · [TypeScript](https://www.typescriptlang.org) · [Vite](https://vite.dev) · [Tailwind CSS v4](https://tailwindcss.com) · [shadcn/ui](https://ui.shadcn.com) on [Radix](https://www.radix-ui.com) · [Lucide](https://lucide.dev) · [React Router](https://reactrouter.com) · [Sonner](https://sonner.emilkowal.ski) · [cmdk](https://cmdk.paco.me)

## Run it locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/jodyferry/playground.git
cd playground/carbonite
npm install
npm run dev
```

Open http://localhost:5173/carbonite/

To build and preview the production version:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  index.css               Theme: Carbonite tokens -> shadcn variables -> Tailwind
  components/ui/          shadcn/ui components styled with Carbonite tokens
  components/native/      Web renderings of native components, used in demos
  components/site/        Docs site chrome: header, sidebar, preview, code blocks
  docs/components/        Component documentation: examples, props, accessibility
  docs/registry.ts        Component list used by navigation, search, and overview
  lib/tokens.ts           Token data for the Foundations and Tokens pages
  pages/                  Section pages
```

### Add a component page

1. Add the component to `src/components/ui/`.
2. Add a `ComponentDoc` entry in the matching file in `src/docs/components/`.
3. It appears automatically in the sidebar, search, and components overview.

### Change the brand colors

Edit the primitive values at the top of `src/index.css` (`--cb-blue-*`, `--cb-navy-*`, `--cb-orange-*`) and the matching hex values in `src/lib/tokens.ts`.

## Note on React Native code

The React Native examples import from `@carbonite/native`, a package imagined for this concept. They show the intended API, and the mobile demos on the site are web renderings of those components.
