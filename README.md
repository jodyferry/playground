# playground

Design and code experiments, deployed to [playground.jodyferry.com](https://playground.jodyferry.com).

| Project | Folder | URL |
| --- | --- | --- |
| Carbonite Design System | [`carbonite/`](carbonite) | playground.jodyferry.com/carbonite |

## Run a project locally

```bash
cd carbonite
npm install
npm run dev
```

## Deploy

Hosted on Netlify as its own site, separate from other projects. `netlify.toml` builds each project and copies its output into `public/<project>/`. The root `index.html` is a small landing page that links to each project.

### One-time Netlify setup

1. In Netlify, choose **Add new project > Import an existing project > GitHub** and pick `jodyferry/playground`.
2. Leave the build settings as detected. They come from `netlify.toml`.
3. Deploy. You'll get a URL like `something.netlify.app`.

### Custom subdomain (Squarespace DNS)

1. Netlify: **Domain management > Add a domain** > `playground.jodyferry.com`.
2. Squarespace: **Domains > jodyferry.com > DNS settings > Add record**
   - Type: `CNAME`
   - Host: `playground`
   - Data: `<your-site-name>.netlify.app`
3. Back in Netlify, verify the domain. HTTPS is provisioned automatically once DNS resolves (usually within an hour).

The Framer site on `www.jodyferry.com` is unaffected.

### Adding another project

1. Create a folder, e.g. `my-project/`, configured to build with base path `/my-project/`.
2. Add its build and copy step to the `command` in `netlify.toml`, plus a redirect if it uses client-side routing.
3. Add a card to `index.html`.
