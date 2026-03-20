"use client";
import { useState, useMemo, useEffect } from "react";
import { PRODUCTOS } from "@/data/productos";
import ProductFilter from "@/components/features/productos/ProductFilter";
import ProductGrid from "@/components/features/productos/ProductGrid";
import Container from "@/components/ui/Container";

export default function ProductosPage() {
  const [categoria, setCategoria] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [esMobile, setEsMobile] = useState(false);

  // 1. Detección de dispositivo para límites de paginación
  useEffect(() => {
    const checkMobile = () => setEsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPorPagina = esMobile ? 6 : 12;

  // 2. Lógica de Filtrado (Resetea página al filtrar)
  const filtrados = useMemo(() => {
    setPagina(1);
    return categoria === "Todos"
      ? PRODUCTOS
      : PRODUCTOS.filter((p) => p.categoria === categoria);
  }, [categoria]);

  // 3. Cálculo de Paginación
  const totalPaginas = Math.ceil(filtrados.length / itemsPorPagina);
  const productosVisibles = filtrados.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina,
  );

  // 4. Scroll al inicio al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pagina]);

  return (
    <main className="min-h-screen pb-16 bg-white">
      {/* HERO COMPACTO: py-8 en mobile y py-12 en desktop */}
      <section className="bg-secondary py-8 md:py-12 border-b border-white/5">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white uppercase italic tracking-tighter">
                Catálogo <span className="text-primary">Envases BH</span>
              </h1>
              {/* Oculto en mobile para ahorrar espacio crítico */}
              <p className="hidden md:block text-white/50 mt-1 max-w-xl text-xs md:text-sm">
                Soluciones integrales en envases PET para la industria nacional.
              </p>
            </div>

            {/* Contador visual de stock */}
            <div className="text-primary font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
              {filtrados.length} Modelos Disponibles
            </div>
          </div>
        </Container>
      </section>

      {/* CUERPO DEL CATÁLOGO: Padding reducido de 10 a 6 */}
      <Container className="py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          {/* SIDEBAR / FILTROS: Ocupa el ancho completo en mobile */}
          <aside className="w-full lg:w-64 shrink-0">
            <ProductFilter activa={categoria} onSelect={setCategoria} />
          </aside>

          {/* GRID DE PRODUCTOS */}
          <section className="grow">
            <div className="mb-4 flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-[11px] text-secondary/40 font-medium uppercase tracking-wider">
                Viendo página {pagina} de {totalPaginas}
              </span>
            </div>

            <ProductGrid productos={productosVisibles} />

            {/* CONTROLES DE PAGINACIÓN OPTIMIZADOS */}
            {totalPaginas > 1 && (
              <div className="mt-10 flex flex-wrap justify-center items-center gap-2">
                <button
                  onClick={() => setPagina((p) => Math.max(1, p - 1))}
                  disabled={pagina === 1}
                  className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors text-secondary font-bold text-xs"
                >
                  Anterior
                </button>

                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                  {[...Array(totalPaginas)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPagina(i + 1)}
                      className={`w-9 h-9 min-w-[36px] rounded-lg font-bold transition-all text-xs ${
                        pagina === i + 1
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "text-secondary hover:bg-gray-100 border border-transparent"
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
                  className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors text-secondary font-bold text-xs"
                >
                  Siguiente
                </button>
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}
