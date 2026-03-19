"use client";

export default function MobileMenu({ isOpen, onClose, navLinks }) {
  return (
    <div
      className={`
        /* 1. POSICIONAMIENTO FIJO: Rompe el recorte del MainLayout */
        fixed top-[110px] left-0 w-full z-[1000] 
        
        /* 2. EFECTO PERSIANA */
        overflow-hidden transition-all duration-500 ease-in-out
        bg-white
        
        /* 3. LÓGICA DE VISIBILIDAD */
        ${
          isOpen
            ? "max-h-[600px] opacity-100 visible shadow-2xl"
            : "max-h-0 opacity-0 invisible"
        }
      `}
    >
      <div className="p-6 border-t border-gray-100">
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`block text-sm uppercase tracking-widest p-3 rounded-lg transition-all ${
                link.current
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-secondary hover:bg-gray-50 hover:text-primary"
              }`}
              onClick={onClose}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-50">
            <button className="w-full bg-primary text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/25">
              Cotizar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
