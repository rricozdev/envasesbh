import Link from "next/link";

import PromocionesGrid from "@/components/features/promociones/PromocionesGrid";
import { obtenerPromocionesVisibles } from "@/components/features/promociones/promocionesModel";
import { buildProductName } from "@/components/features/productos/ui/product/productNameFormatter";
import { parseProductName } from "@/components/features/productos/ui/product/productNameParser";
import SectionContent from "@/components/ui/SectionContent";
import { baseMetadata } from "@/lib/metadata-config";

export const metadata = {
  ...baseMetadata,

  title: "Rincón de Promociones — Ofertas en Envases PET",
  description:
    "Descubre las promociones vigentes de Envases BH: descuentos, precios por volumen, envío gratis y ofertas de temporada en envases PET. Consulta por WhatsApp.",
  keywords: [
    "promociones envases PET",
    "ofertas envases PET",
    "descuentos envases",
    "envases PET precio mayoreo",
    "promociones Envases BH",
  ],

  openGraph: {
    ...baseMetadata.openGraph,
    title: "Rincón de Promociones | Envases BH",
    description:
      "Descuentos, precios por volumen y ofertas de temporada en envases PET. Consulta disponibilidad por WhatsApp.",
    url: "https://www.envasesbh.mx/promociones",
    type: "website",
    images: [
      {
        url: "https://www.envasesbh.mx/og-envasesbh.webp",
        width: 1200,
        height: 630,
        alt: "Rincón de Promociones - Envases BH",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    ...baseMetadata.twitter,
    title: "Rincón de Promociones | Envases BH",
    description:
      "Descuentos, precios por volumen y ofertas de temporada en envases PET.",
    image: "https://www.envasesbh.mx/og-envasesbh.webp",
  },

  alternates: {
    canonical: "https://www.envasesbh.mx/promociones",
    languages: {
      "es-MX": "https://www.envasesbh.mx/promociones",
      es: "https://www.envasesbh.mx/promociones",
      "x-default": "https://www.envasesbh.mx/promociones",
    },
  },
};

const pasos = [
  {
    numero: 1,
    titulo: "Elige tu promoción",
    descripcion: "Revisa el beneficio y la vigencia de cada oferta.",
  },
  {
    numero: 2,
    titulo: "Consulta por WhatsApp",
    descripcion: "Un asesor confirma disponibilidad, precios y condiciones.",
  },
  {
    numero: 3,
    titulo: "Recibe tu pedido",
    descripcion: "Coordinamos la entrega a domicilio o en sucursal.",
  },
];

function buildJsonLd(promociones) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Rincón de Promociones - Envases BH",
    description:
      "Promociones vigentes en envases PET: descuentos, precios por volumen y ofertas de temporada.",
    url: "https://www.envasesbh.mx/promociones",
    numberOfItems: promociones.length,
    itemListElement: promociones.map((promo, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Offer",
        name: `${promo.beneficio} — ${buildProductName(parseProductName(promo.producto))}`,
        description: promo.detalle,
        url: `https://www.envasesbh.mx/productos/${promo.producto.slug}`,
        availability: "https://schema.org/InStock",
        ...(promo.inicio && { validFrom: promo.inicio }),
        ...(promo.fin && { validThrough: promo.fin }),
        seller: {
          "@type": "Organization",
          name: "Envases BH",
          url: "https://www.envasesbh.mx",
        },
      },
    })),
  };
}

export default function PromocionesPage() {
  const { activas, proximas } = obtenerPromocionesVisibles();
  const jsonLd = buildJsonLd([...activas, ...proximas]);

  return (
    <main className="bg-white">
      {jsonLd.numberOfItems > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* HERO */}
      <SectionContent>
        <div className="max-w-3xl">
          {/* BADGE */}
          <span className="inline-flex items-center gap-2 bg-black/5 border border-black/10 text-black/80 text-[10px] font-medium uppercase tracking-wide px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Ofertas por tiempo limitado
          </span>

          <h1 className="font-primary text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black leading-tight mt-5">
            Rincón de{" "}
            <span className="bg-primary text-white px-2 py-0.5 rounded-md">
              Promociones
            </span>
          </h1>

          <p className="font-secondary text-lg sm:text-xl text-primary font-bold mt-4">
            Envases PET con beneficios reales para tu negocio.
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            Descuentos, precios por volumen, envío gratis y ofertas de
            temporada sobre productos de nuestro{" "}
            <Link
              href="/productos"
              className="font-semibold text-primary hover:text-accent transition-colors"
            >
              catálogo
            </Link>
            . Cada promoción se confirma con un asesor por WhatsApp: sin
            registros, sin complicaciones.
          </p>

          {/* CÓMO FUNCIONA */}
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pasos.map((paso) => (
              <li key={paso.numero} className="flex gap-3">
                <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {paso.numero}
                </span>
                <span>
                  <span className="block font-bold text-sm text-secondary">
                    {paso.titulo}
                  </span>
                  <span className="block text-sm text-gray-600 mt-0.5">
                    {paso.descripcion}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </SectionContent>

      {/* GRID DE PROMOCIONES */}
      <SectionContent containerClassName="bg-surface-soft">
        <PromocionesGrid activas={activas} proximas={proximas} />

        {/* ENLACES INTERNOS */}
        <p className="mt-12 text-center text-sm text-gray-500">
          ¿No encontraste lo que buscas? Explora el{" "}
          <Link
            href="/productos"
            className="font-semibold text-primary hover:text-accent transition-colors"
          >
            catálogo completo
          </Link>{" "}
          o conoce nuestros{" "}
          <Link
            href="/servicios"
            className="font-semibold text-primary hover:text-accent transition-colors"
          >
            servicios de pigmentación
          </Link>
          .
        </p>
      </SectionContent>
    </main>
  );
}
