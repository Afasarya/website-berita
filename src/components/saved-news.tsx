"use client";
import { useSyncExternalStore, useState } from "react";
import Link from "next/link";
import { Bookmark, Check } from "lucide-react";
import type { Article } from "@/lib/news-types";
import { ArticleCard } from "./article-card";
const key = "bergaya:saved:v1";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("bergaya:saved", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("bergaya:saved", callback);
  };
}
function snapshot() {
  try {
    return localStorage.getItem(key) ?? "[]";
  } catch {
    return "[]";
  }
}
function parseSaved(value: string): Article[] {
  try {
    const data = JSON.parse(value);
    return Array.isArray(data)
      ? data.filter(
          (item) =>
            item &&
            typeof item.slug === "string" &&
            typeof item.title === "string" &&
            typeof item.id === "string" &&
            typeof item.thumbnail_url === "string",
        )
      : [];
  } catch {
    return [];
  }
}
function useSaved() {
  return parseSaved(useSyncExternalStore(subscribe, snapshot, () => "[]"));
}
export function BookmarkButton({
  article,
  labeled = false,
}: {
  article: Article;
  labeled?: boolean;
}) {
  const saved = useSaved();
  const active = saved.some((item) => item.id === article.id);
  const [error, setError] = useState(false);
  function toggle() {
    try {
      const latest = parseSaved(snapshot());
      localStorage.setItem(
        key,
        JSON.stringify(
          latest.some((item) => item.id === article.id)
            ? latest.filter((item) => item.id !== article.id)
            : [...latest, article],
        ),
      );
      window.dispatchEvent(new Event("bergaya:saved"));
      setError(false);
    } catch {
      setError(true);
    }
  }
  return (
    <span className="bookmark-wrap">
      <button
        type="button"
        className={`bookmark-button ${active ? "is-saved" : ""} ${labeled ? "labeled" : ""}`}
        onClick={toggle}
        aria-pressed={active}
        aria-label={
          active
            ? `Hapus simpanan: ${article.title}`
            : `Simpan: ${article.title}`
        }
        title={active ? "Hapus dari tersimpan" : "Simpan untuk nanti"}
      >
        {active ? <Check size={16} /> : <Bookmark size={16} />}
        {labeled && (active ? "Tersimpan" : "Simpan")}
      </button>
      {error && (
        <span role="status" className="storage-error">
          Penyimpanan browser tidak tersedia.
        </span>
      )}
    </span>
  );
}
export function SavedNews() {
  const saved = useSaved();
  return saved.length ? (
    <>
      <p className="muted-copy">
        {saved.length} artikel tersimpan di browser ini.
      </p>
      <div className="news-grid saved-grid">
        {saved.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </>
  ) : (
    <div className="empty-state">
      <Bookmark size={36} />
      <h2>Tempat untuk cerita pilihanmu</h2>
      <p>
        Ketuk ikon bookmark pada berita untuk menyimpannya dan membacanya
        kembali di browser ini.
      </p>
      <Link className="red-button" href="/">
        Jelajahi berita
      </Link>
    </div>
  );
}
