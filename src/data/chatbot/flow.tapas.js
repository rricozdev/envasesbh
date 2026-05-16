// src/data/chatbot/flow.tapas.js

export const flowTapas = {
  rama_tapas: {
    message:
      "Contamos con una amplia línea de tapas, bombas y triggers para complementar tu envase. ¿Qué tipo necesitas?",
    options: [
      { label: "Trigger / atomizador", next: "tapas_triggers" },
      { label: "Bomba dosificadora", next: "tapas_bombas" },
      { label: "Tapas y flip tops", next: "tapas_tapas" },
      { label: "Ver toda la línea", next: "cta_tapas_todos" },
    ],
  },

  tapas_triggers: {
    message:
      "Tenemos triggers estándar, industriales, cola de pato y mini triggers — en roscas 24 y 28. También atomizadores botón en roscas 18, 20 y 24.",
    filter: { categoria: "Tapas, Bombas y Triggers", capacidadMax: null },
    options: [
      {
        label: "Trigger estándar / industrial",
        next: "cta_tapas_trigger_estandar",
      },
      { label: "Atomizador botón", next: "cta_tapas_atomizador" },
      { label: "Ver toda la línea", next: "cta_tapas_todos" },
    ],
  },

  tapas_bombas: {
    message:
      "Contamos con bomba dosificadora rosca 28 en versión estándar y reforzada azul — ideales para jabón, shampoo y productos de limpieza.",
    filter: { categoria: "Tapas, Bombas y Triggers", capacidadMax: null },
    options: [
      { label: "Ver en catálogo", next: "cta_tapas_bombas" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otros tipos", next: "rama_tapas" },
    ],
  },

  tapas_tapas: {
    message:
      "Tenemos flip tops en roscas 24 y 28, disk tops, tapa sport, tapa cintillo 28 mm y tapa vitrolero 110 mm en más de 10 colores.",
    filter: { categoria: "Tapas, Bombas y Triggers", capacidadMax: null },
    options: [
      { label: "Flip top", next: "cta_tapas_fliptop" },
      { label: "Disk top", next: "cta_tapas_disktop" },
      { label: "Tapa vitrolero", next: "cta_tapas_vitrolero" },
      { label: "Ver toda la línea", next: "cta_tapas_todos" },
    ],
  },

  cta_tapas_todos: {
    message: "Aquí está toda nuestra línea de tapas, bombas y triggers:",
    cta: {
      label: "Ver línea Tapas y Triggers",
      link: "/producto?categoria=Tapas%2C+Bombas+y+Triggers",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_tapas_trigger_estandar: {
    message: "Aquí puedes ver todos los modelos de trigger disponibles:",
    cta: {
      label: "Ver triggers",
      link: "/producto?categoria=Tapas%2C+Bombas+y+Triggers",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_tapas_atomizador: {
    message:
      "Aquí puedes ver los atomizadores botón en las 3 roscas disponibles:",
    cta: {
      label: "Ver atomizadores",
      link: "/producto?categoria=Tapas%2C+Bombas+y+Triggers",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_tapas_bombas: {
    message: "Aquí puedes ver las bombas dosificadoras disponibles:",
    cta: {
      label: "Ver bombas dosificadoras",
      link: "/producto?categoria=Tapas%2C+Bombas+y+Triggers",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_tapas_fliptop: {
    message:
      "Los flip tops están disponibles en roscas 24-410, 24-415 y 28-410 en natural y blanco:",
    cta: {
      label: "Ver flip tops",
      link: "/producto?categoria=Tapas%2C+Bombas+y+Triggers",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_tapas_disktop: {
    message:
      "Los disk tops están disponibles en roscas 24-410 y 24-415 en natural y blanco — sobre pedido:",
    cta: {
      label: "Ver disk tops",
      link: "/producto?categoria=Tapas%2C+Bombas+y+Triggers",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_tapas_vitrolero: {
    message: "La tapa vitrolero 110 mm está disponible en más de 10 colores:",
    cta: {
      label: "Ver tapas vitrolero",
      link: "/producto?categoria=Tapas%2C+Bombas+y+Triggers",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
