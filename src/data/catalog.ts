import { Product, BaseCategory } from "../types";

export const PRODUCT_CATALOG: Product[] = [
  {
    id: "prod-kaos-ultra",
    name: "Classic Over-sized Heavy Cotton",
    category: BaseCategory.Kaos,
    description: "Kaos streetwear premium berbahan tebal namun tetap dingin. Sangat awet untuk sablon plastisol maupun DTG. Pilihan utama clothing brand lokal.",
    image: "kaos",
    basePrice: 55000,
    availableColors: [
      { name: "Ink Black", hex: "#111827" },
      { name: "Creamy White", hex: "#F9FAF8" },
      { name: "Rich Navy", hex: "#1E3B8B" },
      { name: "Sage Green", hex: "#7C9082" },
      { name: "Burgundy Velvet", hex: "#6B1D2F" }
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    materials: [
      { name: "Cotton Combed 30s", priceSurcharge: 0, desc: "Bahan adem standar distro, nyaman dipakai sehari-hari." },
      { name: "Cotton Combed 24s", priceSurcharge: 5000, desc: "Lebih tebal dan tidak menerawang, sangat kokoh." },
      { name: "Cotton Bamboo 30s", priceSurcharge: 12000, desc: "Sangat lembut, anti-bakteri cocok untuk kulit sensitif." },
      { name: "Heavyweight Cotton 16s", priceSurcharge: 20000, desc: "Super tebal, kaku bergaya retro streetwear modern." }
    ],
    printTechniques: [
      { name: "Sablon Plastisol", costPerUnit: 12000, desc: "Detail tajam, warna mentereng, sangat awet jangka panjang." },
      { name: "Sablon DTG Premium", costPerUnit: 15000, desc: "Sistem cetak langsung ke kain, gradasi detail foto tak terbatas." },
      { name: "Bordir Komputer", costPerUnit: 22000, desc: "Hasil benang timbul presisi tinggi, terlihat mewah dan formal." }
    ],
    popular: true
  },
  {
    id: "prod-hoodie-cozy",
    name: "Cozy Premium Fleece Hoodie",
    category: BaseCategory.Hoodie,
    description: "Hoodie minimalis dengan kantong kanguru dan tali serut tebal. Bahan wol halus di bagian dalam memberikan kehangatan maksimal dengan jahitan ganda yang rapi.",
    image: "hoodie",
    basePrice: 135000,
    availableColors: [
      { name: "Charcoal Grey", hex: "#4B5563" },
      { name: "Shadow Black", hex: "#0c0d0e" },
      { name: "Sand Beige", hex: "#D7C49E" },
      { name: "Forest Green", hex: "#1E3F20" }
    ],
    availableSizes: ["M", "L", "XL", "XXL"],
    materials: [
      { name: "Cotton Fleece Premium", priceSurcharge: 0, desc: "Campuran katun tebal dengan bulu halus di bagian dalam." },
      { name: "Heavyweight Terry", priceSurcharge: 15000, desc: "Tidak berbulu di dalam, tekstur simpul unik, elegan dan adem." }
    ],
    printTechniques: [
      { name: "Bordir Komputer Premium", costPerUnit: 25000, desc: "Rekomendasi terbaik untuk tampilan hoodie elegan." },
      { name: "Sablon Plastisol High-Density", costPerUnit: 18000, desc: "Sablon timbul kokoh bertekstur karet premium." },
      { name: "Sablon DTF Multi-warna", costPerUnit: 14000, desc: "Film transfer elastis tahan retak beresolusi tinggi." }
    ],
    popular: true
  },
  {
    id: "prod-jaket-coach",
    name: "Windbreaker Coach Jacket",
    category: BaseCategory.Jaket,
    description: "Jaket semi-sporty tahan angin dan cipratan air dengan kancing tekan depan dan tali pengencang pinggang. Pilihan populer untuk komunitas dan organisasi luar ruangan.",
    image: "jaket",
    availableColors: [
      { name: "Classic Navy", hex: "#1E293B" },
      { name: "Dark Olive", hex: "#3F4E3E" },
      { name: "Midnight Black", hex: "#18181B" }
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    basePrice: 150000,
    materials: [
      { name: "Taslan Polyester WP", priceSurcharge: 0, desc: "Efek daun talas penolak air prima, nyaman berfuring jaring." },
      { name: "Parasut Milky Premium", priceSurcharge: 10000, desc: "Tekstur halus berbalutan coating putih anti-angin super." }
    ],
    printTechniques: [
      { name: "Sablon DTF Premium", costPerUnit: 15000, desc: "Memaksimalkan detil logo di bahan kain balon parasut." },
      { name: "Bordir Komputer Mikro", costPerUnit: 24000, desc: "Bordiran berserat rapat, menjamin logo komunitas terlihat tajam." }
    ],
    popular: false
  },
  {
    id: "prod-kemeja-work",
    name: "Signature Workwear Oxford Shirt",
    category: BaseCategory.Kemeja,
    description: "Kemeja formal-kasual bertekstur Oxford katun premium. Sangat cocok dipakai sebagai seragam kantor, pakaian lapangan/PDL maupun seragam komunitas harian.",
    image: "kemeja",
    availableColors: [
      { name: "Oxford Blue", hex: "#BACBDD" },
      { name: "Snow White", hex: "#FFFFFF" },
      { name: "Khaki Safari", hex: "#C2B280" },
      { name: "Ash Grey", hex: "#9CA3AF" }
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    basePrice: 110000,
    materials: [
      { name: "Oxford Cotton Classic", priceSurcharge: 0, desc: "Tekstur rajutan silang khas, awet dan semi-formal." },
      { name: "Japan Drill Cotton", priceSurcharge: 15000, desc: "Serat jajaran genjang tebal, tahan robek, warna tak mudah pudar." },
      { name: "Kain Tyga Premium", priceSurcharge: 25000, desc: "Super lembut, jatuh anggun di badan, sirkulasi udara optimal." }
    ],
    printTechniques: [
      { name: "Bordir Komputer Saku & Punggung", costPerUnit: 28000, desc: "Bordir emblem kokoh di atas kantong kemeja maupun punggung lebar." },
      { name: "Sablon Plastisol Flat", costPerUnit: 15000, desc: "Sablon tahan banting untuk seragam lapangan aktif." }
    ],
    popular: true
  },
  {
    id: "prod-bag-canvas",
    name: "Heavy Duty Canvas Tote Bag",
    category: BaseCategory.ToteBag,
    description: "Tas jinjing kokoh serbaguna berkapasitas besar dilengkapi ritsleting YKK. Sangat diminati kalangan mahasiswa, suvenir pernikahan, dan UMKM merchant offline.",
    image: "bag",
    availableColors: [
      { name: "Natural Ecru", hex: "#EAE6DF" },
      { name: "Deep Charcoal", hex: "#374151" },
      { name: "Mustard Gold", hex: "#D97706" }
    ],
    availableSizes: ["Standard 35x40 cm", "Large 40x45 cm"],
    basePrice: 35000,
    materials: [
      { name: "Canvas Twill 12oz", priceSurcharge: 0, desc: "Serat kanvas rapat kokoh, kelenturan pas dan ramah lingkungan." },
      { name: "Canvas Marsoto Premium", priceSurcharge: 8000, desc: "Sangat tebal bintik khas, kelas tertinggi canvas bag lokal." }
    ],
    printTechniques: [
      { name: "Sablon Manual Rubber", costPerUnit: 8000, desc: "Sangat menutup pori kanvas kasar hitam maupun putih alami." },
      { name: "Sablon DTG Full-Color", costPerUnit: 14000, desc: "Hasil cetak presisi langsung menyerap ke serat kain kanvas." }
    ],
    popular: false
  },
  {
    id: "prod-celana-cargo",
    name: "Streetwear Military Cargo Pants",
    category: BaseCategory.Celana,
    description: "Celana cargo streetwear premium dengan saku samping ganda, saku belakang tak terlihat, dan siluet santai yang nyaman. Dilengkapi jahitan bar-tack penguat di setiap sudut beban.",
    image: "celana-cargo",
    availableColors: [
      { name: "Olive Drab", hex: "#4B5320" },
      { name: "Tactical Black", hex: "#171717" },
      { name: "Desert Khaki", hex: "#C2B280" },
      { name: "Neutral Grey", hex: "#6B7280" }
    ],
    availableSizes: ["28", "30", "32", "34", "36", "38"],
    basePrice: 145050,
    materials: [
      { name: "Cotton Ripstop Tornado", priceSurcharge: 0, desc: "Serat kotak-kotak penahan sobekan ekstrim, standar militer taktis." },
      { name: "Twill Cargo Luxury", priceSurcharge: 15400, desc: "Tebal, bertekstur miring halus, sangat lembut di kulit dan fleksibel." }
    ],
    printTechniques: [
      { name: "Bordir Saku Presisi", costPerUnit: 18000, desc: "Desain bordir komputer premium di bagian tutup saku samping." },
      { name: "Sablon Plastisol Label", costPerUnit: 12000, desc: "Sablon eksklusif di paha bagian atas atau kantong belakang." }
    ],
    popular: true
  },
  {
    id: "prod-celana-chino",
    name: "Classic Chino Shorts Walkshorts",
    category: BaseCategory.Celana,
    description: "Celana pendek chino kasual di atas lutut yang minimalis. Tampilan modern, sangat rapi untuk bepergian akhir pekan atau bersantai dengan kaos distro oversized Anda.",
    image: "celana-pendek",
    availableColors: [
      { name: "Sand Twill", hex: "#D2B48C" },
      { name: "Midnight Navy", hex: "#1E293B" },
      { name: "Charcoal Black", hex: "#27272A" }
    ],
    availableSizes: ["28", "30", "32", "34", "36"],
    basePrice: 95000,
    materials: [
      { name: "Stretch Suede Cotton", priceSurcharge: 0, desc: "Celana katun melar (stretch) elastis tinggi, tidak membatasi pergerakan." },
      { name: "Drill Cotton Twill", priceSurcharge: 8000, desc: "Lebih kaku klasik, tahan gesekan, warna pekat tidak mudah kusam." }
    ],
    printTechniques: [
      { name: "Bordir Saku Belakang", costPerUnit: 15000, desc: "Saku minimalis dengan bordiran kecil yang elegan di bagian kanan belakang." },
      { name: "Sablon Saku Samping", costPerUnit: 10000, desc: "Grafik sablon vertikal tipis di samping paha." }
    ],
    popular: false
  },
  {
    id: "prod-topi-baseball",
    name: "Classic Dad Hat Baseball Cap",
    category: BaseCategory.Topi,
    description: "Topi baseball dengan panel melengkung klasik, gesper logam antik kuningan di bagian belakang untuk menyetel ukuran kepala. Pilihan suvenir dan identitas distro terbaik.",
    image: "topi-baseball",
    availableColors: [
      { name: "Off Black", hex: "#1C1917" },
      { name: "Vintage Maroon", hex: "#7F1D1D" },
      { name: "Creamy Sand", hex: "#F5F5F4" },
      { name: "Navy Blue", hex: "#172554" }
    ],
    availableSizes: ["All Size (Adjustable)"],
    basePrice: 38000,
    materials: [
      { name: "Raffel Denim Wash", priceSurcharge: 0, desc: "Serat tebal berbulu halus kelas premium distro clothing." },
      { name: "Royal Canvas Drill", priceSurcharge: 5000, desc: "Lebih kaku formal, bertekstur anyaman benang tebal premium." }
    ],
    printTechniques: [
      { name: "Bordir Timbul (3D)", costPerUnit: 20000, desc: "Huruf/emblem melambung tinggi tebal 3 dimensi di dahi depan." },
      { name: "Bordir Komputer Plat", costPerUnit: 15000, desc: "Bordir datar presisi tinggi untuk detil logo kecil di kiri atau kanan." }
    ],
    popular: true
  },
  {
    id: "prod-topi-bucket",
    name: "Reversible Streetwear Bucket Hat",
    category: BaseCategory.Topi,
    description: "Topi bucket dual-tone bergaya streetwear legendaris yang bisa dibalik luar-dalam. Memberikan dua pilihan warna berbeda dalam satu topi pesanan.",
    image: "topi-bucket",
    availableColors: [
      { name: "Black / Mustard Dual", hex: "#1E293B" },
      { name: "Olive / Khaki Dual", hex: "#3F4E3E" }
    ],
    availableSizes: ["M (57-58cm)", "L (59-60cm)"],
    basePrice: 42000,
    materials: [
      { name: "Canvas Suede Soft", priceSurcharge: 0, desc: "Kedua sisi menggunakan kanvas halus premium, lentur dan nyaman." }
    ],
    printTechniques: [
      { name: "Bordir Dua Sisi", costPerUnit: 25000, desc: "Pemasangan dua desain bordir berbeda untuk luar maupun dalam topi." },
      { name: "Sablon Disto Dual-Side", costPerUnit: 18000, desc: "Sablon dtf tahan retak di kedua sisi pengerjaan." }
    ],
    popular: false
  }
];

export const TESTIMONIALS = [
  {
    id: "test-1",
    name: "Ahmad Rizky",
    role: "Ketua BEM",
    company: "Universitas Indonesia",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    content: "Pesan 200 pcs Jaket Coach untuk angkatan lewat CustomWear gampang banget. Kalkulator harganya transparan, dan saat dikirim, jahitannya sangat konsisten. Mantap!"
  },
  {
    id: "test-2",
    name: "Clarissa Utama",
    role: "Founder",
    company: "Sēns Label (Clothing Brand)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    content: "Studio Desainnya sangat interaktif! Saya bisa atur letak logo di kaos heavy cotton, lalu langsung checkout. Estimasi produksinya tepat waktu hanya 5 hari kerja."
  },
  {
    id: "test-3",
    name: "Hendra Wijaya",
    role: "Direktur Operasional",
    company: "Laris Manis UMKM",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    content: "Custom tote bag kanvas buat suvenir merchant kami berkali-kali di sini. Adminnya cepat mengonfirmasi pembayaran lewat QRIS, dan sistem pelacakan progres produksinya riil."
  }
];
