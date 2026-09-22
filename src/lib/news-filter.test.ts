import { describe, expect, it } from "vitest";
import { filterArticles, pageNumber } from "./news-filter";
import { demoArticles } from "./demo-news";

describe("news discovery", () => {
  it("combines trimmed case-insensitive text with category and editorial filters", () => {
    const found = filterArticles(demoArticles, {
      q: "  AI  ",
      category: "teknologi",
      featured: true,
    });
    expect(found.map((article) => article.slug)).toEqual([
      "teknologi-ai-kehidupan-sehari-hari",
    ]);
  });
  it("treats query operators as literal search text", () => {
    expect(
      filterArticles(demoArticles, { q: "%,status.eq.pending" }),
    ).toHaveLength(0);
  });
  it("does not match HTML tags", () => {
    expect(filterArticles(demoArticles, { q: "<blockquote>" })).toHaveLength(0);
  });
  it("sorts by publication date without mutating the input", () => {
    const articles = [
      { ...demoArticles[0], published_at: "2026-09-22T10:00:00Z" },
      { ...demoArticles[1], published_at: "2026-09-20T10:00:00Z" },
    ];
    expect(filterArticles(articles, { sort: "oldest" })[0].id).toBe(
      articles[1].id,
    );
    expect(articles[0].id).toBe(demoArticles[0].id);
  });
  it.each([undefined, "NaN", "Infinity", "-4", "0"])(
    "normalizes invalid page %s",
    (value) => {
      expect(pageNumber(value, 4)).toBe(1);
    },
  );
  it("clamps past the last page and supports an empty collection", () => {
    expect(pageNumber("99", 3)).toBe(3);
    expect(pageNumber("2.9", 3)).toBe(2);
    expect(pageNumber("5", 0)).toBe(1);
  });
});
