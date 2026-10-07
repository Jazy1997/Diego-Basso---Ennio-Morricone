"""Genera src/styles/ds/tokens.css da src/styles/ds/tokens.json (copia di tokens.json del Design System).

Uso: python scripts/tokens.py
"""
import json
import re
from pathlib import Path

DS = Path(__file__).resolve().parent.parent / "src" / "styles" / "ds"
tokens = json.loads((DS / "tokens.json").read_text(encoding="utf-8"))


def valore(v):
    if isinstance(v, dict):  # valori per tema: il sistema ha un solo tema, prendiamo il primo
        v = next(iter(v.values()))
    v = str(v)
    return re.sub(r"\{([A-Za-z0-9_.-]+)\}", r"var(--\1)", v)  # alias {sala-100} → var(--sala-100)


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
(DS / "tokens.css").write_text("\n".join(righe) + "\n", encoding="utf-8", newline="\n")
print("Scritto", DS / "tokens.css")
