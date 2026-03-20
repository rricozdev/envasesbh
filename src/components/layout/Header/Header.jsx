import TopBar from "./TopBar";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-[9999]">
      <TopBar />
      <Navbar />
    </header>
  );
}
