"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import type { Article } from "@/lib/news-types";
export function HeadlineTicker({ articles }: { articles: Article[] }) {
  const [index, setIndex] = useState(0);
  if (!articles.length) return null;
  const article = articles[index % articles.length];
  return (
    <div className="headline-ticker">
      <span className="ticker-label">
        <Zap size={14} fill="currentColor" /> SEKILAS
      </span>
      <Link href={`/berita/${article.slug}`} aria-live="polite">
        {article.title}
      </Link>
      <div className="ticker-controls">
        <button
          aria-label="Judul sebelumnya"
          onClick={() =>
            setIndex((index + articles.length - 1) % articles.length)
          }
        >
          <ChevronLeft size={16} />
        </button>
        <button
          aria-label="Judul berikutnya"
          onClick={() => setIndex((index + 1) % articles.length)}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
