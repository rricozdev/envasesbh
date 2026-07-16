# Estrategia SEO — envasesbh.mx

## Contexto competitivo

| Competidor | Ventaja | Por qué domina |
|---|---|---|
| envases.mx | Autoridad global (1993, 92 sedes) | Backlinks masivos multi-país, keyword exacto en dominio |
| envaseslamerced.mx | Nicho México consolidado | SEO técnico ya corregido, sitemap limpio |
| envasesbh.mx | Nicho + local | Sin autoridad de dominio aún |

**Conclusión:** No competir en "envases" genérico. Competir en long-tail + local + nicho de producto.

---

## 1. Arquitectura de keywords (long-tail primero)

**Nivel 1 — Producto + ciudad/estado**
- envases PET [ciudad]
- envases plásticos [estado]
- proveedor envases PET [región]

**Nivel 2 — Producto + industria**
- envases PET para cosméticos
- envases PET para alimentos
- envases PET aseo personal / industrial

**Nivel 3 — Producto + especificación**
- envase PET 500ml transparente
- envase PET ámbar [capacidad]
- envase PET boca ancha / angosta

**Nivel 4 — Marca**
- envasesbh
- envases BH México

Cada nivel = 1 página dedicada. No mezclar keywords en una sola URL.

---

## 2. Arquitectura de contenido

```
/productos/[categoria]/[producto]/
/productos/[categoria]/[producto]/[ciudad]/   (páginas locales por sucursal/zona de cobertura)
/industrias/[industria]/
/blog/[tema-tecnico]/
```

- Cada página producto: descripción técnica, capacidad, material, certificaciones, imágenes reales, CTA cotización.
- Schema.org: `Product`, `Organization`, `LocalBusiness`, `BreadcrumbList`, `FAQPage`.
- Evitar contenido duplicado entre variantes de color/capacidad (usar `generateStaticParams` + canonical si aplica).

---

## 3. SEO técnico (base obligatoria)

- [ ] GSC verificado + sitemap.xml enviado (`next-sitemap`)
- [ ] Canonical único (resolver mismatch www / non-www)
- [ ] `.htaccess`: HTTPS forzado, redirects 301 limpios, headers de seguridad
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1 (optimizar imágenes, lazy load)
- [ ] Mobile-first: navbar sticky, CTA visible above the fold
- [ ] robots.txt sin bloqueos accidentales
- [ ] JSON-LD validado (Rich Results Test)
- [ ] URLs limpias, sin parámetros de query como ruta principal

---

## 4. SEO local (mayor ROI a corto plazo)

- Google Business Profile: categoría correcta, fotos reales, horario, zona de cobertura.
- NAP consistente (Nombre, Dirección, Teléfono) en todo el sitio y directorios externos.
- Página "Cobertura" o "Zonas de entrega" con ciudades objetivo.
- Reseñas de clientes reales solicitadas activamente (velocidad + volumen importan).

---

## 5. Backlinks (autoridad progresiva)

**Prioridad alta**
- Directorios industria: Cámara de la Industria del Plástico, ANIPAC, directorios B2B packaging.
- Testimonios de clientes actuales (Envases La Merced, Escowill, etc.) con link a envasesbh.mx si aplica relación comercial.
- Notas de prensa/casos de éxito en medios de industria de empaque.

**Prioridad media**
- Guest posts en blogs de industria alimentaria/cosmética.
- Perfil en marketplaces B2B (Alibaba, Thomasnet si exportan).

**Evitar**
- Compra de enlaces masivos/farms — riesgo penalización.

---

## 6. Contenido de autoridad (blog técnico)

Temas que capturan búsquedas informacionales + generan backlinks naturales:

- "Cómo elegir el envase PET correcto para tu producto"
- "Diferencias entre PET virgen y PET reciclado en envases"
- "Normativas de envase para alimentos en México (NOM aplicable)"
- "Guía de capacidades y bocas estándar en envases PET"

Cada artículo enlaza internamente a páginas de producto relevantes (internal linking).

---

## 7. KPIs y timeline

| Fase | Duración | Objetivo | Métrica |
|---|---|---|---|
| Fase 1 — Técnico | 0–1 mes | Indexación 100% sin errores | GSC cobertura |
| Fase 2 — Local | 1–3 meses | Top 3 en "envases PET [ciudad]" | Search Console posición |
| Fase 3 — Contenido | 3–6 meses | 15+ páginas long-tail rankeando | Tráfico orgánico +50% |
| Fase 4 — Autoridad | 6–12 meses | 20+ backlinks de calidad | Domain Rating (Ahrefs/Moz) |

---

## 8. Qué NO hacer

- No intentar rankear "envases" genérico (imposible vs. envases.mx).
- No duplicar contenido entre páginas de producto por color/tamaño sin canonical.
- No descuidar velocidad móvil por priorizar diseño visual.
