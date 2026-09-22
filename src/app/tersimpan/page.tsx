import type { Metadata } from "next";
import { SavedNews } from "@/components/saved-news";
export const metadata: Metadata = { title: "Berita Tersimpan" };
export default function SavedPage() {
  return (
    <main className="site-container inner-page">
      <div className="page-title">
        <span className="eyebrow">PILIHAN PERSONALMU</span>
        <h1>
          Berita Tersimpan<span>.</span>
        </h1>
        <p>Cerita yang ingin kamu baca lagi, dalam satu tempat.</p>
      </div>
      <SavedNews />
    </main>
  );
}
