import { Search, SearchX } from "lucide-react";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { DemoNotice, NewsError } from "@/components/news-common";
import { Pagination } from "@/components/pagination";
import { getNews } from "@/lib/news";
import { filterArticles, pageNumber } from "@/lib/news-filter";
export const metadata: Metadata = { title: "Jelajahi Berita" };
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    kategori?: string;
    urutan?: string;
    page?: string;
    pilihan?: string;
  }>;
}) {
  const {
    q = "",
    kategori = "",
    urutan = "latest",
    page: requestedPage,
    pilihan = "",
  } = await searchParams;
  const { articles, categories, demo, error } = await getNews();
  const filtered = filterArticles(articles, {
    q,
    category: kategori,
    sort: urutan,
    featured: pilihan === "redaksi",
  });
  const totalPages = Math.ceil(filtered.length / 12);
  const page = pageNumber(requestedPage, totalPages);
  return (
    <main className="site-container inner-page">
      <div className="page-title">
        <span className="eyebrow">TEMUKAN PERSPEKTIFMU</span>
        <h1>
          {pilihan === "redaksi" ? "Pilihan Redaksi" : "Jelajahi Berita"}
          <span>.</span>
        </h1>
        <p>Dari satu kata kunci, temukan cerita yang membuka wawasan.</p>
      </div>
      <form className="search-panel" action="/search" role="search">
        <div className="search-field">
          <Search size={22} />
          <label htmlFor="search-q" className="sr-only">
            Kata kunci pencarian
          </label>
          <input
            id="search-q"
            name="q"
            defaultValue={q}
            placeholder="Cari topik, cerita, atau kata kunci..."
          />
          <button className="red-button">
            Cari berita <Search size={16} />
          </button>
        </div>
        <div className="search-options">
          <label>
            Kategori{" "}
            <select name="kategori" defaultValue={kategori}>
              <option value="">Semua kategori</option>
              {categories.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Urutkan{" "}
            <select name="urutan" defaultValue={urutan}>
              <option value="latest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
          </label>
          <label className="featured-checkbox">
            <input
              name="pilihan"
              type="checkbox"
              value="redaksi"
              defaultChecked={pilihan === "redaksi"}
            />{" "}
            Pilihan redaksi
          </label>
        </div>
      </form>
      {demo && <DemoNotice />}
      {error ? (
        <NewsError />
      ) : (
        <>
          <p className="result-count">
            {filtered.length} artikel
            {q ? ` untuk “${q}”` : " untuk kamu jelajahi"}
          </p>
          {filtered.length ? (
            <div className="news-grid search-grid">
              {filtered.slice((page - 1) * 12, page * 12).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <SearchX size={36} />
              <h2>Belum menemukan cerita yang cocok</h2>
              <p>Coba kata kunci lain atau pilih semua kategori.</p>
              <a href="/search" className="red-button">
                Tampilkan semua berita
              </a>
            </div>
          )}
          <Pagination
            page={page}
            totalPages={totalPages}
            basePath="/search"
            query={{ q, kategori, urutan, pilihan }}
          />
        </>
      )}
    </main>
  );
}
