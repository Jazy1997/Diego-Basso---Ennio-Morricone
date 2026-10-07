// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
// Pagine statiche; solo le route con `export const prerender = false` (es. /api/contatti) diventano funzioni Vercel.
export default defineConfig({
  site: 'https://diegobassoenniomorricone.vercel.app', // dominio definitivo in T41
  trailingSlash: 'always',
  build: { format: 'directory' },
  // La compressione di Astro 7 elimina lo spazio tra testo e tag su righe diverse ("di<em>…").
  compressHTML: false,
  adapter: vercel(),
});
