// Slug tradotti e percorsi localizzati (ARCHITECTURE.md §5): italiano alla radice, inglese su /en/.
import type { Alternativa, Lingua } from '../components/Seo.astro';
import { it, type Dizionario } from './it';
import { en } from './en';

export const LINGUE: Lingua[] = ['it', 'en'];

export const routes = {
  home: { it: '', en: '' },
  progetto: { it: 'il-progetto', en: 'the-project' },
  maestro: { it: 'il-maestro', en: 'the-maestro' },
  date: { it: 'date', en: 'dates' },
  promoter: { it: 'promoter-e-venue', en: 'promoters-and-venues' },
  contatti: { it: 'contatti', en: 'contacts' },
  privacy: { it: 'privacy', en: 'privacy' },
  cookie: { it: 'cookie', en: 'cookies' },
} as const satisfies Record<string, Record<Lingua, string>>;

export type Pagina = keyof typeof routes;

/** Percorso assoluto con barra finale, es. localizedPath('date', 'en') → "/en/dates/". */
export function localizedPath(pagina: Pagina, lang: Lingua): string {
  const slug = routes[pagina][lang];
  const base = lang === 'it' ? '/' : '/en/';
  return slug ? `${base}${slug}/` : base;
}

/** Le versioni della stessa pagina in tutte le lingue (selettore lingua e hreflang). */
export function alternate(pagina: Pagina): Alternativa[] {
  return LINGUE.map((lang) => ({ lang, href: localizedPath(pagina, lang) }));
}

const DIZIONARI: Record<Lingua, Dizionario> = { it, en };

/** Dizionario UI della lingua, es. `const T = t(lang).piede`. */
export function t(lang: Lingua): Dizionario {
  return DIZIONARI[lang];
}
