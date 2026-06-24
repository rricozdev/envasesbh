import ProductCard from "./ProductCard";

export default function ProductGrid({ productos, search }) {
  if (productos.length === 0) {
    const mensaje = search
      ? `No hay resultados para "${search}"`
      : "No se encontraron productos en esta categoría.";
    return (
      <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl text-secondary/40">
        {mensaje}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((prod) => (
        <div key={prod.id}>
          <ProductCard producto={prod} />
        </div>
      ))}
    </div>
  );
}
