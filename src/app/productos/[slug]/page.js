import AddToCartButton from "@/components/features/cart/AddToCartButton";
import ProductGallery from "@/components/features/productos/ProductGallery";
import { PRODUCTOS } from "@/data/productos";
import { COLOR_MAP } from "@/lib/constants";
import {
  generateProductJsonLd,
  generateProductMetadata,
} from "@/lib/metadata-helper-productos";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const PREFIJOS_PROPIOS = [
  "tapa",
  "trigger",
  "tarro",
  "vitrolero",
  "bomba",
  "atomizador",
  "flip",
  "mini",
];

const getNombreCompleto = (nombre) =>
  PREFIJOS_PROPIOS.some((p) => nombre.toLowerCase().startsWith(p))
    ? nombre
    : `Envase ${nombre}`;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const producto = PRODUCTOS.find((p) => p.slug === slug);

  if (!producto) {
    return {
      title: "Producto No Encontrado | Envases BH",
      description: "El producto que buscas no existe en nuestro catálogo.",
    };
  }

  return generateProductMetadata({
    id: producto.id,
    slug: producto.slug,
    nombre: producto.nombre,
    descripcion: producto.descripcion || "",
    categoria: producto.categoria,
    imagen: producto.imagen,
    capacidad: producto.specs?.capacidad
      ? `${producto.specs.capacidad}ml`
      : undefined,
    colores: producto.specs?.colores?.filter((c) => c),
    especificaciones: producto.specs,
  });
}

export async function generateStaticParams() {
  return PRODUCTOS.map((producto) => ({ slug: producto.slug }));
}

