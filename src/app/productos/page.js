import ProductCatalog from "@/components/features/productos/ProductCatalog";
import { baseMetadata } from "@/lib/metadata-config";

export const metadata = {
  ...baseMetadata,
  title: "Catálogo de Envases PET de Calidad para la Industria Mexicana",
  description:
    "Explora nuestro catálogo de envases PET de alta calidad, diseñados para satisfacer las necesidades de la industria mexicana. Variedad de tamaños y formas para bebidas, alimentos y más.",
  keywords: [
    "envases PET",
    "catálogo de envases",
    "envases para bebidas",
    "envases para alimentos",
    "envases plásticos",
    "envases de calidad",
    "envases para la industria mexicana",
  ],
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Catálogo de Envases PET | Envases BH",
    description:
      "Descubre nuestro catálogo de envases PET de alta calidad para la industria mexicana. Variedad de tamaños y formas para bebidas, alimentos y más.",
    url: "https://envasesbh.mx/productos",
    type: "website",
    images: [
      {
        url: "https://envasesbh.mx/img/servicios_etiquetado_pigmentacion.webp",
        width: 1200,
        height: 630,
        alt: "Catálogo de envases PET de calidad para la industria mexicana",
        type: "image/webp",
      },
    ],
  },
};

export default function ProductosPage() {
  return <ProductCatalog />;
}
