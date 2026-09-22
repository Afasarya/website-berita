# Product Requirements Document (PRD)
## Website Portal Berita — "Bergaya" Detik.com / Kompas.com

| | |
|---|---|
| **Versi** | 1.0 |
| **Tanggal** | 22 September 2026 |
| **Disusun untuk** | AI Coding Agent (implementasi end-to-end) |
| **Developer** | Arya Fathdillah Adi Saputra |
| **Status** | Ready for Development |

---

## 1. Ringkasan Proyek

Membangun website portal berita untuk keperluan tugas sekolah, dengan pengalaman dan struktur konten mirip portal berita nasional (Detik.com, Kompas.com), tetapi dengan scope fitur yang dibatasi agar realistis dikerjakan dalam waktu singkat.

Ciri khas yang **wajib terasa**:
- Ada sistem CRUD berita penuh dengan kategori.
- Ada mekanisme **submit berita oleh user terdaftar** (bukan cuma admin) — mirip citizen journalism di Detik/Kompas — yang harus melalui **verifikasi/moderasi admin** sebelum tayang.
- Tampilan bersih, modern, minim elemen mencolok — terinspirasi dari 3 referensi desain (lihat Bagian 8: Design System).

---

## 2. Tujuan (Goals) & Non-Tujuan (Non-Goals)

### 2.1 In-Scope (Wajib Dikerjakan)
- Halaman publik: Home, Kategori, Detail Artikel, Search.
- Autentikasi: Register, Login, Logout (role: `user`, `admin`).
- User terdaftar (role `user`) dapat **submit artikel berita** → status awal `pending` → menunggu approval admin.
- Admin dapat melakukan **full CRUD** artikel (termasuk artikel miliknya sendiri, langsung publish tanpa antre moderasi).
- Admin dapat **review antrian submission** dari user: approve (jadi `published`) atau reject (dengan alasan, kembali ke user sebagai `rejected`).
- Admin CRUD kategori.
- Dashboard user: melihat status submission miliknya (`pending` / `published` / `rejected` + alasan).
- Desain responsif, ringan, dan sesuai design system (Bagian 8).

### 2.2 Out-of-Scope (Fase Berikutnya — Jangan Dikerjakan Dulu)
- Multi-role redaksi bertingkat (editor, penulis terpisah dari admin).
- Kolom komentar pembaca.
- View counter & trending otomatis berbasis analytics.
- Penjadwalan tayang (scheduled publish).
- Tag/label artikel terpisah dari kategori.
- Notifikasi push / newsletter email.
- Breaking news ticker otomatis / live update real-time.

> Catatan untuk AI Coding Agent: jangan menambahkan fitur di luar daftar in-scope meskipun "terasa mudah ditambahkan" — tetap sesuai batas scope ini kecuali diinstruksikan lain.

---

## 3. User Roles & Permission Matrix

| Aksi | Guest (belum login) | User (terdaftar) | Admin |
|---|---|---|---|
| Baca artikel published | ✅ | ✅ | ✅ |
| Search & filter kategori | ✅ | ✅ | ✅ |
| Register / Login | ✅ | – | – |
| Submit artikel baru | ❌ | ✅ (status → `pending`) | ✅ (langsung `published`) |
| Edit artikel draft/pending miliknya | ❌ | ✅ (selama belum di-approve) | ✅ (semua artikel) |
| Hapus artikel miliknya | ❌ | ✅ (selama status `pending`/`rejected`) | ✅ (semua artikel) |
| Melihat status submission miliknya | ❌ | ✅ | ✅ |
| Approve/Reject submission user lain | ❌ | ❌ | ✅ |
| CRUD kategori | ❌ | ❌ | ✅ |
| Melihat daftar semua user | ❌ | ❌ | ✅ |

**Definisi role di database:** `users.role` enum → `user` (default saat register) | `admin` (di-set manual lewat Supabase dashboard, tidak ada UI publik untuk self-promote jadi admin).

---

## 4. Information Architecture / Sitemap

