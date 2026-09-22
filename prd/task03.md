# Task 03 — Frontend Admin

## Tujuan
Membangun antarmuka admin untuk ringkasan sistem, CRUD artikel, moderasi submission, CRUD kategori, dan daftar user.

## Scope Route
- `/admin`
- `/admin/artikel`
- `/admin/artikel/baru`
- `/admin/artikel/[id]/edit`
- `/admin/review`
- `/admin/kategori`
- `/admin/user`

## Checklist Implementasi

### 1. Layout dan navigasi admin
- [ ] Buat layout admin responsive dengan sidebar atau navigation yang ringkas.
- [ ] Tampilkan menu Dashboard, Artikel, Review, Kategori, User, dan kembali ke situs publik.
- [ ] Tampilkan identitas admin dan aksi logout.
- [ ] Pastikan menu aktif jelas, keyboard accessible, dan mobile friendly.
- [ ] Jangan hanya menyembunyikan UI; seluruh akses tetap divalidasi server.

### 2. Dashboard admin
- [ ] Tampilkan kartu Total Artikel Published.
- [ ] Tampilkan kartu Total Menunggu Review.
- [ ] Tampilkan kartu Total Kategori.
- [ ] Tampilkan kartu Total User Terdaftar.
- [ ] Buat shortcut ke `/admin/review` dengan jumlah pending.
- [ ] Tampilkan loading, error, dan empty state yang konsisten.

### 3. Manage artikel
- [ ] Tampilkan tabel semua artikel dengan judul, kategori, author, status, tanggal, dan aksi.
- [ ] Tambahkan filter status All/Published/Pending/Rejected.
- [ ] Tambahkan filter kategori.
- [ ] Tambahkan pagination dan state URL agar filter dapat dibagikan/di-refresh.
- [ ] Sediakan aksi edit dan hapus.
- [ ] Hapus memakai confirmation dialog dan feedback toast.
- [ ] Sinkronkan tabel setelah create/update/delete tanpa data usang.

### 4. Buat dan edit artikel admin
- [ ] Gunakan form reusable dengan Tiptap.
- [ ] Validasi judul, kategori, konten, dan thumbnail sesuai aturan utama.
- [ ] Izinkan `source_note` opsional dan `is_featured` hanya untuk admin.
- [ ] Artikel buatan admin langsung `published` dan memiliki `published_at`.
- [ ] Admin dapat mengedit artikel milik siapa pun dan semua status.
- [ ] Beri preview thumbnail dan progress/error upload.
- [ ] Cegah double submit dan tampilkan mutation feedback.

### 5. Review submission
- [ ] Tampilkan hanya artikel `pending`, urut `submitted_at ASC` agar FIFO.
- [ ] Tampilkan preview penuh: judul, author, kategori, cover, konten, sumber.
- [ ] Tombol Approve meminta konfirmasi lalu mengubah status ke `published` dan mengisi `published_at`.
- [ ] Tombol Reject membuka dialog dengan textarea alasan wajib.
- [ ] Simpan `rejection_reason` saat reject.
- [ ] Setelah aksi berhasil, keluarkan item dari antrean dan perbarui counter.
- [ ] Tangani artikel yang sudah direview admin lain dengan pesan conflict yang jelas.

### 6. Manage kategori
- [ ] Tampilkan daftar kategori, nama, slug, tanggal, dan aksi.
- [ ] Buat form tambah/edit kategori.
- [ ] Auto-generate slug dari nama dan izinkan edit manual.
- [ ] Validasi nama dan slug wajib serta unik.
- [ ] Hapus memakai confirmation dialog.
- [ ] Jika kategori masih dipakai artikel, blokir delete dan tampilkan pesan pindahkan artikel dahulu.

### 7. Manage user
- [ ] Tampilkan tabel read-only nama, email, role, tanggal daftar, dan jumlah artikel published.
- [ ] Tambahkan pagination/search bila jumlah data besar.
- [ ] Jangan menyediakan self-promote atau pengubahan role dari UI.
- [ ] Jangan menambah suspend/block karena bukan prioritas MVP.

### 8. Keamanan dan UX
- [ ] Semua fetch dan mutation memeriksa role admin di server.
- [ ] Jangan expose service-role key ke browser.
- [ ] Sanitasi preview konten HTML.
- [ ] Tampilkan toast sukses/gagal dengan pesan aman.
- [ ] Pastikan destructive action tidak terjadi tanpa konfirmasi.
- [ ] Uji responsive dan aksesibilitas tabel/form/dialog.

## Acceptance Criteria
- [ ] Non-admin tidak dapat membuka atau memanggil operasi admin.
- [ ] Admin dapat CRUD semua artikel.
- [ ] Admin dapat approve/reject submission dengan aturan lengkap.
- [ ] Admin dapat CRUD kategori, termasuk proteksi kategori terpakai.
- [ ] Admin dapat melihat daftar user read-only.
- [ ] Counter dashboard sinkron dengan data.
- [ ] `npm run lint` dan `npm run build` lolos.
