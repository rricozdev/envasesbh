export const flowBoston = {
  rama_boston: {
    message:
      "La línea Boston es ideal para cosméticos, laboratorio y uso industrial. Disponible desde 60 ml hasta 1 litro. ¿Qué capacidad necesitas?",
    options: [
      { label: "Menos de 150 ml", next: "boston_pequeno" },
      { label: "150 ml a 500 ml", next: "boston_mediano" },
      { label: "Más de 500 ml", next: "boston_grande" },
      { label: "Ver toda la línea", next: "cta_boston_todos" },
    ],
  },

  boston_pequeno: {
    message:
      "En formatos pequeños tenemos el Boston 60 ml R20 y el Boston 125 ml R20 — perfectos para muestras, laboratorio y presentaciones individuales.",
    filter: { categoria: "Boston", capacidadMax: 150 },
    options: [
      { label: "Ver en catálogo", next: "cta_boston_pequeno" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_boston" },
    ],
  },

  boston_mediano: {
    message:
      "Para formatos medianos tenemos el Boston 250 ml en dos versiones: rosca 24-410 y 24-415. Ideales para shampoo, aceites y productos de limpieza.",
    filter: { categoria: "Boston", capacidadMax: 500 },
    options: [
      { label: "Ver en catálogo", next: "cta_boston_mediano" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_boston" },
    ],
  },

  boston_grande: {
    message:
      "En formatos grandes contamos con el Boston 500 ml, 900 ml y 1 litro — disponibles en cristal, con distintas roscas según tu tapa o bomba.",
    filter: { categoria: "Boston", capacidadMax: 1100 },
    options: [
      { label: "Ver en catálogo", next: "cta_boston_grande" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_boston" },
    ],
  },

  cta_boston_todos: {
    message: "Aquí está toda nuestra línea Boston:",
    cta: { label: "Ver línea Boston", link: "/catalogo?categoria=Boston" },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_boston_pequeno: {
    message: "Aquí puedes ver los formatos pequeños de la línea Boston:",
    cta: {
      label: "Ver Boston hasta 150 ml",
      link: "/catalogo?categoria=Boston",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_boston_mediano: {
    message: "Aquí puedes comparar las dos versiones del Boston 250 ml:",
    cta: { label: "Ver Boston 250 ml", link: "/catalogo?categoria=Boston" },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_boston_grande: {
    message: "Aquí puedes ver los formatos grandes de la línea Boston:",
    cta: { label: "Ver Boston 500 ml+", link: "/catalogo?categoria=Boston" },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