### 4.1 Halaman Publik
| Route | Halaman | Auth |
|---|---|---|
| `/` | Homepage (featured + latest news + kategori highlight) | Publik |
| `/kategori/[slug]` | Listing artikel per kategori (paginated) | Publik |
| `/berita/[slug]` | Detail artikel | Publik |
| `/search?q=...` | Hasil pencarian | Publik |
| `/login` | Login | Publik (redirect jika sudah login) |
| `/register` | Registrasi user baru | Publik |

### 4.2 Halaman User (role: `user`, login required)
| Route | Halaman |
|---|---|
| `/dashboard` | Ringkasan status submission milik user |
| `/dashboard/submit` | Form submit artikel baru |
| `/dashboard/artikel/[id]/edit` | Edit artikel milik sendiri (hanya jika status `pending` atau `rejected`) |

### 4.3 Halaman Admin (role: `admin`, login required)
| Route | Halaman |
|---|---|
| `/admin` | Dashboard ringkasan (jumlah artikel published, pending review, total user) |
| `/admin/artikel` | Tabel semua artikel + filter status, CRUD |
| `/admin/artikel/baru` | Form tambah artikel baru (langsung published) |
| `/admin/artikel/[id]/edit` | Edit artikel apapun |
| `/admin/review` | Antrian submission `pending` dari user → approve/reject |
| `/admin/kategori` | CRUD kategori |
| `/admin/user` | Daftar user terdaftar (read-only untuk MVP ini) |

---

## 5. Functional Requirements (Detail per Fitur)

### 5.1 Homepage (`/`)
- **Hero/Featured section**: 1 artikel featured besar (artikel published terbaru, atau artikel yang ditandai `is_featured = true` oleh admin).
- **Latest News grid**: daftar artikel published terbaru, urut `published_at DESC`, paginasi atau "load more".
- **Kategori highlight**: tab/pill filter kategori di atas grid (All, + daftar kategori) — klik untuk filter tanpa reload penuh (client-side filter atau navigasi ke `/kategori/[slug]`).
- Setiap card artikel menampilkan: thumbnail (rasio 16:9), badge kategori, judul, nama penulis/author, waktu relatif (mis. "2 jam lalu").

### 5.2 Halaman Kategori (`/kategori/[slug]`)
- Judul kategori + deskripsi singkat (opsional).
- Grid artikel published dalam kategori tsb, paginated (misal 12 per halaman).
- Empty state jika belum ada artikel di kategori tsb.

### 5.3 Detail Artikel (`/berita/[slug]`)
- Judul, kategori (badge, link ke halaman kategori), nama author, tanggal publish.
- Gambar thumbnail/cover di atas konten.
- Konten artikel (rich text — render HTML dari editor, sanitasi wajib untuk cegah XSS).
- Section "Artikel Terkait" (Related Articles): 3–4 artikel published lain dari kategori yang sama, exclude artikel ini sendiri.
- Artikel dengan status selain `published` **tidak boleh bisa diakses** oleh guest/user lain via URL langsung (return 404), kecuali oleh pemilik/admin (untuk preview).

### 5.4 Search (`/search?q=...`)
- Search berdasarkan `title` (dan opsional `content`) menggunakan `ILIKE` di Postgres, hanya mencari di artikel `published`.
- Tampilkan hasil dalam format card sama seperti homepage.
- Empty state jika tidak ada hasil.

### 5.5 Autentikasi
- **Register** (`/register`): email, password, nama lengkap → membuat akun di Supabase Auth + insert row ke tabel `profiles` dengan `role = 'user'`.
- **Login** (`/login`): email + password via Supabase Auth.
- **Logout**: tombol di navbar (dropdown avatar), clear session.
- **Route protection**: middleware Next.js untuk proteksi `/dashboard/*` (butuh login role apapun) dan `/admin/*` (butuh login role `admin`, redirect ke `/` jika bukan admin).

### 5.6 Submit Artikel oleh User (`/dashboard/submit`) — **Fitur Kunci**

**Syarat submission** (mirip mekanisme citizen journalism Detik/Kompas), harus divalidasi di form (client) **dan** di server (jangan percaya validasi client saja):

