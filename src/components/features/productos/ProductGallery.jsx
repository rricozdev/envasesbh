"use client";

import Image from "next/image";

export default function ProductGallery({ imagen, alt }) {
  return (
    <div className="aspect-square bg-white rounded-2xl md:rounded-3xl border border-gray-100 relative overflow-hidden">
      <Image
        src={imagen}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
        className="object-cover"
      />
    </div>
  );
}
