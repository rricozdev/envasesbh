# Arquitectura - Proyecto Envases BH

## Visión General

Este proyecto está construido con **Next.js (App Router)**, **React (JSX)** y **Tailwind CSS**, con el objetivo de ser **escalable**, **optimizado para SEO** y **fácil de mantener**.

La arquitectura sigue el enfoque **Feature-Sliced Design (FSD)** para organizar el código por responsabilidades reales del negocio y facilitar su crecimiento sin acoplamiento.

---

## Stack Principal

- Next.js (App Router)
- React (JSX)
- Tailwind CSS
- Framer Motion (animaciones)
- Tabler Icons / React Icons
- React Hook Form + Zod (formularios y validación)

---

## Estrategia de Rutas

Se utiliza el sistema de rutas basado en archivos con soporte para segmentos dinámicos:

```bash
/app/productos/[slug]/page.jsx
/app/blog/[slug]/page.jsx
```

### Concepto

Cada recurso (producto o artículo):

- Tiene su propia URL
- Es indexable
- Tiene metadata dinámica
- Renderiza contenido estático optimizado

---

## Estrategia de Renderizado

El proyecto es principalmente **estático (SSG)**:

- Páginas de productos → SSG
- Blog → SSG
- Contenido corporativo → SSG

### Objetivo

- Máximo rendimiento
- HTML indexable
- Mejor posicionamiento SEO

---

## Arquitectura FSD

El proyecto se organiza en **capas (layers)** siguiendo Feature-Sliced Design.

```bash
src/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── productos/
│   │   ├── page.jsx
│   │   └── [slug]/page.jsx
│   ├── blog/
│   │   ├── page.jsx
│   │   └── [slug]/page.jsx
│   ├── quienes-somos/page.jsx
│   ├── servicios/page.jsx
│   ├── productos-a-medida/page.jsx
│   ├── contacto/page.jsx
│   ├── sitemap.js
│   ├── robots.js
│   └── api/
│       └── chat/route.js
│
├── widgets/
│   ├── navbar/ui/Navbar.jsx
│   ├── footer/ui/Footer.jsx
│   ├── hero-section/ui/HeroSection.jsx
│   ├── product-catalog/ui/ProductCatalog.jsx
│   ├── services/ui/ServicesSection.jsx
│   └── blog-preview/ui/BlogPreview.jsx
│
├── features/
│   ├── quote-cart/
│   │   ├── model/useQuoteCart.js
│   │   ├── lib/buildWhatsAppUrl.js
│   │   ├── ui/AddToCartButton.jsx
│   │   ├── ui/QuoteCartItem.jsx
│   │   └── ui/QuoteCartSidebar.jsx
│   │
│   ├── ai-chatbot/
│   │   ├── api/chatApi.js
│   │   ├── model/useChatbot.js
│   │   ├── ui/ChatbotWidget.jsx
│   │   ├── ui/ChatMessage.jsx
│   │   └── ui/ChatInput.jsx
│   │
│   └── contact-form/
│       ├── api/contactApi.js
│       ├── lib/validateForm.js
│       ├── model/useContactForm.js
│       ├── ui/ContactFormWidget.jsx
│       └── ui/FormField.jsx
│
├── entities/
│   ├── product/
│   │   ├── ui/ProductCard.jsx
│   │   └── lib/productSchema.js
│   │
│   └── blog-post/
│       ├── ui/PostCard.jsx
│       └── lib/postSchema.js
│
└── shared/
    ├── ui/
    │   ├── Button.jsx
    │   ├── Input.jsx
    │   ├── Badge.jsx
    │   ├── Modal.jsx
    │   └── SocialLinks.jsx
│
    ├── lib/
    │   ├── cn.js
    │   ├── formatters.js
    │   └── seo/
    │       ├── meta.js
    │       ├── productSchema.js
    │       └── articleSchema.js
│
    ├── config/
    │   ├── site.js
    │   ├── navigation.js
    │   └── whatsapp.js
│
    └── hooks/
        ├── useMediaQuery.js
        └── useDebounce.js
```

### Capas (layers)

#### `app/`

- Routing
- SEO (metadata, sitemap, robots)
- Layout
- Composición de páginas

👉 No contiene lógica de negocio

---

#### `widgets/`

- Secciones grandes de UI
- Composición de features + entities

Ejemplos:

- Navbar
- Footer
- Catálogo

---

#### `features/`

- Funcionalidades del usuario
- Lógica de negocio

Ejemplos:

- Carrito de cotización
- Formulario de contacto
- Chatbot

---

#### `entities/`

- Modelos del negocio

Ejemplos:

- Producto
- Blog Post

---

#### `shared/`

- Código reutilizable global

Incluye:

- UI genérico
- Configuración
- Helpers
- Hooks

---

## Slices

Un **slice** es una unidad funcional independiente.

Ejemplos:

- `quote-cart`
- `product`
- `contact-form`

### Regla

Cada slice debe:

- Ser autónomo
- No depender innecesariamente de otros

---

## Segments

Cada slice se divide en segmentos:

```bash
ui/
model/
lib/
api/
```

### Descripción

- `ui/` → componentes visuales
- `model/` → estado y lógica
- `lib/` → utilidades
- `api/` → integraciones externas

---

## Sistema de Estilos

Todos los estilos se definen en:

```bash
globals.css
```

### Principios

- Basado en TailwindCSS
- Uso de variables CSS (design tokens)
- No modificar directamente el core de Tailwind

---

## Design Tokens

Incluye:

- Colores primarios
- Secundarios
- Neutrales

---

### Objetivo

- Mejor jerarquía visual
- Mejor experiencia de usuario
- Consistencia entre modos

---

## Manejo de Imágenes

- Ubicación: `/public/images`
- Formato recomendado: `.webp`
- Uso mediante rutas absolutas

### Objetivo

- Optimización
- Rendimiento
- Organización clara

---

## Estado de la Aplicación

- Manejo de estado con hooks de React
- No se utiliza estado global complejo

---

## Estrategia SEO

- Metadata dinámica por página
- URLs limpias
- JSON-LD para rich results
- Sitemap y robots configurados

---

## Integraciones

- WhatsApp → generación de URL directa
- Email → servicios externos (EmailJS, Formspree)
- Chatbot → API serverless (`/api/chat`)

---

## Buenas Prácticas

### Código

- Todo debe estar comentado
- Explicar propósito y decisiones

### Arquitectura

- No mezclar UI con lógica
- No romper boundaries de FSD

### Estilos

- Prohibido usar colores hardcodeados
- Usar tokens

---

## Flujo Git

```bash
main      → producción
develop   → integración
feature/* → nuevas funcionalidades
fix/*     → correcciones
```

### Reglas

- No commits directos a `main`
- Uso obligatorio de Pull Requests
- `develop` es la rama base

---

## Principio del Sistema

> El sistema prioriza escalabilidad, SEO y mantenibilidad sobre soluciones rápidas o improvisadas.

---

## Nota Final

Este documento define la base del proyecto.

A partir de aquí:

- Se agregan nuevas features
- Se mejora la UX
- Se optimiza conversión

👉 Sin romper la arquitectura base