| Field | Validasi |
|---|---|
| Judul | Wajib, 15–120 karakter |
| Kategori | Wajib pilih salah satu dari kategori yang ada |
| Konten | Wajib, minimum 200 karakter (cegah submission asal-asalan) |
| Gambar thumbnail | **Wajib upload 1 gambar**, format jpg/png/webp, maks 2MB |
| Pernyataan orisinalitas | Wajib centang checkbox: *"Saya menjamin tulisan ini adalah karya asli saya dan bukan hasil plagiarisme"* |
| Sumber/referensi (opsional) | Textarea bebas untuk mencantumkan sumber berita jika ada |

**Alur status artikel (state machine):**

```
[User submit] → pending
pending → published   (jika admin approve)
pending → rejected    (jika admin reject, WAJIB isi alasan)
rejected → pending    (jika user edit & submit ulang)
```

- Setelah submit, user diarahkan ke `/dashboard` dan melihat artikelnya berstatus **"Menunggu Review"**.
- User **tidak bisa** mengedit artikel yang statusnya `published` (untuk menjaga integritas berita yang sudah tayang — hubungi admin manual jika perlu revisi besar).
- User **bisa** mengedit & submit ulang artikel yang `rejected` (form re-submit, status kembali ke `pending`).
- Rate limit sederhana: maksimum **3 submission pending** aktif per user pada satu waktu (cegah spam) — validasi di server saat submit baru.

### 5.7 Dashboard User (`/dashboard`)
- List semua artikel yang pernah disubmit user tsb (published, pending, rejected), dengan badge status berwarna.
- Untuk yang `rejected`, tampilkan alasan penolakan dari admin.
- Tombol "Submit Artikel Baru" menuju `/dashboard/submit`.
- Tombol "Edit" hanya muncul untuk status `pending`/`rejected`.

### 5.8 Admin — Dashboard (`/admin`)
- Kartu ringkasan: Total Artikel Published, Total Menunggu Review, Total Kategori, Total User Terdaftar.
- Shortcut ke `/admin/review` jika ada antrian pending > 0 (highlight jumlahnya).

### 5.9 Admin — Manage Artikel (`/admin/artikel`)
- Tabel semua artikel (semua status), kolom: Judul, Kategori, Author, Status, Tanggal, Aksi (Edit/Hapus).
- Filter by status (All/Published/Pending/Rejected) dan by kategori.
- Admin bisa CRUD artikel manapun tanpa batasan (termasuk membuat artikel langsung `published` sebagai penulis atas nama sistem/admin).

### 5.10 Admin — Review Submission (`/admin/review`)
- List khusus artikel berstatus `pending`, urut submission terlama dulu (FIFO).
- Klik artikel → tampil preview penuh (judul, gambar, konten, author, kategori).
- Tombol **Approve** → status jadi `published`, set `published_at = now()`.
- Tombol **Reject** → wajib isi textarea alasan → status jadi `rejected`, simpan `rejection_reason`.

### 5.11 Admin — Manage Kategori (`/admin/kategori`)
- CRUD kategori: nama, slug (auto-generate dari nama, bisa diedit manual).
- Validasi: tidak bisa hapus kategori yang masih dipakai oleh artikel (tampilkan pesan error, minta pindahkan artikel dulu).

### 5.12 Admin — Manage User (`/admin/user`)
- Read-only table: nama, email, role, tanggal daftar, jumlah artikel published.
- (Opsional/nice-to-have, bukan prioritas): tombol untuk suspend/block user — **tidak wajib untuk MVP ini**.

---

## 6. Arsitektur & Tech Stack

| Layer | Teknologi | Catatan |
|---|---|---|
| Framework | **Next.js** (App Router) | Full-stack: frontend + API routes/Server Actions dalam satu project |
| Bahasa | TypeScript | Wajib strict mode agar lebih aman |
| Styling | **Tailwind CSS** | Sesuai design system Bagian 8 |
| Database | **Supabase (PostgreSQL)** | Termasuk Row Level Security (RLS) |
| Auth | **Supabase Auth** (email/password) | Jangan bikin sistem auth manual dari nol |
| Storage gambar | **Supabase Storage** (bucket `article-images`, public read) | |
| Rich text editor | **Tiptap** | Untuk input konten artikel di form submit/CRUD |
| ORM/Query | **Supabase JS Client** langsung (`@supabase/supabase-js`) | Prisma opsional, tidak wajib untuk skala proyek ini |
| Hosting | **Vercel** (Hobby/Free tier) | Deploy frontend + API routes |
| Hosting DB | **Supabase** (Free tier) | |

