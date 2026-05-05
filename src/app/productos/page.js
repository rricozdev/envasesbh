"use client";

import ProductFilter from "@/components/features/productos/ProductFilter";
import ProductGrid from "@/components/features/productos/ProductGrid";
import { PRODUCTOS } from "@/data/productos";
import { useEffect, useMemo, useState } from "react";

export default function ProductosPage() {
  const [categoria, setCategoria] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [esMobile, setEsMobile] = useState(false);

  // Detección de dispositivo
  useEffect(() => {
    const checkMobile = () => setEsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPorPagina = esMobile ? 6 : 12;

  // Filtrado
  const filtrados = useMemo(() => {
    setPagina(1);
    return categoria === "Todos"
      ? PRODUCTOS
      : PRODUCTOS.filter((p) => p.categoria === categoria);
  }, [categoria]);

  // Paginación
  const totalPaginas = Math.ceil(filtrados.length / itemsPorPagina);
  const productosVisibles = filtrados.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina,
  );

  // Scroll al cambiar página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pagina]);

  return (
    <>
      {/* HEADER */}
      <section className="bg-secondary py-8 md:py-12 border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                Catálogo <span className="text-primary">Envases BH</span>
              </h1>
              <p className="text-white/60 text-sm mt-2 max-w-lg">
                Soluciones en envases PET para la industria nacional
              </p>
            </div>

            <div className="text-secondary font-semibold text-xs uppercase tracking-wider bg-gray-50 px-4 py-2 rounded w-fit">
              {filtrados.length} modelos disponibles
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="bg-gray-50 min-h-screen py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* FILTROS */}
            <aside className="w-full lg:w-56 shrink-0 ">
              <ProductFilter activa={categoria} onSelect={setCategoria} />
            </aside>

            {/* GRID */}
            <div className="flex-1">
              {/* Info de página */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Página {pagina} de {totalPaginas}
                </p>
              </div>

              {/* Productos */}
              <ProductGrid productos={productosVisibles} />

              {/* PAGINACIÓN */}
              {totalPaginas > 1 && (
                <nav className="mt-12 flex flex-col items-center gap-6">
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    <button
                      onClick={() => setPagina((p) => Math.max(1, p - 1))}
                      disabled={pagina === 1}
                      className="px-4 py-2 border border-gray-300 rounded text-sm font-semibold text-gray-700 hover:bg-white hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      ← Anterior
                    </button>

                    <div className="flex gap-1">
                      {[...Array(totalPaginas)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPagina(i + 1)}
                          className={`w-8 h-8 rounded text-xs font-semibold transition-all duration-200 ${
                            pagina === i + 1
                              ? "bg-primary text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-white hover:border-gray-400"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setPagina((p) => Math.min(totalPaginas, p + 1))
                      }
                      disabled={pagina === totalPaginas}
                      className="px-4 py-2 border border-gray-300 rounded text-sm font-semibold text-gray-700 hover:bg-white hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Siguiente →
                    </button>
                  </div>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
