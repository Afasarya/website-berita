import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-main">
          <div>
            <Link href="/" className="brand">
              bergaya<span>.</span>
            </Link>
            <p>
              Cerita hari ini. Wawasan esok hari.
              <br />
              Ragam informasi, untuk perspektif yang lebih luas.
            </p>
          </div>
          <div className="footer-column">
            <h3>Jelajahi</h3>
            <Link href="/search">Semua berita</Link>
            <Link href="/search?pilihan=redaksi">Pilihan redaksi</Link>
            <Link href="/tersimpan">Berita tersimpan</Link>
          </div>
          <div className="footer-column">
            <h3>Bergaya & kamu</h3>
            <Link href="/tentang">Tentang Bergaya</Link>
            <Link href="/dashboard/submit">
              Kirim tulisan <ArrowUpRight size={13} />
            </Link>
            <Link href="/register">Bergabung</Link>
          </div>
          <div className="footer-note">
            <span className="eyebrow">SELALU ADA CERITA BARU</span>
            <h3>
              Dunia bergerak.
              <br />
              Tetap terhubung.
            </h3>
            <Link href="/search">
              Temukan bacaanmu <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Bergaya. Berita untuk semua.</span>
          <span>Dibuat untuk kamu yang ingin tahu.</span>
        </div>
      </div>
    </footer>
  );
}
