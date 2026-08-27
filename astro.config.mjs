// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages hosts this project below /akaden-demo. Keep local development at /.
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: isGitHubPages ? 'https://codepog.github.io' : 'http://localhost:4321',
  base: isGitHubPages ? '/akaden-demo' : undefined,
  vite: { plugins: [tailwindcss()] },
});
