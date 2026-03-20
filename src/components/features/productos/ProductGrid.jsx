import ProductCard from "./ProductCard";

export default function ProductGrid({ productos }) {
  if (productos.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl text-secondary/40">
        No se encontraron productos en esta categoría.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productos.map((prod) => (
        <div key={prod.id} className="animate-in fade-in zoom-in duration-300">
          <ProductCard producto={prod} />
        </div>
      ))}
    </div>
  );
}
