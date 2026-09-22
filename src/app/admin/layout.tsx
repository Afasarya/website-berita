import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role,full_name").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/");
  return <div className="min-h-screen bg-[#f8f9fb]"><aside className="border-b border-border bg-white"><div className="mx-auto flex max-w-7xl flex-wrap items-center gap-5 px-4 py-4 sm:px-8"><Link href="/admin" className="mr-4 text-xl font-bold text-[#1e3a5f]">Bergaya Admin</Link><nav className="flex flex-wrap gap-4 text-sm font-medium text-[#6b7280]"><Link href="/admin">Dashboard</Link><Link href="/admin/artikel">Artikel</Link><Link href="/admin/review">Review</Link><Link href="/admin/kategori">Kategori</Link><Link href="/admin/user">User</Link><Link href="/">Situs publik</Link></nav><span className="ml-auto text-sm text-[#6b7280]">{profile.full_name}</span></div></aside>{children}</div>;
}
