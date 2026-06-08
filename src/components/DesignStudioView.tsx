import { useState, useMemo, ChangeEvent } from "react";
import { PRODUCT_CATALOG } from "../data/catalog";
import { Product, CanvasElement, DesignConfig, ProductColor, BaseCategory } from "../types";
import { 
  Type, 
  Image as ImageIcon, 
  RefreshCcw, 
  Trash2, 
  ChevronRight, 
  Plus, 
  Maximize, 
  HelpCircle,
  Minimize2, 
  Move, 
  Sparkles, 
  ShoppingBag,
  Layers,
  ChevronLeft,
  Calculator
} from "lucide-react";

interface DesignStudioViewProps {
  initialProductId?: string | null;
  onAddToCart: (product: Product, config: DesignConfig, quantity: number, unitPrice: number) => void;
  onNavigate: (view: "landing" | "catalog" | "studio" | "cart" | "tracking" | "dashboard" | "specs", selectedProdId?: string) => void;
}

// Built-in cool logo presets for users to customize without uploading manual files
const LOGO_PRESETS = [
  { id: "logo-1", name: "CustomWear Icon", content: "⚡" },
  { id: "logo-2", name: "Retro Athletics", content: "svg:retro-badge" },
  { id: "logo-3", name: "Neo Tokyo Sunset", content: "svg:neo-tokyo" },
  { id: "logo-4", name: "Tech Compass", content: "svg:compass" },
  { id: "logo-5", name: "Minimalist Rose", content: "svg:aesthetic-rose" },
  { id: "logo-6", name: "Streetwear Brand", content: "svg:streetwear-brand" },
  { id: "logo-7", name: "Streetwear Wave", content: "🌊" },
  { id: "logo-8", name: "Cyberpunk Tiger", content: "🐯" },
  { id: "logo-9", name: "Creative Globe", content: "🌐" }
];

