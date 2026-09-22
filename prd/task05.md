# Task 05 — Fetch, Integrasi, Testing, dan Final Verification

## Tujuan
Menghubungkan seluruh frontend-backend, memeriksa data nyata Supabase, menjalankan semua test, memperbaiki defect, dan memastikan Definition of Done PRD terpenuhi.

## Checklist Implementasi

### 1. Fetch dan integrasi data
- [ ] Hubungkan homepage ke query featured/latest published.
- [ ] Hubungkan kategori ke query paginated published articles.
- [ ] Hubungkan detail artikel ke query slug dengan visibility rule.
- [ ] Hubungkan search ke query `q` dan empty state.
- [ ] Hubungkan register/login/logout ke Supabase Auth.
- [ ] Hubungkan dashboard user ke artikel milik current user.
- [ ] Hubungkan submit/edit user ke upload dan mutation artikel.
- [ ] Hubungkan admin dashboard ke aggregate count.
- [ ] Hubungkan admin artikel, review, kategori, dan user ke endpoint/server action masing-masing.
- [ ] Pastikan cache/revalidation tidak menampilkan artikel pending/rejected sebagai published.
- [ ] Tambahkan invalidation/revalidate setelah create, edit, approve, reject, delete, dan perubahan kategori.

### 2. Verifikasi data dan state
- [ ] Seed kategori dan minimal beberapa artikel untuk pengujian.
- [ ] Uji data kosong pada semua halaman.
- [ ] Uji data sangat panjang, judul duplikat, slug duplikat, dan karakter HTML.
- [ ] Uji pagination halaman pertama, tengah, terakhir, dan halaman kosong.
- [ ] Uji refresh browser pada route protected.
- [ ] Uji direct URL ke artikel pending/rejected.
- [ ] Uji concurrent review saat item sudah diproses admin lain.

### 3. Test functional end-to-end
- [ ] Guest browsing homepage, kategori, detail, dan search berhasil.
- [ ] Guest tidak dapat submit artikel atau membuka dashboard/admin.
- [ ] User register/login/logout berhasil.
- [ ] User dapat submit dengan validasi lengkap.
- [ ] Submission user masuk `pending` dan tidak muncul publik.
- [ ] User dapat melihat status dan alasan reject.
- [ ] User dapat edit/resubmit rejected menjadi `pending`.
- [ ] User tidak dapat edit/delete published.
- [ ] Admin dapat approve dan artikel menjadi published.
- [ ] Admin dapat reject dengan alasan wajib.
- [ ] Admin dapat CRUD artikel dan kategori.
- [ ] Admin tidak dapat menghapus kategori yang dipakai.
- [ ] Admin dapat melihat daftar user read-only.

### 4. Test security
- [ ] Jalankan test RLS guest, user A, user B, dan admin.
- [ ] Coba manipulasi `author_id`, `role`, `status`, `is_featured`, dan `published_at` dari client.
- [ ] Coba akses endpoint admin sebagai guest/user biasa.
- [ ] Coba upload file bukan gambar, MIME palsu, dan file >2MB.
- [ ] Coba XSS melalui title, source note, dan content.
- [ ] Pastikan service-role key tidak muncul pada client bundle, response, log, atau commit.
- [ ] Periksa dependency vulnerability bila tool tersedia.

### 5. Test quality dan build
- [ ] Jalankan `npm run lint`.
- [ ] Jalankan type-check TypeScript dengan command project yang sesuai.
- [ ] Jalankan unit test.
- [ ] Jalankan integration test.
- [ ] Jalankan end-to-end test.
- [ ] Jalankan `npm run build`.
- [ ] Jalankan `npm start` dan smoke-test production build.
- [ ] Perbaiki semua error/warning relevan; jangan menutup error dengan suppression tanpa alasan.

### 6. Responsive, accessibility, dan performance
- [ ] Uji viewport 360px, mobile, tablet, dan desktop.
- [ ] Uji keyboard-only pada navbar, form, dialog, table, dan dropdown.
- [ ] Uji screen reader label dan error form.
- [ ] Periksa contrast warna status dan text.
- [ ] Pastikan semua gambar memakai `next/image` dan alt text.
- [ ] Periksa loading state, layout shift, dan request berulang.
- [ ] Pastikan halaman artikel punya title/meta description dinamis.

### 7. Final checklist PRD
- [ ] Guest dapat browsing homepage, kategori, detail, dan search.
- [ ] User dapat register, login, logout.
- [ ] User dapat submit dengan validasi client + server.
- [ ] Artikel user pending sampai admin approve.
- [ ] Admin dapat approve/reject dengan alasan.
- [ ] Rejected article dapat diedit dan disubmit ulang.
- [ ] Admin dapat CRUD artikel dan kategori.
- [ ] RLS aktif dan teruji.
- [ ] Design system diterapkan.
- [ ] Semua halaman responsive.
- [ ] Deploy ke Vercel + Supabase berhasil.
- [ ] Environment production tervalidasi tanpa secret di repository.
- [ ] Tidak ada fitur out-of-scope yang ikut dibuat.

## Output Wajib
- [ ] Catatan hasil test: command, tanggal, status pass/fail, dan ringkasan error.
- [ ] Daftar bug yang ditemukan dan status perbaikannya.
- [ ] Bukti smoke test route utama.
- [ ] Konfirmasi acceptance criteria PRD lengkap.
- [ ] Jika ada test gagal, tandai jelas sebagai `NOT READY`; jangan menyatakan selesai.

## Definition of Done
Project hanya boleh dinyatakan selesai jika lint, type-check, unit/integration/e2e test, build, smoke test, security check, responsive check, dan seluruh acceptance criteria PRD lolos.
