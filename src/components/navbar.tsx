import { createClient } from "@/lib/supabase/server";
import { getNews } from "@/lib/news";
import { SiteHeader } from "./site-header";
export async function Navbar() {
  const news = await getNews();
  let signedIn = false;
  try {
    const {
      data: { user },
    } = await (await createClient()).auth.getUser();
    signedIn = !!user;
  } catch {
    /* Public navigation remains available. */
  }
  const date = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date());
  return (
    <SiteHeader categories={news.categories} signedIn={signedIn} date={date} />
  );
}
