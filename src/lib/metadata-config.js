const SITE_URL = "https://www.envasesbh.mx";

export const baseMetadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: "Envases BH",
  title: {
    template: "%s | Envases BH",
    default: "Envases BH - Fabricante de Envases PET en México",
  },
  description:
    "Fabricante de envases PET de alta calidad en México, ofrecemos soluciones personalizadas para tu industria PET",
  keywords: [
    "envases PET",
    "fabricante envases",
    "botellas plásticas",
    "envases personalizados",
    "empaques México",
  ],

  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Envases BH",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/logo-bh_11zon.webp`,
        width: 1200,
        height: 630,
        alt: "Envases BH - Fabricante de Envases PET",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@EnvasesBH",
    creator: "@EnvasesBH",
  },

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

  verification: {
    google: "b8cdd1aa84812a36",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },

  category: "Business",

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-MX": SITE_URL,
      es: SITE_URL,
      "x-default": SITE_URL,
    },
  },

  authors: [
    {
      name: "Envases BH",
      url: SITE_URL,
    },
  ],

  creator: "Envases BH",
  publisher: "Envases BH",

  referrer: "strict-origin-when-cross-origin",
};

const SITE_URL_JSONLD = "https://www.envasesbh.mx";

export const baseJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL_JSONLD}/#organization`,
      name: "Envases BH",
      url: SITE_URL_JSONLD,
      logo: {
        "@type": "ImageObject",
      url: `${SITE_URL_JSONLD}/logo-bh-3a.png`,
      width: 180,
      height: 50,
    },
    image: `${SITE_URL_JSONLD}/logo-bh-3a.png`,
      description:
        "Fabricante de envases PET de alta calidad. 10+ años de experiencia sirviendo a +50 empresas en México.",
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
      "@id": `${SITE_URL_JSONLD}/#business`,
      name: "Envases BH",
      url: SITE_URL_JSONLD,
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
      "@id": `${SITE_URL_JSONLD}/#website`,
      url: SITE_URL_JSONLD,
      name: "Envases BH",
      description: "Fabricante de envases PET en México",
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
  promociones: "/promociones",
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
  youtube: "https://www.youtube.com/@davidambe5803",
};
