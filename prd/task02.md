# Task 02 — Frontend User/Public

## Tujuan
Membangun seluruh pengalaman frontend untuk guest dan user terdaftar, dari browsing berita sampai submit dan pemantauan artikel.

## Scope Route
- Public: `/`, `/kategori/[slug]`, `/berita/[slug]`, `/search`, `/login`, `/register`.
- User: `/dashboard`, `/dashboard/submit`, `/dashboard/artikel/[id]/edit`.

## Checklist Implementasi

### 1. Layout publik
- [ ] Buat layout responsive dengan navbar, content container, dan footer.
- [ ] Navbar menampilkan logo, Home, kategori utama, search, login/register, atau avatar/logout.
- [ ] Gunakan design token PRD; hindari warna neon, dekorasi berat, dan animasi berlebihan.
- [ ] Pastikan tampilan nyaman pada lebar minimum 360px, tablet, dan desktop.

### 2. Homepage
- [ ] Ambil hanya artikel `published`.
- [ ] Tampilkan hero artikel featured: artikel `is_featured = true` atau published terbaru.
- [ ] Tampilkan grid latest news dengan urutan `published_at DESC`.
- [ ] Tampilkan kategori highlight dan link ke `/kategori/[slug]`.
- [ ] Article card menampilkan thumbnail 16:9, badge kategori, judul, author, dan waktu relatif.
- [ ] Gunakan `next/image` untuk gambar.
- [ ] Tambahkan loading state, error state, dan empty state.

### 3. Kategori dan search
- [ ] Buat listing paginated maksimal 12 artikel per halaman.
- [ ] Tampilkan nama kategori dan deskripsi bila tersedia.
- [ ] Buat empty state jika kategori kosong.
- [ ] Implementasikan `/search?q=...` untuk pencarian title/content sesuai backend.
- [ ] Tampilkan query yang dicari dan hasil dalam format article card.
- [ ] Tangani query kosong, hasil kosong, loading, dan error.

### 4. Detail artikel
- [ ] Tampilkan judul, kategori, author, tanggal publish, cover, dan konten.
- [ ] Render HTML yang sudah disanitasi; jangan memakai `dangerouslySetInnerHTML` tanpa sanitasi.
- [ ] Tampilkan 3–4 artikel terkait dari kategori yang sama.
- [ ] Buat metadata SEO dinamis: title dan description.
- [ ] Pastikan artikel non-published tidak terlihat oleh guest/user lain.
- [ ] Tampilkan 404 untuk slug tidak ditemukan atau artikel tidak boleh diakses.

### 5. Register, login, logout
- [ ] Buat form register: email, password, nama lengkap.
- [ ] Validasi field client dan tampilkan error yang jelas.
- [ ] Hubungkan register ke Supabase Auth dan profile.
- [ ] Buat form login email/password.
- [ ] Redirect user login sesuai kebutuhan, tanpa loop.
- [ ] Tambahkan logout di dropdown/avatar.
- [ ] Cegah user login mengakses `/login` dan `/register` tanpa alasan.

### 6. Dashboard user
- [ ] Tampilkan semua artikel milik user, termasuk `pending`, `published`, dan `rejected`.
- [ ] Tampilkan badge status sesuai token warna PRD.
- [ ] Tampilkan alasan reject untuk artikel `rejected`.
- [ ] Sediakan tombol submit artikel baru.
- [ ] Tampilkan tombol edit hanya untuk `pending` dan `rejected`.
- [ ] Tampilkan loading, empty state, error, dan state setelah mutation.

### 7. Submit dan edit artikel
- [ ] Buat form Tiptap untuk judul, kategori, konten, thumbnail, source note, dan orisinalitas.
- [ ] Validasi judul 15–120 karakter.
- [ ] Validasi konten minimum 200 karakter.
- [ ] Wajib kategori, thumbnail jpg/png/webp maksimum 2MB, dan checkbox orisinalitas.
- [ ] Tampilkan preview gambar sebelum submit.
- [ ] Tampilkan progress/error upload.
- [ ] Kirim submission baru dengan status awal `pending`.
- [ ] Edit hanya artikel milik user berstatus `pending`/`rejected`.
- [ ] Setelah edit artikel rejected, status kembali `pending`.
- [ ] User tidak dapat mengedit artikel `published`.
- [ ] Tampilkan pesan saat rate limit 3 submission pending tercapai.
- [ ] Disable submit saat request berjalan dan cegah double submit.

### 8. Aksesibilitas dan kualitas UI
- [ ] Semua input punya label nyata.
- [ ] Keyboard navigation dan focus ring bekerja.
- [ ] Gambar punya alt text bermakna.
- [ ] Teks error dekat field terkait.
- [ ] Tidak ada layout shift besar saat gambar/loading muncul.
- [ ] Uji responsive pada mobile, tablet, dan desktop.

## Acceptance Criteria
- [ ] Guest bisa membuka homepage, kategori, detail, dan search.
- [ ] User bisa register, login, logout, melihat dashboard, submit, edit, dan resubmit.
- [ ] Artikel pending/rejected tidak bocor ke publik.
- [ ] Validasi client tampil benar, tetapi server tetap menjadi sumber aturan.
- [ ] UI sesuai design system dan responsive.
- [ ] `npm run lint` dan `npm run build` lolos.
