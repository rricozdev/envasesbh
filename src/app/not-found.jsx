// src/app/not-found.jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      {/* Número 404 */}
      <div className="relative mb-6 select-none">
        <span className="text-[120px] md:text-[180px] font-bold  uppercase tracking-tighter text-gray-100 leading-none">
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-[120px] md:text-[180px] font-bold  uppercase tracking-tighter text-primary/10 leading-none blur-sm">
          404
        </span>
      </div>

      {/* Badge */}
      <div className="mb-4 animate-fade-in">
        <span className="bg-primary/10 text-primary font-black uppercase tracking-[0.2em] text-[9px] px-3 py-1 rounded-full">
          Página no encontrada
        </span>
      </div>

      {/* Título */}
      <h1 className="text-3xl md:text-5xl font-bold  uppercase tracking-tighter text-secondary leading-tight mb-4 animate-fade-in delay-100">
        Esta página no{" "}
        <span className="bg-primary text-white px-2 py-0.5 rounded-md">
          existe
        </span>
      </h1>

      {/* Descripción */}
      <p className="text-gray-500 text-sm md:text-base max-w-md mb-10 animate-fade-in delay-200">
        La página que buscas no está disponible o fue movida. Puedes regresar al
        inicio o explorar nuestro catálogo de envases PET.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in delay-300">
        <Link
          href="/"
          className="bg-primary hover:bg-accent text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-colors duration-200"
        >
          Ir al Inicio
        </Link>
        <Link
          href="/productos"
          className="border border-gray-200 hover:border-primary text-secondary hover:text-primary font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg transition-colors duration-200"
        >
          Ver Catálogo
        </Link>
      </div>

      {/* Decoración inferior */}
      <div className="mt-16 flex items-center gap-2 animate-fade-in delay-300">
        <div className="h-px w-12 bg-gray-200" />
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          Envases BH · México
        </span>
        <div className="h-px w-12 bg-gray-200" />
      </div>
    </div>
  );
}
