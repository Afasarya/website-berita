import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Tentang FORTISNEWS" };
export default function AboutPage() {
  return (
    <main className="site-container inner-page about-page">
      <div className="page-title">
        <span className="eyebrow">TENTANG FORTISNEWS</span>
        <h1>
          Cerita hari ini.
          <br />
          Wawasan esok hari<span>.</span>
        </h1>
        <p>
          Ruang untuk menemukan informasi, menjelajahi gagasan, dan melihat
          dunia dari lebih banyak sudut pandang.
        </p>
      </div>
      <div className="about-grid">
        <section>
          <h2>Dekat dengan rasa ingin tahumu.</h2>
          <p>
            FORTISNEWS adalah portal berita dengan beragam kategori, dari nasional
            dan ekonomi hingga teknologi, olahraga, hiburan, dan gaya hidup.
            Kami merancang pengalaman membaca yang nyaman agar kamu dapat fokus
            pada cerita.
          </p>
          <p>
            Simpan artikel untuk nanti, cari topik yang menarik perhatianmu, dan
            temukan bacaan lain melalui pilihan redaksi.
          </p>
        </section>
        <section>
          <h2>Ada ruang untuk ceritamu.</h2>
          <p>
            Pembaca dapat membuat akun dan mengirim tulisan melalui dashboard.
            Tulisan yang diajukan masuk ke proses peninjauan sebelum diterbitkan
            oleh pengelola.
          </p>
          <Link href="/register" className="red-button">
            Bergabung dengan FORTISNEWS <ArrowUpRight size={17} />
          </Link>
        </section>
      </div>
      <p className="about-disclosure">
        Saat belum ada artikel terbit, portal menampilkan konten contoh dengan
        penanda pratinjau. Artikel contoh bukan laporan berita aktual. Fitur
        simpan berita menggunakan penyimpanan browser pada perangkat yang kamu
        gunakan.
      </p>
    </main>
  );
}
