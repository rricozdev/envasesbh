export const flowCotizacion = {
  cotizacion_volumen: {
    message:
      "Para pedidos de volumen o proyectos especiales, nuestro equipo comercial te da atención personalizada. ¿Cómo prefieres que te contactemos?",
    options: [
      { label: "Ir al formulario de contacto", next: "cta_contacto_form" },
      { label: "Ver el catálogo primero", next: "explorar_categorias" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_contacto_form: {
    message:
      "Puedes dejarnos tus datos en el formulario y un asesor te contactará a la brevedad.",
    cta: { label: "Ir a Contacto", link: "/contacto" },
    options: [
      { label: "Ver catálogo mientras tanto", next: "explorar_categorias" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
};
