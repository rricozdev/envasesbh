import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ producto }) {
  // Aseguramos que el nombre sea descriptivo
  const nombreCompleto = producto.nombre.toLowerCase().includes("envase")
    ? producto.nombre
    : `Envase ${producto.nombre}`;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 flex flex-col h-full overflow-hidden">
      {/* Área de Imagen con fondo sutil para contraste */}
      <div className="aspect-square bg-[#f8f9fa] relative overflow-hidden p-6">
        {/* Badge de Categoría con más presencia */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-white/90 backdrop-blur-md text-primary border border-primary/10 text-[10px] font-extrabold uppercase px-2 py-1 rounded shadow-sm">
            {producto.categoria}
          </span>
        </div>

        <div className="w-full h-full relative group-hover:scale-110 transition-transform duration-500">
          <Image
            src={producto.imagen}
            alt={nombreCompleto}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain"
            priority={producto.id <= 4}
          />
        </div>
      </div>

      {/* Cuerpo de información */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        <h3 className="text-secondary font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {nombreCompleto}
        </h3>

        <p className="text-gray-500 text-xs mb-4">
          Material PET de alta claridad, ideal para sector{" "}
          {producto.categoria.toLowerCase()}.
        </p>

        {/* Botón con estilo sólido o borde grueso para que se vea */}
        <Link
          href={`/productos/${producto.slug}`}
          className="mt-auto w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white py-2.5 rounded-lg text-xs font-black transition-all text-center uppercase tracking-widest"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}
