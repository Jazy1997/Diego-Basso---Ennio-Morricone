// Video dell'hero (ARCHITECTURE.md §7.2).
// - Poster (LCP): le stesse opzioni servono al <Picture> di HeroVideo e al <link rel="preload">, così gli URL coincidono.
// - Sorgente HLS: cartella scritta da scripts/video_hero.sh in src/assets/video/hero.json. La base è
//   PUBLIC_VIDEO_BASE (es. un bucket Cloudflare R2) oppure /video sul sito stesso.
import { getImage } from 'astro:assets';
import poster from '../assets/video/hero-poster.jpg';
import video from '../assets/video/hero.json';
import { QUALITA } from './foto';

export const POSTER = {
  src: poster,
  widths: [640, 960, 1280, 1920],
  sizes: '100vw',
  quality: QUALITA,
} as const;

const base = (import.meta.env.PUBLIC_VIDEO_BASE || '/video').replace(/\/$/, '');
export const sorgenteVideo = `${base}/${video.cartella}/master.m3u8`;

/** Attributi per <link rel="preload" as="image"> del poster AVIF. */
export async function precaricaPoster() {
  const avif = await getImage({ src: POSTER.src, widths: [...POSTER.widths], quality: POSTER.quality, format: 'avif' });
  return { imagesrcset: avif.srcSet.attribute, imagesizes: POSTER.sizes, type: 'image/avif' };
}
