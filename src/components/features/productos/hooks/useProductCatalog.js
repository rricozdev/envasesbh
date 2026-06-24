"use client";

import { useEffect, useMemo, useState, useRef, useDeferredValue } from "react";
import { useSearchParams } from "next/navigation";
import { COLORES_FILTRO } from "@/lib/constants";

import { buildProductName } from "@/components/features/productos/ui/product/productNameFormatter";

import { searchProducts } from "@/lib/productSearchEngine";
import { parseProductName } from "@/components/features/productos/ui/product/productNameParser";
import {
  normalizarCategoria,
  obtenerRangoCapacidad,
  normalizarCapacidad,
  obtenerCapacidadOrdenable,
} from "@/components/features/productos/ui/product/productDomainModel";

export default function useProductCatalog(productos) {
  const searchParams = useSearchParams();

  const [categoria, setCategoria] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("catalogo_categoria");
      if (saved) return saved;
    }
    return searchParams.get("categoria") ?? "Todos";
  });

  const [pagina, setPagina] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("catalogo_pagina");
      if (saved) return parseInt(saved, 10);
    }
    return 1;
  });

  const [search, setSearch] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("catalogo_search") ?? "";
    }
    return "";
  });

  const deferredSearch = useDeferredValue(search);

  const [color, setColor] = useState(() => {
    if (typeof window !== "undefined")
      return sessionStorage.getItem("catalogo_color") ?? null;
    return null;
  });

  const [capacidadRango, setCapacidadRango] = useState(() => {
    if (typeof window !== "undefined")
      return sessionStorage.getItem("catalogo_capacidad") ?? null;
    return null;
  });

  const [disponibilidad, setDisponibilidad] = useState(() => {
    if (typeof window !== "undefined")
      return sessionStorage.getItem("catalogo_disponibilidad") ?? null;
    return null;
  });

  const [esMobile, setEsMobile] = useState(false);

  const isFirstRenderCategoria = useRef(true);
  const isFirstRenderSearch = useRef(true);
  const isFirstRenderColor = useRef(true);
  const isFirstRenderCapacidad = useRef(true);
  const isFirstRenderDisponibilidad = useRef(true);

  useEffect(() => {
    const checkMobile = () => setEsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("catalogo_categoria", categoria);
    sessionStorage.setItem("catalogo_pagina", String(pagina));

    if (color) sessionStorage.setItem("catalogo_color", color);
    else sessionStorage.removeItem("catalogo_color");

    if (capacidadRango)
      sessionStorage.setItem("catalogo_capacidad", capacidadRango);
    else sessionStorage.removeItem("catalogo_capacidad");

    if (disponibilidad)
      sessionStorage.setItem("catalogo_disponibilidad", disponibilidad);
    else sessionStorage.removeItem("catalogo_disponibilidad");

    if (search) sessionStorage.setItem("catalogo_search", search);
    else sessionStorage.removeItem("catalogo_search");
  }, [categoria, pagina, color, capacidadRango, disponibilidad, search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoria, pagina, color, capacidadRango]);

  useEffect(() => {
    if (isFirstRenderSearch.current) {
      isFirstRenderSearch.current = false;
      return;
    }
    setPagina(1);
  }, [search]);

  useEffect(() => {
    if (isFirstRenderCategoria.current) {
      isFirstRenderCategoria.current = false;
      return;
    }
    setPagina(1);
    setDisponibilidad(null);
  }, [categoria]);

  useEffect(() => {
    if (isFirstRenderColor.current) {
      isFirstRenderColor.current = false;
      return;
    }
    setPagina(1);
  }, [color]);

  useEffect(() => {
    if (isFirstRenderCapacidad.current) {
      isFirstRenderCapacidad.current = false;
      return;
    }
    setPagina(1);
  }, [capacidadRango]);

  useEffect(() => {
    if (isFirstRenderDisponibilidad.current) {
      isFirstRenderDisponibilidad.current = false;
      return;
    }
    setPagina(1);
  }, [disponibilidad]);

  const itemsPorPagina = esMobile ? 6 : 12;

  const filtrados = useMemo(() => {
    if (!Array.isArray(productos)) return [];

    let base =
      categoria === "Todos"
        ? productos
        : productos.filter((p) => p.categoria === categoria);

    if (deferredSearch) {
      base = searchProducts(base, deferredSearch);
    }

    if (color) {
      base = base.filter(
        (p) =>
          p.specs?.colores?.some(
            (c) =>
              typeof c === "string" && c.toLowerCase() === color.toLowerCase(),
          ) ||
          p.specs?.coloresBajoPedido?.some(
            (c) =>
              typeof c === "string" && c.toLowerCase() === color.toLowerCase(),
          ),
      );
    }

    if (capacidadRango) {
      base = base.filter((p) => {
        const capObj = normalizarCapacidad(p);
        if (!capObj?.value) return false;

        let cap = capObj.value;
        const unit = capObj.unit;

        // 🔥 conversión completa a ml
        if (unit === "l") cap *= 1000;
        if (unit === "gal") cap *= 3785;

        const rango = obtenerRangoCapacidad(cap);

        return rango === capacidadRango;
      });
    }

    if (disponibilidad === "stock")
      base = base.filter((p) => p.specs?.stockDisponible === true);

    if (disponibilidad === "pedido")
      base = base.filter((p) => p.specs?.sobrePedido === true);

    return [...base].sort((a, b) => {
      const categoriaA = normalizarCategoria(a);
      const categoriaB = normalizarCategoria(b);

      if (categoriaA < categoriaB) return -1;
      if (categoriaA > categoriaB) return 1;

      const modeloA = parseProductName(a).modelo.toLowerCase();
      const modeloB = parseProductName(b).modelo.toLowerCase();

      if (modeloA < modeloB) return -1;
      if (modeloA > modeloB) return 1;

      const capacidadA = obtenerCapacidadOrdenable(a);
      const capacidadB = obtenerCapacidadOrdenable(b);

      if (capacidadA !== capacidadB) {
        return capacidadA - capacidadB;
      }

      return a.nombre.localeCompare(b.nombre);
    });
  }, [categoria, productos, deferredSearch, color, capacidadRango, disponibilidad]);

  const totalPaginas = Math.ceil(filtrados.length / itemsPorPagina);

  const productosVisibles = useMemo(() => {
    return filtrados.slice(
      (pagina - 1) * itemsPorPagina,
      pagina * itemsPorPagina,
    );
  }, [filtrados, pagina, itemsPorPagina]);

  const maxPaginas = esMobile ? 5 : 7;

  const paginasVisibles = useMemo(() => {
    let inicio = Math.max(1, pagina - Math.floor(maxPaginas / 2));
    let fin = inicio + maxPaginas - 1;

    if (fin > totalPaginas) {
      fin = totalPaginas;
      inicio = Math.max(1, fin - maxPaginas + 1);
    }

    return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
  }, [pagina, totalPaginas, maxPaginas]);

  const opcionesBase = useMemo(() => {
    const base =
      categoria === "Todos"
        ? productos
        : productos.filter((p) => p.categoria === categoria);

    const coloresEnBase = new Set(
      base
        .flatMap((p) => [
          ...(p.specs?.colores ?? []),
          ...(p.specs?.coloresBajoPedido ?? []),
        ])
        .filter((c) => typeof c === "string")
        .map((c) => c.toLowerCase()),
    );

    const colores = COLORES_FILTRO.filter((c) =>
      coloresEnBase.has(c.toLowerCase()),
    );

    const tieneCapacidad = base.some((p) => p.specs?.capacidad);

    return { colores, tieneCapacidad };
  }, [categoria, productos]);

  return {
    categoria,
    setCategoria,
    pagina,
    setPagina,
    esMobile,
    filtrados,
    productosVisibles,
    totalPaginas,
    paginasVisibles,
    search,
    setSearch,
    color,
    setColor,
    capacidadRango,
    setCapacidadRango,
    opcionesBase,
    disponibilidad,
    setDisponibilidad,
  };
}
