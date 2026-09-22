"use client";
import { useState } from "react";
import { ArrowDown, SlidersHorizontal } from "lucide-react";
import type { Article, Category } from "@/lib/news-types";
import { ArticleCard } from "./article-card";
export function NewsFeed({
  articles,
  categories,
}: {
  articles: Article[];
  categories: Category[];
}) {
  const [category, setCategory] = useState("all");
  const [count, setCount] = useState(6);
  const filtered =
    category === "all"
      ? articles
      : articles.filter((article) => article.categories?.slug === category);
  return (
    <div>
      <div className="feed-filters" aria-label="Filter berita">
        <SlidersHorizontal size={15} />
        <button
          className={category === "all" ? "selected" : ""}
          onClick={() => {
            setCategory("all");
            setCount(6);
          }}
          aria-pressed={category === "all"}
        >
          Semua
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            className={category === item.slug ? "selected" : ""}
            aria-pressed={category === item.slug}
            onClick={() => {
              setCategory(item.slug);
              setCount(6);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="news-grid" aria-live="polite">
        {filtered.slice(0, count).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <p>Belum ada berita dalam kategori ini.</p>
        </div>
      )}
      {count < filtered.length && (
        <button className="load-more" onClick={() => setCount(count + 6)}>
          Tampilkan lebih banyak <ArrowDown size={16} />
        </button>
      )}
    </div>
  );
}
