# Akaden website

Astro landing page and interactive product walkthrough for Akaden.

## Local development

```bash
pnpm install
pnpm dev
```

The local site runs at `http://localhost:4321/` by default. Build the static site with:

```bash
pnpm build
```

## Project structure

- `src/pages/index.astro` — landing-page entry point.
- `src/components/LandingPage.astro` — landing-page implementation.
- `src/pages/overview-demo-embed.astro` — embedded demo launcher.
- `src/pages/workspace.astro` — interactive Akaden workspace.
- `src/components/` — active landing-page and workspace components.
- `src/data/site.ts` — shared navigation and landing-page copy.
- `src/data/caseStudy.ts` — case-study labels.
- `src/data/ide.ts` — interactive workspace state and content.
- `src/data/demo/` — source documents and pipeline artifacts shown in the walkthrough.
- `src/styles/global.css` — shared design tokens and global styles.
- `public/` — assets shipped without processing.

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`, which builds and publishes the site to GitHub Pages:

`https://codepog.github.io/akaden-demo/`

In the repository’s Pages settings, **Build and deployment → Source** must be set to **GitHub Actions**. The legacy branch/Jekyll option is not used by this Astro site.

Generated output (`dist/`, `.astro/`) and installed dependencies (`node_modules/`) stay local and are not committed.
