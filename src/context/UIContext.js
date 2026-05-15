"use client";

import { createContext, useCallback, useContext, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  // "cart" | "chat" | null
  const [activePanel, setActivePanel] = useState(null);

  const openCart = useCallback(() => setActivePanel("cart"), []);
  const openChat = useCallback(() => setActivePanel("chat"), []);
  const openModal = useCallback(() => setActivePanel("modal"), []);
  const closeAll = useCallback(() => setActivePanel(null), []);

  return (
    <UIContext.Provider
      value={{ activePanel, openCart, openChat, openModal, closeAll }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI debe usarse dentro de <UIProvider>");
  return ctx;
}
