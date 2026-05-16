// src/data/chatbot/flow.publicitarios.js

export const flowPublicitarios = {
  rama_publicitarios: {
    message:
      "La línea publicitaria es ideal para marcas que buscan un envase llamativo y diferenciado. Contamos con cilindros, tarros sport y más. ¿Qué formato te interesa?",
    options: [
      { label: "Cilindro PET", next: "publicitarios_cilindro" },
      { label: "Tarro sport", next: "publicitarios_tarro" },
      { label: "Ver toda la línea", next: "cta_publicitarios_todos" },
    ],
  },

  publicitarios_cilindro: {
    message:
      "Los cilindros PET están disponibles en 750 ml, 900 ml y 1 litro — en hasta 7 colores: cristal, azul, rosa, morado, rojo, aqua y humo. Producción mínima desde 7,000 pzas.",
    filter: { categoria: "Publicitarios", capacidadMax: 1100 },
    options: [
      { label: "Con flip top", next: "cta_publicitarios_flip" },
      { label: "Con tapa ciega", next: "cta_publicitarios_ciega" },
      { label: "Ver toda la línea", next: "cta_publicitarios_todos" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
    ],
  },

  publicitarios_tarro: {
    message:
      "El Tarro 500 ml con tapa sport r63 está disponible en gran variedad de colores — perfecto para agua, suplementos y productos de consumo masivo.",
    filter: { categoria: "Publicitarios", capacidadMax: 600 },
    options: [
      { label: "Ver en catálogo", next: "cta_publicitarios_tarro" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otros formatos", next: "rama_publicitarios" },
    ],
  },

  cta_publicitarios_todos: {
    message: "Aquí está toda nuestra línea publicitaria:",
    cta: {
      label: "Ver línea Publicitarios",
      link: "/productos?categoria=Publicitarios",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_publicitarios_flip: {
    message:
      "El cilindro con flip top está disponible en 750 ml y 900 ml en 6 colores:",
    cta: {
      label: "Ver cilindros con flip top",
      link: "/productos?categoria=Publicitarios",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_publicitarios_ciega: {
    message:
      "El cilindro con tapa ciega está disponible en 750 ml, 900 ml y 1 lt en 6 colores:",
    cta: {
      label: "Ver cilindros con tapa ciega",
      link: "/productos?categoria=Publicitarios",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_publicitarios_tarro: {
    message: "Aquí puedes ver el tarro sport y la tapa r63 disponibles:",
    cta: {
      label: "Ver tarro sport",
      link: "/productos?categoria=Publicitarios",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
