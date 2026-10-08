// Date e coordinate nei formati del DS (ARCHITECTURE.md §9, DS › Tono, › Il segno), fuso Europe/Rome.
// Le date arrivano come "AAAA-MM-GG" + "HH:MM" ora locale italiana.
import type { Lingua } from '../components/Seo.astro';

const FUSO = 'Europe/Rome';

/** Mezzogiorno UTC del giorno indicato: per giorno della settimana e nomi dei mesi, senza effetti del fuso. */
function giorno(data: string): Date {
  const [a, m, g] = data.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, g, 12));
}

function scostamento(istante: Date): string {
  const parte = new Intl.DateTimeFormat('en-US', { timeZone: FUSO, timeZoneName: 'longOffset' })
    .formatToParts(istante)
    .find((p) => p.type === 'timeZoneName')?.value;
  const s = parte?.replace('GMT', '') ?? '';
  return s === '' ? '+00:00' : s;
}

/** ISO 8601 con lo scostamento di Roma in quella data, es. "2027-07-17T21:15:00+02:00". */
export function isoRoma(data: string, ora: string): string {
  const [h, min] = ora.split(':').map(Number);
  const g = giorno(data);
  // L'ora legale cambia alle 01:00 UTC: l'ora delle 12 UTC dà lo scostamento della sera.
  const offset = scostamento(new Date(g.getTime() + (h - 12) * 3600_000 + min * 60_000));
  return `${data}T${ora}:00${offset}`;
}

/** Il giorno di oggi a Roma, "AAAA-MM-GG" (al momento della build). */
export function oggiRoma(adesso = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: FUSO }).format(adesso);
}

/** "17.07" */
export function numeroData(data: string): string {
  const [, m, g] = data.split('-');
  return `${g}.${m}`;
}

/** Riga del calendario: IT "SAB · 2027 · ORE 21:15", EN "SAT · 2027 · 9:15 PM" (maiuscole dallo stile). */
export function rigaData(data: string, ora: string, lang: Lingua): string {
  const settimana = new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', {
    weekday: 'short',
    timeZone: 'UTC',
  })
    .format(giorno(data))
    .replace('.', '');
  const anno = data.slice(0, 4);
  const orario = lang === 'it' ? `ore ${ora}` : oraInglese(ora);
  return `${settimana} · ${anno} · ${orario}`;
}

/** Testo corrente: IT "sabato 17 luglio 2027, ore 21", EN "Sat 17 July 2027, 9 pm". */
export function dataEstesa(data: string, ora: string, lang: Lingua): string {
  if (lang === 'it') {
    const testo = new Intl.DateTimeFormat('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(giorno(data));
    const [h, m] = ora.split(':');
    return `${testo}, ore ${Number(h)}${m === '00' ? '' : `:${m}`}`;
  }
  const testo = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(giorno(data))
    .replace(',', '');
  return `${testo}, ${oraInglese(ora)}`;
}

/** "21:00" → "9 pm", "21:15" → "9:15 pm" */
function oraInglese(ora: string): string {
  const [h, m] = ora.split(':').map(Number);
  const h12 = h % 12 || 12;
  return `${h12}${m ? `:${String(m).padStart(2, '0')}` : ''} ${h < 12 ? 'am' : 'pm'}`;
}

/** Coordinate DS: "45.4093° N · 11.8713° E" */
export function coordinate(lat: number, lng: number): string {
  const ns = lat >= 0 ? 'N' : 'S';
  const eo = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}° ${ns} · ${Math.abs(lng).toFixed(4)}° ${eo}`;
}
