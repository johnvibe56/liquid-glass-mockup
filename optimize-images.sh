#!/bin/bash

# Create optimized images directory
mkdir -p optimized-images

# Optimize all JPG/JPEG images
for img in images/*.{jpg,jpeg,JPG,JPEG}; do
  if [ -f "$img" ]; then
    echo "Optimizing $img..."
    # Resize to max 1200px width, 80% quality
    convert "$img" -resize 1200x\> -quality 80 "optimized-${img}"
  fi
done

echo "Optimization complete. Optimized images are in the 'optimized-images' directory."
