/**
 * PARSER DEPRECADO PARA UI
 *
 * Estado actual:
 * - NO debe usarse para construcción de nombres
 * - SOLO puede usarse en search legacy si es necesario
 *
 * Fuente de verdad del sistema:
 * - producto.nombre
 * - producto.specs.capacidad
 * - producto.specs.unidad
 *
 * Este parser queda como adaptador temporal.
 */

import { inferirTipo, normalizarUnidad } from "./productDomainModel";

export function parseProductName(producto) {
  if (!producto) {
    return {
      tipo: "",
      modelo: "",
      capacidad: null,
      unidad: "",
    };
  }

  const nombre = (producto.nombre || "").trim();

  const match = nombre.match(
    /(\d+(?:\.\d+)?)\s*(ml|l|litro|litros|gal|galon|galón|galones)$/i,
  );

  let modelo = nombre;
  let capacidad = producto?.specs?.capacidad ?? null;
  let unidad = producto?.specs?.unidad ?? "";

  if (match) {
    modelo = nombre.replace(match[0], "").trim() || nombre;

    if (capacidad == null) {
      capacidad = Number(match[1]);
    }

    if (!unidad) {
      unidad = normalizarUnidad(match[2]);
    }
  }

  return {
    tipo: inferirTipo(producto),
    modelo,
    capacidad,
    unidad,
  };
}
