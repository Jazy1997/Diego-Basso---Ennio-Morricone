// Lettura delle collezioni con la regola dei segnaposto (ARCHITECTURE.md §9):
// visibili in sviluppo e nelle preview, esclusi nella build di produzione su Vercel.
import { getCollection, type CollectionKey } from 'astro:content';

// VERCEL_ENV è una variabile di sistema della build Vercel (non sta nei file .env letti da Vite).
const ambiente = (globalThis as { process?: { env: Record<string, string | undefined> } }).process
  ?.env.VERCEL_ENV;
export const mostraSegnaposto = ambiente !== 'production';

type ConSegnaposto = { data: { segnaposto?: boolean } };

/** Le voci di una collezione, senza i segnaposto in produzione. */
export async function prendi<C extends CollectionKey>(collezione: C) {
  const voci = await getCollection(collezione);
  return mostraSegnaposto
    ? voci
    : voci.filter((v) => !(v as ConSegnaposto).data.segnaposto);
}
