import type { Article } from "./news-types";
export function filterArticles(
  articles: Article[],
  options: { q?: string; category?: string; featured?: boolean; sort?: string },
) {
  const query = (options.q ?? "").trim().toLocaleLowerCase("id");
  const result = articles.filter(
    (article) =>
      (!query ||
        (article.title + " " + article.content.replace(/<[^>]*>/g, " "))
          .toLocaleLowerCase("id")
          .includes(query)) &&
      (!options.category || article.categories?.slug === options.category) &&
      (!options.featured || article.is_featured),
  );
  if (options.sort === "oldest")
    return [...result].sort(
      (a, b) =>
        Date.parse(a.published_at ?? "1970-01-01") -
        Date.parse(b.published_at ?? "1970-01-01"),
    );
  return result;
}
export function pageNumber(value: string | undefined, totalPages: number) {
  const parsed = Number(value);
  return Math.min(
    Math.max(1, totalPages),
    Number.isFinite(parsed) ? Math.max(1, Math.floor(parsed)) : 1,
  );
}
