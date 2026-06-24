# Searchbar — Auditoría

## Sistema evaluado

| Componente | Archivo |
|---|---|
| Motor de búsqueda | `src/lib/productSearchEngine.js` |
| Hook de estado | `src/components/features/productos/hooks/useProductCatalog.js` |
| UI Searchbar | `src/components/features/productos/ProductFilter.jsx` (líneas 210-227 mobile, 338-356 desktop) |
| Grid de resultados | `src/components/features/productos/ProductGrid.jsx` |
| Orquestador | `src/components/features/productos/ProductCatalog.jsx` |

**Alcance:** búsqueda global en Header (productos + blog + servicios). Además searchbar específica en `/productos`.

---

## Pruebas realizadas — 39 tests, 0 fallos

```
📦 1. EMPTY & NULL QUERIES       → 4/4
📦 2. BASIC TEXT MATCHING         → 8/8
📦 3. SYNONYM EXPANSION           → 4/4
📦 4. CAPACITY MATCHING           → 5/5
📦 5. NO MATCH                      → 2/2
📦 6. SCORING & RANKING           → 1/1
📦 7. SPECIFIC PRODUCT DISCOVERY  → 5/5
📦 8. UNICODE & SPECIAL CHARS      → 2/2
📦 9. INTEGRATION & EDGE           → 6/6
📦10. REGRESSION: NEW PRODUCTS    → 2/2
```

---

## Hallazgos

### 1. Capacidad: match exacto cross-unit funciona correctamente

Buscar `"1000 ml"` encuentra los 11 productos con `capacidad: 1, unidad: "L"` gracias a `toMl()` que convierte ambas magnitudes a ml antes de comparar. Es estricto (===), no hay rangos ni fuzzy.

### 2. Colores no buscables por texto

`productSearchText()` no incluye `specs.colores` ni `specs.coloresBajoPedido`. Un usuario que escribe `"azul"` en la searchbar obtiene 0 resultados, aunque existan productos en ese color vía el filtro lateral. UX confusa: el filtro "Azul" sí funciona, pero la searchbar no.

### 3. Multi-word: lógica AND estricta

Cuando la query tiene más de una palabra, el score es 0 si **alguna** palabra no aparece en el texto del producto. Ej: `"garrafa rojo"` → 0 resultados aunque exista "Garrafa 2 L" porque "rojo" no está en el search text (los colores no se indexan). Esto penaliza queries compuestas donde un término es válido pero el otro no coincide.

### 4. Sinónimos: cobertura muy escasa

Solo 2 grupos:
- `envase` / `embase` / `contenedor`
- `sinfin` / `sin fin` / `sin-fin` / `sinfín` / `sin fín`

Faltan términos de uso común:
- `botella`, `frasco`, `recipiente` → no resuelven a `envase`
- `rosca` → no resuelve a `corona` / `PCO`
- `gatillera` → no resuelve a `trigger`
- `tapón` → no resuelve a `tapa`

### 5. Sin tolerancia a errores tipográficos

`"envsae"` (typo de "envase") no pasa por ningún corrector ni fuzzy matching. Idem `"garrafa"` mal escrito como `"garafa"` o `"garrafa"` → no hay Levenshtein, trigramas ni prefix-trie. El diccionario de sinónimos es **match exacto post-normalización**, no hay expansión difusa.

### 6. Sin debounce en el input

Cada keystroke dispara `setSearch` → re-ejecuta `useMemo` con `searchProducts`. Con ~115 productos es imperceptible, pero no escala. No hay `debounce` ni `useDeferredValue`.

### 7. Mensaje de empty state no diferencia entre "sin resultados de búsqueda" y "categoría vacía"

`ProductGrid.jsx` línea 7 siempre dice `"No se encontraron productos en esta categoría."` incluso cuando el usuario escribió una búsqueda que no matchó. Debería decir algo como `"No hay productos que coincidan con \"{query}\""` cuando hay texto de búsqueda activo.

### 8. Search text no persiste en sessionStorage

`useProductCatalog` persiste `categoria`, `pagina`, `color`, `capacidadRango`, `disponibilidad` en sessionStorage, pero **no** persiste `search`. Al recargar la página se pierde el texto de búsqueda mientras los demás filtros sobreviven.

