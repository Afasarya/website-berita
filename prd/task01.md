# Task 01 — Set Up Project

## Tujuan
Menyiapkan fondasi project Next.js portal berita sesuai PRD, termasuk dependency, struktur folder, environment, Supabase, database, RLS, design token, dan komponen dasar.

## Scope
- Next.js App Router, TypeScript strict, Tailwind CSS.
- Supabase Auth, PostgreSQL, Storage, SSR client.
- Tabel `profiles`, `categories`, `articles`.
- Middleware proteksi route.
- Design system dan UI primitive.

## Checklist Implementasi

### 1. Audit dan konfigurasi project
- [ ] Baca `AGENTS.md` dan dokumentasi Next.js lokal di `node_modules/next/dist/docs/` sebelum mengubah API atau struktur Next.js.
- [ ] Pastikan `npm install` berhasil.
- [ ] Pastikan TypeScript strict aktif.
- [ ] Pastikan script `dev`, `lint`, `build`, dan `start` tersedia.
- [ ] Perbaiki konfigurasi ESLint, TypeScript, Tailwind, PostCSS, dan Next.js jika diperlukan.
- [ ] Jangan menambah fitur di luar scope PRD.

### 2. Dependency dan environment
- [ ] Pastikan dependency Supabase, Tiptap, `date-fns`, `slugify`, `lucide-react`, dan utility class tersedia.
- [ ] Tambahkan dependency sanitasi HTML yang sesuai, jika belum tersedia.
- [ ] Buat `.env.example` berisi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, dan `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] Pastikan service-role key hanya dipakai server-side dan tidak masuk bundle client.
- [ ] Dokumentasikan setup environment lokal di README tanpa menulis secret nyata.

### 3. Struktur aplikasi
- [ ] Buat route group public untuk `/`, `/kategori/[slug]`, `/berita/[slug]`, `/search`, `/login`, dan `/register`.
- [ ] Buat route group user untuk `/dashboard`, `/dashboard/submit`, dan edit artikel user.
- [ ] Buat route group admin untuk semua route pada PRD.
- [ ] Buat folder `lib/supabase` untuk browser client dan server client.
- [ ] Buat helper `slugify`, format waktu relatif, validasi, role check, dan response/error handling.
- [ ] Buat komponen reusable `Navbar`, `Footer`, `ArticleCard`, status badge, empty state, dan form field.

### 4. Database Supabase
- [ ] Buat migration/schema untuk `profiles`, `categories`, dan `articles` sesuai Bagian 7 PRD.
- [ ] Tambahkan enum atau constraint status `pending`, `published`, `rejected`.
- [ ] Tambahkan constraint role `user` dan `admin`.
- [ ] Tambahkan foreign key, unique key, default value, timestamp, dan nullable field sesuai PRD.
- [ ] Buat trigger profile setelah register jika dipilih, tanpa menggantikan validasi server.
- [ ] Buat trigger `updated_at` otomatis.
- [ ] Buat index status/published date, category, slug, dan pencarian title.
- [ ] Buat bucket Storage `article-images`, public read, upload policy aman.

### 5. Row Level Security
- [ ] Aktifkan RLS pada seluruh tabel.
- [ ] Tulis policy baca kategori publik dan write kategori hanya admin.
- [ ] Tulis policy artikel published untuk publik.
- [ ] Tulis policy author agar hanya bisa melihat artikel miliknya.
- [ ] Batasi insert user ke `author_id = auth.uid()` dan status `pending`.
- [ ] Izinkan admin membuat artikel langsung `published`.
- [ ] Batasi update/delete author hanya artikel milik sendiri dengan status `pending` atau `rejected`.
- [ ] Izinkan admin mengelola semua artikel.
- [ ] Batasi update profile agar role tidak dapat diubah dari aplikasi.
- [ ] Uji policy memakai user guest, user biasa, dan admin.

### 6. Auth dan middleware
- [ ] Implementasikan browser/server Supabase client memakai SSR yang sesuai versi project.
- [ ] Buat middleware refresh session.
- [ ] Lindungi `/dashboard/*` untuk user login.
- [ ] Lindungi `/admin/*` untuk role `admin`.
- [ ] Redirect user non-admin dari admin route ke `/`.
- [ ] Hindari redirect loop dan kebocoran data melalui server component/API.

### 7. Design system
- [ ] Terapkan warna PRD: background putih, surface muted, text primary/secondary, border, navy primary, muted amber, success, warning, danger.
- [ ] Terapkan font Inter atau Plus Jakarta Sans.
- [ ] Terapkan max-width `1280px`, responsive padding, grid, radius, border, dan shadow ringan.
- [ ] Siapkan variant button primary/secondary/danger.
- [ ] Tambahkan primitive UI yang diperlukan, termasuk input, textarea, card, badge, dialog, table, dropdown, avatar, select, label, dan toast.
- [ ] Pastikan semua komponen accessible: label, focus state, keyboard navigation, dan contrast.

## Acceptance Criteria
- [ ] `npm run lint` lolos.
- [ ] `npm run build` lolos tanpa error TypeScript.
- [ ] Supabase schema dan RLS dapat dijalankan ulang tanpa konflik.
- [ ] Browser client dan server client dapat membaca session.
- [ ] Guest, user, dan admin mendapat akses sesuai matrix permission PRD.
- [ ] Tidak ada secret nyata di repository.
