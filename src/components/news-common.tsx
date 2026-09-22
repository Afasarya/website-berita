import Link from "next/link";
import { ArrowUpRight, Sparkles, ArrowRight } from "lucide-react";
import type { Article } from "@/lib/news-types";
export function DemoNotice() {
  return (
    <p className="demo-notice">
      <Sparkles size={13} />
      <span>
        Pratinjau desain · Artikel contoh ditampilkan sampai berita pertama
        diterbitkan.
      </span>
    </p>
  );
}
export function NewsError() {
  return (
    <div className="empty-state">
      <h2>Berita belum dapat dimuat</h2>
      <p>Koneksi ke sumber berita sedang terganggu. Silakan coba kembali.</p>
      <Link href="/" className="red-button">
        Coba kembali
      </Link>
    </div>
  );
}
export function SectionHeading({
  title,
  label,
  href,
}: {
  title: string;
  label?: string;
  href?: string;
}) {
  return (
    <div className="section-heading">
      <h2>
        {title}
        <span>.</span>
      </h2>
      {href && (
        <Link href={href}>
          {label ?? "Lihat semua"} <ArrowUpRight size={15} />
        </Link>
      )}
    </div>
  );
}
export function EditorSidebar({ articles }: { articles: Article[] }) {
  return (
    <aside className="editor-sidebar">
      <section className="editor-list">
        <div className="sidebar-heading">
          <span className="red-dot" />
          <h2>Jangan Terlewat</h2>
        </div>
        <p className="sidebar-subtitle">Bacaan untuk melengkapi harimu</p>
        {articles.slice(0, 5).map((article, i) => (
          <article key={article.id} className="ranked-story">
            <span className="story-rank">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <Link
                href={`/kategori/${article.categories?.slug}`}
                className="category-label"
              >
                {article.categories?.name}
              </Link>
              <h3>
                <Link href={`/berita/${article.slug}`}>{article.title}</Link>
              </h3>
            </div>
          </article>
        ))}
      </section>
      <section className="community-card">
        <span className="community-icon">
          <Sparkles size={23} />
        </span>
        <span className="eyebrow">RUANG UNTUK SUARAMU</span>
        <h2>
          Punya cerita
          <br />
          yang berarti?
        </h2>
        <p>Bagikan sudut pandangmu dan jadi bagian dari komunitas Bergaya.</p>
        <Link href="/dashboard/submit">
          Mulai menulis <ArrowRight size={17} />
        </Link>
        <span className="community-decoration" aria-hidden="true">
          b.
        </span>
      </section>
    </aside>
  );
}
