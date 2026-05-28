"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { COLORES_FILTRO } from "@/lib/constants";

/**
 * Función de utilidad para obtener una categoría limpia y simplificada.
 */
const obtenerCategoriaLimpia = (producto) => {
  const cat = producto.categoria || "";
  const nombre = producto.nombre.toLowerCase();

  if (cat.includes(",") || cat.toLowerCase().includes(" y ")) {
    if (nombre.includes("tapa")) return "Tapas";
    if (nombre.includes("bomba")) return "Bombas";
    if (nombre.includes("trigger") || nombre.includes("atomizador"))
      return "Triggers";
  }

  const primera = cat
    .trim()
    .split(/[\s,]+/)[0]
    .toLowerCase();
  return primera.charAt(0).toUpperCase() + primera.slice(1);
};

export default function useProductCatalog(productos) {
  const searchParams = useSearchParams();

  // ESTADOS
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

  const [search, setSearch] = useState("");

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

  // PREFIJOS QUE NO LLEVAN "Envase"
  const PREFIJOS_PROPIOS = [
    "tapa",
    "trigger",
    "tarro",
    "vitrolero",
    "bomba",
    "atomizador",
    "flip",
    "mini",
  ];

  // EFECTOS
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
  }, [categoria, pagina, color, capacidadRango, disponibilidad]);

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

  const itemsPorPagina = esMobile ? 6 : 12;

  // LÓGICA DE FILTRADO Y BÚSQUEDA ULTRA-PRECISA
  const filtrados = useMemo(() => {
    if (!Array.isArray(productos)) return [];

    let base =
      categoria === "Todos"
        ? productos
        : productos.filter((p) => p.categoria === categoria);

    if (search) {
      const query = search.toLowerCase().trim();
      const searchTerms = query.split(/\s+/);

      base = base.filter((p) => {
        const esAccesorio = PREFIJOS_PROPIOS.some((prefijo) =>
          p.nombre.toLowerCase().startsWith(prefijo),
        );
        const nombreVirtual = esAccesorio ? p.nombre : `Envase ${p.nombre}`;

        const stringParaBuscar = `
          ${nombreVirtual} 
          ${p.categoria} 
          ${p.slug} 
          ${p.specs?.corona || ""}
        `.toLowerCase();

        // BÚSQUEDA INTELIGENTE POR TÉRMINOS
        return searchTerms.every((term) => {
          // Si el término es puramente numérico (ej. "25"), usamos Regex para buscarlo como palabra exacta
          // Esto evita que "25" coincida con "125" o "250"
          if (/^\d+$/.test(term)) {
            const regex = new RegExp(`\\b${term}\\b`);
            return regex.test(stringParaBuscar);
          }

          // Para términos de texto (ej. "Envase", "ml"), usamos el include normal
          return stringParaBuscar.includes(term);
        });
      });
    }

    // Filtros adicionales (Color, Capacidad, Disponibilidad)
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
        const cap = p.specs?.capacidad;
        if (!cap) return false;
        if (capacidadRango === "micro") return cap < 100;
        if (capacidadRango === "pequeno") return cap >= 100 && cap <= 500;
        if (capacidadRango === "mediano") return cap > 500 && cap <= 1000;
        if (capacidadRango === "grande") return cap > 1000;
        return true;
      });
    }

    if (disponibilidad === "stock")
      base = base.filter((p) => p.specs?.stockDisponible === true);
    if (disponibilidad === "pedido")
      base = base.filter((p) => p.specs?.sobrePedido === true);

    // ORDENAMIENTO (Categoría A-Z -> Capacidad Menor a Mayor)
    return [...base].sort((a, b) => {
      const catA = obtenerCategoriaLimpia(a);
      const catB = obtenerCategoriaLimpia(b);
      if (catA < catB) return -1;
      if (catA > catB) return 1;
      const capA = a.specs?.capacidad ?? Infinity;
      const capB = b.specs?.capacidad ?? Infinity;
      if (capA !== capB) return capA - capB;
      return a.nombre.localeCompare(b.nombre);
    });
  }, [categoria, productos, search, color, capacidadRango, disponibilidad]);

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
