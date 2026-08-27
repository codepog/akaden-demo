// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages hosts this project below /akaden-demo. Keep local development at /.
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: isGitHubPages ? 'https://codepog.github.io' : 'http://localhost:4321',
  base: isGitHubPages ? '/akaden-demo' : undefined,
  // Keep pages flat for simple static hosting. Generated CSS and JavaScript stay
  // in one ordinary assets folder, which GitHub Pages serves without special rules.
  build: {
    assets: isGitHubPages ? 'assets' : '_astro',
    format: 'file',
  },
  vite: { plugins: [tailwindcss()] },
});
