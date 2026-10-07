// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.omaggioamorricone.it', // provvisorio: dominio definitivo in T41
  trailingSlash: 'always',
  build: { format: 'directory' },
});
