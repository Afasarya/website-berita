import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() { const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); return user; }
export async function getCurrentProfile() { const supabase = await createClient(); const user = await getCurrentUser(); if (!user) return null; const { data } = await supabase.from("profiles").select("id,full_name,avatar_url,role,created_at").eq("id", user.id).single(); return data; }
export async function requireUser() { const user = await getCurrentUser(); if (!user) redirect("/login"); return user; }
export async function requireAdmin() { const user = await requireUser(); const profile = await getCurrentProfile(); if (profile?.role !== "admin") redirect("/"); return { user, profile }; }
