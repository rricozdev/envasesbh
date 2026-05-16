export const flowAgua = {
  rama_agua: {
    message:
      "Contamos con envases para agua desde 250 ml hasta 1.5 litros, en cristal, azul y otros colores. ¿Qué capacidad necesitas?",
    options: [
      { label: "Menos de 500 ml", next: "agua_pequeno" },
      { label: "500 ml a 1 litro", next: "agua_mediano" },
      { label: "Más de 1 litro", next: "agua_grande" },
      { label: "Ver toda la línea", next: "cta_agua_todos" },
    ],
  },

  agua_pequeno: {
    message:
      "Para menos de 500 ml tenemos el Sinfín 250 ml y 355 ml — ideales para agua purificada y bebidas. Disponibles en cristal y azul.",
    filter: { categoria: "Agua", capacidadMax: 400 },
    options: [
      { label: "Ver en catálogo", next: "cta_agua_pequeno" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_agua" },
    ],
  },

  agua_mediano: {
    message:
      "El Sinfín 500 ml y 600 ml son nuestros más vendidos para agua y bebidas. Disponibles en cristal y azul.",
    filter: { categoria: "Agua", capacidadMax: 650 },
    options: [
      { label: "Ver en catálogo", next: "cta_agua_mediano" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_agua" },
    ],
  },

  agua_grande: {
    message:
      "El Sinfín 1,000 ml y 1,500 ml son ideales para presentaciones familiares. El de 1.5 lt está disponible en 5 colores: cristal, azul, rosa, humo y verde.",
    filter: { categoria: "Agua", capacidadMax: 1600 },
    options: [
      { label: "Ver en catálogo", next: "cta_agua_grande" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_agua" },
    ],
  },

  cta_agua_todos: {
    message: "Aquí está toda nuestra línea de agua:",
    cta: { label: "Ver línea Agua", link: "/producto?categoria=Agua" },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_agua_pequeno: {
    message: "Puedes ver y comparar estos envases en el catálogo:",
    cta: {
      label: "Ver envases hasta 400 ml",
      link: "/producto?categoria=Agua",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_agua_mediano: {
    message: "Estos son nuestros envases más vendidos:",
    cta: { label: "Ver envases 500–600 ml", link: "/producto?categoria=Agua" },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_agua_grande: {
    message: "Aquí puedes ver los envases de 1 lt y 1.5 lt:",
    cta: { label: "Ver envases 1 lt+", link: "/producto?categoria=Agua" },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
