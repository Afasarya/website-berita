# Task 04 — Backend, API, Database, dan Security

## Tujuan
Membangun backend full-stack Next.js + Supabase yang aman, tervalidasi server-side, dan memenuhi seluruh aturan bisnis PRD.

## Checklist Implementasi

### 1. Supabase client dan server boundary
- [ ] Buat browser client dengan anon key.
- [ ] Buat server client dengan cookie/session SSR.
- [ ] Buat server-only client untuk operasi yang membutuhkan service-role key.
- [ ] Tambahkan guard agar service-role key tidak pernah diimport ke client component.
- [ ] Standarkan helper auth: current user, current profile, require user, require admin.

### 2. Auth backend
- [ ] Implementasikan register lewat Supabase Auth email/password.
- [ ] Simpan `full_name` dan buat profile role `user`.
- [ ] Pastikan user tidak dapat mengubah role lewat request.
- [ ] Implementasikan login, logout, session refresh, dan route redirect.
- [ ] Tangani email/password error tanpa membocorkan detail sensitif.

### 3. API atau Server Actions artikel
- [ ] Implementasikan list artikel public: hanya `published`.
- [ ] Implementasikan detail artikel berdasarkan slug dengan aturan visibility.
- [ ] Implementasikan search title/content menggunakan `ILIKE` atau index yang sesuai.
- [ ] Implementasikan artikel terkait berdasarkan kategori dan exclude ID saat ini.
- [ ] Implementasikan create artikel user dengan validasi author dan status.
- [ ] Implementasikan update artikel user hanya untuk `pending`/`rejected` miliknya.
- [ ] Implementasikan delete artikel user hanya untuk `pending`/`rejected` miliknya.
- [ ] Implementasikan CRUD admin tanpa batasan kepemilikan.
- [ ] Generate slug lowercase, dash-separated, dan unik.
- [ ] Validasi semua payload dengan schema server-side.

### 4. Aturan submission
- [ ] Tolak judul di luar 15–120 karakter.
- [ ] Tolak konten kurang dari 200 karakter setelah menghapus markup kosong.
- [ ] Tolak category ID tidak valid atau kategori tidak ada.
- [ ] Validasi thumbnail jpg/png/webp dan maksimum 2MB di server.
- [ ] Wajibkan pernyataan orisinalitas.
- [ ] Batasi maksimum 3 artikel berstatus `pending` aktif per user.
- [ ] Set status user submission selalu `pending`, kecuali operasi admin yang sah.
- [ ] Saat rejected diedit dan dikirim ulang, ubah status ke `pending` dan reset alasan reject bila sesuai.
- [ ] Saat approve, set `status = published`, `published_at = now()`, dan bersihkan state yang tidak relevan.
- [ ] Saat reject, wajibkan alasan tidak kosong dan simpan `rejection_reason`.

### 5. Upload Storage
- [ ] Buat upload flow ke bucket `article-images`.
- [ ] Validasi MIME type, extension, ukuran, dan nama file.
- [ ] Gunakan path aman berdasarkan user/article ID.
- [ ] Hapus file lama saat thumbnail diganti bila aman dilakukan.
- [ ] Jangan percaya URL atau content type dari client tanpa validasi server.
- [ ] Tangani upload gagal tanpa membuat artikel setengah tersimpan.

### 6. API kategori dan user
- [ ] Public dapat membaca daftar kategori.
- [ ] Admin dapat membuat, mengubah, dan menghapus kategori.
- [ ] Generate/validasi slug kategori unik.
- [ ] Tolak delete kategori yang masih dipakai artikel.
- [ ] Admin dapat membaca daftar user beserta jumlah artikel published.
- [ ] Endpoint user bersifat read-only untuk MVP.

### 7. RLS dan data security
- [ ] Aktifkan RLS semua tabel.
- [ ] Uji guest, user A, user B, dan admin pada SELECT/INSERT/UPDATE/DELETE.
- [ ] Pastikan user A tidak membaca atau mengubah artikel user B.
- [ ] Pastikan pending/rejected tidak muncul pada query public.
- [ ] Pastikan role hanya dapat diubah manual melalui Supabase dashboard/SQL.
- [ ] Pastikan server error tidak mengembalikan secret, SQL detail, atau service-role data.

### 8. Sanitasi, validation, dan error handling
- [ ] Sanitasi HTML Tiptap sebelum simpan dan sebelum render.
- [ ] Batasi tag/atribut HTML yang diperbolehkan.
- [ ] Gunakan HTTP status yang benar pada route handler.
- [ ] Standarkan error code/message untuk client.
- [ ] Tambahkan validasi CSRF/session sesuai pola Supabase SSR dan Next.js.
- [ ] Hindari mass assignment dengan memilih field yang diizinkan secara eksplisit.

### 9. Testing backend
- [ ] Unit-test slugify, status transition, validation, dan sanitasi.
- [ ] Integration-test auth dan endpoint artikel.
- [ ] Test rate limit 3 pending.
- [ ] Test approve/reject dan rejection reason.
- [ ] Test kategori yang masih dipakai tidak dapat dihapus.
- [ ] Test RLS langsung menggunakan Supabase client, bukan UI saja.
- [ ] Test upload invalid type/size dan upload valid.

## Acceptance Criteria
- [ ] Semua permission matrix PRD terpenuhi server-side.
- [ ] Semua input client tidak dapat melewati validasi server.
- [ ] RLS mencegah akses lintas user.
- [ ] State machine artikel konsisten.
- [ ] Tidak ada secret bocor ke browser atau response.
- [ ] Unit/integration/security test backend lolos.
