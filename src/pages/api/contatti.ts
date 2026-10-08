// Endpoint del modulo contatti (ARCHITECTURE.md §8, §15): unica funzione Vercel del sito.
// Senza JS: POST classico → 303 alla pagina di conferma, o al modulo su un'ancora d'errore (mai i dati nell'URL).
// Con JS (Accept: application/json): risposta JSON con gli errori per campo.
// Invio via API REST di Resend all'indirizzo del motivo scelto (contatti.json); risposta all'indirizzo del mittente.
import type { APIRoute } from 'astro';
import { prendi } from '../../lib/contenuti';
import { schemaModulo, type CampoModulo, type ErroreModulo, type Motivo } from '../../lib/modulo';
import { localizedPath } from '../../i18n/utils';

export const prerender = false;

// Limite di frequenza per IP: 5 invii in 10 minuti. In memoria della singola istanza: basta contro gli
// invii a raffica, non contro un attacco distribuito (per quello servirebbe un archivio condiviso).
const FINESTRA = 10 * 60_000;
const MASSIMO = 5;
const invii = new Map<string, number[]>();

function troppi(ip: string): boolean {
  const adesso = Date.now();
  const recenti = (invii.get(ip) ?? []).filter((t) => adesso - t < FINESTRA);
  recenti.push(adesso);
  invii.set(ip, recenti);
  return recenti.length > MASSIMO;
}

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const POST: APIRoute = async ({ request, clientAddress, redirect }) => {
  const json = request.headers.get('accept')?.includes('application/json') ?? false;
  const dati = Object.fromEntries(await request.formData());
  const lang = dati.lang === 'en' ? 'en' : 'it';

  const risposta = (esito: { ok: true } | { ok: false; campi?: CampoModulo[]; errore?: ErroreModulo }) => {
    if (json) return Response.json(esito, { status: esito.ok ? 200 : esito.errore ? 503 : 400 });
    if (esito.ok) return redirect(localizedPath('grazie', lang), 303);
    // La pagina è statica: senza JS l'errore si mostra con :target sull'ancora (i campi li controlla già il browser).
    return redirect(`${localizedPath('contatti', lang)}#errore-${esito.errore ?? 'campi'}`, 303);
  };

  // Honeypot: un campo nascosto che solo i bot compilano. Si finge il successo.
  if (typeof dati.sito === 'string' && dati.sito !== '') return risposta({ ok: true });

  const esito = schemaModulo.safeParse(dati);
  if (!esito.success) {
    const campi = [...new Set(esito.error.issues.map((i) => i.message as CampoModulo))];
    return risposta({ ok: false, campi });
  }
  if (troppi(clientAddress ?? 'sconosciuto')) return risposta({ ok: false, errore: 'frequenza' });

  const m = esito.data;
  const destinatario = (await prendi('contatti')).find((c) => c.id === (m.motivo satisfies Motivo))?.data.email;
  const chiave = import.meta.env.RESEND_API_KEY;
  const mittente = import.meta.env.RESEND_FROM; // es. "Omaggio a Ennio Morricone <modulo@dominio.it>"

  const oggetto = `[Sito · ${m.motivo}] ${m.nome}`;
  const testo = `${m.nome} <${m.email}>\nMotivo: ${m.motivo}\nLingua: ${m.lang}\n\n${m.messaggio}`;

  if (!chiave || !mittente || !destinatario) {
    if (import.meta.env.DEV) {
      console.info(`[contatti] invio simulato (manca la configurazione Resend)\nA: ${destinatario}\n${oggetto}\n${testo}`);
      return risposta({ ok: true });
    }
    console.error('[contatti] RESEND_API_KEY, RESEND_FROM o indirizzo del motivo mancanti');
    return risposta({ ok: false, errore: 'configurazione' });
  }

  const invio = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${chiave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: mittente,
      to: [destinatario],
      reply_to: m.email,
      subject: oggetto,
      text: testo,
      html: `<p>${escape(m.nome)} &lt;${escape(m.email)}&gt;<br>Motivo: ${m.motivo} · Lingua: ${m.lang}</p><p>${escape(m.messaggio).replace(/\n/g, '<br>')}</p>`,
    }),
  });
  if (!invio.ok) {
    console.error('[contatti] Resend ha risposto', invio.status, await invio.text());
    return risposta({ ok: false, errore: 'invio' });
  }
  return risposta({ ok: true });
};
