"use client";

import { useEffect, useMemo, useState } from "react";

export default function useProductCatalog(productos) {
  /**
   * Estado de categoría seleccionada
   */
  const [categoria, setCategoria] = useState("Todos");

  /**
   * Estado de paginación
   */
  const [pagina, setPagina] = useState(1);

  const [search, setSearch] = useState("");

  /**
   * Responsive
   */
  const [esMobile, setEsMobile] = useState(false);

  /**
   * Detecta viewport mobile
   */
  useEffect(() => {
    const checkMobile = () => {
      setEsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /**
   * Productos por página
   */
  const itemsPorPagina = esMobile ? 6 : 12;

  /**
   * Filtrado
   */
  const filtrados = useMemo(() => {
    const base =
      categoria === "Todos"
        ? productos
        : productos.filter((p) => p.categoria === categoria);

    if (!search) return base;

    return base.filter((p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categoria, productos, search]);

  /**
   * Reinicia página al cambiar categoría
   */
  useEffect(() => {
    setPagina(1);
  }, [categoria]);

  /**
   * Total páginas
   */
  const totalPaginas = Math.ceil(filtrados.length / itemsPorPagina);

  /**
   * Productos visibles
   */
  const productosVisibles = useMemo(() => {
    return filtrados.slice(
      (pagina - 1) * itemsPorPagina,
      pagina * itemsPorPagina,
    );
  }, [filtrados, pagina, itemsPorPagina]);

  /**
   * Ventana paginación
   */
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

  /**
   * Scroll automático
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
  };
}