export const renderLogo = (content: string) => {
  if (content.startsWith("http") || content.startsWith("data:image")) {
    return (
      <img
        src={content}
        alt="Custom Graphic"
        className="w-14 h-14 object-contain pointer-events-none rounded max-w-full max-h-full"
        referrerPolicy="no-referrer"
      />
    );
  }

  if (content === "svg:retro-badge") {
    return (
      <svg className="w-14 h-14 text-slate-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="50" cy="50" r="40" strokeDasharray="4 2" />
        <circle cx="50" cy="50" r="32" />
        <path d="M50 25 L65 48 H52 L60 75 L35 52 H48 Z" fill="currentColor" />
        <text x="50" y="93" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold" letterSpacing="1">ATHLETIC</text>
      </svg>
    );
  }

  if (content === "svg:neo-tokyo") {
    return (
      <svg className="w-14 h-14 text-orange-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="50" cy="50" r="43" fill="#FFEFEA" stroke="none" />
        <path d="M20 70 A30 30 0 0 1 80 70 Z" fill="#F97316" stroke="none" />
        <line x1="10" y1="70" x2="90" y2="70" stroke="#7C2D12" strokeWidth="3" />
        <line x1="20" y1="70" x2="5" y2="90" stroke="#7C2D12" strokeWidth="2" />
        <line x1="40" y1="70" x2="30" y2="90" stroke="#7C2D12" strokeWidth="2" />
        <line x1="60" y1="70" x2="70" y2="90" stroke="#7C2D12" strokeWidth="2" />
        <line x1="80" y1="70" x2="95" y2="90" stroke="#7C2D12" strokeWidth="2" />
      </svg>
    );
  }

  if (content === "svg:compass") {
    return (
      <svg className="w-14 h-14 text-teal-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.5">
        <circle cx="50" cy="50" r="35" strokeDasharray="3 3" />
        <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="4 4" />
        <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="4 4" />
        <path d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (content === "svg:aesthetic-rose") {
    return (
      <svg className="w-14 h-14 text-rose-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 85 C50 85 45 60 50 45 C55 30 70 25 70 15 C70 5 60 5 50 12 C40 5 30 5 30 15 C30 25 45 30 50 45" fill="none" />
        <path d="M50 12 C46 16 54 22 50 25 C46 22 54 16 50 12 Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (content === "svg:streetwear-brand") {
    return (
      <svg className="w-16 h-10 text-indigo-700 bg-indigo-50 rounded px-1" viewBox="0 0 120 60" fill="none">
        <rect x="5" y="5" width="110" height="50" rx="4" stroke="currentColor" strokeWidth="3" />
        <text x="60" y="32" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="900" letterSpacing="1" fontFamily="Impact, sans-serif">DIVISION</text>
        <text x="60" y="46" textAnchor="middle" fill="currentColor" fontSize="6.5" fontWeight="bold" letterSpacing="0.5" fontFamily="monospace">STREET LAB</text>
      </svg>
    );
  }

  // Fallback to text/emoji representation
  return (
    <span className="text-3xl filter drop-shadow-sm block select-none">
      {content}
    </span>
  );
};

export default function DesignStudioView({ initialProductId, onAddToCart, onNavigate }: DesignStudioViewProps) {
  // Find product or default to Kaos Classic Over-sized
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || "prod-kaos-ultra"
  );

  const product = useMemo(() => {
    return PRODUCT_CATALOG.find(p => p.id === selectedProductId) || PRODUCT_CATALOG[0];
  }, [selectedProductId]);

  // Design studio state variables
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.availableColors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || "L");
  const [selectedMaterial, setSelectedMaterial] = useState<string>(product.materials[0].name);
  const [selectedTechnique, setSelectedTechnique] = useState<string>(product.printTechniques[0].name);
  const [viewSide, setViewSide] = useState<"front" | "back">("front");
  const [quantity, setQuantity] = useState<number>(12); // Defaults to typical community order batch size

  // Active elements on clothing
  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: "elem-default-1",
      type: "logo",
      content: "⚡",
      x: 0,
      y: -10,
      scale: 1.5,
      rotation: 0
    },
    {
      id: "elem-default-2",
      type: "text",
      content: "CUSTOM WEAR",
      color: "#F9FAF8",
      fontFamily: "Plus Jakarta Sans",
      x: 0,
      y: 15,
      scale: 1.0,
      rotation: 0
    }
  ]);

  const [selectedElementId, setSelectedElementId] = useState<string | null>("elem-default-2");
  
  // Custom user inputs
  const [customText, setCustomText] = useState<string>("");
  const [customTextColor, setCustomTextColor] = useState<string>("#FF5733");
  const [logoTab, setLogoTab] = useState<"preset" | "upload">("preset");
  const [imageUrlInput, setImageUrlInput] = useState<string>("");

  const handleImageUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Content = uploadEvent.target?.result as string;
      if (base64Content) {
        const newEl: CanvasElement = {
          id: `elem-logo-uploaded-${Date.now()}`,
          type: "logo",
          content: base64Content,
          x: 0,
          y: -5,
          scale: 1.5,
          rotation: 0
        };
        setElements([...elements, newEl]);
        setSelectedElementId(newEl.id);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    const newEl: CanvasElement = {
      id: `elem-logo-url-${Date.now()}`,
      type: "logo",
      content: imageUrlInput.trim(),
      x: 0,
      y: -5,
      scale: 1.5,
      rotation: 0
    };
    setElements([...elements, newEl]);
    setSelectedElementId(newEl.id);
    setImageUrlInput("");
  };

  const activeElement = useMemo(() => {
    return elements.find(el => el.id === selectedElementId) || null;
  }, [elements, selectedElementId]);

  // Adjust options if product changes
  const handleProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    const newProd = PRODUCT_CATALOG.find(p => p.id === prodId) || PRODUCT_CATALOG[0];
    setSelectedColor(newProd.availableColors[0]);
    setSelectedSize(newProd.availableSizes[0] || "L");
    setSelectedMaterial(newProd.materials[0].name);
    setSelectedTechnique(newProd.printTechniques[0].name);
  };

  // Add customized text element
  const handleAddText = () => {
    if (!customText.trim()) return;
    const newEl: CanvasElement = {
      id: `elem-text-${Date.now()}`,
      type: "text",
      content: customText.toUpperCase(),
      color: customTextColor,
      fontFamily: "Space Mono",
      x: 0,
      y: 0,
      scale: 1.2,
      rotation: 0
    };
    setElements([...elements, newEl]);
    setSelectedElementId(newEl.id);
    setCustomText("");
  };

  // Add preset logo graphic element
  const handleAddLogoPreset = (content: string) => {
    const newEl: CanvasElement = {
      id: `elem-logo-${Date.now()}`,
      type: "logo",
      content: content,
      x: 0,
      y: -5,
      scale: 1.4,
      rotation: 0
    };
    setElements([...elements, newEl]);
    setSelectedElementId(newEl.id);
  };

  // Delete element
  const handleDeleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    if (selectedElementId === id) setSelectedElementId(null);
  };

  // Duplicate update element props helpers
  const updateElementProp = (id: string, prop: keyof CanvasElement, val: any) => {
    setElements(elements.map(el => {
      if (el.id === id) {
        return { ...el, [prop]: val };
      }
      return el;
    }));
  };

  // Smart Price Math Calculations
  const smartPricing = useMemo(() => {
    // 1. Base cost of garment
    const garmentBase = product.basePrice;

    // 2. Material surcharges
    const matObj = product.materials.find(m => m.name === selectedMaterial);
    const materialExtra = matObj ? matObj.priceSurcharge : 0;

    // 3. Printing technique surcharge
    const techObj = product.printTechniques.find(t => t.name === selectedTechnique);
    const printingExtra = techObj ? techObj.costPerUnit : 0;

    // 4. Logo amount configuration complexity (Extra designs cost processing)
    const activeElementsCount = elements.length;
    const customizationComplexityExtra = activeElementsCount * 4500; // IDR 4.500 surcharge per graphics layer

    // 5. Net base cost before discounts
    const unitPricePolos = garmentBase + materialExtra + printingExtra;
    const unitPriceCustom = unitPricePolos + customizationComplexityExtra;

    // 6. Bulk level volume discounts (Diskon Kuantitas)
    let discountPct = 0;
    if (quantity >= 12 && quantity < 50) {
      discountPct = 0.10; // 10% diskon lusinan
    } else if (quantity >= 50 && quantity < 100) {
      discountPct = 0.15; // 15% diskon komunitas
    } else if (quantity >= 100) {
      discountPct = 0.25; // 25% diskon korporat
    }

    const discountedUnit = Math.round(unitPriceCustom * (1 - discountPct));
    const totalPrice = discountedUnit * quantity;
    const productionDays = quantity > 100 ? 9 : quantity > 24 ? 6 : 4; // Fast timeline estimation

    return {
      originalUnit: unitPriceCustom,
      discountedUnit: discountedUnit,
      discountPct: Math.round(discountPct * 100),
      totalPrice: totalPrice,
      productionDays: productionDays
    };
  }, [product, selectedMaterial, selectedTechnique, elements, quantity]);

  // Form Submit to Cart Trigger
  const handleAddToCartClick = () => {
    const config: DesignConfig = {
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      material: selectedMaterial,
      technique: selectedTechnique,
      elements: elements,
      viewSide: viewSide
    };

    onAddToCart(product, config, quantity, smartPricing.discountedUnit);
    onNavigate("cart");
  };

  return (
    <div id="design-studio-container" className="space-y-6">
      
      {/* Header Studio info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200">
        <div>
          <span className="text-[10px] bg-orange-100 text-orange-700 font-extrabold px-2.5 py-1 rounded uppercase tracking-wider block w-fit">
            3D Studio Mockup
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1 tracking-tight">Kustomisasi Pakaian</h2>
          <p className="text-slate-500 text-xs mt-0.5">Atur warna, taruh logo, tulis slogan, monitor harga transparan secara interaktif.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-500 shrink-0">Ganti Basis Apparel:</label>
          <select
            id="garment-selector"
            value={selectedProductId}
            onChange={(e) => handleProductChange(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-3 py-2 text-slate-800 focus:border-orange-500 outline-none"
          >
            {PRODUCT_CATALOG.map((p) => (
              <option key={p.id} value={p.id}>{p.category} - {p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ==================== SIDEBAR KIRI: DESIGN TOOLS (4 cols) ==================== */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers className="w-4 h-4 text-orange-500" />
              <h3 className="font-extrabold text-sm text-slate-900 tracking-wider uppercase">Tools Kustom</h3>
            </div>

            {/* 1. WARNA APPAREL POLOS */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide block">Warna Sarung Apparel</span>
              <div className="flex flex-wrap gap-2">
                {product.availableColors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border shadow-inner transition cursor-pointer flex items-center justify-center ${
                      selectedColor.hex === color.hex ? "scale-110 ring-2 ring-orange-500 border-white" : "border-slate-200"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.hex === color.hex && (
                      <div className={`w-1.5 h-1.5 rounded-full ${color.hex === "#F9FAF8" || color.hex === "#FFFFFF" ? "bg-slate-950" : "bg-white"}`} />
                    )}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-500 italic block mt-1">Dipilih: {selectedColor.name}</span>
            </div>

            {/* 2. TAMBAH TEXT */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide block flex items-center gap-1">
                <Type className="w-3.5 h-3.5 text-orange-500" /> Tambah Slogan Teks
              </span>
              <div className="flex gap-2">
                <input
                  id="studio-text-input"
                  type="text"
                  placeholder="Ketik slogan..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-lg outline-none focus:bg-white focus:border-orange-500"
                />
                <button
                  id="add-text-cta"
                  onClick={handleAddText}
                  className="bg-slate-950 hover:bg-orange-500 text-white font-bold text-xs px-3.5 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Taruh
                </button>
              </div>

              {/* Text color option */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Warna Teks:</span>
                <div className="flex gap-1.5">
                  {["#FFFFFF", "#000000", "#FF5733", "#33FF57", "#3357FF", "#FFFF33"].map((hex) => (
                    <button
                      key={hex}
                      onClick={() => {
                        setCustomTextColor(hex);
                        if (activeElement && activeElement.type === "text") {
                          updateElementProp(activeElement.id, "color", hex);
                        }
                      }}
                      className={`w-5 h-5 rounded-md border shadow-xs transition ${
                        customTextColor === hex ? "ring-2 ring-orange-500 scale-105 border-white" : "border-slate-200"
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 3. TAMBAHKAN LOGO / GRAFIS (PRESET ATAU BEBAS) */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide block flex items-center gap-1">
                <Plus className="w-4 h-4 text-orange-500" /> Tambah Logo / Grafis
              </span>

              {/* Sub-tabs for presets vs custom uploads */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setLogoTab("preset")}
                  className={`flex-1 text-center text-xs py-1.5 font-bold rounded-lg transition-all ${
                    logoTab === "preset"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Preset Keren
                </button>
                <button
                  type="button"
                  onClick={() => setLogoTab("upload")}
                  className={`flex-1 text-center text-xs py-1.5 font-bold rounded-lg transition-all ${
                    logoTab === "upload"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Unggah Bebas
                </button>
              </div>

              {logoTab === "preset" ? (
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-400">Pilih logo kelas distro sedia pakai untuk ditaruh di pakaian Anda:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {LOGO_PRESETS.map((logo) => (
                      <button
                        key={logo.id}
                        type="button"
                        onClick={() => handleAddLogoPreset(logo.content)}
                        className="p-1.5 border border-slate-200 hover:border-orange-450 hover:bg-orange-50/50 rounded-xl transition cursor-pointer bg-slate-50 flex items-center justify-center min-h-[55px] overflow-hidden group"
                        title={logo.name}
                      >
                        <div className="scale-75 group-hover:scale-90 transition-transform duration-200 flex items-center justify-center max-h-12">
                          {renderLogo(logo.content)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 bg-slate-50/50 p-2.5 rounded-xl border border-slate-150">
                  <p className="text-[10px] text-slate-400">Orang kustom bebas memasang file gambar brand/foto atau menyadur tautan online:</p>
                  
                  {/* File Uploader */}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-orange-500 hover:bg-orange-50/20 rounded-xl p-4 cursor-pointer transition text-center">
                    <ImageIcon className="w-5 h-5 text-orange-500 mb-1" />
                    <span className="text-[11px] font-bold text-slate-700">Pilih File Logo/Foto</span>
                    <span className="text-[9px] text-slate-400 leading-tight">Mendukung PNG, JPG, JPEG, SVG</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUploadChange}
                    />
                  </label>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-2 text-[8px] text-slate-450 font-bold uppercase font-mono">Atau</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>

                  {/* Direct Image URL input */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-650 block">Masukkan Tautan Gambar Jauh (URL)</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://domain.com/gambar-saya.png"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        className="flex-grow bg-white border border-slate-200 rounded-lg text-xs px-2.5 py-1.5 outline-none focus:border-orange-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="bg-slate-900 hover:bg-orange-500 text-white px-3 py-1.5 text-xs font-bold rounded-lg transition"
                      >
                        Pasang
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. DRAG / ROTATE / SCALE LAYER CONTROLS */}
            {activeElement ? (
              <div className="space-y-3 pt-3 border-t-2 border-orange-100 bg-orange-50/30 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[10px] text-orange-700 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Kontrol Layer Terpilih
                  </span>
                  <button
                    id="delete-layer-btn"
                    onClick={() => handleDeleteElement(activeElement.id)}
                    className="text-[10px] text-rose-600 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                  >
                    <Trash2 className="w-3 h-3" /> Hapus
                  </button>
                </div>
                
                <p className="font-mono text-[10px] text-slate-500 truncate mt-1">
                  ID: {activeElement.id} ({activeElement.type === "text" ? "Teks" : "Logo"})
                </p>

                {/* Vertical offset Y slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                    <span>Posisi Vertikal Y</span>
                    <span className="font-mono">{activeElement.y}%</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={activeElement.y}
                    onChange={(e) => updateElementProp(activeElement.id, "y", Number(e.target.value))}
                    className="w-full accent-slate-900 h-1 bg-slate-250 cursor-pointer"
                  />
                </div>

                {/* Horizontal offset X slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                    <span>Posisi Horizontal X</span>
                    <span className="font-mono">{activeElement.x}%</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={activeElement.x}
                    onChange={(e) => updateElementProp(activeElement.id, "x", Number(e.target.value))}
                    className="w-full accent-slate-900 h-1 bg-slate-250 cursor-pointer"
                  />
                </div>

                {/* Scale slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                    <span>Ukuran Skala</span>
                    <span className="font-mono">{activeElement.scale.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="3.0"
                    step="0.1"
                    value={activeElement.scale}
                    onChange={(e) => updateElementProp(activeElement.id, "scale", Number(e.target.value))}
                    className="w-full accent-slate-900 h-1 bg-slate-250 cursor-pointer"
                  />
                </div>

                {/* Rotation slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                    <span>Sudut Rotasi</span>
                    <span className="font-mono">{activeElement.rotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={activeElement.rotation}
                    onChange={(e) => updateElementProp(activeElement.id, "rotation", Number(e.target.value))}
                    className="w-full accent-slate-900 h-1 bg-slate-250 cursor-pointer"
                  />
                </div>

                {activeElement.type === "text" && (
                  <div className="space-y-1 pt-1.5">
                    <span className="text-[10px] font-bold text-slate-600 block">Edit Tulisan:</span>
                    <input
                      type="text"
                      value={activeElement.content}
                      onChange={(e) => updateElementProp(activeElement.id, "content", e.target.value.toUpperCase())}
                      className="w-full bg-white border border-slate-200 rounded p-1.5 text-xs text-slate-800 font-bold outline-none font-mono"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-4 border border-dashed border-slate-200 rounded-xl text-[11px] text-slate-400 bg-slate-50 italic">
                Klik salah satu elemen bertuliskan kaos di area tengah untuk mengaktifkan pengaturan putaran, perbesaran/skala, and rona warna!
              </div>
            )}
          </div>

          <div className="bg-slate-950 p-4 rounded-xl text-white mt-4 border border-slate-800 space-y-2">
            <span className="text-[9px] bg-orange-500 text-white font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
              Pro-Guide
            </span>
            <p className="text-[10px] text-slate-350 leading-relaxed">
              Tekan tombol **Depan/Belakang** pada area tengah baju polos untuk berpindah mengustomisasi area punggung kaos custom Anda.
            </p>
          </div>
        </div>

        {/* ==================== AREA TENGAH: REAL-TIME PREVIEW CANVAS (5 cols) ==================== */}
        <div className="lg:col-span-5 bg-slate-100 border border-slate-250 rounded-2xl flex flex-col justify-between overflow-hidden relative p-4 md:p-6 min-h-[500px]">
          
          {/* Top Canvas details */}
          <div className="flex justify-between items-center relative z-20">
            <div className="flex gap-2">
              <button
                id="view-front"
                onClick={() => setViewSide("front")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  viewSide === "front" ? "bg-slate-900 text-white shadow" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                Sisi Depan
              </button>
              <button
                id="view-back"
                onClick={() => setViewSide("back")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  viewSide === "back" ? "bg-slate-900 text-white shadow" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                Simulasi Belakang
              </button>
            </div>
            
            <span className="bg-purple-100 text-purple-750 text-[9px] font-bold px-2 py-0.5 rounded uppercase font-mono">
              Visualizer Active
            </span>
          </div>

          {/* Core Interactive Center Apparel Model */}
          <div className="relative flex items-center justify-center flex-1 my-6" id="apparel-interactive-stage">
            {/* Base SVG Outfit Model */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-80 h-80 transition-all drop-shadow-2xl z-10" 
              style={{ color: selectedColor.hex }}
            >
              {product.image === "kaos" && (
                <path d="M 20 20 C 35 25 65 25 80 20 C 85 30 92 35 95 42 C 85 45 83 45 80 40 L 80 90 C 80 93 20 93 20 90 L 20 40 C 17 45 15 45 5 42 C 8 35 15 30 20 20 Z" fill="currentColor" stroke="#1e293b" strokeWidth="1" />
              )}
              {product.image === "hoodie" && (
                <>
                  <path d="M 20 25 C 35 30 65 30 80 25 L 90 45 C 83 46 80 44 78 40 L 78 90 C 78 93 22 93 22 90 L 22 40 C 20 44 17 46 10 45 Z" fill="currentColor" stroke="#1e293b" strokeWidth="1" />
                  <path d="M 35 25 C 38 10 62 10 65 25 Z" fill="#1e293b" stroke="#1e293b" strokeWidth="1" opacity="0.15" />
                  {/* Pocket */}
                  <path d="M 35 68 C 35 60 65 60 65 68 L 62 82 L 38 82 Z" fill="currentColor" stroke="#334155" strokeWidth="0.8" opacity="0.9" />
                </>
              )}
              {product.image === "jaket" && (
                <path d="M 20 20 C 35 24 65 24 80 20 L 92 40 C 85 41 82 39 80 37 L 80 90 C 80 93 20 93 20 90 L 20 37 C 18 39 15 41 8 40 L 20 20 Z" fill="currentColor" stroke="#1e293b" strokeWidth="1" />
              )}
              {product.image === "kemeja" && (
                <>
                  <path d="M 20 20 C 35 24 65 24 80 20 L 92 40 C 85 41 82 39 80 37 L 80 90 C 80 93 20 93 20 90 L 20 37 C 18 39 15 41 8 40 L 20 20 Z" fill="currentColor" stroke="#1e293b" strokeWidth="1" />
                  <path d="M 20 20 L 50 32 L 80 20 M 50 32 L 50 90" fill="none" stroke="#000000" strokeWidth="1" opacity="0.3" />
                </>
              )}
              {product.image === "bag" && (
                <g>
                  <path d="M 25 35 C 35 20 65 20 65 35" fill="none" stroke="#1e293b" strokeWidth="4.5" />
                  <rect x="23" y="35" width="54" height="52" rx="2" fill="currentColor" stroke="#1e293b" strokeWidth="1.5" />
                </g>
              )}
              {product.image === "celana-cargo" && (
                <>
                  {/* Left & Right Legs, Waistband shape */}
                  <path d="M 28 15 H 72 L 77 40 L 73 90 H 51.5 L 50 42 L 48.5 90 H 27 L 23 40 Z" fill="currentColor" stroke="#1e293b" strokeWidth="1" />
                  {/* Stitching and cargo pocket lines */}
                  <line x1="50" y1="15" x2="50" y2="42" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.4" />
                  {/* Left pocket */}
                  <rect x="26" y="44" width="8" height="12" rx="1.5" fill="currentColor" stroke="#1e293b" strokeWidth="0.8" opacity="0.85" />
                  <path d="M 25 44 H 35 L 30 46 Z" fill="#334155" opacity="0.3" />
                  {/* Right pocket */}
                  <rect x="66" y="44" width="8" height="12" rx="1.5" fill="currentColor" stroke="#1e293b" strokeWidth="0.8" opacity="0.85" />
                  <path d="M 65 44 H 75 L 70 46 Z" fill="#334155" opacity="0.3" />
                  {/* Knee patches lines */}
                  <line x1="25" y1="62" x2="35" y2="62" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
                  <line x1="65" y1="62" x2="75" y2="62" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
                </>
              )}
              {product.image === "celana-pendek" && (
                <>
                  <path d="M 28 20 H 72 L 75 58 H 51.5 L 50 38 L 48.5 58 H 25 Z" fill="currentColor" stroke="#1e293b" strokeWidth="1" />
                  <line x1="50" y1="20" x2="50" y2="38" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.4" />
                  {/* Left hem line */}
                  <line x1="25" y1="55" x2="48" y2="55" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
                  {/* Right hem line */}
                  <line x1="52" y1="55" x2="75" y2="55" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
                  {/* Waist drawcord */}
                  <circle cx="47" cy="24" r="1.5" fill="#f97316" />
                  <circle cx="53" cy="24" r="1.5" fill="#f97316" />
                </>
              )}
              {product.image === "topi-baseball" && (
                <>
                  {/* Semi-sphere dome */}
                  <path d="M 25 55 C 25 24 75 24 75 55 Z" fill="currentColor" stroke="#1e293b" strokeWidth="1" />
                  {/* Visor Brim */}
                  <path d="M 23 54 C 23 54 8 59 13 67 C 22 72 78 72 87 67 C 92 59 77 54 77 54 C 77 54 50 58 23 54 Z" fill="currentColor" stroke="#1e293b" strokeWidth="1" />
                  {/* Top button panel lines */}
                  <circle cx="50" cy="24" r="2" fill="currentColor" stroke="#1e293b" strokeWidth="0.5" />
                  <path d="M 50 26 C 40 32 30 42 27 55 M 50 26 C 60 32 70 42 73 55" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
                </>
              )}
              {product.image === "topi-bucket" && (
                <>
                  {/* Curved body */}
                  <path d="M 33 26 L 67 26 C 70 36 71 45 74 53 H 26 C 29 45 30 36 33 26 Z" fill="currentColor" stroke="#1e293b" strokeWidth="1" />
                  {/* Brim */}
                  <path d="M 26 53 C 20 60 14 65 10 69 C 30 75 70 75 90 69 C 86 65 80 60 74 53 Z" fill="currentColor" stroke="#1e293b" strokeWidth="1" />
                  {/* Decorative horizontal lines */}
                  <path d="M 12 65 C 32 71 68 71 88 65" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 1" />
                  <path d="M 14 62 C 32 68 68 68 86 62" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" strokeDasharray="2 1" />
                </>
              )}
            </svg>

            {/* Custom Interactive Elements Overlay Box */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              {/* Boundary area indicating the printable chest box */}
              <div className="w-48 h-60 border border-slate-350/50 border-dashed rounded-lg flex items-center justify-center relative bg-white/5 shadow-xs">
                
                {/* Loop and render custom layered inputs inside printable box */}
                {elements.map((el) => {
                  const isActive = selectedElementId === el.id;
                  
                  return (
                    <div
                      key={el.id}
                      style={{
                        transform: `translate(${el.x * 2.1}px, ${el.y * 2.5}px) rotate(${el.rotation}deg) scale(${el.scale})`,
                        color: el.color || "inherit",
                        fontFamily: el.fontFamily || "inherit"
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedElementId(el.id);
                      }}
                      className={`absolute pointer-events-auto cursor-pointer transition-shadow rounded px-1.5 py-0.5 select-none ${
                        isActive 
                          ? "ring-2 ring-orange-500 ring-offset-2 z-30 bg-slate-900/10" 
                          : "hover:ring-1 hover:ring-slate-300 hover:bg-slate-200/5"
                      }`}
                    >
                      {el.type === "text" ? (
                        <span className="text-xs sm:text-sm font-extrabold tracking-wider whitespace-nowrap block">
                          {el.content}
                        </span>
                      ) : (
                        <div className="flex items-center justify-center min-w-[40px] min-h-[40px]">
                          {renderLogo(el.content)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom layout metadata indicators */}
          <div className="bg-white/80 p-3 rounded-xl border border-slate-200 text-[10px] text-slate-500 font-mono flex flex-wrap justify-between items-center relative z-10 gap-2">
            <span>Siku Cetak: A4 Depan Tengah (Front)</span>
            <span>Warna RGB: {selectedColor.hex}</span>
            <button
              onClick={() => {
                setElements([]);
                setSelectedElementId(null);
              }}
              className="text-red-650 hover:underline cursor-pointer flex items-center gap-0.5"
            >
              <Trash2 className="w-3 h-3" /> Bersihkan Desain
            </button>
          </div>
        </div>

        {/* ==================== SIDEBAR KANAN: SPESIFIKASI DAN SMART PRICE CALCULATOR (3 cols) ==================== */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calculator className="w-4 h-4 text-orange-500" />
              <h3 className="font-extrabold text-xs text-slate-900 tracking-wider uppercase">Smart Calculator</h3>
            </div>

            {/* A. BAHAN UTAMA */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide block">Ketebalan & Bahan</span>
              <select
                id="material-selector"
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-800 outline-none focus:border-orange-500 focus:bg-white font-semibold transition"
              >
                {product.materials.map((m, idx) => (
                  <option key={idx} value={m.name}>
                    {m.name} {m.priceSurcharge > 0 ? `(+Rp ${m.priceSurcharge.toLocaleString("id-ID")})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* B. TEKNIK SABLON / CETAK */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide block">Teknik Sablon / Bordir</span>
              <select
                id="technique-selector"
                value={selectedTechnique}
                onChange={(e) => setSelectedTechnique(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-800 outline-none focus:border-orange-500 focus:bg-white font-semibold transition"
              >
                {product.printTechniques.map((t, idx) => (
                  <option key={idx} value={t.name}>
                    {t.name} {t.costPerUnit > 0 ? `(+Rp ${t.costPerUnit.toLocaleString("id-ID")})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* C. UKURAN */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide block">Ukuran Polutan</span>
              <div className="grid grid-cols-5 gap-1 text-[11px] font-mono font-bold">
                {product.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`p-1.5 text-center border rounded-md transition cursor-pointer ${
                      selectedSize === sz ? "bg-slate-900 border-slate-900 text-white" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* D. JUMLAH PESANAN (pcs) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-black text-slate-700 uppercase tracking-wide">
                <span>Jumlah Pembelian (Pcs)</span>
                <span className="font-mono text-xs text-orange-600 font-extrabold">{quantity} pcs</span>
              </div>
              <input
                id="studio-quantity-input"
                type="number"
                min="1"
                max="1000"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-50 border border-slate-200 font-bold text-xs rounded-lg px-3 py-2 text-slate-800 text-center outline-none focus:border-orange-500 focus:bg-white"
              />
              
              {/* Discount progress tier status bar */}
              <div className="text-[10px] text-slate-500 flex flex-col gap-1 pt-1.5">
                <div className="flex justify-between font-medium">
                  <span>Skema Diskon Lusinan</span>
                  <span className="text-orange-600 font-semibold">{smartPricing.discountPct}% Terpakai</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all" 
                    style={{ width: `${Math.min(100, (quantity / 50) * 100)}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[9px] text-slate-400">
                  <span>1-11 pcs (0%)</span>
                  <span>12-49 pcs (10%)</span>
                  <span>50+ pcs (15%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* PRICING COMPUTED BOARD */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3.5 mt-auto">
            <div className="flex justify-between text-[11px] text-slate-500 font-bold">
              <span>Biaya Satuan Desain</span>
              <span className="line-through font-mono">IDR {smartPricing.originalUnit.toLocaleString("id-ID")}</span>
            </div>
            
            <div className="flex justify-between text-xs text-slate-700 font-bold">
              <span>Unit Setelah Diskon ({smartPricing.discountPct}%)</span>
              <span className="font-mono text-emerald-600 font-extrabold">IDR {smartPricing.discountedUnit.toLocaleString("id-ID")}</span>
            </div>
            
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-xs font-black text-slate-900 uppercase">Subtotal</span>
              <span className="text-xl font-black font-mono text-orange-500">
                IDR {smartPricing.totalPrice.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="text-[9px] text-slate-400 space-y-0.5">
              <p>• Estimasi pengerjaan: {smartPricing.productionDays} Hari Kerja</p>
              <p>• Hasil sablon dikawal Tim QA Mitra Bandung</p>
            </div>

            <button
              id="add-to-cart-cta"
              onClick={handleAddToCartClick}
              className="w-full bg-orange-500 hover:bg-orange-600 active:transform active:scale-95 text-white font-bold py-3.5 rounded-xl text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Tambah Ke Keranjang
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
