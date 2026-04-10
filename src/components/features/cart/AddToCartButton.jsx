"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      nombre: product.nombre,
      imagen: product.imagen,
      cantidad: 1,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center justify-center w-full bg-primary text-white hover:bg-primary-dark py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/20 active:scale-[0.98]"
    >
      Añadir a Cotización
    </button>
  );
}
