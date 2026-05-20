"use client";

import { Suspense } from "react";
import { PRODUCTOS } from "@/data/productos";
import ProductFilter from "./ProductFilter";
import ProductGrid from "./ProductGrid";
import ProductHeader from "./ProductHeader";
import ProductPagination from "./ProductPagination";
import useProductCatalog from "./hooks/useProductCatalog";

function Catalog() {
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
    color,
    setColor,
    rosca,
    setRosca,
    capacidadRango,
    setCapacidadRango,
    opcionesBase,
  } = useProductCatalog(PRODUCTOS);

  return (
    <>
      <ProductHeader total={filtrados.length} />
      <section className="bg-gray-50 min-h-screen py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-12 -ml-4">
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto pr-1">
                <ProductFilter
                  activa={categoria}
                  onSelect={(cat) => {
                    setCategoria(cat);
                    setColor(null);
                    setRosca(null);
                    setCapacidadRango(null);
                  }}
                  search={search}
                  setSearch={setSearch}
                  color={color}
                  setColor={setColor}
                  rosca={rosca}
                  setRosca={setRosca}
                  capacidadRango={capacidadRango}
                  setCapacidadRango={setCapacidadRango}
                  opcionesBase={opcionesBase}
                />
              </div>
            </aside>
            <div className="flex-1 overflow-y-auto">
              <div className="mb-6 pb-4 border-b border-gray-200 flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Página {pagina} de {totalPaginas}
                </p>
              </div>
              <ProductGrid productos={productosVisibles} />
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

export default function ProductCatalog() {
  return (
    <Suspense>
      <Catalog />
    </Suspense>
  );
}
