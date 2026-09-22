import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminArticleForm from "../article-form";
export default async function NewAdminArticle() { const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user) redirect("/login"); const { data: categories } = await supabase.from("categories").select("id,name").order("name"); return <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-8"><Link href="/admin/artikel" className="text-sm text-[#1e3a5f]">← Kembali</Link><h1 className="mt-4 text-3xl font-bold">Artikel baru</h1><AdminArticleForm categories={categories ?? []} authorId={user.id} /></main>; }
