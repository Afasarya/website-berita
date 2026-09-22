import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { DemoNotice, NewsError, EditorSidebar } from "@/components/news-common";
import { Pagination } from "@/components/pagination";
import { getNews } from "@/lib/news";
import { pageNumber } from "@/lib/news-filter";
export const revalidate = 60;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { categories } = await getNews();
  const { slug } = await params;
  return {
    title:
      categories.find((category) => category.slug === slug)?.name ?? "Kategori",
  };
}
const descriptions: Record<string, string> = {
  nasional: "Cerita dari berbagai penjuru negeri, dekat dengan kehidupan kita.",
  ekonomi: "Memahami dunia usaha, peluang, dan pergerakan ekonomi.",
  teknologi: "Gagasan, inovasi, dan teknologi yang membentuk hari esok.",
  olahraga: "Semangat kompetisi, cerita perjuangan, dan energi kebersamaan.",
  hiburan: "Karya, kreativitas, dan cerita di balik dunia hiburan.",
  "gaya-hidup":
    "Inspirasi sederhana untuk menjalani hari dengan lebih bermakna.",
  travel: "Jelajahi destinasi, temukan budaya, bawa pulang cerita.",
  internasional: "Melihat dunia lebih dekat, memahami perspektif lebih luas.",
};
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { articles, categories, demo, error } = await getNews();
  if (error)
    return (
      <main className="site-container inner-page">
        <NewsError />
      </main>
    );
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const filtered = articles.filter(
    (article) => article.categories?.slug === slug,
  );
  const totalPages = Math.ceil(filtered.length / 9);
  const page = pageNumber((await searchParams).page, totalPages);
  return (
    <main className="site-container inner-page">
      <div className="page-title">
        <span className="eyebrow">RAGAM CERITA FORTISNEWS</span>
        <h1>
          {category.name}
          <span>.</span>
        </h1>
        <p>
          {descriptions[slug] ??
            `Kabar dan cerita terbaru seputar ${category.name.toLowerCase()}.`}
        </p>
      </div>
      {demo && <DemoNotice />}
      <div className="content-columns">
        <section>
          <div className="section-heading">
            <h2>
              Berita {category.name}
              <span>.</span>
            </h2>
            <span className="muted-copy">{filtered.length} artikel</span>
          </div>
          {filtered.length ? (
            <div className="news-grid">
              {filtered.slice((page - 1) * 9, page * 9).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Belum ada artikel dalam kategori ini.</p>
            </div>
          )}
          <Pagination
            page={page}
            totalPages={totalPages}
            basePath={`/kategori/${slug}`}
          />
        </section>
        <EditorSidebar
          articles={articles
            .filter((a) => a.categories?.slug !== slug)
            .slice(0, 5)}
        />
      </div>
    </main>
  );
}
