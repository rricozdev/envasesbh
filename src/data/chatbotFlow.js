export const chatbotFlow = {
  start: {
    message: "¡Hola! Bienvenido a Envases BH. ¿En qué podemos ayudarte hoy?",
    options: [
      { label: "Ver Catálogo de Productos", next: "productos" },
      { label: "Proyectos a Medida", next: "proyectos" },
      { label: "Hablar con un asesor", next: "contacto" },
    ],
  },
  productos: {
    message: "Contamos con envases para diversas industrias. ¿Qué buscas?",
    options: [
      { label: "Línea Industrial", next: "industrial" },
      { label: "Alimentos y Bebidas", next: "alimentos" },
      { label: "Volver al inicio", next: "start" },
    ],
  },
  industrial: {
    message:
      "Nuestros envases industriales cumplen con altos estándares de resistencia. Puedes verlos en la sección de productos.",
    cta: { label: "Ir a Productos", link: "/productos" },
    options: [{ label: "Hacer otra consulta", next: "start" }],
  },
  contacto: {
    message:
      "Perfecto. Puedes escribirnos por WhatsApp o dejarnos tus datos en el formulario.",
    cta: { label: "Ir a Contacto", link: "/contacto" },
    options: [{ label: "Reiniciar", next: "start" }],
  },
  proyectos: {
    message:
      "Diseñamos soluciones a medida. Cuéntanos más en nuestra sección especializada.",
    cta: { label: "Ver Proyectos", link: "/proyectos-a-tu-medida" },
    options: [{ label: "Volver", next: "start" }],
  },
};
