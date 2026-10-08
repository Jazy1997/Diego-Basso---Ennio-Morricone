// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { LINGUE, localizedPath, routes } from './src/i18n/utils.ts';

const SITO = 'https://diegobassoenniomorricone.vercel.app'; // dominio definitivo in T41

// Sitemap (ARCHITECTURE.md §12): gli slug sono tradotti (il-progetto ↔ the-project), quindi le alternate IT/EN
// si costruiscono dalle routes e non dal prefisso /en/. Fuori: pagine di conferma del modulo.
const alternate = Object.fromEntries(
  /** @type {import('./src/i18n/utils.ts').Pagina[]} */ (Object.keys(routes)).flatMap((pagina) =>
    LINGUE.map((lang) => [
      localizedPath(pagina, lang),
      LINGUE.map((l) => ({ lang: l, url: new URL(localizedPath(pagina, l), SITO).href })),
    ]),
  ),
);

// https://astro.build/config
// Pagine statiche; solo le route con `export const prerender = false` (es. /api/contatti) diventano funzioni Vercel.
export default defineConfig({
  site: SITO,
  trailingSlash: 'always',
  build: { format: 'directory' },
  // La compressione di Astro 7 elimina lo spazio tra testo e tag su righe diverse ("di<em>…").
  compressHTML: false,
  // Italiano alla radice, inglese su /en/ (ARCHITECTURE.md §5); slug tradotti in src/i18n/utils.ts.
  i18n: { defaultLocale: 'it', locales: ['it', 'en'], routing: { prefixDefaultLocale: false } },
  integrations: [
    sitemap({
      filter: (pagina) => !/\/(contatti\/grazie|contacts\/thank-you)\/$/.test(pagina),
      serialize: (voce) => ({ ...voce, links: alternate[new URL(voce.url).pathname] }),
    }),
  ],
  adapter: vercel(),
});