export default async function ProductoDetalle({ params }) {
  const { slug } = await params;
  const producto = PRODUCTOS.find((p) => p.slug === slug);

  if (!producto) notFound();

  const nombreCompleto = getNombreCompleto(producto.nombre);
  const relacionados = PRODUCTOS.filter(
    (p) => p.categoria === producto.categoria && p.id !== producto.id,
  ).slice(0, 4);

  const { specs } = producto;

  const SPECS_PRINCIPALES = [
    {
      label: "Capacidad",
      value: specs?.capacidad ? `${specs.capacidad} ml` : null,
    },
    // { label: "Peso", value: specs?.peso ? `${specs.peso} g` : null },
    {
      label: "Peso",
      value: (() => {
        const pesos = specs?.peso;
        if (!pesos) return null;

        if (Array.isArray(pesos)) {
          if (pesos.length === 0) return null;

          // Creamos una lista de strings con la unidad incluida: ["23 g", "28 g"]
          const pesosConUnidad = pesos.map((p) => `${p} g`);

          if (pesosConUnidad.length === 1) return pesosConUnidad[0];

          // Formateo: "23 g y 28 g" o "23 g, 28 g y 30 g"
          const ultimo = pesosConUnidad.pop();
          const resto = pesosConUnidad.join(", ");
          return `${resto} y ${ultimo}`;
        }

        return `${pesos} g`;
      })(),
    },

    { label: "Rosca", value: specs?.corona ?? null },
    { label: "Altura", value: specs?.altura ? `${specs.altura} mm` : null },
    { label: "Pzs / Empaque", value: specs?.pzsEmpaque ?? null },
    { label: "Tipo de Empaque", value: specs?.tipoEmpaque ?? null },
    {
      label: "Opciones de Liner",
      value: specs?.liner?.length > 0 ? specs.liner.join(", ") : null,
    },
    {
      label: "Venta Mínima",
      value: specs?.stockDisponible
        ? `1 ${specs.tipoEmpaque ?? "unidad"}`
        : specs?.produccionMinima
          ? `${specs.produccionMinima.toLocaleString()} pzs`
          : null,
    },
    {
      label: "Disponibilidad",
      value: specs?.sobrePedido === true ? "Bajo Pedido" : null,
    },
    {
      label: "Stock",
      value: specs?.stockDisponible === true ? "Disponible" : null,
    },
    // Lógica corregida para "Colores bajo pedido"
    {
      label: "Colores bajo pedido",
      value:
        specs?.coloresBajoPedido?.length > 0 &&
        specs?.produccionMinimaColores !== null &&
        specs?.produccionMinimaColores !== undefined
          ? `${
              Array.isArray(specs.coloresBajoPedido)
                ? specs.coloresBajoPedido.length + " colores disponibles"
                : "Disponibles"
            } — Mín. ${specs.produccionMinimaColores.toLocaleString()} pzs`
          : null,
    },
  ];

  const jsonLd = generateProductJsonLd({
    id: producto.id,
    nombre: nombreCompleto,
    descripcion: producto.descripcion || "",
    categoria: producto.categoria,
    imagen: producto.imagen,
    capacidad: specs?.capacidad ? `${specs.capacidad}ml` : undefined,
    especificaciones: specs,
  });

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BREADCRUMBS */}
      <nav className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="flex py-5 max-w-6xl mx-auto px-4 md:px-6 items-center gap-2 text-[10px] md:text-xs font-medium uppercase tracking-widest text-secondary/40">
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
          <span className="text-secondary truncate">{producto.categoria}</span>
        </div>
      </nav>

      <div className="py-8 md:pt-10 max-w-6xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-10 xl:gap-20">
        {/* IMAGEN */}
        <div className="w-full lg:w-1/2">
          <ProductGallery imagen={producto.imagen} alt={nombreCompleto} />
        </div>

        {/* INFO */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          {/* VOLVER */}
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
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
            Volver al Catálogo
          </Link>

          <div className="mb-2">
            <span className="bg-primary/10 text-primary font-black uppercase tracking-[0.2em] text-[9px] px-3 py-1 rounded-full">
              {producto.categoria}
            </span>
          </div>

          <h1 className="text-xl md:text-3xl font-bold text-secondary uppercase tracking-tighter mb-6 leading-[0.9]">
            {nombreCompleto}
          </h1>

          {/* COLORES */}
          {specs?.colores?.filter((c) => c).length > 0 && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest">
                Colores:
              </span>
              <div className="flex gap-2 flex-wrap">
                {specs.colores
                  .filter((c) => c)
                  .map((color) => {
                    const esBajoPedido = color
                      .toLowerCase()
                      .includes("bajo pedido");
                    return (
                      <div key={color} className="flex items-center gap-1.5">
                        {!esBajoPedido && (
                          <span
                            className="w-6 h-4 rounded border border-gray-200 shadow-sm flex-shrink-0"
                            style={{
                              background:
                                COLOR_MAP[color.toLowerCase()] ?? "#ccc",
                            }}
                          />
                        )}
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wide ${esBajoPedido ? "text-yellow-600" : "text-secondary"}`}
                        >
                          {color}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* FICHA TÉCNICA */}
          <div className="border-y border-gray-100 py-6 mb-6">
            <p className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest mb-4">
              Especificaciones Técnicas
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              {SPECS_PRINCIPALES.filter((s) => s.value !== null).map(
                ({ label, value }) => (
                  <div key={label}>
                    <span className="block text-[10px] text-secondary/40 font-bold uppercase tracking-widest mb-0.5">
                      {label}
                    </span>
                    <span
                      className={`font-semibold text-sm ${label === "Disponibilidad" ? "text-primary italic underline decoration-2 underline-offset-4" : "text-secondary"}`}
                    >
                      {value}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* CTA */}
          <div>
            <AddToCartButton
              product={{
                id: producto.id,
                nombre: nombreCompleto,
                imagen: producto.imagen,
                specs: producto.specs,
              }}
            />
          </div>
          <p className="text-center mt-4 text-[9px] text-gray-400 uppercase font-black tracking-[0.2em]">
            Precios preferenciales por mayoreo
          </p>
        </div>
      </div>

      {/* RELACIONADOS */}
      {relacionados.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100 py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6 flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary uppercase tracking-tighter">
                También te puede <span className="text-primary">interesar</span>
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

          <div className="mx-auto max-w-6xl px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relacionados.map((rel) => (
              <Link
                key={rel.id}
                href={`/productos/${rel.slug}`}
                className="group bg-white p-4 rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square relative mb-4 bg-gray-50 rounded-xl overflow-hidden p-4">
                  <Image
                    src={rel.imagen}
                    alt={getNombreCompleto(rel.nombre)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <h4 className="text-secondary font-bold text-sm mb-3 group-hover:text-primary transition-colors truncate">
                  {getNombreCompleto(rel.nombre)}
                </h4>
                <div className="text-[10px] font-black uppercase text-primary tracking-widest">
                  Ver detalle
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
