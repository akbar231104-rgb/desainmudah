export interface TechDocItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export const SITEMAP_DATA = {
  root: "CustomWear Platform (/) ",
  branches: [
    {
      name: "Landing Page (Public)",
      pages: ["Hero / Call to Action", "Cara Kerja", "Produk Unggulan", "Testimoni", "Footer Section"]
    },
    {
      name: "Product Catalog",
      pages: ["List Kategori Produk", "Fungsi Filter Sisi Kiri", "Kartu Produk Detail Link"]
    },
    {
      name: "Product Detail (Detail page)",
      pages: ["Pilihan Warna & Ukuran Sewaktu", "Deskripsi & Surcharge Teknis", "Tombol Direct 'Custom Sekarang'"]
    },
    {
      name: "Design Studio (Core Feature)",
      pages: ["Sidebar Kiri (Text, Logo, Warna)", "Canvas Preview (Interactive Drag/Rotate/Scale)", "Sidebar Kanan (Smart Calculator, Add to Cart)"]
    },
    {
      name: "Cart / Keranjang Belanja",
      pages: ["List Custom Order Item", "Kalkulasi Diskon Kuantitas", "Update / Hapus Kuantitas"]
    },
    {
      name: "Checkout System",
      pages: ["Form Konsumen (Nama, HP, Alamat)", "Pilihan Bank/E-wallet", "Ganti Gateway Simulasi Midtrans"]
    },
    {
      name: "Order Tracking Timeline",
      pages: ["Input / Cari Order ID", "Progress Step Timeline (Diproses, Produksi, Kirim)"]
    },
    {
      name: "User Dashboard",
      pages: ["Profil Pengguna", "Riwayat & Detail Transaksi", "Track Status Individu"]
    },
    {
      name: "Admin Dashboard Panel",
      pages: ["Overview Stat Omzet", "Ganti Status Order (Simulasi Produksi)", "Manipulasi Katalog Produk (Tambah/Hapus)"]
    }
  ]
};

export const USER_FLOW_STEPS = [
  {
    step: "1. Eksplorasi",
    actor: "Pengguna",
    description: "Mengunjungi landing page, membaca testimoni / cara kerja, lalu mengklik 'Mulai Desain' atau masuk ke katalog produk."
  },
  {
    step: "2. Pilih Produk",
    actor: "Pengguna",
    description: "Memilih jenis apparel dasar, misal 'Classic Heavy Cotton' (Kaos) dari katalog, dan memilih detail awal."
  },
  {
    step: "3. Custom di Design Studio",
    actor: "Pengguna & Canvas Editor",
    description: "Mengarahkan ke editor kanvas. Memasukkan teks slogan, mengunggah logo custom, mengatur putaran/skala, memilih warna dasar baju, dan taksiran harga terhitung langsung di panel kanan."
  },
  {
    step: "4. Masuk Cart & Estimasi",
    actor: "Sistem Kalkulator",
    description: "Menghitung ongkos total berdasarkan kuantitas (diskon bertahap), memilih opsi bahan kain & teknik cetak. Klik 'Tambahkan ke Keranjang'."
  },
  {
    step: "5. Form Checkout & Pembayaran",
    actor: "Pengguna & Gateway",
    description: "Mengisi alamat lengkap dan memilih gateway pembayaran. Sistem meluncurkan invoice pembayaran virtual."
  },
  {
    step: "6. Produksi & Konveksi (Back-office)",
    actor: "Sistem & Mitra Konveksi",
    description: "Admin meneruskan detail mockup sablon/bordir ke mitra konveksi lokal sesuai spesifikasi bahan masukan."
  },
  {
    step: "7. Tracking Real-time",
    actor: "Pengguna & Admin",
    description: "Pelanggan memantau status pesanan (Konfirmasi -> Diproses -> Produksi -> Pengiriman -> Selesai) menggunakan ID Pesanan unik atau lewat Dashboard."
  }
];

