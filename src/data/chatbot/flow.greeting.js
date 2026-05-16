export const flowGreeting = {
  start: {
    message:
      "¡Hola! Soy el asistente de Envases BH. Fabricamos envases PET para todo tipo de industria. ¿Cómo puedo ayudarte hoy?",
    options: [
      { label: "Quiero conocer opciones", next: "explorar_categorias" },
      { label: "Ya sé lo que busco", next: "buscar_directo" },
      { label: "Necesito un pedido grande", next: "cotizacion_volumen" },
      { label: "Hablar con un asesor", next: "contacto" },
    ],
  },

  explorar_categorias: {
    message: "¿Para qué industria o uso necesitas el envase?",
    options: [
      { label: "Agua y bebidas", next: "rama_agua" },
      { label: "Alimentos / salsas / licores", next: "rama_alimentos" },
      { label: "Cosméticos / cuidado personal", next: "rama_cosmeticos" },
      { label: "Limpieza / uso industrial", next: "rama_limpieza" },
      { label: "Hotelería / amenidades", next: "rama_hoteleria" },
      { label: "Línea Boston", next: "rama_boston" },
      { label: "Tarros y Vitroleros", next: "rama_tarros" },
      { label: "Tapas, Bombas y Triggers", next: "rama_tapas" },
      { label: "No estoy seguro", next: "asesor_guiado" },
      { label: "Envases publicitarios", next: "rama_publicitarios" },
      { label: "Especieros", next: "rama_especieros" },
      { label: "Farmacéuticos", next: "rama_farmaceuticos" },
    ],
  },

  buscar_directo: {
    message: "¿Cómo prefieres buscarlo?",
    options: [
      { label: "Por categoría", next: "explorar_categorias" },
      { label: "Por capacidad (ml / litros)", next: "filtro_capacidad" },
      { label: "Ya tengo el nombre", next: "tiene_nombre" },
    ],
  },

  filtro_capacidad: {
    message: "¿Qué capacidad necesitas aproximadamente?",
    options: [
      { label: "Menos de 100 ml", next: "capacidad_micro" },
      { label: "100 ml a 500 ml", next: "capacidad_pequeno" },
      { label: "500 ml a 1 litro", next: "capacidad_mediano" },
      { label: "Más de 1 litro", next: "capacidad_grande" },
    ],
  },

  capacidad_micro: {
    message:
      "En menos de 100 ml tenemos opciones en amenidades hoteleras, cosméticos y especieros — desde 25 ml hasta 60 ml.",
    options: [
      { label: "Amenidades hoteleras", next: "rama_hoteleria" },
      { label: "Cosméticos", next: "cosmeticos_pequeno" },
      { label: "Ver catálogo general", next: "cta_catalogo_general" },
    ],
  },

  capacidad_pequeno: {
    message:
      "Entre 100 ml y 500 ml tenemos la mayor variedad del catálogo. ¿Para qué industria es?",
    options: [
      { label: "Agua / bebidas", next: "agua_pequeno" },
      { label: "Cosméticos", next: "cosmeticos_pequeno" },
      { label: "Alimentos", next: "rama_alimentos" },
      { label: "Ver todo", next: "cta_catalogo_general" },
    ],
  },

  capacidad_mediano: {
    message:
      "Entre 500 ml y 1 litro hay opciones en agua, cosméticos, limpieza y más. ¿Para qué industria es?",
    options: [
      { label: "Agua / bebidas", next: "agua_mediano" },
      { label: "Cosméticos", next: "cosmeticos_grande" },
      { label: "Limpieza", next: "limpieza_mediano" },
      { label: "Ver todo", next: "cta_catalogo_general" },
    ],
  },

  capacidad_grande: {
    message:
      "Para más de 1 litro tenemos desde el Sinfín 1.5 lt hasta garrafas de 10 lt. ¿Para qué uso es?",
    options: [
      { label: "Agua", next: "agua_grande" },
      { label: "Limpieza industrial", next: "limpieza_grande" },
      { label: "Licores / alimentos", next: "alimentos_licores" },
      { label: "Ver todo", next: "cta_catalogo_general" },
    ],
  },

  tiene_nombre: {
    message:
      "Te recomiendo buscarlo directamente en nuestro catálogo — tiene filtros por categoría y capacidad para encontrarlo rápido.",
    cta: { label: "Ir al catálogo", link: "/productos" },
    options: [
      { label: "Quiero que me ayude un asesor", next: "contacto" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  asesor_guiado: {
    message: "Sin problema. ¿Qué producto vas a envasar?",
    options: [
      { label: "Un líquido (agua, bebida, salsa)", next: "rama_agua" },
      { label: "Un cosmético o cuidado personal", next: "rama_cosmeticos" },
      { label: "Un producto de limpieza", next: "rama_limpieza" },
      { label: "Prefiero hablar con alguien", next: "contacto" },
    ],
  },

  contacto: {
    message:
      "Nuestro equipo comercial está disponible para atenderte. Puedes escribirnos directamente o usar el formulario de contacto.",
    cta: { label: "Ir a Contacto", link: "/contacto" },
    options: [
      { label: "Ver el catálogo antes", next: "explorar_categorias" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  cta_catalogo_general: {
    message:
      "Puedes explorar todo el catálogo con filtros por categoría y capacidad.",
    cta: { label: "Ver catálogo completo", link: "/productos" },
    options: [{ label: "Volver al inicio", next: "start" }],
  },
};
