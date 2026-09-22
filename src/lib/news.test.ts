import { beforeEach, describe, expect, it, vi } from "vitest";
import { demoArticles } from "./demo-news";

const { from, createClient } = vi.hoisted(() => ({
  from: vi.fn(),
  createClient: vi.fn(),
}));
vi.mock("@/lib/supabase/server", () => ({ createClient }));
import { getNews } from "./news";

function database(articles: unknown[], error: unknown = null) {
  from.mockImplementation((table: string) => {
    const query = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi
        .fn()
        .mockResolvedValue({
          data:
            table === "articles"
              ? articles
              : [{ id: "real-category", name: "Nasional", slug: "nasional" }],
          error,
        }),
    };
    return query;
  });
}

describe("public news source", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    createClient.mockResolvedValue({ from });
  });
  it("shows marked demo content only when the successful query returns no published articles", async () => {
    database([]);
    const result = await getNews();
    expect(result.demo).toBe(true);
    expect(result.articles.every((article) => article.is_demo)).toBe(true);
    expect(from.mock.results[0].value.eq).toHaveBeenCalledWith(
      "status",
      "published",
    );
  });
  it("replaces demonstration content with the real published collection", async () => {
    const published = {
      ...demoArticles[0],
      id: "real-article",
      is_demo: undefined,
    };
    database([published]);
    const result = await getNews();
    expect(result.demo).toBe(false);
    expect(result.articles).toEqual([published]);
    expect(result.categories[0].id).toBe("real-category");
  });
  it("does not disguise a database error as demo content", async () => {
    database([], { message: "Unavailable" });
    expect(await getNews()).toMatchObject({
      error: true,
      demo: false,
      articles: [],
    });
  });
  it("handles a missing connection without exposing connection details", async () => {
    createClient.mockRejectedValue(new Error("Connection failed"));
    expect(await getNews()).toEqual({
      error: true,
      demo: false,
      articles: [],
      categories: [],
    });
  });
});
