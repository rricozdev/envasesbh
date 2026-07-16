import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function PostCard({ post, featured = false }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group bg-surface border border-border rounded-2xl overflow-hidden
        flex flex-col transition-shadow duration-500
        hover:border-primary hover:shadow-xl hover:ring-4 hover:ring-primary/10
        ${featured ? "md:flex-row md:col-span-full" : ""}
      `}
    >
      {/* Imagen */}
      <div
        className={`relative overflow-hidden flex-shrink-0
          ${featured ? "md:w-1/2 aspect-[16/10] md:aspect-auto" : "aspect-[16/10]"}
        `}
      >
        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 z-10 transition-colors duration-700" />
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-[800ms]"
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
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
          className={`font-black text-dark leading-snug mb-2.5
            ${featured ? "text-2xl" : "text-lg"}
          `}
        >
          <span>
            {post.title.split(" ").map((palabra, idx) => (
              <Fragment key={idx}>
                <span
                  className="inline-block transition-all duration-200 group-hover:text-primary group-hover:-translate-y-0.5"
                  style={{ transitionDelay: `${idx * 0.04}s` }}
                >
                  {palabra}
                </span>
                {idx < post.title.split(" ").length - 1 && " "}
              </Fragment>
            ))}
          </span>
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
