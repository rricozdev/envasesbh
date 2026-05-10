"use client";

import { createContext, useContext, useState, useCallback } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  // "cart" | "chat" | null
  const [activePanel, setActivePanel] = useState(null);

  const openCart = useCallback(() => setActivePanel("cart"), []);
  const openChat = useCallback(() => setActivePanel("chat"), []);
  const closeAll = useCallback(() => setActivePanel(null), []);

  return (
    <UIContext.Provider value={{ activePanel, openCart, openChat, closeAll }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI debe usarse dentro de <UIProvider>");
  return ctx;
}
