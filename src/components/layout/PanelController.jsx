"use client";
import CartDrawer from "../features/cart/CartDrawer";
import { ChatbotContainer } from "../features/chatbot/ChatbotContainer";
import WhatsAppButton from "../ui/WhatsAppButton";

export default function PanelController() {
  return (
    <>
      <CartDrawer />
      <ChatbotContainer />
      <WhatsAppButton />
    </>
  );
}
