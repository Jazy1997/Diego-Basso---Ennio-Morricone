// Testi lunghi, breve e medio (content/testi/{it,en}, ARCHITECTURE.md §9, §11).
// Per il testo completo si usa render() di astro:content; qui gli estratti in linea (Home, schede).
import { getEntry } from 'astro:content';
import type { Lingua } from '../components/Seo.astro';

export async function testo(id: string, lang: Lingua) {
  const voce = await getEntry('testi', `${lang}/${id}`);
  if (!voce) throw new Error(`Testo "${lang}/${id}" assente in src/content/testi`);
  return voce;
}

/** I paragrafi del corpo Markdown come HTML in linea: solo *corsivo* e **grassetto**, testo già sicuro (nostro). */
export function paragrafi(corpo: string): string[] {
  return corpo
    .trim()
    .split(/\n\s*\n/)
    .map((p) =>
      p
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\s*\n\s*/g, ' '),
    );
}
