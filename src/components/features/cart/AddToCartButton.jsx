"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();

  // Agrega el producto al carrito de cotización con cantidad inicial 1
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      nombre: product.nombre,
      imagen: product.imagen,
      cantidad: 1,
      specs: product.specs,
    });
  };

  return (
    // hover:scale-[1.02] — sube levemente el botón al pasar el cursor
    // hover:shadow-xl hover:shadow-primary/40 — amplía la sombra con color primario (efecto glow)
    // hover:bg-primary-dark — oscurece el fondo en hover
    // active:scale-[0.98] — comprime al hacer clic (feedback táctil)
    // transition-all — anima todos los cambios suavemente
    <button
      onClick={handleAddToCart}
      className="flex items-center justify-center w-full bg-primary text-white hover:bg-primary-dark py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/20 active:scale-[0.98] hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] cursor-pointer"
    >
      Añadir a Cotización
    </button>
  );
}
