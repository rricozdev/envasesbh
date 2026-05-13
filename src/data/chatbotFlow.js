// export const chatbotFlow = {
//   start: {
//     message: "¡Hola! Bienvenido a Envases BH. ¿En qué podemos ayudarte hoy?",
//     options: [
//       { label: "Ver Catálogo de Productos", next: "productos" },
//       { label: "Proyectos a Medida", next: "proyectos" },
//       { label: "Hablar con un asesor", next: "contacto" },
//     ],
//   },
//   productos: {
//     message: "Contamos con envases para diversas industrias. ¿Qué buscas?",
//     options: [
//       { label: "Línea Industrial", next: "industrial" },
//       { label: "Alimentos y Bebidas", next: "alimentos" },
//       { label: "Volver al inicio", next: "start" },
//     ],
//   },
//   industrial: {
//     message:
//       "Nuestros envases industriales cumplen con altos estándares de resistencia. Puedes verlos en la sección de productos.",
//     cta: { label: "Ir a Productos", link: "/productos" },
//     options: [{ label: "Hacer otra consulta", next: "start" }],
//   },
//   contacto: {
//     message:
//       "Perfecto. Puedes escribirnos por WhatsApp o dejarnos tus datos en el formulario.",
//     cta: { label: "Ir a Contacto", link: "/contacto" },
//     options: [{ label: "Reiniciar", next: "start" }],
//   },
//   proyectos: {
//     message:
//       "Diseñamos soluciones a medida. Cuéntanos más en nuestra sección especializada.",
//     cta: { label: "Ver Proyectos", link: "/proyectos-a-tu-medida" },
//     options: [{ label: "Volver", next: "start" }],
//   },
// };

// src/data/chatbotFlow.js
import { PRODUCTOS } from "./productos";

// ─── Helper de filtrado — sin IA, datos reales ───────────────────────────────
export const filtrarProductos = ({ categoria, capacidadMax }) => {
  return PRODUCTOS.filter((p) => {
    const porCategoria = categoria ? p.categoria === categoria : true;
    const porCapacidad = capacidadMax
      ? p.specs.capacidad && p.specs.capacidad <= capacidadMax
      : true;
    return porCategoria && porCapacidad;
  }).slice(0, 4); // máximo 4 resultados en el chat
};

