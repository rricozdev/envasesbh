# AGENTS.md

## Proyecto: Envases BH — Sitio Web Corporativo

### Stack Tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| **Next.js** | 15+ (App Router) | Framework React, enrutamiento basado en archivos, SSG estático |
| **React** | 19+ | UI declarativa con JSX |
| **TailwindCSS** | v4 | Framework de estilos utilitario — **no hay CSS hardcodeado** |
| **Framer Motion** | 11+ | Animaciones declarativas por componentes |
| **Lucide React** | — | Iconos SVG consistentes, bajo peso |
| **next/font** | — | Fuentes Inter + Source Sans 3, auto-optimizadas |

### Arquitectura — Monolito Frontend 100% Estático

No existe backend, base de datos, API propia, ni autenticación. Todo es cliente-side compilado a HTML estático:

- **Datos**: archivos planos en `/data/*.js` (productos, blog, servicios, chatbot, etc.)
- **Estado global**: solo `React Context` en `/context/` — carrito (`CartContext`) y paneles UI (`UIContext`)
- **Persistencia**: carrito y chat history se guardan en `localStorage` del navegador
- **Conversión real**: exclusivamente por WhatsApp — el carrito es UI demostrativa sin checkout real
- **Contacto**: formulario que abre un link wa.me con los datos formateados — no envía emails ni POST a servidor

### Single Responsibility Principle (SRP)

Cada component tiene una única responsabilidad y vive en su propio archivo:

```
src/components/
├── features/        # Componentes específicos de una feature
│   ├── blog/        # PostCard, PostList
│   ├── cart/        # CartButton, CartDrawer, CartItem, AddToCartButton
│   ├── chatbot/     # ChatbotContainer, ChatWindow, useChatbot, conversationEngine, chatUtils
│   ├── contacto/    # FormContacto, SectionSucursales
│   ├── home/        # Hero, SectionVehiculos, etc.
│   ├── productos/   # ProductCard, ProductGallery, filtros, hooks, UI
│   ├── proyectos/   # Cotizaciones
│   ├── proyecto_a_medida/  # ProccesCard, flujo paso a paso
│   └── servicios/   # ServicioCard, PigmentaciónSection
├── layout/          # MainLayout, Header/Navbar, Footer, PanelController
└── ui/              # Componentes genéricos reutilizables (SectionContent, WhatsAppButton, etc.)
```

### Estilos

- **100% TailwindCSS v4** — clases utilitarias en JSX, sin CSS hardcodeado
- No existen archivos `.css` adicionales excepto `globals.css` (resets, variables, animaciones clave)
- Tema definido con variables CSS en `globals.css` (`--color-primary`, `--color-secondary`, etc.)
- Colores, espaciados y tipografía se usan exclusivamente via clases Tailwind

### Rutas (App Router)

```
/                           → Home
/productos                  → Catálogo
/productos/[slug]           → Detalle producto (SSG con generateStaticParams)
/servicios                  → Servicios
/quienes-somos              → Quiénes somos
/blog                       → Listado blog
/blog/[slug]                → Artículo blog (SSG)
/contacto                   → Contacto + sucursales + mapa
/proyectos-a-tu-medida      → Proyectos personalizados
/legal/privacidad           → Aviso de privacidad
```

### Chatbot — Simulado (NO IA Real)

El chatbot es un **sistema conversacional basado en nodos predefinidos**, no integra IA generativa ni LLM.

**Arquitectura:**
- Datos: 12 archivos de flujo en `/data/chatbot/` + `index.js` que los agrupa
- Engine: `conversationEngine.js` — resuelve nodos, actualiza contexto (categoría, capacidad, intención)
- Estado: `useChatbot.js` hook que maneja mensajes, typing, persistencia en localStorage
- UI: `ChatbotContainer.jsx` + `ChatWindow.jsx` con burbujas, opciones, productos sugeridos

