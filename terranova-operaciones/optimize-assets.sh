#!/usr/bin/env bash
# ============================================================
# optimize-assets.sh
# Convierte los PNG de ./assets/ a WebP manteniendo el mismo
# nombre base. El HTML ya referencia ambos formatos vía <picture>
# y CSS image-set(); sirve WebP cuando exista, PNG en caso contrario.
#
# Requisitos:
#   - cwebp (paquete `webp`)
#       Linux:  sudo apt install webp
#       macOS:  brew install webp
#
# Uso:
#   bash optimize-assets.sh
#
# Tras correrlo, los WebP quedan junto a los PNG y los browsers
# modernos (>97% del mercado) los preferirán automáticamente.
# Si querés liberar espacio en el repo, podés borrar los PNG
# después de comprobar visualmente que los WebP se ven bien.
# ============================================================

set -euo pipefail

cd "$(dirname "$0")/assets" || { echo "ERROR: no encuentro ./assets/"; exit 1; }

if ! command -v cwebp >/dev/null 2>&1; then
  echo "ERROR: cwebp no está instalado."
  echo "  Linux:  sudo apt install webp"
  echo "  macOS:  brew install webp"
  exit 1
fi

QUALITY=82      # calidad visual (60–90 razonable; 82 es buen punto)
EFFORT=6        # nivel de compresión (0–6, 6 = mejor pero más lento)

echo "Convirtiendo PNG → WebP (q=${QUALITY}, m=${EFFORT})..."
total_before=0
total_after=0
count=0

shopt -s nullglob
for src in *.png; do
  dst="${src%.png}.webp"

  # Saltar si el WebP ya existe y es más reciente que el PNG
  if [[ -f "$dst" && "$dst" -nt "$src" ]]; then
    echo "  ↷  $dst (ya existe, omitido)"
    continue
  fi

  before=$(stat -c%s "$src" 2>/dev/null || stat -f%z "$src")
  cwebp -quiet -q "$QUALITY" -m "$EFFORT" "$src" -o "$dst"
  after=$(stat -c%s "$dst" 2>/dev/null || stat -f%z "$dst")

  pct=$(( 100 - (after * 100 / before) ))
  printf "  ✓  %-60s  %4d KB → %4d KB  (-%d%%)\n" \
    "$src" "$((before/1024))" "$((after/1024))" "$pct"

  total_before=$((total_before + before))
  total_after=$((total_after + after))
  count=$((count + 1))
done

echo ""
echo "----------------------------------------"
if [[ $count -eq 0 ]]; then
  echo "No había PNG nuevos que convertir."
else
  pct=$(( 100 - (total_after * 100 / total_before) ))
  printf "Total: %d archivos · %d KB → %d KB (ahorro: %d%%)\n" \
    "$count" "$((total_before/1024))" "$((total_after/1024))" "$pct"
fi
echo ""
echo "Próximos pasos:"
echo "  1. Revisá visualmente los .webp en ./assets/"
echo "  2. git add icta-digital/terranova-operaciones/assets/*.webp"
echo "  3. git commit -m 'Add WebP versions of Terranova assets'"
echo "  4. (Opcional) Borrá los PNG cuando estés conforme con los WebP"
