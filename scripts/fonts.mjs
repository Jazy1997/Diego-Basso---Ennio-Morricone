// Copia i font self-hosted da node_modules (@fontsource) a public/fonts/ con nomi stabili,
// così possono essere precaricati e messi in cache a lungo. Gira prima di dev e build.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nm = join(root, 'node_modules');
const out = join(root, 'public', 'fonts');

const fonts = {
  'nunito-sans-wght.woff2':
    '@fontsource-variable/nunito-sans/files/nunito-sans-latin-wght-normal.woff2',
  'source-sans-3-wght.woff2':
    '@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2',
  'source-sans-3-wght-italic.woff2':
    '@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-italic.woff2',
  'cormorant-garamond-500.woff2':
    '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2',
  'cormorant-garamond-500-italic.woff2':
    '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2',
  'cormorant-garamond-600-italic.woff2':
    '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-italic.woff2',
};

mkdirSync(out, { recursive: true });
for (const [name, src] of Object.entries(fonts)) copyFileSync(join(nm, src), join(out, name));
console.log(`Font copiati in public/fonts (${Object.keys(fonts).length})`);
