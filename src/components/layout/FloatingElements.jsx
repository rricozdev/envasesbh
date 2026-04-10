// FloatingElements.jsx
"use client";

import { useCart } from "@/context/CartContext";

function CartButtonSimple() {
  const { toggleCart, totalItems } = useCart();
  console.log("CartButtonSimple montado ✓");

  return (
    <button
      onClick={toggleCart}
      style={{
        position: "fixed",
        bottom: "96px",
        right: "24px",
        width: "60px",
        height: "60px",
        backgroundColor: "blue",
        borderRadius: "50%",
        zIndex: 99999,
        color: "white",
        fontSize: "20px",
      }}
    >
      {totalItems}
    </button>
  );
}

export default function FloatingElements() {
  console.log("FloatingElements montado ✓");
  return <CartButtonSimple />;
}
