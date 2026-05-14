"use client";

import { PRODUCTOS } from "@/data/productos";
import ProductFilter from "./ProductFilter";
import ProductGrid from "./ProductGrid";
import ProductHeader from "./ProductHeader";
import ProductPagination from "./ProductPagination";
import useProductCatalog from "./hooks/useProductCatalog";

export default function ProductCatalog() {
  const {
    categoria,
    setCategoria,
    pagina,
    setPagina,
    search,
    setSearch,
    filtrados,
    productosVisibles,
    totalPaginas,
    paginasVisibles,
  } = useProductCatalog(PRODUCTOS);

  return (
    <>
      <ProductHeader total={filtrados.length} />

      <section className="bg-gray-50 min-h-screen py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* FILTROS */}
            <aside className="w-full lg:w-56 shrink-0 lg:sticky lg:top-32 self-start h-fit">
              <ProductFilter
                activa={categoria}
                onSelect={setCategoria}
                search={search}
                setSearch={setSearch}
              />
            </aside>

            {/* GRID */}
            <div className="flex-1">
              {/* INFO PAGINA */}
              <div className="mb-6 pb-4 border-b border-gray-200 flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center justify-between">
                  Página {pagina} de {totalPaginas}
                </p>
              </div>

              {/* PRODUCTOS */}
              <ProductGrid productos={productosVisibles} />

              {/* PAGINACIÓN */}
              {totalPaginas > 1 && (
                <ProductPagination
                  pagina={pagina}
                  totalPaginas={totalPaginas}
                  paginasVisibles={paginasVisibles}
                  onPageChange={setPagina}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
