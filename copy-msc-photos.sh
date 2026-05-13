#!/bin/bash
# ─────────────────────────────────────────────────────────────
# Copy MSC Photos (JPG/JPEG only) into the Vite project assets.
# HEIC files are skipped — browsers can't display them natively.
#
# Run from the project root:
#   bash copy-msc-photos.sh
# ─────────────────────────────────────────────────────────────

SRC="/Users/noplzmichael/Desktop/MSC Photos"
DEST="src/assets/msc-photos"

mkdir -p "$DEST"

i=1
for f in "$SRC"/*.JPG "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.JPEG; do
  [ -f "$f" ] || continue
  name="msc-photo-$(printf '%02d' $i).jpg"
  cp "$f" "$DEST/$name"
  echo "  ✓  $(basename "$f")  →  $name"
  ((i++))
done

echo ""
echo "✅  Done — copied $((i-1)) photo(s) to $DEST"
echo "ℹ️   HEIC files were skipped (not supported by browsers)."
