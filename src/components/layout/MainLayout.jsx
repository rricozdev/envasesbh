import Footer from "./Footer";
import Header from "./Header/Header";
import TopBar from "./Header/TopBar";
import PanelController from "./PanelController";

export default function MainLayout({ children }) {
  return (
    // Contenedor principal de layout global de la aplicación
    // Define estructura base: Header + contenido + Footer + overlays/panels
    <div className="flex flex-col min-h-screen w-full">
      <TopBar />
      {/* Header global de navegación (visible en todas las rutas) */}
      <Header />
      {/* Área principal donde Next.js renderiza las páginas */}
      {/* "grow" permite que este bloque ocupe el espacio disponible */}
      <main className="grow w-full">{children}</main>
      {/* Footer global del sitio */}
      <Footer />
      {/* Controlador central de paneles UI (chat, cart, overlays, etc.) */}
      {/* Este componente gestiona qué panel está activo y su lógica de apertura/cierre */}
      <PanelController />
    </div>
  );
}
