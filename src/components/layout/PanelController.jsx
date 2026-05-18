"use client";
import { useState } from "react";
import CartDrawer from "../features/cart/CartDrawer";
import { ChatbotContainer } from "../features/chatbot/ChatbotContainer";
import WhatsAppButton from "../ui/WhatsAppButton";

export default function PanelController() {
  const [activePanel, setActivePanel] = useState(null); // "cart" | "chat" | null
  return (
    <>
      <CartDrawer activePanel={activePanel} setActivePanel={setActivePanel} />
      <ChatbotContainer
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      />
      <WhatsAppButton />
    </>
  );
}
