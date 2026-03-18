export default function MobileMenu({ onClose, navLinks }) {
  return (
    <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2.5 shadow-xl">
      {" "}
      {/* Spacing reducido */}
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className={`block text-xs uppercase tracking-wide p-2 rounded-md ${
            // Padding y texto reducidos
            link.current
              ? "bg-gray-100 text-primary font-semibold"
              : "text-secondary hover:text-primary hover:bg-gray-50"
          }`}
          onClick={onClose}
        >
          {link.name}
        </a>
      ))}
      <div className="pt-2">
        {" "}
        {/* Espaciado para el botón */}
        <button className="w-full bg-primary text-white py-2.5 rounded-md text-sm font-semibold uppercase tracking-wider">
          Cotizar ahora
        </button>
      </div>
    </div>
  );
}
