// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { COLORES_FILTRO } from "@/lib/constants";

// export default function useProductCatalog(productos) {
//   const searchParams = useSearchParams();

//   const [categoria, setCategoria] = useState(() => {
//     return searchParams.get("categoria") ?? "Todos";
//   });

//   const [pagina, setPagina] = useState(1);
//   const [search, setSearch] = useState("");
//   const [color, setColor] = useState(null);
//   const [capacidadRango, setCapacidadRango] = useState(null);
//   const [disponibilidad, setDisponibilidad] = useState(null);

//   const [esMobile, setEsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setEsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [categoria]);

//   // resetea la página cuando cambia el search
//   useEffect(() => {
//     setPagina(1);
//   }, [search]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [color, capacidadRango]);

//   const itemsPorPagina = esMobile ? 6 : 12;

//   const filtrados = useMemo(() => {
//     let base =
//       categoria === "Todos"
//         ? productos
//         : productos.filter((p) => p.categoria === categoria);

//     if (search) {
//       base = base.filter((p) =>
//         p.nombre.toLowerCase().includes(search.toLowerCase()),
//       );
//     }

//     if (color) {
//       base = base.filter((p) =>
//         p.specs?.colores?.some((c) => c?.toLowerCase() === color.toLowerCase()),
//       );
//     }

//     if (capacidadRango) {
//       base = base.filter((p) => {
//         const cap = p.specs?.capacidad;
//         if (!cap) return false;
//         if (capacidadRango === "micro") return cap < 100;
//         if (capacidadRango === "pequeno") return cap >= 100 && cap <= 500;
//         if (capacidadRango === "mediano") return cap > 500 && cap <= 1000;
//         if (capacidadRango === "grande") return cap > 1000;
//         return true;
//       });
//     }

//     if (disponibilidad === "stock") {
//       base = base.filter((p) => p.specs?.stockDisponible === true);
//     }
//     if (disponibilidad === "pedido") {
//       base = base.filter((p) => p.specs?.sobrePedido === true);
//     }

//     return base;
//   }, [categoria, productos, search, color, capacidadRango, disponibilidad]);

//   const opcionesBase = useMemo(() => {
//     const base =
//       categoria === "Todos"
//         ? productos
//         : productos.filter((p) => p.categoria === categoria);

//     const coloresEnBase = new Set(
//       base
//         .flatMap((p) => p.specs?.colores?.filter(Boolean) ?? [])
//         .map((c) => c.toLowerCase()),
//     );

//     const colores = COLORES_FILTRO.filter((c) =>
//       coloresEnBase.has(c.toLowerCase()),
//     );

//     const tieneCapacidad = base.some((p) => p.specs?.capacidad);

//     return { colores, tieneCapacidad };
//   }, [categoria, productos]);

//   useEffect(() => {
//     setPagina(1);
//     setDisponibilidad(null);
//   }, [categoria]);

//   const totalPaginas = Math.ceil(filtrados.length / itemsPorPagina);

//   const productosVisibles = useMemo(() => {
//     return filtrados.slice(
//       (pagina - 1) * itemsPorPagina,
//       pagina * itemsPorPagina,
//     );
//   }, [filtrados, pagina, itemsPorPagina]);

//   const maxPaginas = esMobile ? 5 : 7;

//   const paginasVisibles = useMemo(() => {
//     let inicio = Math.max(1, pagina - Math.floor(maxPaginas / 2));
//     let fin = inicio + maxPaginas - 1;

//     if (fin > totalPaginas) {
//       fin = totalPaginas;
//       inicio = Math.max(1, fin - maxPaginas + 1);
//     }

//     return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
//   }, [pagina, totalPaginas, maxPaginas]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [pagina]);

//   return {
//     categoria,
//     setCategoria,
//     pagina,
//     setPagina,
//     esMobile,
//     filtrados,
//     productosVisibles,
//     totalPaginas,
//     paginasVisibles,
//     search,
//     setSearch,
//     color,
//     setColor,
//     capacidadRango,
//     setCapacidadRango,
//     opcionesBase,
//     disponibilidad,
//     setDisponibilidad,
//   };
// }

// _________________________________________

// "use client";

// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import { COLORES_FILTRO } from "@/lib/constants";

// export default function useProductCatalog(productos) {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();

//   // Leer estado inicial desde URL
//   const [categoria, setCategoria] = useState(
//     () => searchParams.get("categoria") ?? "Todos",
//   );
//   const [pagina, setPagina] = useState(() =>
//     parseInt(searchParams.get("pagina") ?? "1", 10),
//   );
//   const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
//   const [color, setColor] = useState(() => searchParams.get("color") ?? null);
//   const [capacidadRango, setCapacidadRango] = useState(
//     () => searchParams.get("capacidad") ?? null,
//   );
//   const [disponibilidad, setDisponibilidad] = useState(
//     () => searchParams.get("disponibilidad") ?? null,
//   );

