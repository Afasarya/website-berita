import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EditArticleForm from "./edit-form";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: article } = await supabase.from("articles").select("id,title,content,source_note,status,category_id,thumbnail_url").eq("id", (await params).id).eq("author_id", user.id).single();
  if (!article || article.status === "published") notFound();
  const { data: categories } = await supabase.from("categories").select("id,name").order("name");
  return <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-8"><Link href="/dashboard" className="text-sm text-[#1e3a5f]">← Kembali ke dashboard</Link><h1 className="mt-4 text-3xl font-bold">Edit artikel</h1><EditArticleForm article={article} categories={categories ?? []} /></main>;
}
