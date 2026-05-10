"use client";

import { createContext, useContext, useReducer, useCallback } from "react";
import { useUI } from "./UIContext";

const CartContext = createContext(null);

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, cantidad: i.cantidad + (action.payload.cantidad || 1) }
              : i,
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, cantidad: action.payload.cantidad || 1 },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    case "UPDATE_CANTIDAD": {
      const cantidad = Math.max(1, action.payload.cantidad);
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, cantidad } : i,
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { activePanel, openCart, closeAll } = useUI();

  const addItem = useCallback(
    (product) => {
      dispatch({ type: "ADD_ITEM", payload: product });
      openCart(); // abre cart y cierra chat automáticamente
    },
    [openCart],
  );

  const removeItem = useCallback((id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const updateCantidad = useCallback((id, cantidad) => {
    dispatch({ type: "UPDATE_CANTIDAD", payload: { id, cantidad } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const totalItems = state.items.reduce((sum, i) => sum + i.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: activePanel === "cart", // derivado del UIContext
        totalItems,
        addItem,
        removeItem,
        updateCantidad,
        clearCart,
        openCart,
        closeCart: closeAll,
        toggleCart: () => (activePanel === "cart" ? closeAll() : openCart()),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
