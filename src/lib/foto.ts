// Foto del sito per id (foto.json + file in src/assets/foto, ARCHITECTURE.md §10).
import type { ImageMetadata } from 'astro';
import { getEntry } from 'astro:content';
import type { Lingua } from '../components/Seo.astro';

const file = import.meta.glob<{ default: ImageMetadata }>('../assets/foto/*.jpg', { eager: true });

/** Qualità AVIF/WebP: quella predefinita impasta le foto scure del concerto (ombre a blocchi, grana sporca). */
export const QUALITA = 82;

/** Misure generate per <Picture>; quelle più larghe dell'originale si scartano. */
export const LARGHEZZE = [640, 960, 1280, 1920, 2560];

export async function foto(id: string, lang: Lingua = 'it') {
  const voce = await getEntry('foto', id);
  const immagine = file[`../assets/foto/${id}.jpg`]?.default;
  if (!voce || !immagine) throw new Error(`Foto "${id}" assente in foto.json o in src/assets/foto`);
  return {
    src: immagine,
    alt: voce.data.alt[lang],
    posizione: voce.data.posizione,
    credito: voce.data.credito,
    larghezze: LARGHEZZE.filter((l) => l <= immagine.width),
  };
}
