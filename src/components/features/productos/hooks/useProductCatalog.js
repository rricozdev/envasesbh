"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { COLORES_FILTRO } from "@/lib/constants";

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

  const setPaginaDebug = (val) => {
    console.trace("setPagina llamado con:", val);
    setPagina(val);
  };

  useEffect(() => {
    const checkMobile = () => setEsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Persistir estado en sessionStorage
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
  }, [categoria]);

  useEffect(() => {
    if (isFirstRenderSearch.current) {
      isFirstRenderSearch.current = false;
      return;
    }
    setPagina(1);
  }, [search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [color, capacidadRango]);

  const itemsPorPagina = esMobile ? 6 : 12;

  const filtrados = useMemo(() => {
    let base =
      categoria === "Todos"
        ? productos
        : productos.filter((p) => p.categoria === categoria);

    if (search) {
      base = base.filter((p) =>
        p.nombre.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (color) {
      base = base.filter((p) =>
        p.specs?.colores?.some((c) => c?.toLowerCase() === color.toLowerCase()),
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

    // return base;
    // reordenado de lista de productos por capacidades,
    return [...base].sort((a, b) => {
      const capA = a.specs?.capacidad ?? Infinity;
      const capB = b.specs?.capacidad ?? Infinity;

      return capA - capB;
    });
  }, [categoria, productos, search, color, capacidadRango, disponibilidad]);

  const opcionesBase = useMemo(() => {
    const base =
      categoria === "Todos"
        ? productos
        : productos.filter((p) => p.categoria === categoria);

    const coloresEnBase = new Set(
      base
        .flatMap((p) => p.specs?.colores?.filter(Boolean) ?? [])
        .map((c) => c.toLowerCase()),
    );

    const colores = COLORES_FILTRO.filter((c) =>
      coloresEnBase.has(c.toLowerCase()),
    );
    const tieneCapacidad = base.some((p) => p.specs?.capacidad);

    return { colores, tieneCapacidad };
  }, [categoria, productos]);

  useEffect(() => {
    if (isFirstRenderCategoria.current) {
      isFirstRenderCategoria.current = false;
      return;
    }
    setPagina(1);
    setDisponibilidad(null);
  }, [categoria]);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pagina]);

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
