import Footer from "./Footer";
import Header from "./Header/Header";
import { ChatbotContainer } from "../features/chatbot/ChatbotContainer";
import CartDrawer from "../features/cart/CartDrawer"; // Importación del CartDrawer

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="grow w-full">{children}</main>
      <Footer />
      <CartDrawer /> {/* Renderizar el CartDrawer */}
      <ChatbotContainer />
    </div>
  );
}
