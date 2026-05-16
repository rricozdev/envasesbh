export const flowHoteleria = {
  rama_hoteleria: {
    message:
      "Nuestra línea de amenidades hoteleras incluye envases de 25 ml a 50 ml en varios formatos. ¿Qué necesitas?",
    options: [
      { label: "Ver opciones disponibles", next: "hoteleria_opciones" },
      { label: "Necesito varios formatos", next: "hoteleria_multiple" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Hablar con un asesor", next: "contacto" },
    ],
  },

  hoteleria_opciones: {
    message:
      "Contamos con 6 formatos distintos: Institucional, Campana, Lápiz, Cilíndrica, Invertida y Oliva Cuadrada — todos en cristal, algunos en negro y ámbar.",
    filter: { categoria: "Amenidades Hoteleras" },
    options: [
      { label: "Ver en catálogo", next: "cta_hoteleria_todos" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Hablar con un asesor", next: "contacto" },
    ],
  },

  hoteleria_multiple: {
    message:
      "Para proyectos que requieren varios formatos, nuestro equipo comercial puede armar un paquete a medida. ¿Te ponemos en contacto?",
    options: [
      { label: "Sí, quiero que me contacten", next: "cotizacion_volumen" },
      { label: "Ver opciones primero", next: "hoteleria_opciones" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_hoteleria_todos: {
    message: "Aquí está toda nuestra línea de amenidades hoteleras:",
    cta: {
      label: "Ver línea Hotelería",
      link: "/producto?categoria=Amenidades+Hoteleras",
    },
    options: [
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
