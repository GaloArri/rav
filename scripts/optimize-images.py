#!/usr/bin/env python3
"""
Optimiza las imagenes de /public: convierte a WebP, redimensiona y
reescribe todas las referencias en el codigo.

Uso:
    python3 scripts/optimize-images.py            # dry run
    python3 scripts/optimize-images.py --apply    # aplica los cambios
"""
import os
import re
import sys
import glob
import unicodedata
from PIL import Image, ImageOps

MAX_WIDTH = 2000
QUALITY = 82
EXTS = (".jpg", ".jpeg", ".png")
CODE_GLOBS = ["app/**/*.tsx", "app/**/*.ts", "app/**/*.json",
              "components/**/*.tsx", "lib/**/*.ts"]
# el logo y los iconos quedan como estan
SKIP = {"public/assets/logorav1.png", "public/assets/favicon.ico",
        "public/placeholder.svg", "public/placeholder.jpg"}

APPLY = "--apply" in sys.argv


def slugify(name: str) -> str:
    name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    name = name.lower().replace(" ", "-").replace("_", "-")
    name = re.sub(r"[^a-z0-9.\-/]", "", name)
    return re.sub(r"-+", "-", name)


def collect():
    """Devuelve [(ruta_original, ruta_webp)] para todo lo convertible."""
    pares = []
    for f in sorted(glob.glob("public/**/*", recursive=True)):
        if not os.path.isfile(f) or f in SKIP:
            continue
        if not f.lower().endswith(EXTS):
            continue
        carpeta, archivo = os.path.split(f)
        base = os.path.splitext(archivo)[0]
        destino = os.path.join(slugify(carpeta), slugify(base) + ".webp")
        pares.append((f, destino))
    return pares


def convertir(origen: str, destino: str) -> tuple[int, int]:
    antes = os.path.getsize(origen)
    im = Image.open(origen)
    im = ImageOps.exif_transpose(im)          # respeta la rotacion de la camara
    tiene_alpha = im.mode in ("RGBA", "LA", "P")
    im = im.convert("RGBA" if tiene_alpha else "RGB")
    if im.width > MAX_WIDTH:
        alto = round(im.height * MAX_WIDTH / im.width)
        im = im.resize((MAX_WIDTH, alto), Image.LANCZOS)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    im.save(destino, "WEBP", quality=QUALITY, method=6)
    return antes, os.path.getsize(destino)


def reescribir(mapa: dict[str, str]) -> list[str]:
    """Reemplaza las rutas viejas por las nuevas en todo el codigo."""
    tocados = []
    archivos = []
    for patron in CODE_GLOBS:
        archivos += glob.glob(patron, recursive=True)
    for archivo in sorted(set(archivos)):
        with open(archivo, encoding="utf-8") as fh:
            texto = original = fh.read()
        # ordenado de mas largo a mas corto para evitar reemplazos parciales
        for viejo, nuevo in sorted(mapa.items(), key=lambda kv: -len(kv[0])):
            texto = texto.replace(viejo, nuevo)
            texto = texto.replace(viejo.replace(" ", "%20"), nuevo)
        if texto != original:
            tocados.append(archivo)
            if APPLY:
                with open(archivo, "w", encoding="utf-8") as fh:
                    fh.write(texto)
    return tocados


def main():
    pares = collect()
    if not pares:
        print("No hay imagenes para convertir.")
        return

    total_antes = total_despues = 0
    mapa = {}
    print(f"{len(pares)} imagenes a convertir\n")

    for origen, destino in pares:
        if APPLY:
            antes, despues = convertir(origen, destino)
        else:
            antes, despues = os.path.getsize(origen), 0
        total_antes += antes
        total_despues += despues
        # las rutas en el codigo van sin el prefijo "public"
        mapa["/" + os.path.relpath(origen, "public")] = "/" + os.path.relpath(destino, "public")

    tocados = reescribir(mapa)

    print(f"Archivos de codigo actualizados: {len(tocados)}")
    for t in tocados:
        print(f"  {t}")

    print(f"\nAntes:   {total_antes/1e6:8.1f} MB")
    if APPLY:
        print(f"Despues: {total_despues/1e6:8.1f} MB")
        print(f"Ahorro:  {(1 - total_despues/total_antes)*100:8.1f} %")
        for origen, _ in pares:
            os.remove(origen)
        print("\nOriginales eliminados de /public.")
    else:
        print("\n(dry run — corre con --apply para aplicar)")


if __name__ == "__main__":
    main()
