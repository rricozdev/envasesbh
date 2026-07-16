# Issues Overview Report — SEO Website

## 🔴 Alta Prioridad

| Problema | Tipo | URLs afectadas | % del total |
|---|---|---|---|
| Error de cliente interno (4xx) — Enlaces rotos / 404 | Problema | 9 | 18.75% |
| Hreflang: URL hreflang sin código 200 | Problema | 1 | 100% |
| Canonical no indexable | Problema | 1 | 100% |
| Canonicalizada | Aviso | 1 | 100% |

## 🟡 Media Prioridad

| Problema | Tipo | URLs afectadas | % del total |
|---|---|---|---|
| Imágenes > 100 kB | Oportunidad | 5 | 62.5% |

## 🟢 Baja Prioridad

| Problema | Tipo | URLs afectadas | % del total |
|---|---|---|---|
| Falta encabezado X-Frame-Options | Aviso | 23 | 54.76% |
| Falta encabezado Referrer-Policy | Aviso | 23 | 54.76% |
| Falta encabezado X-Content-Type-Options | Aviso | 23 | 54.76% |
| Falta encabezado Content-Security-Policy | Aviso | 23 | 54.76% |
| Imágenes: atributos de tamaño ausentes | Oportunidad | 7 | 87.5% |
| Redirección interna (3xx) | Aviso | 10 | 20.83% |
| URLs con mayúsculas | Aviso | 4 | 9.52% |
| URLs con parámetros | Aviso | 4 | 9.52% |
| Hreflang: Falta X-Default | Aviso | 1 | 100% |

---

## Detalle y soluciones

### 1. Error de cliente interno (4xx) — 9 URLs
**Descripción:** URLs internas que devuelven error 4xx (comúnmente 404). Indican enlaces rotos.

**Solución:** Actualizar cada enlace para que apunte a la URL correcta, o eliminar/redirigir según corresponda.

### 2. Redirección interna (3xx) — 10 URLs
**Descripción:** URLs internas que redirigen a otra URL (301, 302, etc.).

**Solución:** Apuntar los enlaces internos directamente a la URL canónica final para reducir latencia.

### 3. Hreflang: URL hreflang sin código 200 — 1 URL
**Descripción:** URL en anotación hreflang que no responde con 200 OK.

**Solución:** Asegurar que todas las URLs en anotaciones hreflang sean rastreables e indexables (200 OK).

### 4. Hreflang: Falta X-Default — 1 URL
**Descripción:** Falta el atributo `x-default` en hreflang.

**Solución:** Opcional — añadir página alternativa para idiomas no coincidentes.

### 5. Canónicas: Canonicalizada — 1 URL
**Descripción:** Página con canonical apuntando a otra URL diferente.

**Solución:** Revisar que la canonicalización sea correcta y actualizar enlaces internos a la versión canónica.

### 6. Canónicas: Canonical no indexable — 1 URL
**Descripción:** URL canónica que apunta a una página no indexable (bloqueada por robots.txt, 4xx, etc.).

**Solución:** Asegurar que la canónica sea una página indexable.

### 7. Imágenes > 100 kB — 5 imágenes
**Descripción:** Imágenes con tamaño de archivo excesivo que ralentizan la carga.

**Solución:** Optimizar imágenes con compresión, escalado adecuado y formato apropiado.

### 8. Imágenes: Atributos de tamaño ausentes — 7 imágenes
**Descripción:** Imágenes sin atributos `width` y `height` en HTML, causando CLS (Cumulative Layout Shift).

**Solución:** Agregar atributos `width` y `height` a todas las imágenes en el HTML.

### 9. Seguridad: Falta X-Frame-Options — 23 URLs
**Solución:** Agregar header `X-Frame-Options: DENY` o `X-Frame-Options: SAMEORIGIN`.

### 10. Seguridad: Falta Referrer-Policy — 23 URLs
**Solución:** Agregar header `Referrer-Policy: strict-origin-when-cross-origin`.

### 11. Seguridad: Falta X-Content-Type-Options — 23 URLs
**Solución:** Agregar header `X-Content-Type-Options: nosniff`.

### 12. Seguridad: Falta Content-Security-Policy — 23 URLs
**Solución:** Establecer un header `Content-Security-Policy` estricto.

### 13. URLs con mayúsculas — 4 URLs
**Solución:** Usar solo minúsculas en URLs. Si se cambian, implementar redirecciones 301.

### 14. URLs con parámetros — 4 URLs
**Solución:** Usar URLs estáticas sin parámetros para páginas indexables clave.