//   const [esMobile, setEsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setEsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Sincronizar estado → URL
//   const actualizarURL = useCallback(
//     (params) => {
//       const nuevosParams = new URLSearchParams();
//       if (params.categoria && params.categoria !== "Todos")
//         nuevosParams.set("categoria", params.categoria);
//       if (params.pagina && params.pagina > 1)
//         nuevosParams.set("pagina", params.pagina);
//       if (params.search) nuevosParams.set("search", params.search);
//       if (params.color) nuevosParams.set("color", params.color);
//       if (params.capacidad) nuevosParams.set("capacidad", params.capacidad);
//       if (params.disponibilidad)
//         nuevosParams.set("disponibilidad", params.disponibilidad);

//       const query = nuevosParams.toString();
//       router.replace(`${pathname}${query ? `?${query}` : ""}`, {
//         scroll: false,
//       });
//     },
//     [router, pathname],
//   );

//   // Actualizar URL cuando cambia cualquier filtro
//   useEffect(() => {
//     actualizarURL({
//       categoria,
//       pagina,
//       search,
//       color,
//       capacidad: capacidadRango,
//       disponibilidad,
//     });
//   }, [categoria, pagina, search, color, capacidadRango, disponibilidad]);

//   // Scroll al top
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [categoria, pagina, color, capacidadRango]);

//   // Reset página al cambiar search
//   useEffect(() => {
//     setPagina(1);
//   }, [search]);

//   // Reset página y disponibilidad al cambiar categoría
//   useEffect(() => {
//     setPagina(1);
//     setDisponibilidad(null);
//   }, [categoria]);

//   const itemsPorPagina = esMobile ? 6 : 12;

//   const filtrados = useMemo(() => {
//     let base =
//       categoria === "Todos"
//         ? productos
//         : productos.filter((p) => p.categoria === categoria);

//     if (search) {
//       base = base.filter((p) =>
//         p.nombre.toLowerCase().includes(search.toLowerCase()),
//       );
//     }

//     if (color) {
//       base = base.filter((p) =>
//         p.specs?.colores?.some((c) => c?.toLowerCase() === color.toLowerCase()),
//       );
//     }

//     if (capacidadRango) {
//       base = base.filter((p) => {
//         const cap = p.specs?.capacidad;
//         if (!cap) return false;
//         if (capacidadRango === "micro") return cap < 100;
//         if (capacidadRango === "pequeno") return cap >= 100 && cap <= 500;
//         if (capacidadRango === "mediano") return cap > 500 && cap <= 1000;
//         if (capacidadRango === "grande") return cap > 1000;
//         return true;
//       });
//     }

//     if (disponibilidad === "stock")
//       base = base.filter((p) => p.specs?.stockDisponible === true);
//     if (disponibilidad === "pedido")
//       base = base.filter((p) => p.specs?.sobrePedido === true);

//     return base;
//   }, [categoria, productos, search, color, capacidadRango, disponibilidad]);

//   const opcionesBase = useMemo(() => {
//     const base =
//       categoria === "Todos"
//         ? productos
//         : productos.filter((p) => p.categoria === categoria);

//     const coloresEnBase = new Set(
//       base
//         .flatMap((p) => p.specs?.colores?.filter(Boolean) ?? [])
//         .map((c) => c.toLowerCase()),
//     );

//     const colores = COLORES_FILTRO.filter((c) =>
//       coloresEnBase.has(c.toLowerCase()),
//     );
//     const tieneCapacidad = base.some((p) => p.specs?.capacidad);

//     return { colores, tieneCapacidad };
//   }, [categoria, productos]);

//   const totalPaginas = Math.ceil(filtrados.length / itemsPorPagina);

//   const productosVisibles = useMemo(() => {
//     return filtrados.slice(
//       (pagina - 1) * itemsPorPagina,
//       pagina * itemsPorPagina,
//     );
//   }, [filtrados, pagina, itemsPorPagina]);

//   const maxPaginas = esMobile ? 5 : 7;

//   const paginasVisibles = useMemo(() => {
//     let inicio = Math.max(1, pagina - Math.floor(maxPaginas / 2));
//     let fin = inicio + maxPaginas - 1;
//     if (fin > totalPaginas) {
//       fin = totalPaginas;
//       inicio = Math.max(1, fin - maxPaginas + 1);
//     }
//     return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
//   }, [pagina, totalPaginas, maxPaginas]);

//   return {
//     categoria,
//     setCategoria,
//     pagina,
//     setPagina,
//     esMobile,
//     filtrados,
//     productosVisibles,
//     totalPaginas,
//     paginasVisibles,
//     search,
//     setSearch,
//     color,
//     setColor,
//     capacidadRango,
//     setCapacidadRango,
//     opcionesBase,
//     disponibilidad,
//     setDisponibilidad,
//   };
// }

// -------------------------------------------

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

    return base;
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
