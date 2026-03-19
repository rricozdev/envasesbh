import Header from "./Header/Header";

export default function MainLayout({ children }) {
  return (
    // Añadimos w-full y overflow-x-hidden
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="grow w-full">{children}</main>
    </div>
  );
}
