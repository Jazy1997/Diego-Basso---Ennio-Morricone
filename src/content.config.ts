// Collezioni di contenuto (ARCHITECTURE.md §9): tutti i dati del sito, tipizzati e fuori dal codice.
// I contenuti `segnaposto: true` si leggono con `prendi()` di src/lib/contenuti.ts, che li esclude in produzione.
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const bilingue = z.object({ it: z.string().min(1), en: z.string().min(1) });
const segnaposto = z.boolean().default(false);
// Coordinate a quattro decimali (DS › Il segno): ricavate da una fonte affidabile, mai inventate.
const coordinata = (min: number, max: number) =>
  z
    .number()
    .min(min)
    .max(max)
    .refine((n) => Number(n.toFixed(4)) === n, 'Al massimo quattro decimali');

const eventi = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/eventi' }),
  schema: z.object({
    data: z.iso.date(), // AAAA-MM-GG, ora locale Europe/Rome
    ora: z.string().regex(/^\d{2}:\d{2}$/),
    citta: z.string(),
    sede: z.string(),
    indirizzo: z.string(),
    cap: z.string().optional(),
    nazione: z.string().length(2).default('IT'), // ISO 3166-1
    lat: coordinata(-90, 90),
    lng: coordinata(-180, 180),
    biglietti: z.url().optional(),
    stato: z.enum(['nessuno', 'nuova', 'ultimi', 'esaurito']).default('nessuno'),
    versione: z.enum(['proiezioni', 'concerto']).default('proiezioni'),
    segnaposto,
  }),
});

const testi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testi' }),
  schema: z.object({
    titolo: z.string(),
    ordine: z.number().int(),
    lang: z.enum(['it', 'en']),
  }),
});

const persone = defineCollection({
  loader: file('src/content/persone.json'),
  schema: z.object({
    nome: z.string(),
    ruolo: bilingue,
    bio: bilingue.optional(),
    foto: z.string().optional(), // id in foto.json
    segnaposto,
  }),
});

const luoghi = defineCollection({
  loader: file('src/content/luoghi.json'),
  schema: z.object({
    nome: z.string(),
    citta: bilingue,
    nazione: z.string().length(2),
    lat: coordinata(-90, 90),
    lng: coordinata(-180, 180),
    ordine: z.number().int(),
    segnaposto,
  }),
});

const partner = defineCollection({
  loader: file('src/content/partner.json'),
  schema: ({ image }) =>
    z.object({
      gruppo: z.enum(['patrocinio', 'collaborazione', 'organizzazione', 'main']),
      nome: z.string(),
      logo: image().optional(), // percorso relativo a partner.json, es. ../assets/partner/x.png
      colori: z.boolean().default(false), // solo a colori → riquadro `carta`
      url: z.url().optional(),
      segnaposto,
    }),
});

const contatti = defineCollection({
  loader: file('src/content/contatti.json'),
  schema: z.object({
    // id: booking | stampa | pubblico
    nome: z.string().optional(),
    email: z.email(),
    telefono: z.string().optional(),
    segnaposto,
  }),
});

const link = defineCollection({
  loader: file('src/content/link.json'),
  schema: z.object({
    tipo: z.enum(['streaming', 'video', 'social']),
    nome: z.string(),
    url: z.url(),
    youtubeId: z.string().optional(), // per il trailer (facade youtube-nocookie)
    icona: z.enum(['spotify', 'applemusic', 'tidal', 'youtube', 'instagram', 'facebook']).optional(),
    ordine: z.number().int().default(0),
    segnaposto,
  }),
});

const foto = defineCollection({
  loader: file('src/content/foto.json'),
  schema: z.object({
    originale: z.string(),
    categoria: z.string(),
    alt: bilingue,
    credito: z.string(),
    creditoDaConfermare: z.boolean().default(false),
    posizione: z.string().default('50% 50%'), // object-position nel taglio 2,39:1
    segnaposto,
  }),
});

export const collections = { eventi, testi, persone, luoghi, partner, contatti, link, foto };
