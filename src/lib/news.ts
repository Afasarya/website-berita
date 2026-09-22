import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { demoArticles, demoCategories } from "./demo-news";
import type { Article, Category } from "./news-types";

export const getNews = cache(
  async (): Promise<{
    articles: Article[];
    categories: Category[];
    demo: boolean;
    error: boolean;
  }> => {
    try {
      const supabase = await createClient();
      const [articles, categories] = await Promise.all([
        supabase
          .from("articles")
          .select("*, categories(id,name,slug), profiles(full_name)")
          .eq("status", "published")
          .order("published_at", { ascending: false }),
        supabase.from("categories").select("id,name,slug").order("name"),
      ]);
      if (articles.error || categories.error)
        return { articles: [], categories: [], demo: false, error: true };
      if (!articles.data.length)
        return {
          articles: demoArticles,
          categories: demoCategories,
          demo: true,
          error: false,
        };
      return {
        articles: articles.data as Article[],
        categories: categories.data as Category[],
        demo: false,
        error: false,
      };
    } catch {
      return { articles: [], categories: [], demo: false, error: true };
    }
  },
);
export const getArticle = cache(
  async (slug: string): Promise<Article | null> => {
    const { articles } = await getNews();
    return articles.find((article) => article.slug === slug) ?? null;
  },
);
