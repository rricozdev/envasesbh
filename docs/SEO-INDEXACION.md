# Diagnóstico de Indexación — Envases BH

## Resumen

El sitio `www.envasesbh.mx` presenta **19 URLs no indexables** según herramienta SEO. Sin embargo, tras revisar el código fuente y el build estático (`out/`), **no hay ninguna directiva `noindex`** en las páginas reales del sitio.

---

## 1. Revisión de Código Fuente (`src/`)

### `src/lib/metadata-config.js` (línea 46-57)

```js
robots: {
  index: true,
  follow: true,
  // ...
}
```

✅ Configuración base correcta: `index, follow`.

### Páginas individuales

Ninguna página sobreescribe `robots` con `noindex`:

| Página | Archivo | ¿Sobreescribe robots? |
|---|---|---|
| Home | `src/app/page.js` | ❌ No (hereda layout) |
| Productos | `src/app/productos/page.js` | ❌ No |
| Producto detalle | `src/app/productos/[slug]/page.js` | ❌ No |
| Servicios | `src/app/servicios/page.js` | ❌ No |
| Quiénes somos | `src/app/quienes-somos/page.js` | ❌ No |
| Contacto | `src/app/contacto/page.js` | ❌ No |
| Blog | `src/app/(blog)/blog/page.js` | ❌ No |
| Blog detalle | `src/app/(blog)/blog/[slug]/page.js` | ❌ No |
| Proyectos a tu medida | `src/app/proyectos-a-tu-medida/page.js` | ❌ No |
| Privacidad | `src/app/legal/privacidad/page.js` | ❌ No |

### `next.config.mjs`

No hay headers `X-Robots-Tag`. Config limpia, solo `output: 'export'`.

### `public/robots.txt`

```
User-agent: *
Allow: /
```

✅ Permisivo, sin bloqueos.

---

## 2. Revisión del Build Estático (`out/`)

Todas las páginas generadas tienen `robots: index, follow`:

| Archivo | Robots tag |
|---|---|
| `out/index.html` | ✅ `index, follow` |
| `out/productos.html` | ✅ `index, follow` |
| `out/servicios.html` | ✅ `index, follow` |
| `out/quienes-somos.html` | ✅ `index, follow` |
| `out/contacto.html` | ✅ `index, follow` |
| `out/blog.html` | ✅ `index, follow` |
| `out/proyectos-a-tu-medida.html` | ✅ `index, follow` |

**Únicos archivos con `noindex`:** `out/404.html` y `out/_not-found.html` — es correcto, las páginas de error no deben indexarse.

---

## 3. Causas Probables del Reporte

El código y el build están limpios. El problema está **fuera del repositorio**:

### 3.1. Servidor / Hosting (cPanel)

cPanel/Apache puede estar agregando cabeceras `X-Robots-Tag: noindex` a nivel de servidor. Revisar:

- `.htaccess` en el servidor (no existe en el repo)
- Configuración de Apache/cPanel
- Reglas de `mod_headers` que agreguen `X-Robots-Tag`

### 3.2. Deploy Anterior

Si se subió una versión anterior del sitio que sí tuviera `noindex`, Google pudo haber cacheado esa información. Solución: hacer un deploy fresco del `out/` actual y solicitar recrawleo en Google Search Console.

### 3.3. URLs con Query Params (`productos?categoria=...`)

El sitio usa `output: 'export'` (100% estático). Las URLs con query params **no generan archivos HTML independientes**. Solo funcionan client-side vía JavaScript. Google no puede crawlearlas ni indexarlas.

**Productos afectados:**
- `productos?categoria=...` (filtros del catálogo)

---

## 4. Recomendaciones

### 4.1. Revisar servidor
- Buscar archivo `.htaccess` en el servidor cPanel
- Verificar que no haya `Header set X-Robots-Tag "noindex"` en la configuración de Apache

### 4.2. Subir build fresco
- Hacer `npm run build`
- Subir todo `out/` limpio al servidor
- Solicitar recrawleo en Google Search Console

### 4.3. (Opcional) Rutas estáticas por categoría
Si se desea que Google indexe productos filtrados por categoría, crear rutas tipo:

```
/productos/categoria/[categoria]  →  con generateStaticParams
```

Esto generaría archivos HTML reales como `out/productos/categoria/tarros-y-vitroleros.html`.

Actualmente `src/app/productos/[slug]/page.js` ya tiene `generateStaticParams` para detalle de producto. La página de listado (`src/app/productos/page.js`) no lo necesita por ser estática simple, pero **no genera páginas para cada categoría**.

---

## Archivos Revisados

| Archivo | Línea relevante |
|---|---|
| `src/lib/metadata-config.js` | 46-57 (robots config) |
| `src/app/layout.js` | 24 (baseMetadata heredado) |
| `src/app/productos/[slug]/page.js` | 63-65 (generateStaticParams) |
| `next.config.mjs` | — (sin headers) |
| `public/robots.txt` | 1-3 (Allow: /) |

---

*Documento generado el 10 de junio de 2026*
