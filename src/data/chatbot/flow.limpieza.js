export const flowLimpieza = {
  rama_limpieza: {
    message:
      "Tenemos envases para limpieza desde 250 ml hasta 10 litros — gatilleras, genéricas, triggers y garrafas. ¿Qué formato necesitas?",
    options: [
      { label: "Formato pequeño (250–500 ml)", next: "limpieza_pequeno" },
      { label: "Formato mediano (1 lt – 2 lt)", next: "limpieza_mediano" },
      { label: "Garrafa / galón / 5–10 lt", next: "limpieza_grande" },
      { label: "Ver toda la línea", next: "cta_limpieza_todos" },
    ],
  },

  limpieza_pequeno: {
    message:
      "Para formatos pequeños tenemos la Gatillera 250 ml (mínimo 8,000 pzas, sobre pedido) y la Genérica Lavatraste 400 ml en cristal.",
    filter: { categoria: "Limpieza", capacidadMax: 500 },
    options: [
      { label: "Ver en catálogo", next: "cta_limpieza_pequeno" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otros formatos", next: "rama_limpieza" },
    ],
  },

  limpieza_mediano: {
    message:
      "En formatos de 1 lt a 2 lt contamos con Sinfín, Trigger 1 lt y el envase 2 lt — disponibles en cristal y verde. Ideales para detergentes y multiusos.",
    filter: { categoria: "Limpieza", capacidadMax: 2100 },
    options: [
      { label: "Ver en catálogo", next: "cta_limpieza_mediano" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otros formatos", next: "rama_limpieza" },
    ],
  },

  limpieza_grande: {
    message:
      "Para volúmenes grandes tenemos Garrafa Galón (3.78 lt), Garrafa 5 lt y Garrafa Cuadrada 10 lt — perfectas para uso industrial y distribución.",
    filter: { categoria: "Limpieza", capacidadMax: 11000 },
    options: [
      { label: "Ver en catálogo", next: "cta_limpieza_grande" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otros formatos", next: "rama_limpieza" },
    ],
  },

  cta_limpieza_todos: {
    message: "Aquí está toda nuestra línea de limpieza:",
    cta: { label: "Ver línea Limpieza", link: "/producto?categoria=Limpieza" },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_limpieza_pequeno: {
    message: "Aquí puedes ver los formatos pequeños para limpieza:",
    cta: {
      label: "Ver limpieza hasta 500 ml",
      link: "/producto?categoria=Limpieza",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_limpieza_mediano: {
    message: "Aquí están los formatos medianos para limpieza:",
    cta: { label: "Ver limpieza 1–2 lt", link: "/producto?categoria=Limpieza" },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_limpieza_grande: {
    message: "Aquí puedes ver las garrafas y formatos industriales:",
    cta: {
      label: "Ver garrafas y galones",
      link: "/producto?categoria=Limpieza",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
