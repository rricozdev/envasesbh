"use client";

import { useDeferredValue, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { PRODUCTOS } from "@/data/productos";
import { posts } from "@/data/blog";
import { servicios } from "@/data/servicios";
import { searchProducts } from "@/lib/productSearchEngine";
import { searchPosts } from "@/lib/blogSearchEngine";
import { searchServicios } from "@/lib/serviciosSearchEngine";

const MAX_RESULTS_PER_GROUP = 4;

export default function GlobalSearchBar({ compact = false }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  const results = useMemo(() => {
    if (!deferred || deferred.length < 2) return null;

    const productResults = searchProducts(PRODUCTOS, deferred).slice(
      0,
      MAX_RESULTS_PER_GROUP,
    );
    const blogResults = searchPosts(posts, deferred).slice(
      0,
      MAX_RESULTS_PER_GROUP,
    );
    const servicioResults = searchServicios(servicios, deferred).slice(
      0,
      MAX_RESULTS_PER_GROUP,
    );

    const hasAny =
      productResults.length > 0 ||
      blogResults.length > 0 ||
      servicioResults.length > 0;
    if (!hasAny) return { empty: true };

    return {
      productos: productResults,
      blog: blogResults,
      servicios: servicioResults,
    };
  }, [deferred]);

  const open = focused && query.length >= 2 && results !== null;

  const navigate = (href) => {
    setQuery("");
    setFocused(false);
    inputRef.current?.blur();
    router.push(href);
  };

  const totalCount = results && !results.empty
    ? (results.productos?.length || 0) +
      (results.blog?.length || 0) +
      (results.servicios?.length || 0)
    : 0;

  return (
    <div className={`relative ${compact ? "w-56" : "w-full max-w-md mx-auto"}`}>
      <div className="relative">
        <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 ${compact ? "w-3.5 h-3.5" : "w-4 h-4"}`} />
        <input
          ref={inputRef}
          type="text"
          placeholder={compact ? "Buscar..." : "Buscar productos, blog, servicios..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          className={`w-full border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
            compact
              ? "pl-8 pr-7 py-1.5 text-xs"
              : "pl-9 pr-10 py-2 text-sm rounded-xl"
          }`}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className={`absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 ${compact ? "w-3.5 h-3.5" : ""}`}
          >
            <X className={`${compact ? "w-3.5 h-3.5" : "w-4 h-4"}`} />
          </button>
        )}
      </div>

      {open && (
        <div className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg z-[9999] overflow-y-auto ${
          compact ? "rounded-lg max-h-72" : "rounded-xl max-h-80"
        }`}>
          {results.empty ? (
            <p className={`text-gray-400 text-center ${compact ? "text-xs py-4" : "text-sm py-6"}`}>
              Sin resultados para &quot;{deferred}&quot;
            </p>
          ) : (
            <div className="p-1.5 space-y-0.5">
              {results.productos?.length > 0 && (
                <GroupResults
                  compact={compact}
                  label="Productos"
                  items={results.productos}
                  render={(p) => ({
                    label: p.nombre,
                    sub: p.categoria,
                    href: `/productos/${p.slug}`,
                  })}
                  onSelect={navigate}
                />
              )}
              {results.blog?.length > 0 && (
                <GroupResults
                  compact={compact}
                  label="Blog"
                  items={results.blog}
                  render={(b) => ({
                    label: b.title,
                    sub: b.category,
                    href: `/blog/${b.slug}`,
                  })}
                  onSelect={navigate}
                />
              )}
              {results.servicios?.length > 0 && (
                <GroupResults
                  compact={compact}
                  label="Servicios"
                  items={results.servicios}
                  render={(s) => ({
                    label: s.nombre,
                    sub: s.subtitulo,
                    href: `/servicios#${s.slug}`,
                  })}
                  onSelect={navigate}
                />
              )}

              <div className="pt-1 pb-0.5 text-center">
                <button
                  onClick={() => navigate(`/productos?search=${encodeURIComponent(query)}`)}
                  className={`text-primary hover:underline font-semibold cursor-pointer ${compact ? "text-[11px]" : "text-xs"}`}
                >
                  Ver todos ({totalCount})
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GroupResults({ label, items, render, onSelect, compact = false }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 pt-1.5 pb-0.5">
        {label}
      </p>
      {items.map((item, i) => {
        const { label: title, sub, href } = render(item);
        return (
          <button
            key={i}
            onClick={() => onSelect(href)}
            className="w-full text-left px-2 rounded hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <p className={`font-medium text-secondary truncate ${compact ? "text-xs py-0.5" : "text-sm py-1"}`}>
              {title}
            </p>
            {sub && (
              <p className={`text-gray-400 truncate ${compact ? "text-[10px] pb-0.5" : "text-[11px]"}`}>
                {sub}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
