import type { Article, Category } from "./news-types";
export const demoCategories: Category[] = [
  ["nasional", "Nasional"],
  ["ekonomi", "Ekonomi"],
  ["teknologi", "Teknologi"],
  ["olahraga", "Olahraga"],
  ["hiburan", "Hiburan"],
  ["gaya-hidup", "Gaya Hidup"],
  ["travel", "Travel"],
  ["internasional", "Internasional"],
].map(([slug, name]) => ({ id: `demo-${slug}`, name, slug }));

const stories = [
  {
    slug: "ruang-hijau-wajah-baru-kota",
    title: "Ruang hijau dan transportasi publik: wajah kota yang kita impikan",
    category: "nasional",
    image: "city",
    excerpt:
      "Di tengah ritme kota yang semakin cepat, ruang untuk berjalan kaki dan menikmati udara segar menjadi bagian penting dari kehidupan sehari-hari.",
  },
  {
    slug: "teknologi-ai-kehidupan-sehari-hari",
    title:
      "Mengenal AI lebih dekat, dari ruang kerja hingga kehidupan sehari-hari",
    category: "teknologi",
    image: "technology",
    excerpt:
      "Teknologi terus mengubah cara kita berkarya. Memahami manfaat dan batasannya menjadi langkah awal untuk menggunakannya dengan bijak.",
  },
  {
    slug: "pesona-nusantara-perjalanan-bermakna",
    title: "Menemukan sisi lain Nusantara lewat perjalanan yang lebih bermakna",
    category: "travel",
    image: "travel",
    excerpt:
      "Perjalanan bukan hanya soal destinasi. Ada cerita, tradisi, dan perjumpaan yang membuat setiap langkah terasa berbeda.",
  },
  {
    slug: "umkm-kreativitas-pasar-digital",
    title:
      "Dari usaha kecil, lahir ide besar: kreativitas UMKM di pasar digital",
    category: "ekonomi",
    image: "coffee",
    excerpt:
      "Kualitas produk dan cerita di baliknya menjadi bekal bagi usaha lokal untuk membangun hubungan dengan pelanggan.",
  },
  {
    slug: "sepak-bola-ruang-kebersamaan",
    title: "Lebih dari pertandingan, sepak bola adalah ruang kebersamaan",
    category: "olahraga",
    image: "football",
    excerpt:
      "Dari lapangan kampung hingga stadion, sepak bola mempertemukan banyak orang dalam semangat yang sama.",
  },
  {
    slug: "kebiasaan-kecil-hidup-seimbang",
    title: "Jeda sejenak: kebiasaan kecil untuk hari yang lebih seimbang",
    category: "gaya-hidup",
    image: "nature",
    excerpt:
      "Menikmati waktu di luar ruangan dan memberi jeda dari layar bisa menjadi cara sederhana untuk mengubah ritme hari.",
  },
  {
    slug: "musik-independen-ruang-kreatif",
    title: "Panggung musik independen dan ruang baru bagi suara kreatif",
    category: "hiburan",
    image: "music",
    excerpt:
      "Komunitas dan panggung kecil menjadi tempat bertemunya musisi, pendengar, dan gagasan segar.",
  },
  {
    slug: "kota-dunia-ruang-publik",
    title: "Belajar dari ruang publik yang mempertemukan warga kota dunia",
    category: "internasional",
    image: "architecture",
    excerpt:
      "Taman, trotoar, dan ruang bersama menceritakan bagaimana sebuah kota memberi tempat bagi warganya.",
  },
  {
    slug: "kopi-lokal-cerita-nusantara",
    title: "Secangkir kopi lokal, ribuan cerita dari penjuru Nusantara",
    category: "gaya-hidup",
    image: "coffee",
    excerpt:
      "Setiap daerah memiliki cara tersendiri untuk menikmati kopi, dari proses seduh hingga percakapan yang menyertainya.",
  },
  {
    slug: "wisata-alam-perjalanan-pelan",
    title: "Saatnya berjalan lebih pelan dan kembali menikmati alam",
    category: "travel",
    image: "nature",
    excerpt:
      "Menjelajah alam mengajak kita memperhatikan hal-hal kecil yang sering terlewat dalam keseharian.",
  },
  {
    slug: "literasi-digital-keluarga",
    title: "Membangun kebiasaan digital yang lebih bijak bersama keluarga",
    category: "teknologi",
    image: "workspace",
    excerpt:
      "Percakapan terbuka tentang teknologi membantu keluarga menemukan cara yang tepat untuk hidup berdampingan dengan layar.",
  },
  {
    slug: "arsitektur-kota-cerita-warga",
    title: "Membaca cerita warga lewat arsitektur dan sudut-sudut kota",
    category: "nasional",
    image: "architecture",
    excerpt:
      "Bangunan lama dan ruang baru menyimpan jejak perubahan yang membentuk identitas sebuah kota.",
  },
  {
    slug: "produk-lokal-desain-berkarakter",
    title: "Ketika produk lokal tampil percaya diri dengan desain berkarakter",
    category: "ekonomi",
    image: "workspace",
    excerpt:
      "Perhatian pada detail dan pemahaman kebutuhan pengguna menjadi titik awal untuk membuat produk yang bermakna.",
  },
  {
    slug: "olahraga-komunitas-akhir-pekan",
    title: "Temukan semangat akhir pekan lewat olahraga bersama komunitas",
    category: "olahraga",
    image: "football",
    excerpt:
      "Aktivitas bersama memberi kesempatan untuk bertemu teman baru dan menjaga kebiasaan bergerak.",
  },
];
export const demoArticles: Article[] = stories.map((story, index) => {
  const category = demoCategories.find((item) => item.slug === story.category)!;
  return {
    id: `demo-${index + 1}`,
    slug: story.slug,
    title: story.title,
    content: `<p>${story.excerpt}</p><p>Artikel ini merupakan konten contoh untuk memperlihatkan pengalaman membaca di Bergaya. Tulisan ini bukan laporan peristiwa aktual dan tidak dimaksudkan sebagai sumber berita.</p><h2>Melihat lebih dekat</h2><p>Di balik topik yang kita temui setiap hari, selalu ada kesempatan untuk memahami sudut pandang yang berbeda. Mengamati lingkungan, mendengarkan pengalaman orang lain, dan meluangkan waktu untuk membaca dapat membantu kita melihat gambaran yang lebih luas.</p><p>Ruang diskusi yang terbuka memberi tempat bagi berbagai pengalaman. Mulai dari komunitas setempat hingga percakapan di rumah, gagasan sederhana sering kali menjadi awal dari perubahan dalam keseharian.</p><h2>Cerita yang dekat dengan kita</h2><p>Hal-hal kecil yang kita jumpai dapat menjadi titik awal sebuah cerita. Kebiasaan, tempat, dan interaksi sehari-hari membentuk cara kita memahami dunia di sekitar kita. Dengan memperhatikan detail, kita bisa menemukan makna yang sebelumnya terlewat.</p><blockquote>Setiap sudut pandang membuka kesempatan untuk memahami cerita dengan lebih utuh.</blockquote><p>Konten asli dari redaksi akan tampil menggantikan artikel contoh setelah berita pertama diterbitkan melalui dashboard.</p>`,
    thumbnail_url: `/images/${story.image}.jpg`,
    published_at: null,
    is_featured: index < 4,
    category_id: category.id,
    categories: category,
    profiles: { full_name: "Redaksi Bergaya" },
    is_demo: true,
  };
});
