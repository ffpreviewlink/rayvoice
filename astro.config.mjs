// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// Canonical origin of the live site (same as the original Squarespace canonical).
const site = process.env.SITE_URL || 'https://www.thatsraysvoice.com';
// Sub-path the site is served from. '/' on the real domain; e.g. '/rayvoice' for a GitHub Pages project site.
const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  // The original URLs are /showreels and /contacts (no trailing slash).
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Fonts are downloaded at build time and self-hosted: no third-party request for visitors.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-display',
      weights: ['300 600'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Instrument Sans',
      cssVariable: '--font-body',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
