// lib/metadata-config.ts
export const baseMetadata = {
  metadataBase: new URL("https://envasesbh.mx"),

  // Información general de la empresa
  applicationName: "Envases BH",
  title: {
    template: "%s | Envases BH",
    default: "Envases BH - Fabricante y Distribuidor de Envases PET en México",
  },
  description:
    "Fabricante y distribuidor de envases PET de alta calidad en México, ofrecemos soluciones personalizadas para tu industria PET",
  keywords: [
    "envases PET",
    "fabricante envases",
    "distribuidor PET",
    "botellas plásticas",
    "envases personalizados",
    "empaques México",
  ],

  // OpenGraph base
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Envases BH",
    url: "https://envasesbh.mx",
    images: [
      {
        url: "https://envasesbh.mx/logo-bh_11zon.webp",
        width: 1200,
        height: 630,
        alt: "Envases BH - Fabricante de Envases PET",
        type: "image/webp",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@EnvasesBH",
    creator: "@EnvasesBH",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Verificaciones
  // TODO: COLOCAR LAS VERIFICACIONES ACA
  verification: {
    google: "tu-google-verification-code",
    yandex: ["tu-yandex-verification"],
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },

  // Categoría
  category: "Business",

  // Formato de detección
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  // Alternates para multi-idioma
  alternates: {
    canonical: "https://envasesbh.mx",
    languages: {
      "es-MX": "https://envasesbh.mx",
      es: "https://envasesbh.mx",
    },
  },

  // Authors
  authors: [
    {
      name: "Envases BH",
      url: "https://envasesbh.mx",
    },
  ],

  creator: "Envases BH",
  publisher: "Envases BH",

  // Información de contacto
  referrer: "strict-origin-when-cross-origin",

  // Viewport, movido a app/layout.js para evitar warning en browser console
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 5,
  //   viewportFit: "cover",
  // },
};

// JSON-LD Schema global
export const baseJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://envasesbh.mx/#organization",
      name: "Envases BH",
      url: "https://envasesbh.mx",
      logo: {
        "@type": "ImageObject",
        url: "https://envasesbh.mx/logo-bh-3.png",
        width: 180,
        height: 50,
      },
      image: "https://envasesbh.mx/logo-bh-3.png",
      description:
        "Fabricante y distribuidor de envases PET de alta calidad. 10+ años de experiencia sirviendo a +50 empresas en México.",
      foundingDate: "2014",
      foundingLocation: {
        "@type": "Place",
        name: "Atizapán, Estado de México",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+52-155-5824-7722",
        contactType: "Sales",
        email: "info@envasesbh.mx",
        availableLanguage: ["es"],
      },
      areaServed: {
        "@type": "Country",
        name: "MX",
      },
      sameAs: [
        "https://www.facebook.com/envasesbh",
        "https://www.instagram.com/envasesbh",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://envasesbh.mx/#business",
      name: "Envases BH",
      url: "https://envasesbh.mx",
      telephone: "+52-155-5824-7722",
      email: "info@envasesbh.mx",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Callejón México Nuevo #1, Col. México Nuevo",
        addressLocality: "Atizapán",
        addressRegion: "Edo. de México",
        addressCountry: "MX",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "127",
        bestRating: "5",
        worstRating: "1",
      },
      priceRange: "$$",
    },
    {
      "@type": "WebSite",
      "@id": "https://envasesbh.mx/#website",
      url: "https://envasesbh.mx",
      name: "Envases BH",
      description: "Fabricante y distribuidor de envases PET en México",
      potentialAction: {
        "@type": "SearchAction",
      },
    },
  ],
};

// Información de contacto reutilizable
export const contactInfo = {
  email: "info@envasesbh.mx",
  emailVentas: "direccionventas@envasesbh.mx",
  phone: "+52-155-5824-7722",
  whatsapp: "+52-155-5824-8471",
  address:
    "Callejón México Nuevo #1, Col. México Nuevo, Atizapán, Edo. de México",
  businessHours: {
    open: "08:00",
    close: "18:00",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
};

// URLs y rutas
export const routes = {
  home: "/",
  productos: "/productos",
  servicios: "/servicios",
  proyectos: "/proyectos-a-tu-medida",
  quienesSomos: "/quienes-somos",
  blog: "/blog",
  contacto: "/contacto",
};

// Redes sociales
export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/envasesbh",
  facebook: "https://www.facebook.com/envasesbh",
  instagram: "https://www.instagram.com/envasesbh",
  youtube: "https://www.youtube.com/@envasesbh",
};
