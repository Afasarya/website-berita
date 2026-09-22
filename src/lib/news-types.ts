export type Category = { id: string; name: string; slug: string };
export type Article = {
  id: string;
  slug: string;
  title: string;
  content: string;
  thumbnail_url: string;
  published_at: string | null;
  is_featured: boolean;
  category_id: string;
  categories: Category | null;
  profiles: { full_name: string } | null;
  source_note?: string | null;
  is_demo?: boolean;
};
export function readingMinutes(content: string) {
  return Math.max(
    1,
    Math.ceil(
      content
        .replace(/<[^>]*>/g, " ")
        .trim()
        .split(/\s+/).length / 200,
    ),
  );
}
