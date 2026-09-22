"use client";
import { useRouter } from "next/navigation"; import { createClient } from "@/lib/supabase/client";
export default function DeleteArticle({ id }: { id: string }) { const router = useRouter(); async function remove() { if (!confirm("Hapus artikel ini? Tindakan tidak dapat dibatalkan.")) return; const { error } = await createClient().from("articles").delete().eq("id", id); if (error) alert(error.message); else router.refresh(); } return <button onClick={remove} className="text-[#b91c1c]">Hapus</button>; }