// ─── Nodos del flujo ─────────────────────────────────────────────────────────
export const chatbotFlow = {
  // ── ENTRADA ────────────────────────────────────────────────────────────────
  start: {
    message:
      "¡Hola! Soy el asistente de Envases BH 👋 Fabricamos envases PET para todo tipo de industria. ¿Cómo puedo ayudarte hoy?",
    options: [
      { label: "Quiero conocer opciones", next: "explorar_categorias" },
      { label: "Ya sé lo que busco", next: "buscar_directo" },
      { label: "Necesito un pedido grande", next: "cotizacion_volumen" },
      { label: "Hablar con un asesor", next: "contacto" },
    ],
  },

  // ── EXPLORAR POR INDUSTRIA ─────────────────────────────────────────────────
  explorar_categorias: {
    message: "Perfecto. ¿Para qué industria o uso necesitas el envase?",
    options: [
      { label: "Agua y bebidas", next: "rama_agua" },
      { label: "Alimentos / salsas / licores", next: "rama_alimentos" },
      { label: "Cosméticos / cuidado personal", next: "rama_cosmeticos" },
      { label: "Limpieza / uso industrial", next: "rama_limpieza" },
      { label: "Hotelería / amenidades", next: "rama_hoteleria" },
      { label: "Otro / no estoy seguro", next: "asesor_guiado" },
    ],
  },

  // ── RAMAS POR CATEGORÍA ────────────────────────────────────────────────────
  rama_agua: {
    message:
      "Contamos con envases para agua desde 250 ml hasta 1.5 litros, en cristal, azul y otros colores. ¿Qué capacidad necesitas?",
    options: [
      { label: "Menos de 500 ml", next: "agua_pequeno" },
      { label: "500 ml a 1 litro", next: "agua_mediano" },
      { label: "Más de 1 litro", next: "agua_grande" },
      { label: "Ver todo el rango", next: "cta_agua_todos" },
    ],
  },

  agua_pequeno: {
    message:
      "Para menos de 500 ml tenemos el envase de 250 ml y 355 ml Sinfín, ideales para agua purificada y bebidas. ¿Te interesa alguno en especial?",
    filter: { categoria: "Agua", capacidadMax: 400 },
    options: [
      { label: "Ver en catálogo", next: "cta_agua_pequeno" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_agua" },
    ],
  },

  agua_mediano: {
    message:
      "El envase de 500 ml y 600 ml Sinfín son nuestros más vendidos para agua y bebidas. Disponibles en cristal y azul.",
    filter: { categoria: "Agua", capacidadMax: 650 },
    options: [
      { label: "Ver en catálogo", next: "cta_agua_mediano" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_agua" },
    ],
  },

  agua_grande: {
    message:
      "Para más de 1 litro contamos con el Sinfín de 1,000 ml y 1,500 ml — este último disponible en 5 colores incluyendo rosa, humo y verde.",
    filter: { categoria: "Agua", capacidadMax: 1600 },
    options: [
      { label: "Ver en catálogo", next: "cta_agua_grande" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_agua" },
    ],
  },

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
      "Para salsas y condimentos, el envase Salsera de 180 ml es el más utilizado. También aplica la línea Twist de 250 ml con producción mínima de 15,000 pzas.",
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

  rama_cosmeticos: {
    message:
      "Contamos con una línea completa para cosméticos y cuidado personal: oval, silueta, campanita, princesa y más. ¿Qué capacidad necesitas aproximadamente?",
    options: [
      { label: "Menos de 150 ml", next: "cosmeticos_pequeno" },
      { label: "150 ml a 300 ml", next: "cosmeticos_mediano" },
      { label: "Más de 300 ml", next: "cosmeticos_grande" },
      { label: "Ver toda la línea", next: "cta_cosmeticos_todos" },
    ],
  },

  cosmeticos_pequeno: {
    message:
      "En tamaños pequeños tenemos el Oval 60 ml, Boston R20 125 ml y el Silueta 125 ml — perfectos para muestras, viajes y presentaciones individuales.",
    filter: { categoria: "Cosméticos", capacidadMax: 150 },
    options: [
      { label: "Ver en catálogo", next: "cta_cosmeticos_pequeno" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_cosmeticos" },
    ],
  },

  cosmeticos_mediano: {
    message:
      "Para presentaciones medianas tenemos el Oval 250 ml, Princesa 280 ml y la Ondulada 300 ml — ideales para shampoo, cremas y lociones.",
    filter: { categoria: "Cosméticos", capacidadMax: 310 },
    options: [
      { label: "Ver en catálogo", next: "cta_cosmeticos_mediano" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_cosmeticos" },
    ],
  },

  cosmeticos_grande: {
    message:
      "En formatos grandes contamos con Campanita 500 ml, Campana Alta 500 ml y Silueta 500 ml. Ideales para presentaciones de salón o retail.",
    filter: { categoria: "Cosméticos", capacidadMax: 600 },
    options: [
      { label: "Ver en catálogo", next: "cta_cosmeticos_grande" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Ver otras capacidades", next: "rama_cosmeticos" },
    ],
  },

  rama_limpieza: {
    message:
      "Tenemos envases para limpieza desde 250 ml hasta 10 litros — gatilleras, genéricas, triggers y garrafas. ¿Qué formato necesitas?",
    options: [
      {
        label: "Formato pequeño (gatillera / 250-500 ml)",
        next: "limpieza_pequeno",
      },
      { label: "Formato mediano (1 lt - 2 lt)", next: "limpieza_mediano" },
      { label: "Garrafa / galón / 5-10 lt", next: "limpieza_grande" },
      { label: "Ver toda la línea", next: "cta_limpieza_todos" },
    ],
  },

  limpieza_pequeno: {
    message:
      "Para formatos pequeños tenemos la Gatillera 250 ml (sobre pedido, mínimo 8,000 pzas) y la Genérica Lavatraste 400 ml en cristal.",
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

  rama_hoteleria: {
    message:
      "Nuestra línea de amenidades hoteleras incluye envases de 25 ml a 50 ml en varios formatos: institucional, campana, lápiz, cilíndrica e invertida.",
    options: [
      { label: "Ver opciones disponibles", next: "cta_hoteleria_todos" },
      { label: "Quiero una cotización", next: "cotizacion_volumen" },
      { label: "Hablar con un asesor", next: "contacto" },
    ],
  },

  // ── BUSCAR DIRECTO ─────────────────────────────────────────────────────────
  buscar_directo: {
    message: "Entendido. ¿Cómo prefieres buscarlo?",
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
      "Entre 100 ml y 500 ml tenemos la mayor variedad del catálogo: Boston, Cosméticos, Alimentos, Agua y más. ¿Para qué industria es?",
    options: [
      { label: "Agua / bebidas", next: "agua_pequeno" },
      { label: "Cosméticos", next: "cosmeticos_pequeno" },
      { label: "Alimentos", next: "alimentos_oliva" },
      { label: "Ver todo", next: "cta_catalogo_general" },
    ],
  },

  capacidad_mediano: {
    message:
      "Entre 500 ml y 1 litro hay opciones en agua, alimentos, cosméticos, limpieza y Boston. ¿Para qué industria es?",
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
      "Perfecto. Te recomiendo buscarlo directamente en nuestro catálogo — tiene filtros por categoría y capacidad para encontrarlo rápido.",
    cta: { label: "Ir al catálogo", link: "/productos" },
    options: [
      { label: "Quiero que me ayude un asesor", next: "contacto" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  // ── COTIZACIÓN DE VOLUMEN ──────────────────────────────────────────────────
  cotizacion_volumen: {
    message:
      "Para pedidos de volumen o proyectos especiales, nuestro equipo comercial te da atención personalizada. Puedes contactarnos directamente o dejarnos tus datos.",
    cta: { label: "Solicitar cotización", link: "/contacto" },
    options: [
      { label: "Ver el catálogo primero", next: "explorar_categorias" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  // ── ASESOR GUIADO ──────────────────────────────────────────────────────────
  asesor_guiado: {
    message:
      "Sin problema. Cuéntame un poco más: ¿qué producto vas a envasar? Con eso te oriento mejor.",
    options: [
      { label: "Un líquido (agua, bebida, salsa)", next: "rama_agua" },
      { label: "Un cosmético o cuidado personal", next: "rama_cosmeticos" },
      { label: "Un producto de limpieza", next: "rama_limpieza" },
      { label: "Prefiero hablar con alguien", next: "contacto" },
    ],
  },

  // ── CONTACTO ───────────────────────────────────────────────────────────────
  contacto: {
    message:
      "Nuestro equipo comercial está disponible para atenderte. Puedes escribirnos directamente o usar el formulario de contacto.",
    cta: { label: "Ir a Contacto", link: "/contacto" },
    options: [
      { label: "Ver el catálogo antes", next: "explorar_categorias" },
      { label: "Volver al inicio", next: "start" },
    ],
  },

  // ── CTAs FINALES — uno por rama para no mezclar destinos ──────────────────
  cta_agua_todos: {
    message: "Aquí está toda nuestra línea de agua:",
    cta: { label: "Ver línea Agua", link: "/productos?categoria=Agua" },
    options: [{ label: "Volver", next: "start" }],
  },
  cta_agua_pequeno: {
    message: "Puedes ver y comparar estos envases en el catálogo:",
    cta: {
      label: "Ver envases hasta 400 ml",
      link: "/productos?categoria=Agua",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_agua_mediano: {
    message: "Estos son nuestros envases más vendidos:",
    cta: { label: "Ver envases 500–600 ml", link: "/productos?categoria=Agua" },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_agua_grande: {
    message: "Aquí puedes ver los envases de 1 lt y 1.5 lt:",
    cta: { label: "Ver envases 1 lt+", link: "/productos?categoria=Agua" },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_alimentos_todos: {
    message: "Toda nuestra línea de alimentos y bebidas:",
    cta: {
      label: "Ver línea Alimentos",
      link: "/productos?categoria=Alimentos+y+Bebidas",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_alimentos_oliva: {
    message: "Aquí puedes ver la línea Oliva Cuadrada completa:",
    cta: {
      label: "Ver línea Oliva",
      link: "/productos?categoria=Alimentos+y+Bebidas",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_alimentos_salsas: {
    message: "Ve los detalles de la Salsera y la línea Twist:",
    cta: {
      label: "Ver línea Salsas",
      link: "/productos?categoria=Alimentos+y+Bebidas",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_alimentos_licores: {
    message: "Aquí está la línea Licorera completa:",
    cta: {
      label: "Ver línea Licoreras",
      link: "/productos?categoria=Alimentos+y+Bebidas",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_cosmeticos_todos: {
    message: "Toda nuestra línea de cosméticos:",
    cta: {
      label: "Ver línea Cosméticos",
      link: "/productos?categoria=Cosméticos",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_cosmeticos_pequeno: {
    message: "Aquí puedes ver los formatos pequeños para cosméticos:",
    cta: {
      label: "Ver cosméticos hasta 150 ml",
      link: "/productos?categoria=Cosméticos",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_cosmeticos_mediano: {
    message: "Aquí puedes comparar los formatos medianos:",
    cta: {
      label: "Ver cosméticos 150–300 ml",
      link: "/productos?categoria=Cosméticos",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_cosmeticos_grande: {
    message: "Aquí puedes ver los formatos grandes para cosméticos:",
    cta: {
      label: "Ver cosméticos 500 ml",
      link: "/productos?categoria=Cosméticos",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_limpieza_todos: {
    message: "Toda nuestra línea de limpieza:",
    cta: { label: "Ver línea Limpieza", link: "/productos?categoria=Limpieza" },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_limpieza_pequeno: {
    message: "Aquí puedes ver los formatos pequeños para limpieza:",
    cta: {
      label: "Ver limpieza hasta 500 ml",
      link: "/productos?categoria=Limpieza",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_limpieza_mediano: {
    message: "Aquí están los formatos medianos para limpieza:",
    cta: {
      label: "Ver limpieza 1–2 lt",
      link: "/productos?categoria=Limpieza",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_limpieza_grande: {
    message: "Aquí puedes ver las garrafas y formatos industriales:",
    cta: {
      label: "Ver garrafas y galones",
      link: "/productos?categoria=Limpieza",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_hoteleria_todos: {
    message: "Aquí está toda nuestra línea de amenidades hoteleras:",
    cta: {
      label: "Ver línea Hotelería",
      link: "/productos?categoria=Amenidades+Hoteleras",
    },
    options: [
      { label: "Cotizar", next: "cotizacion_volumen" },
      { label: "Volver", next: "start" },
    ],
  },
  cta_catalogo_general: {
    message:
      "Puedes explorar todo el catálogo con filtros por categoría y capacidad:",
    cta: { label: "Ver catálogo completo", link: "/productos" },
    options: [{ label: "Volver al inicio", next: "start" }],
  },
};
