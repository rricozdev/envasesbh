// Genera el link wa.me/ con el resumen formateado
export const WHATSAPP_NUMBER = "525563182026";

// ─── Contacto ─────────────────────────────────────────────────────────────────
// Correo comercial de ventas. Usar en footer y página de contacto.
export const EMAIL_VENTAS = "direccionventas@envasesbh.mx";

// Dirección física de la empresa. Usar en footer y página de contacto.
export const EMPRESA_DIRECCION =
  "Callejón México Nuevo #1 Bod 7 Col. México Nuevo Atizapán de Zaragoza Estado de México cp 52966";

// Ciudad para mostrar en mapas o datos de contacto resumidos.
export const EMPRESA_CIUDAD = "Ciudad de México, México";

// Horario de atención. Usar en footer y página de contacto.
export const EMPRESA_HORARIO =
  "Lun – Jue: 8:00am – 5:00pm - Vier: 8:00 am - 4:00 pm";

// Data para sucursal de Guadalajara
export const SUCURSAL_GDL_WHATSAPP = WHATSAPP_NUMBER; // temporal hasta tener el número real
export const SUCURSAL_GDL_FACEBOOK =
  "https://www.facebook.com/share/17Thf495Be/";

// ─── Colores del catálogo ─────────────────────────────────────────────────────
// Mapea los nombres de colores del catálogo (productos.js) a valores hex o
// gradientes CSS. Se usa en src/app/productos/[slug]/page.js para renderizar
// los círculos de color en la ficha técnica del producto.
export const COLOR_MAP = {
  cristal: "#E8F4F8",
  azul: "#1565C0",
  rosa: "#F48FB1",
  humo: "#9E9E9E",
  verde: "#66BB6A",
  amarillo: "#fdd835",
  ambar: "#FFB300",
  rojo: "#EF5350",
  negro: "#2B2B2B",
  blanco: "#FFFFFF",
  natural: "#F5F0E8",
  morado: "#876C95",
  aqua: "#00BCD4",
  // Valor especial para productos con "gran variedad de colores"
  "colores bajo pedido":
    "linear-gradient(135deg, #E8F4F8, #1565C0, #F48FB1, #FFB300, #66BB6A, #EF5350, #2B2B2B)",
};

// ─── Etiquetas de categoría ───────────────────────────────────────────────────
// Texto descriptivo por categoría del catálogo. Se usa en
// src/components/features/productos/ProductCard.jsx para mostrar
// el subtítulo de cada card en lugar del texto hardcodeado.
export const CATEGORIA_LABEL = {
  Agua: "Premium PET • Uso en bebidas",
  "Alimentos y Bebidas": "Premium • Uso alimenticio",
  "Amenidades Hoteleras": "Premium • Uso hotelero",
  Boston: "Premium • Uso múltiple",
  Cosméticos: "Premium • Uso cosmético",
  Especieros: "Premium • Uso alimenticio",
  Farmacéuticos: "Premium • Uso farmacéutico",
  Limpieza: "Premium • Uso en limpieza",
  Publicitarios: "Premium • Uso publicitario",
  "Tarros y Vitroleros": "Premium • Almacenamiento",
  "Tapas, Bombas y Triggers": "Accesorio • Complemento",
};

// ─── Etiquetas cortas para badge de ProductCard ───────────────────────────────
export const CATEGORIA_BADGE = {
  Agua: "Agua",
  "Alimentos y Bebidas": "Alimentos",
  "Amenidades Hoteleras": "Hotelería",
  Boston: "Boston",
  Cosméticos: "Cosméticos",
  Especieros: "Especieros",
  Farmacéuticos: "Farmacéutico",
  Limpieza: "Limpieza",
  Publicitarios: "Publicitario",
  "Tarros y Vitroleros": "Tarros",
  "Tapas, Bombas y Triggers": "Tapas & Triggers",
};

// colores para el filtrado de productos
export const COLORES_FILTRO = [
  "Cristal",
  "Natural",
  "Negro",
  "Blanco",
  "Ámbar",
  "Azul",
  "Rojo",
  "Verde",
  "Morado",
  "Naranja",
  "Rosa",
  "Aqua",
  "Humo",
];