export const ERD_ENTITIES = [
  {
    name: "users (Pelanggan / Admin)",
    fields: [
      { name: "id", type: "VARCHAR (PK)", desc: "ID unik akun pengguna" },
      { name: "name", type: "VARCHAR", desc: "Nama lengkap pengguna" },
      { name: "email", type: "VARCHAR (UNIQUE)", desc: "Alamat email login" },
      { name: "phone", type: "VARCHAR", desc: "Nomor handphone aktif" },
      { name: "role", type: "ENUM('customer', 'admin')", desc: "Akses login sistem" },
      { name: "created_at", type: "TIMESTAMP", desc: "Waktu daftar" }
    ]
  },
  {
    name: "products (Basis Apparel)",
    fields: [
      { name: "id", type: "VARCHAR (PK)", desc: "ID katalog dasar" },
      { name: "name", type: "VARCHAR", desc: "Nama pakaian (contoh: Premium hoodie)" },
      { name: "category", type: "VARCHAR", desc: "Kategori (Kaos/Hoodie/Jaket/dll)" },
      { name: "base_price", type: "DECIMAL", desc: "Harga dasar modal apparel polos" },
      { name: "available_colors", type: "TEXT (JSON)", desc: "Daftar kode hex pelapis" },
      { name: "available_sizes", type: "TEXT (JSON)", desc: "Daftar ukuran (S, M, L, XL...)" }
    ]
  },
  {
    name: "custom_designs (Mockup Editor)",
    fields: [
      { name: "id", type: "VARCHAR (PK)", desc: "ID konfigurasi desain" },
      { name: "product_id", type: "VARCHAR (FK)", desc: "Merujuk ke tabel products" },
      { name: "selected_color", type: "VARCHAR", desc: "Warna yang dipilih pengguna" },
      { name: "selected_size", type: "VARCHAR", desc: "Ukuran dipilih" },
      { name: "material_type", type: "VARCHAR", desc: "Bahan (Contoh: Cotton Combed 30s)" },
      { name: "print_technique", type: "VARCHAR", desc: "Teknik sablon / bordir komputer" },
      { name: "elements_json", type: "LONGTEXT (JSON)", desc: "Skala, rotasi, teks & unggahan logo logo pengguna" }
    ]
  },
  {
    name: "orders (Invoice Pembelian)",
    fields: [
      { name: "id", type: "VARCHAR (PK)", desc: "ID Invoice Pesanan (Contoh: CW-92837)" },
      { name: "user_id", type: "VARCHAR (FK, Nullable)", desc: "Sifat opsional bagi pembeli bertamu" },
      { name: "customer_name", type: "VARCHAR", desc: "Nama penerima kirim" },
      { name: "customer_phone", type: "VARCHAR", desc: "Kontak handphone penerima" },
      { name: "shipping_address", type: "TEXT", desc: "Alamat kirim fisik lengkap" },
      { name: "total_amount", type: "DECIMAL", desc: "Total nominal pembayaran" },
      { name: "payment_method", type: "VARCHAR", desc: "Bank Transfer, E-wallet, dll" },
      { name: "payment_status", type: "ENUM('Pending', 'Paid', 'Failed')", desc: "Keadaan uang masuk" },
      { name: "order_status", type: "ENUM('Menunggu', 'Diproses', 'Produksi', 'Pengiriman', 'Selesai')", desc: "Posisi pelacakan konveksi" },
      { name: "tracking_number", type: "VARCHAR (Nullable)", desc: "Resi kurir ekspedisi" },
      { name: "created_at", type: "TIMESTAMP", desc: "Waktu order dibuat" }
    ]
  },
  {
    name: "order_items (Hubungan Belanja)",
    fields: [
      { name: "id", type: "VARCHAR (PK)", desc: "ID item baris order" },
      { name: "order_id", type: "VARCHAR (FK)", desc: "Merujuk pada tabel orders" },
      { name: "design_id", type: "VARCHAR (FK)", desc: "Merujuk pada custom_designs" },
      { name: "quantity", type: "INT", desc: "Jumlah pesanan per item (pcs)" },
      { name: "unit_price", type: "DECIMAL", desc: "Harga setelah kalkulasi material & sablon" },
      { name: "total_price", type: "DECIMAL", desc: "Kuantitas dikali harga satuan" }
    ]
  }
];

export const PROJECT_FOLDER_STRUCTURE = `
customwear-app/
├── app/ (Laravel Backend Context)
│   ├── Http/Controllers/
│   │   ├── ProductController.php
│   │   ├── OrderController.php
│   │   └── PaymentCallbackController.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Product.php
│   │   ├── CustomDesign.php
│   │   └── Order.php
│   └── Providers/
├── database/
│   ├── migrations/ (MySQL table schemas)
│   └── seeders/ (Catalog master data seeds)
├── public/
│   └── designs/ (Uploaded logo storages)
├── resources/ (React SPA Assets compiler inside Laravel)
│   ├── js/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── CanvasEditor.jsx (Fabric.js integration)
│   │   │   ├── SmartPriceCalculator.jsx
│   │   │   └── OrderTimeline.jsx
│   │   └── pages/
│   │       ├── Landing.jsx
│   │       ├── DesignStudio.jsx
│   │       └── AdminDashboard.jsx
└── config/
    └── midtrans.php (Gateway private & public credentials configuration)
`;

export const DESIGN_TOKENS = {
  colors: [
    { theme: "Primary Brand Accent", hex: "#F97316 (Orange 500)", usage: "Tombol Call to Action utama, highlight navigasi aktif, and branding ala Nike & Canva." },
    { theme: "Dark Slate Surface", hex: "#1E293B (Slate 800) / #0F172A (Slate 900)", usage: "Background utama dashboard, sasis studio editing, memberikan nuansa profesional nan mewah." },
    { theme: "Pure Studio Canvas", hex: "#F1F5F9 (Slate 100) / #FFFFFF", usage: "Panel preview pakaian baju polosan agar mudah dilihat jelas bebas distraksi." },
    { theme: "High-contrast Neutral", hex: "#0F172A (Slate 900)", usage: "Header, tombol sekunder, teks tebal yang meniru estetika kaku milik Nike." }
  ],
  typography: [
    { type: "Display / Headings Theme", font: "Plus Jakarta Sans / Inter", size: "2xl - 5xl", desc: "Lebar tegas, tracking-tight (-0.02em), sangat modern untuk visual headlines." },
    { type: "Body / Paragraphs", font: "Inter", size: "sm - base", desc: "Tingkat keterbacaan tinggi di berbagai browser, baik di laptop maupun perangkat ponsel pintar." },
    { type: "Numeric / Code Accents", font: "JetBrains Mono / Space Mono", size: "xs - sm", desc: "Dipakai pada perincian harga rupiah, estimasi biaya produksi, ID tracking unik, dan baris ERD." }
  ]
};
