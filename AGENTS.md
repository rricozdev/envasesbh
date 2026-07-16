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

#### Tarro/Vitrolero — Corrección de Nombres (2026-06-30)
- **Problema:** 7 productos con `corona: 110` (Rosca 110 = Vitrolero) tenían `nombre` empezando con "Tarro" en lugar de "Vitrolero".
- **Solución:** Se cambió `nombre` y `slug` de esos 7 productos en `productos.js` y `productos.with-specs.json`. Se añadió `"tarro "` a `PREFIJOS_EN_NOMBRE` en `productDomainModel.js` para evitar doble prefijo. Se eliminó el band-aid de `ProductCard.jsx` (ya no necesario).

#### SEO — Correcciones Masivas (2026-07-03)

**Contexto:** Screaming Frog SEO Spider reportó 14 issues en `https://www.envasesbh.mx`. Google Search Console reportaba 48 páginas con 403, 175 sin indexar y solo 68 indexadas. El objetivo es posicionar #1 para "Envases PET México" (actualmente #5).

##### Dominio estandarizado: `envasesbh.mx` → `www.envasesbh.mx`
El sitemap usaba `www.envasesbh.mx` pero canonicals, hreflangs, OG y JSON-LD usaban `envasesbh.mx` (sin www). Esto creaba señales contradictorias para Google. Se unificó todo a `https://www.envasesbh.mx` en:
- `src/lib/metadata-config.js` — `metadataBase`, `openGraph.url`, `alternates.canonical`, `alternates.languages`, `baseJsonLd`
- `src/lib/metadata-helper-productos.js` — URLs de producto, OG images, JSON-LD
- Todas las páginas: `page.js`, `productos/page.js`, `contacto/page.js`, `servicios/page.js`, `quienes-somos/page.js`, `proyectos-a-tu-medida/page.js`, `blog/page.js`, `blog/[slug]/page.js`

##### Canonicals por página (antes heredaban el root)
`/productos`, `/blog`, `/contacto`, `/blog/[slug]` heredaban `canonical: "https://envasesbh.mx"` del `baseMetadata`. Cada página ahora tiene su propio canonical apuntando a su URL real. `generateMetadata` en `blog/[slug]/page.js` ahora retorna metadata completa (OG, canonical, alternates).

##### hreflang x-default
Se añadió `"x-default"` a todas las configuraciones de `alternates.languages` en metadata-config, metadata-helper-productos y todas las páginas.

