import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/data/blog";

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return { title: "Blog | Envases BH" };

  const url = `https://www.envasesbh.mx/blog/${slug}`;

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      url,
      type: "article",
      images: post.cover
        ? [
            {
              url: `https://www.envasesbh.mx${post.cover}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    alternates: {
      canonical: url,
      languages: {
        "es-MX": url,
        es: url,
        "x-default": url,
      },
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <main className="bg-white min-h-screen">
      {/* ── HERO EDITORIAL ── */}
      <header className="relative bg-dark overflow-hidden">
        {/* Línea de acento superior */}
        <div className="h-2 w-full bg-primary" />

        {/* Grid decorativo de fondo */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 59px,#fff 59px,#fff 60px), repeating-linear-gradient(90deg,transparent,transparent 59px,#fff 59px,#fff 60px)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-20">
          {/* Categoría */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <span className="inline-block w-6 h-px bg-primary" />
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em]">
              {post.category}
            </p>
          </div>

          {/* Título */}
          <h1
            className="text-4xl md:text-5xl font-black text-white leading-[1.06] max-w-3xl animate-fade-in delay-100"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 animate-fade-in delay-200">
            {/* Avatar / autor */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <span className="text-primary text-[10px] font-bold">
                  {post.author?.[0] ?? "A"}
                </span>
              </div>
              <span className="text-white/80 text-sm font-medium">
                {post.author}
              </span>
            </div>

            <span className="text-white/20">·</span>
            <span className="text-white/50 text-sm">{post.publishedAt}</span>
            <span className="text-white/20">·</span>

            {/* Tiempo de lectura con icono */}
            <span className="inline-flex items-center gap-1.5 text-white/50 text-sm">
              <svg
                className="w-3.5 h-3.5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readingTime}
            </span>
          </div>
        </div>
      </header>

      {/* ── IMAGEN COVER ── */}
      <div className="max-w-5xl mx-auto px-6 -mt-0">
        <div className="relative aspect-[21/9] overflow-hidden shadow-2xl border-b-4 border-primary">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1280px"
            className="object-cover"
            priority
          />
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
        </div>
      </div>

      {/* ── CUERPO ── */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-16">
          {/* Columna principal */}
          <article>
            {/* LEAD / EXCERPT */}
            <p
              className="text-xl leading-[1.8] text-secondary font-medium mb-14 relative pl-6"
              style={{ borderLeft: "3px solid var(--color-primary)" }}
            >
              {post.excerpt}
            </p>

            {/* CONTENIDO */}
            <div className="space-y-7">
              {post.content.map((block, i) => {
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={i}
                      className="leading-[1.9] text-secondary/80 text-[1.0625rem]"
                    >
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "heading") {
                  return (
                    <h2
                      key={i}
                      className="text-2xl md:text-3xl font-black text-dark mt-14 mb-2 leading-tight"
                    >
                      {/* Acento de color antes del heading */}
                      <span className="text-primary mr-2">—</span>
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul key={i} className="space-y-3 mt-2">
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-secondary/80 leading-7"
                        >
                          <span className="mt-[0.55rem] shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return null;
              })}
            </div>

            {/* <--- volver al blog */}
            <div className="max-w-5xl mx-auto px-6 pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] group"
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
                Volver al Blog
              </Link>
            </div>

            {/* FIRMA AUTOR */}
            <div className="mt-20 pt-8 border-t border-border flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0">
                <span className="text-primary text-base font-black">
                  {post.author?.[0] ?? "A"}
                </span>
              </div>
              <div>
                <p className="text-xs text-muted uppercase tracking-widest mb-0.5">
                  Publicado por
                </p>
                <p className="text-secondary font-bold text-sm">
                  {post.author}
                </p>
              </div>

              {/* Separador y fecha */}
              <div className="ml-auto text-right hidden sm:block">
                <p className="text-xs text-muted uppercase tracking-widest mb-0.5">
                  Fecha
                </p>
                <p className="text-secondary font-semibold text-sm">
                  {post.publishedAt}
                </p>
              </div>
            </div>
          </article>

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Tarjeta de info del post */}
              <div className="border border-border rounded-xl overflow-hidden">
                <div className="bg-surface-soft px-5 py-3 border-b border-border">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">
                    Sobre este artículo
                  </p>
                </div>
                <div className="px-5 py-4 space-y-4">
                  <InfoRow label="Categoría" value={post.category} />
                  <InfoRow label="Autor" value={post.author} />
                  <InfoRow label="Publicado" value={post.publishedAt} />
                  <InfoRow label="Lectura" value={post.readingTime} />
                </div>
              </div>

              {/* CTA lateral */}
              <div className="rounded-xl bg-dark p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                  Envases BH
                </p>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  Descubre nuestros productos y soluciones de packaging para tu
                  negocio.
                </p>
                <a
                  href="/productos"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  Ver productos
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* Componente auxiliar para el sidebar */
function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] text-muted uppercase tracking-wider">
        {label}
      </span>
      <span className="text-secondary text-sm font-semibold">{value}</span>
    </div>
  );
}
