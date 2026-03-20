import { PRODUCTOS } from "@/data/productos";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { notFound } from "next/navigation";

export default async function ProductoDetalle({ params }) {
  // 1. Desenvolver params (Requerido en Next.js 15+)
  const { slug } = await params;

  // 2. Buscar producto
  const producto = PRODUCTOS.find((p) => p.slug === slug);

  if (!producto) {
    notFound();
  }

  const nombreCompleto = producto.nombre.toLowerCase().includes("envase")
    ? producto.nombre
    : `Envase ${producto.nombre}`;

  // 3. Obtener productos relacionados (misma categoría, excluyendo el actual)
  const relacionados = PRODUCTOS.filter(
    (p) => p.categoria === producto.categoria && p.id !== producto.id,
  ).slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      {/* NAVEGACIÓN / BREADCRUMBS */}
      <nav className="bg-gray-50 border-b border-gray-100 py-4">
        <Container>
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium uppercase tracking-widest text-secondary/40">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link
              href="/productos"
              className="hover:text-primary transition-colors"
            >
              Productos
            </Link>
            <span>/</span>
            <span className="text-secondary truncate">
              {producto.categoria}
            </span>
          </div>
        </Container>
      </nav>

      <Container className="pt-8 md:pt-16 pb-20">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
          {/* COLUMNA IZQUIERDA: IMAGEN */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-square bg-[#f8f9fa] rounded-3xl border border-gray-100 relative overflow-hidden p-8 md:p-12 group">
              <Image
                src={producto.imagen}
                alt={nombreCompleto}
                fill
                priority
                className="object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* COLUMNA DERECHA: INFO */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {/* BOTÓN VOLVER INTELIGENTE */}
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-6 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="group-hover:-translate-x-1 transition-transform"
              >
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
              </svg>
              Volver al Catálogo
            </Link>

            <div className="mb-2">
              <span className="bg-primary/10 text-primary font-black uppercase tracking-[0.2em] text-[9px] px-3 py-1 rounded-full">
                {producto.categoria}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-secondary uppercase italic tracking-tighter mb-6 leading-[0.9]">
              {nombreCompleto}
            </h1>

            <div className="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                Este envase de alta claridad es ideal para el sector de{" "}
                {producto.categoria.toLowerCase()}. Fabricado con polietileno
                tereftalato (PET) virgen, ofrece la máxima resistencia y brillo
                para resaltar la calidad de su contenido.
              </p>

              {/* FICHA TÉCNICA */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 py-8 border-y border-gray-100">
                <div>
                  <span className="block text-[10px] text-secondary/40 font-bold uppercase tracking-widest mb-1">
                    Material
                  </span>
                  <span className="text-secondary font-semibold">
                    PET 100% Reciclable
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-secondary/40 font-bold uppercase tracking-widest mb-1">
                    Transparencia
                  </span>
                  <span className="text-secondary font-semibold">
                    Alta (Cristal)
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-secondary/40 font-bold uppercase tracking-widest mb-1">
                    Uso Sugerido
                  </span>
                  <span className="text-secondary font-semibold">
                    {producto.categoria}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-secondary/40 font-bold uppercase tracking-widest mb-1">
                    Estado
                  </span>
                  <span className="text-primary font-bold italic underline decoration-2 underline-offset-4">
                    Stock Inmediato
                  </span>
                </div>
              </div>
            </div>

            {/* BOTÓN WHATSAPP */}
            <div className="mt-8">
              <a
                href={`https://wa.me/525558247722?text=Hola%20Envases%20BH,%20solicito%20cotización%20del%20${nombreCompleto}%20visto%20en%20su%20catálogo.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-secondary text-white hover:bg-primary py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-secondary/20 active:scale-[0.98]"
              >
                Cotizar vía WhatsApp
              </a>
              <p className="text-center mt-4 text-[9px] text-gray-400 uppercase font-black tracking-[0.2em]">
                Precios preferenciales por mayoreo
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* SECCIÓN RELACIONADOS */}
      {relacionados.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100 py-16">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-secondary uppercase italic tracking-tighter">
                  También te puede{" "}
                  <span className="text-primary">interesar</span>
                </h2>
                <p className="text-gray-500 text-xs md:text-sm mt-1 uppercase tracking-wider font-medium">
                  Modelos similares en {producto.categoria}
                </p>
              </div>
              <Link
                href="/productos"
                className="text-primary font-bold text-xs uppercase tracking-widest hover:text-secondary transition-colors"
              >
                Ver todo el catálogo →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relacionados.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/productos/${rel.slug}`}
                  className="group bg-white p-4 rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square relative mb-4 bg-gray-50 rounded-xl overflow-hidden p-4">
                    <Image
                      src={rel.imagen}
                      alt={rel.nombre}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h4 className="text-secondary font-bold text-sm mb-3 group-hover:text-primary transition-colors truncate">
                    {rel.nombre}
                  </h4>
                  <div className="text-[10px] font-black uppercase text-primary tracking-widest">
                    Ver detalle
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