**Alasan arsitektur ini**: semua gratis, deploy sederhana (satu repo, satu platform), dan cukup untuk skala tugas sekolah.

---

## 7. Skema Database (Supabase / PostgreSQL)

### 7.1 Tabel `profiles`
Extend dari `auth.users` bawaan Supabase (1-to-1 relation via `id`).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid, PK, FK → `auth.users.id` | |
| `full_name` | text | |
| `avatar_url` | text, nullable | |
| `role` | text, enum (`user`, `admin`), default `user` | |
| `created_at` | timestamptz, default `now()` | |

### 7.2 Tabel `categories`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid, PK, default `gen_random_uuid()` | |
| `name` | text, unique, not null | |
| `slug` | text, unique, not null | |
| `created_at` | timestamptz, default `now()` | |

### 7.3 Tabel `articles`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid, PK, default `gen_random_uuid()` | |
| `title` | text, not null | |
| `slug` | text, unique, not null | Auto-generate dari title + suffix random jika duplikat |
| `content` | text, not null | HTML dari rich text editor |
| `thumbnail_url` | text, not null | |
| `category_id` | uuid, FK → `categories.id`, not null | |
| `author_id` | uuid, FK → `profiles.id`, not null | |
| `status` | text, enum (`pending`, `published`, `rejected`), default `pending` | Admin-created articles bisa langsung `published` |
| `rejection_reason` | text, nullable | Diisi saat status `rejected` |
| `is_featured` | boolean, default `false` | Untuk hero section homepage, hanya admin yang bisa set |
| `source_note` | text, nullable | Sumber/referensi opsional dari user |
| `submitted_at` | timestamptz, default `now()` | |
| `published_at` | timestamptz, nullable | Diisi saat status berubah jadi `published` |
| `created_at` | timestamptz, default `now()` | |
| `updated_at` | timestamptz, default `now()` | Update otomatis via trigger |

**Index yang disarankan**: `articles(status, published_at DESC)`, `articles(category_id)`, `articles(slug)` (unique), full-text/`ILIKE` search index pada `title`.

### 7.4 Row Level Security (RLS) — Wajib Aktif
- `categories`: SELECT publik untuk semua; INSERT/UPDATE/DELETE hanya role `admin`.
- `articles`: 
  - SELECT: publik hanya untuk `status = 'published'`; author boleh SELECT artikel miliknya sendiri apapun statusnya; admin boleh SELECT semua.
  - INSERT: user login boleh insert dengan `author_id = auth.uid()` dan `status = 'pending'` (kecuali admin, boleh `published` langsung).
  - UPDATE: author boleh update miliknya sendiri **hanya jika** `status IN ('pending','rejected')`; admin boleh update apapun.
  - DELETE: author boleh delete miliknya sendiri **hanya jika** `status IN ('pending','rejected')`; admin boleh delete apapun.
- `profiles`: SELECT publik (untuk tampilkan nama author); UPDATE hanya oleh diri sendiri (kecuali kolom `role`, hanya bisa diubah manual lewat Supabase dashboard/SQL, bukan lewat aplikasi).

---

## 8. Design System (Berdasarkan Referensi yang Diberikan)

**Arahan gaya:** clean, modern, tidak bertele-tele, terasa seperti portal berita profesional, dan **warna tidak boleh mencolok** (hindari warna terang/neon seperti kuning cerah pada salah satu referensi). Gunakan pendekatan minimalis ala referensi "VertoNews" (hitam-putih, elegan) dikombinasikan dengan struktur grid/card ala 2 referensi lainnya, namun dengan aksen warna yang diredam (muted).