**¿Por qué no IA real?**
1. **Seguridad**: integrar un LLM requeriría un agente adversario para fortalecer ciberseguridad, prevención de inyecciones, y moderación de contenido.
2. **Costo**: infraestructura de LLM + monitoreo + adversarial training incrementa significativamente el costo de desarrollo y operación.
3. **Propósito**: el sitio es un catálogo demostrativo con WhatsApp como único canal de conversión — un chatbot simulado cumple el objetivo sin agregar complejidad ni riesgo.

### Reglas para Desarrollo

1. **Nuevos componentes**: crear en `components/features/[feature]/` si es específico, o en `components/ui/` si es genérico. Un archivo por componente (SRP).
2. **Nuevas rutas**: crear carpeta en `app/` con `page.js`. Usar `(grupo)` para agrupar sin afectar URL.
3. **Datos**: modificar archivos en `/data/` para cambiar contenido. No crear APIs ni llamadas externas.
4. **Estilos**: TailwindCSS v4 exclusivamente. No agregar archivos CSS (excepto `globals.css`).
5. **Estado global**: Context API en `/context/`. Evitar prop drilling. Estado persiste solo en localStorage.
6. **Animaciones**: Framer Motion para animaciones declarativas complejas. Transiciones CSS para hovers simples.
7. **Iconos**: Lucide React (`lucide-react`) iconos SVG inline, no imágenes ni sprite sheets.

### Archivos a Ignorar

`node_modules/`, `package-lock.json`, `yarn.lock`, `.next/`, `*.log`, `.env*`

### Cambios Realizados (2026-06-24)

#### Searchbar — Correcciones (ver `docs/searchbar.md`)
| # | Cambio | Archivo |
|---|---|---|
| **C1** | Colores (`specs.colores`, `specs.coloresBajoPedido`) añadidos al search text | `productSearchEngine.js` |
| **C2** | Empty state diferenciado: muestra `"No hay resultados para \"{search}\""` | `ProductGrid.jsx` |
| **M1** | Sinónimos expandidos: `botella/frasco/recipiente → envase`, `pco/corona/rosca`, `gatillera → trigger`, `tapón → tapa`. Dedup en `expandQuery()` | `productSearchEngine.js` |
| **M2** | Multi-word: AND estricto → OR con scoring parcial | `productSearchEngine.js` |
| **M3** | Search persiste en sessionStorage (`catalogo_search`) | `useProductCatalog.js` |
| **B1** | Debounce con `useDeferredValue` | `useProductCatalog.js` |
| **B3** | Fuzzy matching (Levenshtein) para typos | `productSearchEngine.js` |
| **B2** | Nuevo motor de búsqueda para blog | `blogSearchEngine.js` |
| **G1** | Searchbar global en Header (busca productos + blog + servicios). Dropdown con resultados agrupados. Versión compacta a la derecha en desktop, fila separada en móvil. | `GlobalSearchBar.jsx`, `Navbar.jsx` |
| **G2** | Nuevo motor de búsqueda para servicios | `serviciosSearchEngine.js` |

#### Vitrolero — Display Fix (solo visual, sin afectar SEO/datos)
- **Problema:** `inferirTipo()` devuelve `"Vitrolero"` para todos los productos en categoría "Tarros y Vitroleros", causando nombres duplicados en UI (ej: "Vitrolero Tarro Vitrolero Redondo..." o "Vitrolero Tarro Octogonal...")
- **Solución:** En `ProductCard.jsx`, si `parsed.tipo === "Vitrolero"`, se elimina la palabra del `nombreDisplay` (solo para render del h3). `nombreCompleto` se mantiene intacto para alt text, carrito y search text.
- **No se tocaron:** datos, slugs, SEO metadata, search engine.

### Comandos

```bash
npm run dev    # Desarrollo local
npm run build  # Build de producción (100% estático, SSG)
npm run start  # Servir build localmente
```

### Notas Clave

- El sitio es **estático** — `next build` genera HTML plano, no requiere servidor Node
- `generateStaticParams` para rutas dinámicas (`/blog/[slug]`, `/productos/[slug]`)
- Metadata SEO se define por página en `export const metadata`
- El único canal de conversión real es WhatsApp (ver `src/lib/whatsapp.js` y `src/lib/constants.js`)
