"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { COLORES_FILTRO } from "@/lib/constants";

export default function useProductCatalog(productos) {
  const searchParams = useSearchParams();

  const [categoria, setCategoria] = useState(() => {
    return searchParams.get("categoria") ?? "Todos";
  });

  const [pagina, setPagina] = useState(1);
  const [search, setSearch] = useState("");
  const [color, setColor] = useState(null);
  const [capacidadRango, setCapacidadRango] = useState(null);

  const [esMobile, setEsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setEsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoria]);

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

    return base;
  }, [categoria, productos, search, color, capacidadRango]);

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
    setPagina(1);
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
  };
}
