import Link from "next/link";
export default function NotFound() {
  return (
    <main className="site-container inner-page">
      <div className="empty-state">
        <span className="eyebrow">404 · HALAMAN TIDAK DITEMUKAN</span>
        <h1>Ceritanya belum ada di sini.</h1>
        <p>Tautan mungkin telah berubah. Temukan cerita lainnya di beranda.</p>
        <Link href="/" className="red-button">
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
