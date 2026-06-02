# AGENTS.md

## Tecnología y Arquitectura

Este proyecto es un **monolito frontend** construido con:

- **Next.js (App Router)** - Framework de React con enrutamiento basado en archivos
- **JSX** - Sintaxis de React
- **TailwindCSS** - Framework de estilos utilitario
- **Single Responsibility Principle (SRP)** - Cada componente tiene una única responsabilidad

⚠️ **IMPORTANTE**: No hay backend. Todo es cliente-side:

- Los datos vienen de archivos locales (`/data/*.js`)
- No hay API propia, base de datos, ni autenticación
- El carrito (`CartContext`) es solo estado local del navegador
- El chatbot es simulado con flujos predefinidos en `/data/chatbot/`

## Estructura del Proyecto

```
src/
├── app/                    # Rutas y páginas (Next.js App Router)
│   ├── (blog)/blog/        # Blog con slugs dinámicos
│   ├── contacto/           # Página de contacto
│   ├── legal/privacidad/   # Página legal
│   ├── productos/          # Catálogo y detalle de productos
│   ├── proyectos-a-tu-medida/
│   ├── quienes-somos/
│   └── servicios/
│
├── components/             # Componentes reutilizables
│   ├── features/           # Componentes por feature (SRP)
│   │   ├── blog/          # Blog: PostCard, PostList
│   │   ├── cart/          # Carrito: Botones, Drawer
│   │   ├── chatbot/       # Chatbot simulado
│   │   ├── contacto/      # Formularios, sucursales
│   │   ├── home/          # Secciones del homepage
│   │   ├── productos/     # Cards, filtros, galerías, hooks, UI
│   │   ├── proyectos/     # Cotizaciones
│   │   ├── proyecto_a_medida/ # Proceso paso a paso
│   │   └── servicios/      # Cards de servicios
│   ├── layout/            # Layout global
│   │   └── Header/        # Header, navbar, mobile menu
│   └── ui/                # UI puros y reutilizables
│
├── config/                # Configuración del sitio y navegación
├── context/               # React Contexts (Cart, UI)
├── data/                  # Datos estáticos (productos, blog, servicios, chatbot)
├── lib/                   # Utilidades y helpers
└── ...
```

## Reglas para Desarrollo

### 1. Nuevos Componentes

- Crear en `components/features/[nombre-feature]/` si es específico
- Crear en `components/ui/` si es genérico y reusable
- Un archivo por componente (SRP)

### 2. Nuevas Rutas

- Crear carpeta en `app/` con `page.js`
- Usar `(carpeta)` para rutas agrupadas sin afectar URL

### 3. Datos

- Modificar archivos en `/data/` para cambiar contenido
- No crear APIs ni llamadas externas (no hay backend)

### 4. Estilos

- Usar TailwindCSS exclusivamente
- No crear archivos .css adicionales (excepto `globals.css`)

### 5. Estado Global

- Usar Context API (`/context/`) para estado compartido
- El carrito persiste solo en memoria/localStorage

## Archivos a Ignorar

- `node_modules/`
- `package-lock.json`
- `yarn.lock`
- `.next/`
- `*.log`
- `.env*`

## Comandos Útiles

```bash
npm run dev      # Desarrollo local
npm run build    # Build de producción (solo estático)
npm run start    # Servir build
```

## Notas Adicionales

- El sitio es **estático** - no hay SSR complejo (excepto metadata)
- El chatbot es **simulado** - no integra IA real
- El carrito no tiene checkout real - solo UI demostrativa
- WhatsApp es el único canal de conversión real (ver `/lib/whatsapp.js`)
