"""Genera da src/styles/ds/tokens.json (copia di tokens.json del Design System):
- src/styles/ds/tokens.css      custom properties (colori, spazi, raggi, ombre, rapporti, effetti, famiglie)
- src/styles/ds/tipografia.css  una classe per stile tipografico (.titolo-xl, .corpo, …) con la misura mobile

Uso: python scripts/tokens.py
"""
import json
import re
from pathlib import Path

DS = Path(__file__).resolve().parent.parent / "src" / "styles" / "ds"
MOBILE = 720  # px: sotto questa larghezza valgono le misure "Mobile: NNpx" indicate dal DS
tokens = json.loads((DS / "tokens.json").read_text(encoding="utf-8"))


def scrivi(nome, righe):
    (DS / nome).write_text("\n".join(righe) + "\n", encoding="utf-8", newline="\n")
    print("Scritto", DS / nome)


def valore(v):
    if isinstance(v, dict):  # valori per tema: il sistema ha un solo tema, prendiamo il primo
        v = next(iter(v.values()))
    v = str(v)
    return re.sub(r"\{([A-Za-z0-9_.-]+)\}", r"var(--\1)", v)  # alias {sala-100} → var(--sala-100)


# --- tokens.css ---
righe = [
    f"/* {tokens['name']} — generato da tokens.json con scripts/tokens.py. Non modificare a mano. */",
    "",
    ":root {",
]
for famiglia, dati in tokens.items():
    if famiglia in ("name", "version", "type") or not isinstance(dati, dict):
        continue
    righe.append(f"  /* {famiglia} */")
    for t in dati["tokens"]:
        righe.append(f"  --{t['name']}: {valore(t['value'])};")
righe.append("  /* famiglie tipografiche */")
for nome, stack in tokens["type"]["families"].items():
    righe.append(f"  --font-{nome}: {stack};")
righe.append("}")
scrivi("tokens.css", righe)

# --- tipografia.css ---
tipo = [
    f"/* {tokens['name']} — stili tipografici generati da tokens.json con scripts/tokens.py. Non modificare a mano. */",
    "",
]
mobili = []
for gruppo in tokens["type"]["groups"]:
    for st in gruppo["styles"]:
        decl = [
            f"font-family: var(--font-{gruppo['family']});",
            f"font-size: {st['fontSize']};",
            f"line-height: {st['lineHeight']};",
            f"font-weight: {st['fontWeight']};",
        ]
        if "letterSpacing" in st:
            decl.append(f"letter-spacing: {st['letterSpacing']};")
        if "fontStyle" in st:
            decl.append(f"font-style: {st['fontStyle']};")
        tipo.append(f".{st['name']} {{ " + " ".join(decl) + " }")
        m = re.search(r"Mobile:\s*(\d+)px", st.get("usage", ""))
        if m:
            mobili.append(f"  .{st['name']} {{ font-size: {m.group(1)}px; }}")
if mobili:
    tipo += ["", f"@media (max-width: {MOBILE}px) {{", *mobili, "}"]
scrivi("tipografia.css", tipo)
