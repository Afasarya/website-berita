import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getArticle, getNews } from "@/lib/news";
import { formatPublishedDate, stripHtml } from "@/lib/utils";
import { NewsImage } from "@/components/news-image";
import { ArticleReader } from "@/components/article-reader";
import { ArticleCard } from "@/components/article-card";
import {
  DemoNotice,
  NewsError,
  EditorSidebar,
  SectionHeading,
} from "@/components/news-common";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  return {
    title: article?.title ?? "Berita tidak ditemukan",
    description: article ? stripHtml(article.content).slice(0, 160) : "",
    ...(article?.is_demo ? { robots: { index: false, follow: false } } : {}),
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { articles, error } = await getNews();
  if (error)
    return (
      <main className="site-container inner-page">
        <NewsError />
      </main>
    );
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const publishedDate = formatPublishedDate(article.published_at);
  const related = articles
    .filter((item) => item.id !== article.id)
    .sort(
      (a, b) =>
        Number(b.category_id === article.category_id) -
        Number(a.category_id === article.category_id),
    )
    .slice(0, 3);
  return (
    <main className="site-container inner-page">
      <nav className="breadcrumbs" aria-label="Jejak navigasi">
        <Link href="/">Beranda</Link>
        <ChevronRight size={12} />
        <Link href={`/kategori/${article.categories?.slug}`}>
          {article.categories?.name ?? "Berita"}
        </Link>
        <ChevronRight size={12} />
        <span>Artikel</span>
      </nav>
      {article.is_demo && <DemoNotice />}
      <div className="content-columns article-layout">
        <article>
          <Link
            className="category-label"
            href={`/kategori/${article.categories?.slug}`}
          >
            {article.categories?.name}
          </Link>
          <h1 className="article-title">{article.title}</h1>
          <div className="byline">
            <span className="author-avatar">b.</span>
            <div>
              <strong>
                {article.profiles?.full_name ?? "Redaksi FORTISNEWS"}
              </strong>
              <span>
                {publishedDate ?? "Tanggal publikasi tidak tersedia"}
              </span>
            </div>
          </div>
          <figure className="article-figure">
            <div>
              <NewsImage
                src={article.thumbnail_url}
                alt={article.title}
                priority
                sizes="(max-width: 900px) 100vw, 800px"
              />
            </div>
            <figcaption>
              {article.is_demo
                ? "Foto ilustrasi: Unsplash. Konten contoh untuk pratinjau tampilan."
                : (article.source_note ?? "Ilustrasi artikel — FORTISNEWS")}
            </figcaption>
          </figure>
          <ArticleReader
            article={article}
            html={DOMPurify.sanitize(article.content)}
          />
          <div className="article-end">
            <span>Terus jelajahi perspektif baru.</span>
            <Link href="/">
              Kembali ke beranda <ArrowLeft size={15} />
            </Link>
          </div>
        </article>
        <EditorSidebar
          articles={articles
            .filter((item) => item.id !== article.id)
            .slice(0, 5)}
        />
      </div>
      {related.length > 0 && (
        <section className="related-section">
          <SectionHeading title="Baca Juga" />
          <div className="news-grid">
            {related.map((item) => (
              <ArticleCard article={item} key={item.id} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