### 8.1 Warna
| Token | Hex | Penggunaan |
|---|---|---|
| `background` | `#FFFFFF` | Background utama |
| `surface-muted` | `#F8F9FB` | Background section alternatif, sidebar card |
| `text-primary` | `#111827` | Judul, teks utama |
| `text-secondary` | `#6B7280` | Meta info (waktu, author) |
| `border` | `#E5E7EB` | Garis pemisah, border card |
| `primary` (aksen utama) | `#1E3A5F` (navy gelap) | Logo, tombol utama, link aktif |
| `primary-hover` | `#16304C` | Hover state tombol primary |
| `accent-muted` | `#9A5B13` (amber gelap/kecoklatan) | Badge kategori terpilih, highlight kecil — dipakai secukupnya, jangan dominan |
| `success` | `#15803D` | Badge status "Published" |
| `warning` | `#B45309` | Badge status "Pending" |
| `danger` | `#B91C1C` | Badge status "Rejected", tombol hapus |

> Catatan: badge kategori sebaiknya pakai background abu muda (`surface-muted`) dengan teks `text-primary`, bukan warna-warni mencolok per kategori — supaya tetap "clean" sesuai instruksi.

### 8.2 Tipografi
- **Font heading**: `Plus Jakarta Sans` atau `Inter` (bold/semibold), untuk judul artikel & heading section.
- **Font body**: `Inter` (regular/medium), untuk paragraf, meta info, form.
- Skala ukuran: 
  - H1 (judul detail artikel): 32–36px, bold
  - H2 (heading section, mis. "Berita Terbaru"): 22–24px, semibold
  - Card title: 16–18px, semibold
  - Body/paragraph: 15–16px, regular
  - Meta/caption (waktu, author): 13px, medium, `text-secondary`

### 8.3 Layout & Spacing
- Container max-width: `1280px`, padding horizontal responsif (`16px` mobile, `32px` desktop).
- Grid artikel: 4 kolom di desktop (≥1024px), 2 kolom di tablet, 1 kolom di mobile.
- Spacing scale (Tailwind default cocok): 4, 8, 12, 16, 24, 32, 48, 64px.
- Border radius card/gambar: `12px` (rounded-xl), tombol: `8px` (rounded-lg).
- Shadow: gunakan shadow sangat tipis (`shadow-sm`) pada card, hindari shadow tebal/dramatis.

### 8.4 Komponen Utama
- **Navbar**: logo kiri, nav kategori tengah/kiri (Home, kategori-kategori utama), search icon + auth button/avatar kanan. Sticky di atas saat scroll (opsional).
- **Hero/Featured Card**: gambar besar (rasio ~16:9 atau 3:2), overlay gradient tipis di bawah gambar untuk keterbacaan judul jika judul ditumpuk di atas gambar (opsional — atau judul di luar gambar seperti referensi "Buletin", lebih simpel & sesuai instruksi "tidak bertele-tele").
- **Article Card**: thumbnail 16:9 rounded-xl, badge kategori kecil, judul (line-clamp 2 baris), meta (author • waktu relatif).
- **Section Header**: judul section kiri + link "Lihat Semua" kanan (style seperti referensi "Buletin": teks + panah).
- **Sidebar Widget** (opsional untuk homepage, misal "Terpopuler"): card dengan background `surface-muted`, list artikel ringkas bernomor.
- **Status Badge** (untuk dashboard user & admin): pill kecil dengan warna sesuai token status (success/warning/danger) + background versi mutednya (opacity rendah).
- **Form Input**: border `border` token, focus ring `primary`, radius `8px`, label di atas input (bukan placeholder-only, untuk aksesibilitas).
- **Button Primary**: background `primary`, teks putih, radius `8px`, hover `primary-hover`.
- **Button Secondary/Ghost**: border `border`, teks `text-primary`, background transparan.
- **Empty State**: ikon sederhana + teks `text-secondary`, dipakai saat search/kategori kosong.

### 8.5 Yang Sebaiknya **Dihindari** (berdasarkan instruksi user)
- Warna cerah/neon besar-besaran (seperti kuning terang penuh di salah satu referensi) — kalaupun pakai aksen, gunakan versi mutednya dan porsi kecil saja.
- Terlalu banyak widget/section di homepage sekaligus (jangan padat seperti referensi sport-news yang sangat ramai) — cukup: Hero → Latest News grid → (opsional) 1 sidebar widget sederhana.
- Dekorasi berlebihan (icon ramai, gradient mencolok, animasi berat).

