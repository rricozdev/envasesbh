export const flowAlimentos = {
  rama_alimentos: {
    message:
      "Tenemos líneas especializadas para alimentos y bebidas: olivas, twist, salseras, licoreras y más. ¿Qué tipo de producto vas a envasar?",
    options: [
      { label: "Aceite / vinagre / oliva", next: "alimentos_oliva" },
      { label: "Salsas / condimentos", next: "alimentos_salsas" },
      { label: "Licores / bebidas", next: "alimentos_licores" },
      { label: "Ver toda la línea", next: "cta_alimentos_todos" },
    ],
  },

  alimentos_oliva: {
    message:
      "La línea Oliva Cuadrada está disponible en 45 ml, 250 ml y 750 ml — ideal para aceite de oliva, vinagre y productos gourmet.",
    filter: { categoria: "Alimentos y Bebidas", capacidadMax: 800 },
    options: [
      { label: "Ver en catálogo", next: "cta_alimentos_oliva" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras líneas", next: "rama_alimentos" },
    ],
  },

  alimentos_salsas: {
    message:
      "Para salsas y condimentos tenemos la Salsera 180 ml y la línea Twist 250 ml. El Twist tiene producción mínima de 15,000 piezas.",
    filter: { categoria: "Alimentos y Bebidas", capacidadMax: 300 },
    options: [
      { label: "Ver en catálogo", next: "cta_alimentos_salsas" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras líneas", next: "rama_alimentos" },
    ],
  },

  alimentos_licores: {
    message:
      "Nuestra línea Licorera va de 250 ml a 1,000 ml en cristal. También contamos con la Licorera Piña de 1 lt — un formato muy llamativo para el sector.",
    filter: { categoria: "Alimentos y Bebidas", capacidadMax: 1100 },
    options: [
      { label: "Ver en catálogo", next: "cta_alimentos_licores" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras líneas", next: "rama_alimentos" },
    ],
  },

  cta_alimentos_todos: {
    message: "Aquí está toda nuestra línea de alimentos y bebidas:",
    cta: {
      label: "Ver línea Alimentos",
      link: "/producto?categoria=Alimentos+y+Bebidas",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_alimentos_oliva: {
    message: "Aquí puedes ver la línea Oliva Cuadrada completa:",
    cta: {
      label: "Ver línea Oliva",
      link: "/producto?categoria=Alimentos+y+Bebidas",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_alimentos_salsas: {
    message: "Aquí puedes ver los detalles de la Salsera y la línea Twist:",
    cta: {
      label: "Ver línea Salsas",
      link: "/producto?categoria=Alimentos+y+Bebidas",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_alimentos_licores: {
    message: "Aquí está la línea Licorera completa:",
    cta: {
      label: "Ver línea Licoreras",
      link: "/producto?categoria=Alimentos+y+Bebidas",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
