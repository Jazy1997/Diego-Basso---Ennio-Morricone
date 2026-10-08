// Fotogramma di copertina dell'hero (LCP, ARCHITECTURE.md §7.2): le stesse opzioni servono
// al <Picture> di HeroVideo e al <link rel="preload"> nella <head>, così gli URL coincidono.
import { getImage } from 'astro:assets';
import poster from '../assets/video/hero-poster.jpg';

export const POSTER = {
  src: poster,
  widths: [640, 960, 1280, 1920],
  sizes: '100vw',
} as const;

/** Attributi per <link rel="preload" as="image"> del poster AVIF. */
export async function precaricaPoster() {
  const avif = await getImage({ src: POSTER.src, widths: [...POSTER.widths], format: 'avif' });
  return { imagesrcset: avif.srcSet.attribute, imagesizes: POSTER.sizes, type: 'image/avif' };
}
