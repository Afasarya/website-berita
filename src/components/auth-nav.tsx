"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export function LogoutButton() { const router = useRouter(); async function logout() { await createClient().auth.signOut(); router.push("/"); router.refresh(); } return <button onClick={logout} className="text-sm text-[#6b7280]">Keluar</button>; }
