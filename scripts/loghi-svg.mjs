// Loghi del sito dal vettoriale (ARCHITECTURE.md §10): "Logo Morricone.svg" ha le 4 versioni su una tavola,
// un <g> per versione. Ognuna diventa un SVG ritagliato sul contenuto (usato dal componente Logo, nitido a ogni
// misura) e un PNG master 1600 px (per favicon e OG, generati poi da scripts/loghi.py).
// L'oro del file (#f2a93d) passa all'oro del DS (#e7ad54), lo stesso dei PNG originali.
//
// Uso: node scripts/loghi-svg.mjs && python scripts/loghi.py
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const radice = fileURLToPath(new URL('..', import.meta.url));
const sorgente = `${radice}../MATERIALE GRAFICO/LOGO/Logo Morricone.svg`;
const uscita = `${radice}src/assets/logo/`;
const ORO = '#e7ad54';
const BIANCO = '#fff';

const svg = readFileSync(sorgente, 'utf8');
const viewBox = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
// I figli diretti di <svg> dopo <defs>: i <g> sono annidati, si segue la profondità dei tag.
const gruppi = [];
{
  const corpo = svg.slice(svg.indexOf('</defs>') + 7, svg.lastIndexOf('</svg>'));
  let profondita = 0;
  let inizio = 0;
  for (const m of corpo.matchAll(/<(\/?)g\b[^>]*?(\/?)>/g)) {
    if (m[2]) continue;
    if (!m[1]) {
      if (profondita++ === 0) inizio = m.index;
    } else if (--profondita === 0) {
      gruppi.push(corpo.slice(inizio, m.index + m[0].length));
    }
  }
}
if (gruppi.length !== 4) throw new Error(`Attesi 4 gruppi nel SVG, trovati ${gruppi.length}`);

// Colori in attributi (niente <style>: un SVG per file, nessuna classe condivisa).
const colora = (g) =>
  g.replace(/class="cls-1"/g, `fill="${ORO}"`).replace(/class="cls-2"/g, `fill="${BIANCO}"`);

const SCALA = 4; // densità del raster per misurare il contenuto (1 unità = 4 px)
mkdirSync(uscita, { recursive: true });

for (const g of gruppi) {
  const corpo = colora(g);
  const colore = corpo.includes(ORO) ? 'oro' : 'bianco';
  const intero = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox.join(' ')}">${corpo}</svg>`;
  const { info } = await sharp(Buffer.from(intero), { density: 72 * SCALA })
    .trim({ threshold: 0 })
    .toBuffer({ resolveWithObject: true });
  const x = viewBox[0] - info.trimOffsetLeft / SCALA;
  const y = viewBox[1] - info.trimOffsetTop / SCALA;
  const w = info.width / SCALA;
  const h = info.height / SCALA;
  const forma = w / h > 4 ? 'orizzontale' : 'verticale';
  const arrot = (n) => Math.round(n * 100) / 100;
  const ritagliato =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${[x, y, w, h].map(arrot).join(' ')}" ` +
    `width="${arrot(w)}" height="${arrot(h)}" role="img" aria-label="Omaggio a Ennio Morricone">` +
    corpo.replace(/\n\s*/g, '') +
    '</svg>\n';
  const nome = `logo-${colore}-${forma}`;
  writeFileSync(`${uscita}${nome}.svg`, ritagliato);
  const png = await sharp(Buffer.from(ritagliato), { density: (72 * 1600) / w })
    .resize({ width: 1600 })
    .png({ compressionLevel: 9 })
    .toFile(`${uscita}${nome}.png`);
  console.log(`${nome}.svg ${arrot(w)}×${arrot(h)} · ${nome}.png ${png.width}×${png.height}`);
}
