import TopBar from "./TopBar";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="w-full flex flex-col overflow-hidden">
      <TopBar />
      <Navbar />
    </header>
  );
}
