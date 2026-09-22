import Link from "next/link";
import { ArrowUpRight, ArrowRight, MoveUpRight } from "lucide-react";
import { getNews } from "@/lib/news";
import { stripHtml } from "@/lib/utils";
import { NewsImage } from "@/components/news-image";
import { NewsFeed } from "@/components/news-feed";
import { HeadlineTicker } from "@/components/headline-ticker";
import {
  DemoNotice,
  NewsError,
  SectionHeading,
  EditorSidebar,
} from "@/components/news-common";
import { ArticleCard } from "@/components/article-card";
export const revalidate = 60;
export default async function Home() {
  const { articles, categories, demo, error } = await getNews();
  const featured = [
    ...articles.filter((a) => a.is_featured),
    ...articles.filter((a) => !a.is_featured),
  ];
  const editorial = articles.filter((article) => article.is_featured);
  const hero = featured[0];
  const secondary = featured.slice(1, 3);
  return (
    <main className="site-container home-page">
      <HeadlineTicker articles={articles.slice(0, 5)} />
      <div className="home-intro">
        <div>
          <span className="eyebrow">PERSPEKTIF LEBIH LUAS</span>
          <h1>
            Hari baru, cerita baru<span>.</span>
          </h1>
        </div>
        <p>
          Dari kabar terdekat hingga cerita dunia.
          <br />
          Temukan yang penting untukmu.
        </p>
      </div>
      {error ? (
        <NewsError />
      ) : (
        hero && (
          <>
            <section
              className={`hero-grid ${secondary.length ? "" : "hero-solo"}`}
              aria-label="Sorotan utama"
            >
              <Link
                className="hero-main image-story"
                href={`/berita/${hero.slug}`}
              >
                <NewsImage
                  src={hero.thumbnail_url}
                  alt={hero.title}
                  priority
                  sizes="(max-width: 760px) 100vw, 66vw"
                />
                <div className="image-shade" />
                <div className="hero-top">
                  <span className="hero-label">
                    <span /> SOROTAN UTAMA
                  </span>
                  <MoveUpRight size={21} />
                </div>
                <div className="hero-copy">
                  <span className="image-category">
                    {hero.categories?.name}
                  </span>
                  <h2>{hero.title}</h2>
                  <p>{stripHtml(hero.content).split(".")[0]}.</p>
                  <span className="hero-meta">
                    {hero.profiles?.full_name ?? "Redaksi Bergaya"}{" "}
                    <span>•</span>{" "}
                    {demo ? "Artikel contoh" : "Baca selengkapnya"}{" "}
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
              <div className="hero-secondary">
                {secondary.map((article) => (
                  <Link
                    key={article.id}
                    className="image-story secondary-story"
                    href={`/berita/${article.slug}`}
                  >
                    <NewsImage
                      src={article.thumbnail_url}
                      alt={article.title}
                      sizes="(max-width: 760px) 100vw, 33vw"
                    />
                    <div className="image-shade" />
                    <div className="secondary-copy">
                      <span className="image-category">
                        {article.categories?.name}
                      </span>
                      <h2>{article.title}</h2>
                      <span className="small-image-link">
                        Jelajahi cerita <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            <div className="topic-strip">
              <span>PILIH TOPIKMU</span>
              {categories.slice(0, 6).map((category) => (
                <Link href={`/kategori/${category.slug}`} key={category.id}>
                  <span>#</span>
                  {category.name}
                </Link>
              ))}
              <Link className="topic-more" href="/search">
                Jelajahi <ArrowRight size={14} />
              </Link>
            </div>
            {demo && <DemoNotice />}
            <div className="content-columns">
              <section id="berita-terbaru" className="latest-section">
                <SectionHeading
                  title="Kabar Terkini"
                  href="/search"
                  label="Indeks berita"
                />
                <NewsFeed articles={articles} categories={categories} />
              </section>
              <EditorSidebar
                articles={
                  featured.slice(3, 8).length ? featured.slice(3, 8) : featured
                }
              />
            </div>
            {editorial.length > 0 && (
              <section className="editor-section" id="pilihan-redaksi">
                <div className="editor-section-intro">
                  <span className="eyebrow">LAYAK UNTUK DIBACA</span>
                  <SectionHeading
                    title="Pilihan Redaksi"
                    href="/search?pilihan=redaksi"
                  />
                  <p>
                    Cerita pilihan. Perspektif yang berbeda. Wawasan yang
                    tinggal lebih lama.
                  </p>
                </div>
                <div className="editor-grid">
                  {editorial.slice(0, 4).map((article) => (
                    <ArticleCard article={article} key={article.id} />
                  ))}
                </div>
              </section>
            )}
            <section className="discovery-banner">
              <div>
                <span className="eyebrow">
                  RASA INGIN TAHU MEMBAWAMU LEBIH JAUH
                </span>
                <h2>Selalu ada sudut pandang baru.</h2>
                <p>
                  Jelajahi cerita dari berbagai kategori, temukan bacaan yang
                  dekat denganmu.
                </p>
              </div>
              <Link href="/search">
                Temukan ceritamu <ArrowUpRight size={19} />
              </Link>
            </section>
          </>
        )
      )}
    </main>
  );
}
