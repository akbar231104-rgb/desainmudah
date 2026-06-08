import { useState, useMemo } from "react";
import { PRODUCT_CATALOG } from "../data/catalog";
import { Product, BaseCategory } from "../types";
import { 
  SlidersHorizontal, 
  Search, 
  Sparkles, 
  ArrowLeft, 
  Palette, 
  CheckCircle2, 
  Calculator, 
  ArrowRight,
  Info
} from "lucide-react";

interface CatalogViewProps {
  onNavigate: (view: "landing" | "catalog" | "studio" | "cart" | "tracking" | "dashboard" | "specs", selectedProdId?: string) => void;
  preSelectedProdId?: string | null;
}

export default function CatalogView({ onNavigate, preSelectedProdId }: CatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedColorFilter, setSelectedColorFilter] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  
  // Detail page state
  const [detailProduct, setDetailProduct] = useState<Product | null>(
    preSelectedProdId ? PRODUCT_CATALOG.find(p => p.id === preSelectedProdId) || null : null
  );

  // Selected details within the detail page modal
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);
  const [selectedMaterialIdx, setSelectedMaterialIdx] = useState<number>(0);

  // Get unique category list
  const categories = ["All", ...Object.values(BaseCategory)];

  // All colors present across products for filter
  const colorFilterOptions = [
    { name: "All", hex: "#E2E8F0" },
    { name: "Black", hex: "#111827" },
    { name: "White", hex: "#F9FAF8" },
    { name: "Navy", hex: "#1E3B8B" },
    { name: "Grey", hex: "#4B5563" },
    { name: "Red", hex: "#6B1D2F" }
  ];

  // Filters computed
  const filteredProducts = useMemo(() => {
    return PRODUCT_CATALOG.filter((p) => {
      // Category Filter
      if (selectedCategory !== "All" && p.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }
      // Max price
      if (p.basePrice > maxPrice) {
        return false;
      }
      // Color match
      if (selectedColorFilter !== "All") {
        const hexToMatch = colorFilterOptions.find(c => c.name === selectedColorFilter)?.hex;
        if (hexToMatch) {
          const hasColor = p.availableColors.some(
            (c) => c.name.toLowerCase().includes(selectedColorFilter.toLowerCase()) || c.hex === hexToMatch
          );
          if (!hasColor) return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery, selectedColorFilter, maxPrice]);

  return (
    <div id="catalog-section" className="space-y-6">
      {detailProduct ? (
        /* ==================== PRODUCT DETAIL VIEW ==================== */
        <div id="product-detail-view" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-8">
          <button
            id="detail-back-button"
            onClick={() => {
              setDetailProduct(null);
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 cursor-pointer transition font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali Ke Katalog
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Visual Mockup */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] relative">
              <span className="absolute right-4 top-4 bg-orange-100 text-orange-700 font-bold font-mono text-[10px] px-2.5 py-1 rounded">
                BASE APPAREL: {detailProduct.image.toUpperCase()}
              </span>

              {/* Dynamic SVG color visual overlay */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-72 h-72 drop-shadow-2xl transition-all" 
                style={{ color: detailProduct.availableColors[selectedColorIdx]?.hex || "#CCCCCC" }}
              >
                {detailProduct.image === "kaos" && (
                  <path d="M 20 20 C 35 25 65 25 80 20 C 85 30 92 35 95 42 C 85 45 83 45 80 40 L 80 90 C 80 93 20 93 20 90 L 20 40 C 17 45 15 45 5 42 C 8 35 15 30 20 20 Z" fill="currentColor" stroke="#334155" strokeWidth="1" />
                )}
                {detailProduct.image === "hoodie" && (
                  <>
                    {/* Shadow inner details */}
                    <path d="M 20 25 C 35 30 65 30 80 25 L 90 45 C 83 46 80 44 78 40 L 78 90 C 78 93 22 93 22 90 L 22 40 C 20 44 17 46 10 45 Z" fill="currentColor" stroke="#334155" strokeWidth="1" />
                    <path d="M 35 25 C 38 10 62 10 65 25 Z" fill="#475569" stroke="#334155" strokeWidth="1" opacity="0.3" id="hood-cap" />
                  </>
                )}
                {detailProduct.image === "jaket" && (
                  <path d="M 20 20 C 35 24 65 24 80 20 L 92 40 C 85 41 82 39 80 37 L 80 90 C 80 93 20 93 20 90 L 20 37 C 18 39 15 41 8 40 L 20 20 Z" fill="currentColor" stroke="#334155" strokeWidth="1" />
                )}
                {detailProduct.image === "kemeja" && (
                  <>
                    <path d="M 20 20 C 35 24 65 24 80 20 L 92 40 C 85 41 82 39 80 37 L 80 90 C 80 93 20 93 20 90 L 20 37 C 18 39 15 41 8 40 L 20 20 Z" fill="currentColor" stroke="#334155" strokeWidth="1" />
                    {/* Collar lines */}
                    <path d="M 20 20 L 50 32 L 80 20 M 50 32 L 50 90" fill="none" stroke="#1e293b" strokeWidth="1.5" />
                  </>
                )}
                {detailProduct.image === "bag" && (
                  <g>
                    <path d="M 25 35 C 35 20 65 20 65 35" fill="none" stroke="#475569" strokeWidth="3" />
                    <rect x="23" y="35" width="54" height="52" rx="3" fill="currentColor" stroke="#334155" strokeWidth="1.5" />
                  </g>
                )}
              </svg>
              
              <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-6 font-mono font-bold">
                Tampilan model: {detailProduct.availableColors[selectedColorIdx]?.name}
              </p>
            </div>

            {/* Right Column: Information Specs & Choices */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="bg-orange-100 text-orange-850 text-xs font-bold font-mono px-2.5 py-1 rounded uppercase tracking-wider">
                  {detailProduct.category}
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">{detailProduct.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-black font-mono text-orange-500">
                    IDR {detailProduct.basePrice.toLocaleString("id-ID")}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">/ pcs (polos)</span>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">{detailProduct.description}</p>

              {/* Size Selectors */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Pilih Ukuran Dasar (Standard Indo)</label>
                <div className="flex flex-wrap gap-2">
                  {detailProduct.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-10 h-10 border text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                        selectedSize === sz 
                          ? "bg-slate-950 border-slate-950 text-white shadow" 
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatch selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Pilih Warna Pakaian: <span className="text-orange-600 font-extrabold">{detailProduct.availableColors[selectedColorIdx]?.name}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {detailProduct.availableColors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`w-9 h-9 rounded-full border shadow-inner transition-all flex items-center justify-center cursor-pointer ${
                        selectedColorIdx === idx 
                          ? "scale-110 ring-2 ring-orange-500 border-white" 
                          : "border-slate-200 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColorIdx === idx && (
                        <CheckCircle2 className={`w-4 h-4 ${color.hex === "#F9FAF8" || color.hex === "#FFFFFF" ? "text-slate-900" : "text-white"}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric material Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Pilih Jenis Bahan Kain (Cotton/Taslan)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {detailProduct.materials.map((mat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedMaterialIdx(idx)}
                      className={`p-3.5 text-left border rounded-xl transition-all cursor-pointer ${
                        selectedMaterialIdx === idx 
                          ? "bg-orange-50/70 border-orange-500 shadow-sm" 
                          : "bg-white border-slate-200 hover:border-slate-350"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-xs text-slate-900">{mat.name}</span>
                        {mat.priceSurcharge > 0 && (
                          <span className="bg-orange-100 text-orange-700 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">
                            +IDR {mat.priceSurcharge.toLocaleString("id-ID")}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed mt-1.5">{mat.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Calculator info block */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Mulai Kustomisasi di Studio</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    Anda dapat bebas menyematkan logo sendiri, menambahkan teks dengan model font distro eksklusif, serta memutar logo. Klik tombol di bawah untuk masuk ke Studio Desain dengan basis baju ini.
                  </p>
                </div>
              </div>

              {/* Ready Custom Trigger button */}
              <button
                id="launch-direct-design"
                onClick={() => {
                  onNavigate("studio", detailProduct.id);
                }}
                className="w-full bg-slate-950 hover:bg-orange-500 font-bold py-4 rounded-xl text-xs text-white tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
              >
                CUSTOM SEKARANG DI DESIGN STUDIO
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== PRODUCT CATALOG VIEW ==================== */
        <div id="catalog-gallery" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sisi Kiri: Filter Panel */}
          <div className="lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-slate-200 h-fit">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="flex items-center gap-1.5 font-bold text-xs text-slate-800 uppercase tracking-widest">
                <SlidersHorizontal className="w-4 h-4 text-orange-500" /> Filter Apparel
              </span>
              {(selectedCategory !== "All" || searchQuery !== "" || selectedColorFilter !== "All" || maxPrice !== 200000) && (
                <button
                  id="reset-filters"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setSelectedColorFilter("All");
                    setMaxPrice(200000);
                  }}
                  className="text-[10px] font-semibold text-orange-600 hover:underline cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Pencarian */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cari Produk</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="catalog-search"
                  type="text"
                  placeholder="Misal kustom kaos, hoodie..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs pl-9 pr-4 py-2.5 outline-none focus:border-orange-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Kategori list */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kategori Utama</label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    id={`filter-cat-${cat.replace(" ","-")}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-left transition cursor-pointer ${
                      selectedCategory === cat 
                        ? "bg-slate-900 text-white font-bold" 
                        : "bg-transparent text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && (
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider range harga */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Maksimum Budget</span>
                <span className="font-mono text-orange-600 font-extrabold text-xs">IDR {maxPrice.toLocaleString("id-ID")}</span>
              </div>
              <input
                id="catalog-price-slider"
                type="range"
                min="35000"
                max="200000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-orange-500 h-1 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-mono font-bold">
                <span>Wajar (35rb)</span>
                <span>Premium (200rb)</span>
              </div>
            </div>

            {/* Filter Warna dasar Baju */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">Ketersediaan Warna</label>
              <div className="grid grid-cols-3 gap-2">
                {colorFilterOptions.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorFilter(c.name)}
                    className={`flex items-center gap-1.5 px-2 py-1.5 border rounded-lg transition-all cursor-pointer ${
                      selectedColorFilter === c.name 
                        ? "bg-slate-900 border-slate-900 text-white font-bold text-[10px]" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-350 text-[10px]"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-slate-300 block shrink-0" style={{ backgroundColor: c.hex }} />
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Hasil Pencarian Grid */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex justify-between items-center text-xs text-slate-500 font-sans">
              <span>Menampilkan <strong className="text-slate-900 font-extrabold">{filteredProducts.length}</strong> apparel kustom ditemukan</span>
              {selectedCategory !== "All" && (
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[10px]">Filter: {selectedCategory}</span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center space-y-3">
                <p className="text-slate-300 text-5xl">🫠</p>
                <h4 className="text-slate-800 font-bold text-base">Apparel Tidak Ditemukan</h4>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">
                  Silakan kurangi kata kunci pencarian Anda atau naikkan slider budget maksimum agar apparel premium ikut tercantum kembali.
                </p>
                <button
                  id="reset-query-cta"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setSelectedColorFilter("All");
                    setMaxPrice(200000);
                  }}
                  className="bg-slate-900 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-orange-500 cursor-pointer"
                >
                  Lihat Semua Koleksi
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <div 
                    key={p.id} 
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow transition-all flex flex-col justify-between group"
                  >
                    {/* Catalog Clothing Illustration Display */}
                    <div className="bg-slate-50 text-center relative h-56 flex items-center justify-center p-4">
                      {p.popular && (
                        <span className="absolute left-3 top-3 bg-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                          Hot
                        </span>
                      )}

                      <svg 
                        viewBox="0 0 100 100" 
                        className="w-36 h-36 drop-shadow-md text-slate-800 fill-current group-hover:scale-105 transition-transform" 
                        style={{ color: p.availableColors[0].hex }}
                      >
                        {p.image === "kaos" && <path d="M 20 20 C 35 25 65 25 80 20 C 85 30 92 35 95 42 C 85 45 83 45 80 40 L 80 90 C 80 93 20 93 20 90 L 20 40 C 17 45 15 45 5 42 C 8 35 15 30 20 20 Z" />}
                        {p.image === "hoodie" && <path d="M 20 25 C 35 30 65 30 80 25 L 90 45 C 83 46 80 44 78 40 L 78 90 C 78 93 22 93 22 90 L 22 40 C 20 44 17 46 10 45 Z M 35 25 C 38 10 62 10 65 25 Z" />}
                        {p.image === "jaket" && <path d="M 20 20 C 35 24 65 24 80 20 L 92 40 C 85 41 82 39 80 37 L 80 90 C 80 93 20 93 20 90 L 20 37 C 18 39 15 41 8 40 L 20 20 Z" />}
                        {p.image === "kemeja" && <path d="M 20 20 C 35 24 65 24 80 20 L 92 40 C 85 41 82 39 80 37 L 80 90 C 80 93 20 93 20 90 L 20 37 C 18 39 15 41 8 40 L 20 20 Z" />}
                        {p.image === "bag" && <g><path d="M 25 35 C 35 20 65 20 65 35" fill="none" stroke="currentColor" strokeWidth="6" /><rect x="23" y="35" width="54" height="52" rx="3" fill="currentColor" /></g>}
                      </svg>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold tracking-wider font-mono uppercase">{p.category}</span>
                        <h4 className="font-extrabold text-slate-900 text-sm tracking-tight clamp-1 leading-tight mt-0.5">{p.name}</h4>
                        <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-2 mt-1.5">{p.description}</p>
                      </div>

                      <div className="flex gap-1 pt-1">
                        {p.availableColors.map((col, i) => (
                          <span 
                            key={i} 
                            style={{ backgroundColor: col.hex }} 
                            className="w-2.5 h-2.5 rounded-full border border-slate-200 block shadow-inner" 
                            title={col.name}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                        <div>
                          <span className="text-[9px] text-slate-400 font-medium block">Harga Polos</span>
                          <span className="font-extrabold text-slate-950 text-xs font-mono">IDR {p.basePrice.toLocaleString("id-ID")}</span>
                        </div>
                        <button
                          id={`catalog-detail-${p.id}`}
                          onClick={() => {
                            setDetailProduct(p);
                            setSelectedSize("L");
                            setSelectedColorIdx(0);
                            setSelectedMaterialIdx(0);
                          }}
                          className="bg-slate-900 group-hover:bg-orange-500 text-white font-bold text-[10px] px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
