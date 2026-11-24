# playground

Design and code experiments by [Jody Ferry](https://www.jodyferry.com).

**Live:** [playground.jodyferry.com](https://playground.jodyferry.com)

## Projects

| Project | Description | Live | Source |
| --- | --- | --- | --- |
| **Carbonite Design System** | A concept design system for backup and security products across web, iOS, and Android. Built with React and shadcn/ui. | [playground.jodyferry.com/carbonite](https://playground.jodyferry.com/carbonite/) | [`carbonite/`](carbonite) |

## Run a project locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/jodyferry/playground.git
cd playground/carbonite
npm install
npm run dev
```

Then open http://localhost:5173/carbonite/

## How it's deployed

The site is hosted on [Netlify](https://www.netlify.com) and deploys automatically on every push to `main`.

- Each project lives in its own folder and is served from a matching path, such as `/carbonite`.
- [`netlify.toml`](netlify.toml) builds each project and copies its output into `public/<project>/`.
- [`index.html`](index.html) is a small landing page that links to each project.

### Adding a new project

1. Create a folder, such as `my-project/`, with its build base path set to `/my-project/`.
2. Add its build and copy steps to the `command` in `netlify.toml`, plus a redirect if it uses client-side routing.
3. Add a card for it to `index.html` and a row to the table above.
