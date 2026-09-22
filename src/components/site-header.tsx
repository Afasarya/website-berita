"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Search,
  Menu,
  X,
  ArrowUpRight,
  Bookmark,
  ChevronDown,
  UserRound,
} from "lucide-react";
import type { Category } from "@/lib/news-types";
import { LogoutButton } from "./auth-nav";
export function Brand() {
  return (
    <span className="brand">
      bergaya<span>.</span>
    </span>
  );
}
export function SiteHeader({
  categories,
  signedIn,
  date,
}: {
  categories: Category[];
  signedIn: boolean;
  date: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="site-container utility-inner">
          <span>{date}</span>
          <div>
            <span className="utility-tagline">
              Buka wawasan. Temukan perspektif.
            </span>
            <Link href="/tentang">
              Tentang Bergaya <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </div>
      <div className="site-container masthead">
        <Link href="/" aria-label="Bergaya — Beranda" className="brand-link">
          <Brand />
          <span className="brand-tagline">
            CERITA HARI INI. WAWASAN ESOK HARI.
          </span>
        </Link>
        <form action="/search" className="header-search" role="search">
          <Search size={18} />
          <label htmlFor="header-q" className="sr-only">
            Cari berita
          </label>
          <input
            id="header-q"
            name="q"
            placeholder="Apa yang ingin kamu tahu hari ini?"
            autoComplete="off"
          />
          <button type="submit" aria-label="Mulai pencarian">
            <ArrowUpRight size={18} />
          </button>
        </form>
        <div className="header-actions">
          <Link
            className="saved-link"
            href="/tersimpan"
            aria-label="Berita tersimpan"
          >
            <Bookmark size={20} />
          </Link>
          {signedIn ? (
            <>
              <Link href="/dashboard" className="login-button">
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login" className="login-button">
              <UserRound size={15} /> Masuk
            </Link>
          )}
          <button
            className="mobile-menu-button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div className="category-nav">
        <nav className="site-container nav-inner" aria-label="Navigasi utama">
          <Link href="/" className={pathname === "/" ? "nav-active" : ""}>
            Beranda
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/kategori/${category.slug}`}
              className={
                pathname === `/kategori/${category.slug}` ? "nav-active" : ""
              }
            >
              {category.name}
            </Link>
          ))}
          <Link href="/search" className="all-news-link">
            Semua berita <ChevronDown size={13} />
          </Link>
        </nav>
      </div>
      {open && (
        <div id="mobile-menu" className="mobile-menu">
          <form action="/search" role="search">
            <label className="sr-only" htmlFor="mobile-q">
              Cari berita
            </label>
            <input id="mobile-q" name="q" placeholder="Cari berita..." />
            <button aria-label="Cari">
              <Search size={20} />
            </button>
          </form>
          <Link href="/" onClick={() => setOpen(false)}>
            Beranda
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              onClick={() => setOpen(false)}
              href={`/kategori/${category.slug}`}
            >
              {category.name}
            </Link>
          ))}
          <Link href="/tersimpan" onClick={() => setOpen(false)}>
            Berita tersimpan
          </Link>
        </div>
      )}
    </header>
  );
}
