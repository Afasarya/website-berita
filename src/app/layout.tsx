import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata: Metadata = {
  title: {
    default: "Bergaya — Cerita Hari Ini, Wawasan Esok Hari",
    template: "%s | Bergaya",
  },
  description:
    "Temukan berita nasional, ekonomi, teknologi, olahraga, dan gaya hidup dalam satu perspektif yang lebih luas.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Langsung ke konten
        </a>
        <Navbar />
        <div id="main-content" className="main-shell">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