---

## 9. Non-Functional Requirements

- **Responsive**: wajib berfungsi baik di mobile (≥360px), tablet, dan desktop.
- **SEO dasar**: setiap halaman artikel punya `<title>` dan `meta description` dinamis dari judul/excerpt artikel; slug URL harus SEO-friendly (lowercase, dash-separated).
- **Keamanan**:
  - Sanitasi konten HTML dari rich text editor sebelum disimpan/ditampilkan (cegah XSS).
  - Middleware proteksi route `/admin/*` dan `/dashboard/*`.
  - RLS aktif di semua tabel Supabase (jangan andalkan validasi frontend saja).
- **Performance**: gunakan `next/image` untuk semua gambar (lazy load otomatis, optimasi ukuran).
- **Keterbatasan Free Tier** (agar AI agent tidak kaget saat testing):
  - Supabase free project bisa auto-pause setelah 7 hari tanpa aktivitas.
  - Batas ukuran upload gambar disarankan client-side validation 2MB agar tidak membebani Storage free tier.

---

## 10. Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # hanya dipakai di server-side (API routes), JANGAN expose ke client
```

---

## 11. Struktur Folder yang Disarankan (Next.js App Router)

```
/app
  /(public)
    /page.tsx                    → Homepage
    /kategori/[slug]/page.tsx
    /berita/[slug]/page.tsx
    /search/page.tsx
    /login/page.tsx
    /register/page.tsx
  /(user)
    /dashboard/page.tsx
    /dashboard/submit/page.tsx
    /dashboard/artikel/[id]/edit/page.tsx
  /(admin)
    /admin/page.tsx
    /admin/artikel/page.tsx
    /admin/artikel/baru/page.tsx
    /admin/artikel/[id]/edit/page.tsx
    /admin/review/page.tsx
    /admin/kategori/page.tsx
    /admin/user/page.tsx
  /api
    /articles/route.ts
    /articles/[id]/route.ts
    /articles/[id]/review/route.ts
    /categories/route.ts
/components
  /ui/                            → Button, Badge, Input, Card, dll (design system)
  /article-card.tsx
  /navbar.tsx
  /footer.tsx
/lib
  /supabase/client.ts
  /supabase/server.ts
  /utils.ts                       → slugify, format relative time, dll
/middleware.ts                    → proteksi route /admin & /dashboard
```

---

## 12. Acceptance Criteria (Definition of Done)

- [ ] Guest bisa browsing homepage, kategori, detail artikel, dan search tanpa login.
- [ ] User bisa register, login, logout.
- [ ] User bisa submit artikel dengan semua syarat validasi di Bagian 5.6 (client + server-side validation).
- [ ] Artikel baru dari user berstatus `pending` dan **tidak muncul** di halaman publik sampai di-approve.
- [ ] Admin bisa melihat antrian `pending` di `/admin/review`, approve/reject dengan alasan.
- [ ] Artikel yang di-reject muncul di dashboard user beserta alasannya, dan bisa diedit lalu disubmit ulang.
- [ ] Admin bisa CRUD artikel & kategori penuh tanpa perlu approval (in-place published).
- [ ] RLS Supabase mencegah user mengakses/mengubah data yang bukan haknya (test langsung lewat Supabase client, bukan cuma UI).
- [ ] Tampilan sudah sesuai design system Bagian 8 (warna, tipografi, spacing, komponen).
- [ ] Semua halaman responsif di mobile & desktop.
- [ ] Deploy berhasil di Vercel + Supabase, domain custom terpasang.

---

## 13. Fase Berikutnya (Referensi — Jangan Dikerjakan Sekarang)

Lihat Bagian 2.2 (Out-of-Scope). Simpan sebagai catatan roadmap jika klien ingin lanjut ke fase 2:
multi-role redaksi, komentar, view counter/trending, scheduled publish, tag artikel, newsletter/notifikasi, breaking news ticker real-time.