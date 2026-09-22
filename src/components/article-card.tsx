import Link from "next/link";
import { Clock3 } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import type { Article } from "@/lib/news-types";
import { NewsImage } from "./news-image";
import { BookmarkButton } from "./saved-news";
export function ArticleCard({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  return (
    <article
      className={`article-card ${compact ? "article-card-compact" : ""}`}
    >
      <Link
        href={`/berita/${article.slug}`}
        className="card-image"
        aria-label={article.title}
      >
        <NewsImage src={article.thumbnail_url} alt={article.title} />
      </Link>
      <div className="card-copy">
        <Link
          className="category-label"
          href={`/kategori/${article.categories?.slug ?? "nasional"}`}
        >
          {article.categories?.name ?? "Berita"}
        </Link>
        <h3>
          <Link href={`/berita/${article.slug}`}>{article.title}</Link>
        </h3>
        <div className="card-meta">
          <span>
            <Clock3 size={12} />
            {article.is_demo
              ? "Artikel contoh"
              : article.published_at
                ? formatRelativeTime(article.published_at)
                : "Redaksi FORTISNEWS"}
          </span>
          <BookmarkButton article={article} />
        </div>
      </div>
    </article>
  );
}