### 9. Sin búsqueda en blog ni servicios

El sitio tiene blog (`/data/blog.js`) y servicios (`/data/servicios.js`) pero no hay motor de búsqueda para ellos. No existe searchbar global en header/navbar.

---

## Recomendaciones (por impacto)

### Crítico

| # | Problema | Solución propuesta |
|---|---|---|
| C1 | Colores no buscables por texto | Agregar `specs.colores` y `specs.coloresBajoPedido` a `productSearchText()` |
| C2 | Mensaje empty state engañoso | Diferenciar empty state: si hay `search`, mostrar `"No hay resultados para \"{search}\""` |

### Medio

| # | Problema | Solución propuesta |
|---|---|---|
| M1 | Sinónimos insuficientes | Expandir `SYNONYMS` con: `botella/frasco/recipiente → envase`, `rosca → corona 28`, `gatillera → trigger`, `tapón → tapa` |
| M2 | Multi-word AND estricto | Cambiar a lógica OR con scoring parcial: cada palabra match suma puntos, no exige que todas coincidan |
| M3 | Search text no persiste | Agregar `search` al `useEffect` de sessionStorage en `useProductCatalog` |

### Bajo

| # | Problema | Solución propuesta |
|---|---|---|
| B1 | Sin debounce | Envolver `setSearch` con debounce de 150-300ms o usar `useDeferredValue` |
| B2 | Sin búsqueda en blog | Crear `src/lib/blogSearchEngine.js` (misma arquitectura, dataset blog) |
| B3 | Sin tolerancia a typos | Integrar librería ligera de fuzzy matching (e.g. `fuse.js`) o implementar Levenshtein básico para queries cortas |

---

## Correcciones implementadas (2026-06-24)

| # | Cambio | Archivo | Líneas |
|---|---|---|---|
| **C1** | Colores (`specs.colores`, `specs.coloresBajoPedido`) añadidos al search text | `productSearchEngine.js` | 119-120 |
| **C2** | Empty state diferenciado: muestra `"No hay resultados para \"{search}\""` cuando hay búsqueda activa | `ProductGrid.jsx`, `ProductCatalog.jsx` | 5-7, 75 |
| **M1** | Sinónimos expandidos: `botella/frasco/recipiente → envase`, `pco/corona/rosca`, `gatillera → trigger`, `tapón → tapa`. Además deduplicación en `expandQuery()` | `productSearchEngine.js` | 19-25, 48 |
| **M2** | Multi-word cambió de AND estricto a OR con scoring parcial: cada palabra que matchea suma puntos, proporcional al ratio de acierto | `productSearchEngine.js` | 196-205 |
| **M3** | Search persiste en sessionStorage (clave `catalogo_search`) | `useProductCatalog.js` | 37-44, 94-95 |
| **B1** | Debounce implementado con `useDeferredValue` de React 18+ en lugar de custom hook | `useProductCatalog.js` | 3, 44, 153-154, 217 |
| **B3** | Fuzzy matching: Levenshtein distance para queries cortas (dist 1 si ≤5 chars, dist 2 si >5) | `productSearchEngine.js` | 143-167, 198-199 |
| **B2** | Nuevo motor `blogSearchEngine.js` — misma arquitectura que el de productos: normalize, Levenshtein fuzzy, scoring por ratio de palabras | `blogSearchEngine.js` | nuevo |
| **G1** | Searchbar global en Header: busca simultáneamente en productos, blog y servicios. Resultados agrupados por tipo con dropdown. Integrada a la derecha de los links en desktop, fila separada en móvil. Variante compacta. | `GlobalSearchBar.jsx`, `Navbar.jsx` | nuevos |
| **G2** | Nuevo motor `serviciosSearchEngine.js` — misma arquitectura que product/blog | `serviciosSearchEngine.js` | nuevo |

---

## Conclusión

El motor es **sintácticamente robusto** (no crashea con null, empty, unicode, caracteres especiales) y **semánticamente correcto** para el caso de uso principal (buscar productos por nombre/capacidad/categoría). Las carencias principales están en la **experiencia de usuario** (colores no buscables, mensajes de error genéricos, falta de sinónimos) y en la **ausencia de búsqueda global** para blog/servicios.
