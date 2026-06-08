import { Product } from "../types";
import { PRODUCT_CATALOG, TESTIMONIALS } from "../data/catalog";
import { 
  Sparkles, 
  ArrowRight, 
  Shirt, 
  Layers, 
  Calculator, 
  Truck, 
  Heart, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Activity,
  Award
} from "lucide-react";

interface LandingViewProps {
  onNavigate: (view: "landing" | "catalog" | "studio" | "cart" | "tracking" | "dashboard" | "specs", selectedProdId?: string) => void;
}

export default function LandingView({ onNavigate }: LandingViewProps) {
  // Grab standard popular items
  const popularProducts = PRODUCT_CATALOG.filter(p => p.popular);

  return (
    <div id="landing-page-root" className="space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section id="hero-banner" className="relative min-h-[80vh] flex items-center bg-slate-900 rounded-3xl overflow-hidden px-6 py-12 md:px-12 text-white border border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 px-3.5 py-1.5 rounded-full text-xs text-orange-400 font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> FashionTech Startup Indonesia
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Desain & Pesan <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Pakaian Custom</span> Tanpa Batas.
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-sans">
            Platform modern untuk mahasiswa, komunitas, clothing brand, dan perusahaan. Sesuaikan desain kaos, hoodie, kemeja OXFORD sesenangmu secara riil 3D preview, dapatkan kalkulasi harga seketika, langsung jahit di konveksi lokal terbaik.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              id="hero-cta-studio"
              onClick={() => onNavigate("studio")}
              className="bg-orange-500 hover:bg-orange-600 active:transform active:scale-95 text-white font-bold px-8 py-4 rounded-xl text-sm tracking-wide transition-all shadow-md shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              Mulai Desain Sekarang
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-cta-catalog"
              onClick={() => onNavigate("catalog")}
              className="bg-slate-800 hover:bg-slate-700 active:transform active:scale-95 text-slate-100 border border-slate-700 font-bold px-8 py-4 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Lihat Katalog Produk
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-10 border-t border-slate-850 max-w-lg">
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-orange-400 font-mono">100%</p>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-wider uppercase font-medium mt-1">Lokal Konveksi</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-orange-400 font-mono">Simulasi</p>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-wider uppercase font-medium mt-1">Harga Otomatis</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-orange-400 font-mono">0 Pcs</p>
              <p className="text-slate-400 text-[10px] md:text-xs tracking-wider uppercase font-medium mt-1">Tanpa Minimum Order</p>
            </div>
          </div>
        </div>
        
        {/* Right decoration representation of apparel customization */}
        <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-orange-500/20 to-lime-500/10 rounded-full blur-3xl" />
        <div className="hidden lg:grid absolute right-16 top-1/2 -translate-y-1/2 w-80 h-96 bg-slate-850/80 rounded-2xl border border-slate-700 p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm justify-between">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-slate-400">#MOCKUP_STUDIO</span>
            <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Realtime Preview</span>
          </div>
          
          <div className="my-8 flex justify-center">
            <svg viewBox="0 0 100 100" className="w-40 h-40 drop-shadow-xl text-slate-300 fill-current">
              {/* Simple beautiful SVG representation of customized Kaos */}
              <path d="M 20 20 C 35 25 65 25 80 20 C 85 30 92 35 95 42 C 85 45 83 45 80 40 L 80 90 C 80 93 20 93 20 90 L 20 40 C 17 45 15 45 5 42 C 8 35 15 30 20 20 Z" />
              <rect x="35" y="38" width="30" height="20" rx="3" fill="#f97316" opacity="0.85" />
              <text x="50" y="48" fill="#ffffff" fontSize="5" fontWeight="bold" textAnchor="middle" letterSpacing="0.2">STUDIO</text>
            </svg>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-350">
              <span>Bahan: Combed 24s</span>
              <span className="text-orange-400 font-bold">IDR 55.000,-</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-orange-500 w-3/4 h-full" />
            </div>
            <div className="flex items-center gap-1.5 pt-1 text-[10px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
              <span>Selesai kustom dalam 1 menit</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CARA KERJA (STEPS) */}
      <section id="how-it-works-section" className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block">Proses Mudah</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bagaimana CustomWear Bekerja?
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
            Hanya butuh 5 langkah instan untuk menyulap ide kreasi liarmu menjadi pakaian fisik berkualitas butik distro premium.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              icon: <Shirt className="w-6 h-6 text-orange-500" />,
              title: "1. Pilih Apparel",
              desc: "Tentukan kaos oversized, hoodie fleece, jaket coach harian, hingga tas jinjing oxford sesuai selera."
            },
            {
              icon: <Layers className="w-6 h-6 text-purple-500" />,
              title: "2. Visualisasi Desain",
              desc: "Tambahkan logo merek sendiri, ganti teks slogan, geser letak saku, atau ubah warna kain secara live."
            },
            {
              icon: <Calculator className="w-6 h-6 text-emerald-500" />,
              title: "3. Taksiran Harga",
              desc: "Simulasikan harga seketika berdasarkan teknik bordir/sablon dan jumlah pesanan yang diinput."
            },
            {
              icon: <CheckCircle2 className="w-6 h-6 text-blue-500" />,
              title: "4. Pembayaran",
              desc: "Selesaikan checkout aman via transfer bank online atau e-wallet (Simulasi Midtrans)."
            },
            {
              icon: <Truck className="w-6 h-6 text-rose-500" />,
              title: "5. Jahit & Kirim",
              desc: "Pesanan segera dijahit oleh mitra konveksi UMKM lokal terpercaya dan dikirim dengan nomor resi."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                  {item.icon}
                </div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PRODUK UNGGULAN (SAMPEL KATALOG) */}
      <section id="featured-products" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block">Customizable Catalog</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Katalog Apparel Unggulan</h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md">Pilihan pakaian polos dengan jahitan kokoh berstandar retail ekspor.</p>
          </div>
          <button
            id="featured-catalog-btn"
            onClick={() => onNavigate("catalog")}
            className="group flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-orange-500 font-sans transition-colors cursor-pointer self-start sm:self-auto"
          >
            Lihat Semua Kategori
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProducts.map((p, idx) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="p-4 bg-slate-50 text-center relative overflow-hidden h-64 flex items-center justify-center">
                {/* Visual design represent block */}
                <span className="absolute left-3 top-3 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Populer
                </span>

                <svg viewBox="0 0 100 100" className="w-44 h-44 drop-shadow-lg text-slate-700/80 fill-current group-hover:scale-105 transition-transform" style={{ color: p.availableColors[0].hex }}>
                  {p.image === "kaos" && <path d="M 20 20 C 35 25 65 25 80 20 C 85 30 92 35 95 42 C 85 45 83 45 80 40 L 80 90 C 80 93 20 93 20 90 L 20 40 C 17 45 15 45 5 42 C 8 35 15 30 20 20 Z" />}
                  {p.image === "hoodie" && <path d="M 20 25 C 35 30 65 30 80 25 L 90 45 C 83 46 80 44 78 40 L 78 90 C 78 93 22 93 22 90 L 22 40 C 20 44 17 46 10 45 Z M 35 25 C 38 10 62 10 65 25 Z" />}
                  {p.image === "kemeja" && <path d="M 20 20 C 35 24 65 24 80 20 L 92 40 C 85 41 82 39 80 37 L 80 90 C 80 93 20 93 20 90 L 20 37 C 18 39 15 41 8 40 L 20 20 Z" />}
                  {p.image === "bag" && <path d="M 25 35 L 75 35 L 75 90 L 25 90 Z M 35 35 C 35 20 65 20 65 35" fill="none" stroke="currentColor" strokeWidth="6" />}
                </svg>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-orange-500 font-mono tracking-wider">{p.category}</span>
                  <h3 className="font-extrabold text-slate-900 text-lg tracking-tight mt-0.5">{p.name}</h3>
                  <p className="text-slate-500 text-xs line-clamp-2 mt-1 leading-relaxed">{p.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.availableColors.slice(0, 4).map((c, i) => (
                    <span 
                      key={i} 
                      className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner block" 
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                  {p.availableColors.length > 4 && (
                    <span className="text-[10px] text-slate-400 font-bold">+{p.availableColors.length - 4} warna</span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Mulai Dari</span>
                    <span className="text-sm font-extrabold text-slate-950 font-mono">IDR {p.basePrice.toLocaleString("id-ID")}</span>
                  </div>
                  <button
                    id={`featured-action-${p.id}`}
                    onClick={() => onNavigate("studio", p.id)}
                    className="bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                  >
                    Mulai Custom
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VALUE PROPOSITION / KEUNGGULAN CUSTOMWEAR */}
      <section id="customwear-highlights" className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block">Mengapa Memilih Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Menghubungkan Anda Secara Transparan dengan Konveksi Lokal
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            CustomWear merevolusi cara pemesanan seragam dan apparel retail di Indonesia. Kami memangkas birokrasi penawaran harga manual sales konvensional yang lama dan bertele-tele.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: <Activity className="w-5 h-5 text-orange-500" />,
                title: "Tanpa Minimum Order (Pesan 1 Tetap Dilayani)",
                desc: "Cocok untuk kado pribadi, seragam admin UMKM, atau sampling clothing brand baru."
              },
              {
                icon: <Award className="w-5 h-5 text-purple-500" />,
                title: "Quality Control & Jahitan Standard Retail",
                desc: "Pilih ketebalan katun combed premium dan benang poliester tangguh anti susut."
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
                title: "Dukungan Ekosistem Vendor & Mitra Konveksi Lokal",
                desc: "Setiap pesanan Anda turut mendongkrak pemasukan penjahit lokal skala mikro."
              }
            ].map((pt, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                  {pt.icon}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{pt.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white space-y-6 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
          
          <h3 className="font-extrabold text-lg text-orange-400">Toko / UMKM Butuh Seragam?</h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Gunakan simulasi kalkulator di dashboard B2B kami untuk pesanan volume besar (di atas 100 pcs). Nikmati diskon persentase langsung, penagihan invoice termin pembayaran fleksibel, serta pencetakan bordir contoh GRATIS.
          </p>

          <div className="border-t border-slate-800 pt-6 space-y-4 font-mono text-[11px] md:text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Order &gt; 50 Pcs</span>
              <span className="text-emerald-400 font-semibold">Diskon Harga 15%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Order &gt; 250 Pcs</span>
              <span className="text-emerald-400 font-semibold">Diskon Harga 25% + Free Ongkir Jawa</span>
            </div>
          </div>

          <button
            id="highlight-spec-cta"
            onClick={() => onNavigate("studio")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs tracking-wider transition-all cursor-pointer"
          >
            Mulai Desain Seragam Toko
          </button>
        </div>
      </section>

      {/* 5. TESTIMONI PENGGUNA */}
      <section id="testimonials-section" className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block">Suara Pelanggan</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Kisah Sukses Komunitas CustomWear</h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">Telah dipercayai ratusan mahasiswa BEM, pelaku UMKM, dan perintis clothing brand lokal di Indonesia.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
              <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed">“ {t.content} ”</p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <img 
                  referrerPolicy="no-referrer" 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-10 h-10 rounded-full object-cover bg-slate-100 border border-slate-200" 
                />
                <div>
                  <h4 className="font-extrabold text-slate-950 text-sm">{t.name}</h4>
                  <p className="text-slate-500 text-[10px] font-medium">{t.role} di <span className="text-orange-600 font-semibold">{t.company}</span></p>
                </div>
                
                <div className="ml-auto flex shrink-0 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION FINALE */}
      <section id="cta-finale-card" className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 border border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-xl mx-auto space-y-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Siap Mendesain Baju Impianmu?</h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Tidak butuh keahlian CorelDraw atau Photoshop. Gunakan template instan Studio Desain CustomWear dan buat kreasimu terwujud sekarang juga.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              id="finale-cta-studio"
              onClick={() => onNavigate("studio")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              Mulai Desain Sekarang
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              id="finale-cta-specs"
              onClick={() => onNavigate("specs")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold px-6 py-3 rounded-xl text-xs transition-all cursor-pointer"
            >
              Pelajari Arsitektur Startup
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
