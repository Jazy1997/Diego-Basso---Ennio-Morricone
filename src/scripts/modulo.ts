// Modulo contatti con JS (ModuloContatti.astro): invio in fetch, errori per campo accessibili.
// Senza questo script il modulo resta un POST classico che funziona da solo.
type Esito = { ok: true } | { ok: false; campi?: string[]; errore?: string };

for (const modulo of document.querySelectorAll<HTMLFormElement>('[data-modulo]')) {
  const pulsante = modulo.querySelector<HTMLButtonElement>('[data-invia]');
  const testoPulsante = pulsante?.textContent ?? '';
  // Gli errori li mostriamo noi, con i testi del sito: niente fumetti del browser.
  modulo.noValidate = true;

  const pulisci = () => {
    modulo.querySelectorAll<HTMLElement>('[data-errore]').forEach((e) => (e.hidden = true));
    modulo.querySelectorAll('[aria-invalid]').forEach((e) => e.removeAttribute('aria-invalid'));
    modulo.querySelectorAll('.modulo__avviso').forEach((e) => e.classList.remove('is-attivo'));
  };

  const mostra = (campi: string[], errore?: string) => {
    for (const nome of campi) {
      modulo.querySelector<HTMLElement>(`[data-errore="${nome}"]`)?.removeAttribute('hidden');
      const campo = modulo.elements.namedItem(nome);
      if (campo instanceof Element) campo.setAttribute('aria-invalid', 'true');
    }
    modulo.querySelector(`#errore-${errore ?? 'campi'}`)?.classList.add('is-attivo');
    const primo = campi[0] && modulo.elements.namedItem(campi[0]);
    if (primo instanceof HTMLElement) primo.focus();
  };

  // Controllo nel browser con le regole dell'HTML (required, type, minlength): stessi codici del server.
  const invalidi = () =>
    ['nome', 'email', 'motivo', 'messaggio', 'privacy'].filter((nome) => {
      const campo = modulo.elements.namedItem(nome);
      return campo instanceof HTMLInputElement ||
        campo instanceof HTMLTextAreaElement ||
        campo instanceof HTMLSelectElement
        ? !campo.checkValidity() || (campo.type !== 'checkbox' && campo.value.trim() === '')
        : false;
    });

  modulo.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    pulisci();
    const locali = invalidi();
    if (locali.length) return mostra(locali);

    if (pulsante) {
      pulsante.disabled = true;
      pulsante.textContent = pulsante.dataset.testoInvio ?? testoPulsante;
    }
    try {
      const risposta = await fetch(modulo.action, {
        method: 'POST',
        body: new FormData(modulo),
        headers: { Accept: 'application/json' },
      });
      const esito = (await risposta.json()) as Esito;
      if (esito.ok) {
        location.assign(modulo.dataset.grazie ?? '/');
        return;
      }
      mostra(esito.campi ?? [], esito.errore);
    } catch {
      mostra([], 'invio');
    } finally {
      if (pulsante) {
        pulsante.disabled = false;
        pulsante.textContent = testoPulsante;
      }
    }
  });
}
