# Bergaya — Portal Berita

Portal berita Indonesia berbasis Next.js App Router, React, Tailwind CSS, dan Supabase.

## Menjalankan proyek

1. Instal dependensi: `npm install`.
2. Isi `.env.local` sesuai `.env.example` dengan konfigurasi Supabase milik proyek.
3. Terapkan skema yang tersedia di `supabase/migrations` apabila menggunakan database baru.
4. Jalankan `npm run dev`, lalu buka `http://localhost:3000`.

Perintah pemeriksaan:

```sh
npm run lint
npm run test
npm run build
```

## Pengalaman pembaca

- Beranda editorial: sorotan utama, navigasi kategori, ringkasan judul, filter berita, muat lebih banyak, dan pilihan redaksi.
- Pencarian judul/isi, filter kategori dan pilihan redaksi, urutan waktu, serta pagination.
- Simpan dan hapus berita melalui bookmark; data tersimpan di browser/perangkat yang sama, tanpa sinkronisasi akun.
- Halaman artikel dengan pengaturan ukuran teks, perkiraan waktu baca, progres membaca, berbagi melalui perangkat atau salin tautan, dan artikel terkait.
- Menu ponsel, navigasi keyboard, penanda fokus, tautan langsung ke konten, dan dukungan reduced motion.
- Dashboard penulis dan admin tetap memakai autentikasi serta alur peninjauan Supabase. Konvensi middleware disesuaikan menjadi `src/proxy.ts` untuk Next.js 16.

## Data asli dan pratinjau

`src/lib/news.ts` hanya mengambil artikel berstatus `published`. Jika koneksi berhasil tetapi belum ada artikel terbit, portal menggunakan konten contoh dari `src/lib/demo-news.ts`. Konten ini diberi penanda pratinjau, tidak dimasukkan ke database, dan otomatis digantikan setelah artikel pertama diterbitkan. Kegagalan koneksi menampilkan pesan error, bukan konten contoh.

Pilihan redaksi mengikuti kolom `is_featured`. Foto contoh tersedia lokal di `public/images`; sumbernya dicatat di `public/images/SOURCES.md`. Foto tersebut merupakan ilustrasi, bukan dokumentasi peristiwa dalam artikel.

## Struktur perubahan frontend

- `src/app/globals.css`: token dan tata letak editorial responsif.
- `src/components/site-header.tsx`, `footer.tsx`: navigasi dan identitas portal.
- `src/components/news-feed.tsx`, `headline-ticker.tsx`: interaksi beranda.
- `src/components/saved-news.tsx`, `article-reader.tsx`: bookmark dan pengalaman membaca.
- `src/lib/news-filter.ts`: pencarian, pengurutan, dan normalisasi pagination.

Pengujian unit mencakup validasi artikel, pencarian literal, filter gabungan, pagination tidak valid, serta pemisahan konten contoh dari data asli/error. Alur browser diperiksa pada lebar 320, 390, 768, 1024, dan 1440 piksel.