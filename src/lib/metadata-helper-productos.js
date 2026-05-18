// lib/metadata-helpers-productos.ts (actualizado)
import { baseMetadata } from "./metadata-config";

export function generateProductMetadata(producto) {
  const titulo = `${producto.nombre} | Envases PET `;
  const descripcion = `${producto.descripcion}${
    producto.capacidad ? ` Capacidad: ${producto.capacidad}.` : ""
  } Envases PET de calidad para bebidas, alimentos y agroindustria.`;

  const url = `https://envasesbh.mx/productos/${producto.slug || producto.id}`;

  return {
    ...baseMetadata,
    title: titulo,
    description: descripcion,
    keywords: [
      producto.nombre,
      producto.categoria,
      "envase PET",
      "botella plástica",
      producto.capacidad || "",
      ...(producto.colores || []),
    ].filter(Boolean),

    openGraph: {
      ...baseMetadata.openGraph,
      title: titulo,
      description: descripcion,
      url: url,
      type: "website",
      images: [
        {
          url: `https://envasesbh.mx${producto.imagen}`,
          width: 800,
          height: 800,
          alt: producto.nombre,
          type: "image/webp",
        },
      ],
    },

    twitter: {
      ...baseMetadata.twitter,
      title: titulo,
      description: descripcion,
      image: `https://envasesbh.mx${producto.imagen}`,
    },

    alternates: {
      canonical: url,
      languages: {
        "es-MX": url,
        es: url,
      },
    },
  };
}

// JSON-LD Schema para producto
export function generateProductJsonLd(producto) {
  const specs = producto.especificaciones;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.nombre,
    description: producto.descripcion,
    image: `https://envasesbh.mx${producto.imagen}`,
    brand: {
      "@type": "Brand",
      name: "Envases BH",
    },
    category: producto.categoria,
    ...(specs?.capacidad && {
      offers: {
        "@type": "Offer",
        availability: specs?.sobrePedido
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
        priceCurrency: "MXN",
      },
    }),
    ...(producto.colores && {
      color: producto.colores.join(", "),
    }),
    ...(specs && {
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Capacidad",
          value: specs.capacidad ? `${specs.capacidad}ml` : undefined,
        },
        {
          "@type": "PropertyValue",
          name: "Peso",
          value: specs.peso ? `${specs.peso}g` : undefined,
        },
        {
          "@type": "PropertyValue",
          name: "Altura",
          value: specs.altura ? `${specs.altura}mm` : undefined,
        },
      ].filter((p) => p.value !== undefined),
    }),
  };
}