##### Security headers en `.htaccess`
El servidor cPanel no tenía headers de seguridad. Se añadieron al `.htaccess`:
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` (estricta para sitio estático)
- `Permissions-Policy`

##### Error 403 masivo (48 páginas) — Causa raíz y fix
**Diagnóstico:** El log de errores del servidor (`docs/Latest web server error log messages.odt`) reveló que Apache intentaba servir directorios físicos vacíos (`/productos/`, `/contacto/`, etc.) en lugar de aplicar la regla de rewrite a `index.html`. Al no encontrar `DirectoryIndex` dentro del directorio, devolvía 403 Forbidden.
**Fix:** `Options All -Indexes` → `Options +FollowSymLinks +MultiViews -Indexes` en `.htaccess`. `+MultiViews` le dice a Apache que `/productos` → `productos.html` sin requerir directorios físicos.

##### Enlaces rotos (4xx) corregidos en código
| # | Archivo | Corrección |
|---|---|---|
| F1-F2 | `src/data/servicios.js` | `/img/etiquetado.png` → `/img/servicios_etiquetado_pigmentacion.webp`; `/img/pigmentado.png` → `/img/img_etiquetado.webp` |
| F5 | `src/lib/metadata-config.js` | JSON-LD `logo-bh-3.png` → `logo-bh-3a.png` (no existía `logo-bh-3.png`) |
| F6 | `src/app/proyectos-a-tu-medida/page.js` | OG image `/exploracion_envases.webp` → `/img/steps/exploracion_envases.webp` |
| F7 | `src/components/layout/Footer.jsx` | Emails `@envasesbh.com` → `@envasesbh.mx` |
| F15 | `src/data/productos.js` | Categoría `"Tapas , Bombas y Triggers"` → `"Tapas, Bombas y Triggers"` (espacios rompían filtros del chatbot, 18 productos) |

##### Imágenes: atributo `sizes`
Se añadió `sizes` a componentes que usaban `next/image fill` sin él: `PigmentacionSection.jsx`, `PostCard.jsx`, `ProccesCard.jsx`, `blog/[slug]/page.js`.

##### Metadata página de privacidad
`src/app/legal/privacidad/page.jsx` no tenía `export const metadata`. Se añadió con title, description, canonical y `robots: { index: false }`.

##### Sitemap
`next-sitemap.config.js` ahora asigna prioridades diferenciadas: home 1.0, productos 0.9, productos/detalle 0.8, blog 0.6, legal 0.3. Frecuencias: `weekly`, `monthly`, `yearly` según la sección.

##### Slug con mayúscula
`1lt-boston-C` → `1lt-boston-c` en `src/data/productos.js`.

##### Verification codes
`metadata-config.js` tenía placeholders `"tu-google-verification-code"`. Se reemplazó por el código real de Google Search Console.

##### Google Search Console — Pendientes post-deploy
1. Validar corrección del problema "403 — acceso no permitido" (48 páginas)
2. Reenviar sitemap
3. Solicitar recrawleo de URLs afectadas

##### Issues NO resueltos (requieren acciones externas al código)
- **5 imágenes >100 kB:** requieren compresión manual (WebP/AVIF)
- **Imágenes sin width/height:** `next/image fill` + `output: export` no genera atributos HTML de tamaño por limitación del stack
- **URLs con parámetros:** no solucionable en static export (filtros cliente-side)
- **Redirects 3xx:** son legítimos (HTTP→HTTPS, non-www→www)

#### Rincón de Promociones — Nueva sección `/promociones` (2026-07-16)

- **Datos:** `src/data/promociones.js` — cada promoción referencia un producto del catálogo por `slugProducto` (sin duplicar datos). `TIPOS_PROMOCION` soporta: descuento, volumen, bundle, envioGratis, temporal, liquidacion, lanzamiento, precioEspecial. IDs auto-generados con `.map()` (mismo patrón que `productos.js`).
- **Dominio:** `src/components/features/promociones/promocionesModel.js` — estados por vigencia (`activa`/`proxima`/`expirada`, fin de día inclusivo), join con `PRODUCTOS`, formateo de fechas, mensaje de WhatsApp por promoción. Las expiradas nunca se renderizan.
- **Componentes:** `PromocionCard.jsx` (card nueva basada en el lenguaje visual de `ProductCard`, con badge de tipo, beneficio, vigencia y CTA a WhatsApp), `PromocionBadge.jsx`, `PromocionesGrid.jsx` (secciones activas/próximas + empty state; re-evalúa vigencias en cliente con `useSyncExternalStore` porque el estado se calcula en build por el static export).
- **Página:** `src/app/promociones/page.js` — hero con patrón de `servicios/page.js`, pasos "cómo funciona", metadata completa (OG, Twitter, canonical, hreflang x-default), JSON-LD `ItemList` de `Offer` con `validFrom`/`validThrough`, enlaces internos a `/productos` y `/servicios`.
- **Integración:** link `PROMOCIONES` en `nav.config.js` (Navbar/MobileMenu/Footer lo consumen), entrada en columna "Productos & Servicios" del Footer, `routes.promociones` en `metadata-config.js`, prioridad 0.8/weekly en `next-sitemap.config.js`.
- **Conversión:** el CTA de cada card abre `wa.me` vía `sendMessgeWassap()` con mensaje pre-formateado (producto + beneficio). No hay checkout.

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
