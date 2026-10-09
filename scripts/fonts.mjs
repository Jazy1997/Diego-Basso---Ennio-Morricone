// Copia i font self-hosted da node_modules (@fontsource) a public/fonts/ con nomi stabili,
// così possono essere precaricati e messi in cache a lungo. Gira prima di dev e build.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nm = join(root, 'node_modules');
const out = join(root, 'public', 'fonts');

const fonts = {
  'archivo.woff2': '@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2',
  'bodoni-moda-italic.woff2': '@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-italic.woff2',
  'jetbrains-mono.woff2': '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
};

mkdirSync(out, { recursive: true });
for (const [name, src] of Object.entries(fonts)) copyFileSync(join(nm, src), join(out, name));
console.log(`Font copiati in public/fonts (${Object.keys(fonts).length})`);
