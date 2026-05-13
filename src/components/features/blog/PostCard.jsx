import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post, featured = false }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group bg-surface border border-border rounded-2xl overflow-hidden
        flex flex-col transition-all duration-200
        hover:border-primary hover:ring-4 hover:ring-primary/10
        ${featured ? "md:flex-row md:col-span-full" : ""}
      `}
    >
      {/* Imagen */}
      <div
        className={`relative overflow-hidden flex-shrink-0
          ${featured ? "md:w-1/2 aspect-[16/10] md:aspect-auto" : "aspect-[16/10]"}
        `}
      >
        <Image
          src={post.cover}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      {/* Cuerpo */}
      <div
        className={`p-6 flex flex-col grow ${featured ? "md:justify-center md:p-10" : ""}`}
      >
        {featured && (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase bg-terciary text-yellow-800 px-3 py-1 rounded-full mb-4 w-fit">
            ★ Destacado
          </span>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-primary text-[11px] font-bold uppercase tracking-[0.18em]">
            {post.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-border flex-shrink-0" />
          <span className="text-muted text-[11px]">{post.readingTime}</span>
        </div>

        <h2
          className={`font-black text-dark leading-snug mb-2.5 group-hover:text-primary transition-colors duration-200
            ${featured ? "text-2xl" : "text-lg"}
          `}
        >
          {post.title}
        </h2>

        <p className="text-muted text-sm leading-relaxed line-clamp-3 grow">
          {post.excerpt}
        </p>

        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-muted text-xs">{post.publishedAt}</span>
          <span className="flex items-center gap-1 text-primary text-[11px] font-bold uppercase tracking-[0.15em]">
            Leer
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
