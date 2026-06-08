import { useState, useMemo, FormEvent } from "react";
import { Order, Product, BaseCategory, ProductColor } from "../types";
import { PRODUCT_CATALOG } from "../data/catalog";
import { 
  User, 
  ShieldAlert, 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Plus, 
  Trash2, 
  SlidersHorizontal,
  ChevronRight, 
  FileCheck, 
  Activity, 
  PenTool, 
  CheckCircle2, 
  Package, 
  Home, 
  Building,
  X
} from "lucide-react";

interface DashboardViewProps {
  ordersList: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: Order["status"]) => void;
  onAddProduct: (newProd: Product) => void;
  onRemoveProduct: (productId: string) => void;
  onNavigate: (view: "landing" | "catalog" | "studio" | "cart" | "tracking" | "dashboard" | "specs", selectedProdId?: string) => void;
  productsList: Product[];
}

export default function DashboardView({
  ordersList,
  onUpdateOrderStatus,
  onAddProduct,
  onRemoveProduct,
  onNavigate,
  productsList
}: DashboardViewProps) {
  const [role, setRole] = useState<"user" | "admin">("user");
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<"orders" | "products" | "mitra" | "reports">("orders");

  // Administrator lock screen state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [selectedReceiptToShow, setSelectedReceiptToShow] = useState<string | null>(null);

  const handleAdminLogin = (e: FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === "admin123" || adminPasswordInput === "admin") {
      setIsAdminUnlocked(true);
      setAuthError("");
    } else {
      setAuthError("Password administrator tidak cocok! Silakan coba lagi. (Gunakan: admin123)");
    }
  };

  // Add product form states
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState<BaseCategory>(BaseCategory.Kaos);
  const [newProdBasePrice, setNewProdBasePrice] = useState<number>(60000);
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdColorName, setNewProdColorName] = useState("Vivid Orange");
  const [newProdColorHex, setNewProdColorHex] = useState("#F97316");
  
  const handleAddNewProductClick = (e: FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newProd: Product = {
      id: `prod-added-${Date.now()}`,
      name: newProdName,
      category: newProdCategory,
      description: newProdDesc || "Pakaian custom premium berkualitas butik distro buatan lokal.",
      image: "kaos", // Fallback template inside editor is kaos
      basePrice: newProdBasePrice,
      availableColors: [
        { name: newProdColorName, hex: newProdColorHex },
        { name: "Creamy White", hex: "#F9FAF8" },
        { name: "Ink Black", hex: "#111827" }
      ],
      availableSizes: ["S", "M", "L", "XL", "XXL"],
      materials: [
        { name: "Cotton Combed 30s", priceSurcharge: 0, desc: "Bahan distro standar adem harian." },
        { name: "Cotton Combed 24s", priceSurcharge: 5000, desc: "Lebih kokoh padat tebal." }
      ],
      printTechniques: [
        { name: "Sablon Plastisol Premium", costPerUnit: 12000, desc: "Detail karet awet retak." }
      ]
    };

    onAddProduct(newProd);
    
    // Reset Form
    setNewProdName("");
    setNewProdDesc("");
    alert("Produk baru berhasil ditambahkan ke katalog!");
  };

  // Compute stats for admin panel
  const adminStats = useMemo(() => {
    const totalRevenue = ordersList.reduce((acc, o) => acc + (o.paymentStatus === "Paid" ? o.totalAmount : 0), 0);
    const totalQuantity = ordersList.reduce((acc, o) => {
      const itemsQty = o.items.reduce((sum, it) => sum + it.quantity, 0);
      return acc + itemsQty;
    }, 0);
    return {
      revenue: totalRevenue,
      qtyPcs: totalQuantity,
      ordersCount: ordersList.length
    };
  }, [ordersList]);

  return (
    <div id="dashboard-tab-root" className="space-y-6">
      
      {/* Top Banner & Switch Role Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
        <div className="space-y-1">
          <span className="bg-orange-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-widest font-mono">
            Dashboard Panel Console
          </span>
          <h2 className="text-xl font-extrabold tracking-tight">
            {role === "user" ? "Dashboard Pelanggan CustomWear" : "Dashboard Admin CustomWear (Laravel-MySQL Simulator)"}
          </h2>
          <p className="text-slate-400 text-xs mt-1">Gunakan panel pembantu di kanan untuk mengetes simulasi kedua hak akses pengguna.</p>
        </div>

        {/* Role toggle */}
        <div className="flex items-center gap-1.5 bg-slate-850 p-1.5 border border-slate-750 rounded-xl">
          <button
            id="role-user-selector"
            onClick={() => setRole("user")}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              role === "user" ? "bg-orange-500 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Sebagai Pelanggan
          </button>
          
          <button
            id="role-admin-selector"
            onClick={() => setRole("admin")}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              role === "admin" ? "bg-orange-500 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Sebagai Admin
          </button>
        </div>
      </div>

      {/* ==================== ROLE: CUSTOMER (USER DASHBOARD) ==================== */}
      {role === "user" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* USER LEFT COLUMN: Profil Card (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 bg-slate-100 rounded-full border border-slate-200 mx-auto flex items-center justify-center text-3xl font-bold shadow-inner">
                🙋🏻‍♂️
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Ahmad Rizky (Mahasiswa)</h3>
                <span className="text-[10px] text-orange-600 font-bold uppercase font-mono tracking-wider">Level: Premium Buyer</span>
              </div>
              <p className="text-slate-500 text-xs">Pecinta custom kaos oversized distro, perwakilan organisasi UI angkatan.</p>
            </div>

            <div className="border-t border-slate-150 pt-5 space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Email Utama</span>
                <span className="text-slate-800 font-semibold">customwear@gmail.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Kontak Whatsapp</span>
                <span className="text-slate-800 font-mono font-semibold">0895323964130</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Lokasi Default</span>
                <span className="text-slate-800 font-semibold">Ciledug, Karang Tengah, Tangerang</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl space-y-2">
              <span className="text-[10px] bg-slate-900 text-white font-extrabold px-1.5 py-0.5 rounded">
                Catatan Alamat
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Jl. Karyawan 3, No. 64C, Ciledug, Karang Tengah, Tangerang
              </p>
            </div>
          </div>

          {/* USER RIGHT COLUMN: Transaction History (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 space-y-6">
            <h3 className="text-lg font-extrabold text-slate-950 tracking-tight flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <ShoppingBag className="w-5 h-5 text-orange-500" /> Riwayat Transaksi Apparel Anda
            </h3>

            {ordersList.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <p className="text-3xl text-slate-350">🛒</p>
                <h4 className="font-bold text-slate-800 text-sm">Belum Ada Transaksi Tercatat</h4>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">
                  Segera kreasikan order custom pertamamu di Design Studio dan rasakan kemudahan tracking di sini!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {ordersList.map((order) => {
                  const qtyItemsTotal = order.items.reduce((sum, item) => sum + item.quantity, 0);

                  return (
                    <div key={order.id} className="border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-all space-y-4">
                      
                      {/* Top Header metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                        <div>
                          <span className="font-mono text-slate-900 font-bold text-xs">{order.id}</span>
                          <span className="text-slate-400 text-[10px] ml-2">Dibuat: {order.createdAt.substring(0, 10)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                            order.paymentStatus === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-750"
                          }`}>
                            Pembayaran: {order.paymentStatus}
                          </span>
                          <span className="bg-orange-100 text-orange-850 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                            Status: {order.status}
                          </span>
                        </div>
                      </div>

                      {/* Items loop summary */}
                      <div className="space-y-2 text-xs text-slate-700">
                        {order.items.map((it) => (
                          <div key={it.id} className="flex justify-between">
                            <span>• {it.product.name} ({it.quantity} pcs) - {it.config.material}</span>
                            <span className="font-mono text-slate-400">IDR {it.totalPrice.toLocaleString("id-ID")}</span>
                          </div>
                        ))}
                      </div>

                      {/* Launch direct tracking actions */}
                      <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Beban Biaya</span>
                          <span className="text-sm font-black font-mono text-slate-950">IDR {order.totalAmount.toLocaleString("id-ID")}</span>
                        </div>
                        <button
                          id={`user-dash-track-${order.id}`}
                          onClick={() => onNavigate("tracking", order.id)}
                          className="bg-slate-900 hover:bg-orange-500 text-white font-bold text-[10px] px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-0.5"
                        >
                          Lacak Progres Timeline <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ==================== ROLE: ADMIN (ADMIN DASHBOARD) ==================== */}
      {role === "admin" && !isAdminUnlocked && (
        <div className="max-w-md mx-auto my-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto flex items-center justify-center text-orange-500 text-2xl animate-pulse">
            🔒
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Otentikasi Administrator</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Area ini dilindungi sandi. Masukkan Password Admin untuk mengakses rekapitulasi penjualan, manajemen status antrean, dan pengaturan sirkulasi katalog.
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left font-sans">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Password Administrator</label>
              <input
                type="password"
                required
                placeholder="Masukkan password admin (bawaan: admin123)"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-3 rounded-xl outline-none focus:bg-white focus:border-orange-500 font-bold transition font-mono tracking-widest text-center"
              />
            </div>

            {authError && (
              <p className="text-[10px] text-rose-600 font-semibold text-center mt-2 leading-relaxed">
                ⚠️ {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-orange-500 active:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl transition shadow-md cursor-pointer uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              Verifikasi Masuk & Buka Kunci
            </button>
          </form>

          <p className="text-[9px] text-slate-400 leading-relaxed font-sans">
            *Gunakan kredensial <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-orange-600 font-bold">admin123</code> atau <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-orange-600 font-bold">admin</code> untuk membuka dashboard simulasi.
          </p>
        </div>
      )}

      {role === "admin" && isAdminUnlocked && (
        <div className="space-y-8">
          
          {/* ADMIN CARDS STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">Total Omzet Pajak</span>
                <DollarSign className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-2xl font-black font-mono text-slate-900">
                IDR {adminStats.revenue.toLocaleString("id-ID")}
              </p>
              <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +15.5% dr Bulan Lalu
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">Order Masuk</span>
                <ShoppingBag className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-black font-mono text-slate-900">{adminStats.ordersCount} Bukti</p>
              <span className="text-[10px] text-slate-400">Antrean konveksi aktif</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">Selesai Dijahit (Pcs)</span>
                <Package className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-black font-mono text-slate-900">{adminStats.qtyPcs} Pcs</p>
              <span className="text-[10px] text-slate-400">Total volume material sablon</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">Mitra Konveksi Aktif</span>
                <Building className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-2xl font-black font-mono text-slate-900">4 Bengkel Lokal</p>
              <span className="text-[10px] text-emerald-600 font-bold">100% On-time delivery SLA</span>
            </div>
          </div>

          {/* ADMIN TABS CONTROLS SWITCH */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveAdminSubTab("orders")}
                className={`px-4 py-2 font-bold text-xs rounded-lg transition-all cursor-pointer ${
                  activeAdminSubTab === "orders" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Kelola Pesanan & Status ({ordersList.length})
              </button>
              <button
                id="admin-tab-products"
                onClick={() => setActiveAdminSubTab("products")}
                className={`px-4 py-2 font-bold text-xs rounded-lg transition-all cursor-pointer ${
                  activeAdminSubTab === "products" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Tambah / Edit Katalog ({productsList.length})
              </button>
              <button
                onClick={() => setActiveAdminSubTab("mitra")}
                className={`px-4 py-2 font-bold text-xs rounded-lg transition-all cursor-pointer ${
                  activeAdminSubTab === "mitra" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Daftar Mitra Konveksi
              </button>
            </div>

            <button
              onClick={() => {
                setIsAdminUnlocked(false);
                setAdminPasswordInput("");
                setRole("user");
              }}
              className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
            >
              🔒 Keluar & Kunci Panel
            </button>
          </div>

          {/* ADMIN SUB-VIEW 1: ORDER DISPATCH STATUS MANAGEMENT */}
          {activeAdminSubTab === "orders" && (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-150 flex justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Daftar Antrean Produksi</span>
                <span className="text-[10px] text-slate-400">Klik status dropdown di kanan untuk update jalur konveksi</span>
              </div>

              {ordersList.length === 0 ? (
                <div className="text-center p-12 text-xs text-slate-400 italic bg-white">
                  Belum ada pesanan masuk. Selesaikan checkout virtual agar terekam di dashboard admin ini.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono border-b border-slate-100">
                        <th className="p-4">Invoice ID</th>
                        <th className="p-4">Nama Pelanggan</th>
                        <th className="p-4">Jumlah Pcs</th>
                        <th className="p-4">Nilai Order</th>
                        <th className="p-4">Bukti Pembayaran</th>
                        <th className="p-4">Alamat Kirim</th>
                        <th className="p-4">Ubah Status Produksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {ordersList.map((order) => {
                        const totalQty = order.items.reduce((s, it) => s + it.quantity, 0);

                        return (
                          <tr key={order.id} className="hover:bg-slate-50 transition-all font-sans">
                            <td className="p-4 font-mono font-bold text-orange-600">{order.id}</td>
                            <td className="p-4 font-bold text-slate-900">{order.customerName}</td>
                            <td className="p-4 font-bold font-mono">{totalQty} pcs</td>
                            <td className="p-4 font-bold font-mono text-emerald-600">IDR {order.totalAmount.toLocaleString("id-ID")}</td>
                            <td className="p-4">
                              {order.paymentReceipt ? (
                                <button
                                  type="button"
                                  onClick={() => setSelectedReceiptToShow(order.paymentReceipt || null)}
                                  className="bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 text-[10px] font-extrabold px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 mx-auto"
                                >
                                  📸 Lihat Bukti
                                </button>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-bold italic block text-center">Bebas Simulasi</span>
                              )}
                            </td>
                            <td className="p-4 text-slate-500 truncate max-w-xs" title={order.shippingAddress}>
                              {order.shippingAddress}
                            </td>
                            <td className="p-4">
                              <select
                                value={order.status}
                                onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order["status"])}
                                className="bg-slate-50 border border-slate-205 text-[11px] rounded p-1 font-bold text-slate-800 outline-none"
                              >
                                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                                <option value="Diproses">Diproses (Setup Desain)</option>
                                <option value="Produksi">Produksi (Jahit/Sablon)</option>
                                <option value="Pengiriman">Pengiriman (J&T Cargo)</option>
                                <option value="Selesai">Selesai (Sampai Tujuan)</option>
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ADMIN SUB-VIEW 2: PRODUCT CATALOG MANAGEMENT */}
          {activeAdminSubTab === "products" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Product Creation Form (7 cols) */}
              <div className="lg:col-span-6 bg-white border border-slate-200 p-5 rounded-2xl space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                  Tambah Produk Apparel Baru
                </h4>
                
                <form onSubmit={handleAddNewProductClick} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nama Pakaian Polos</label>
                      <input
                        id="new-product-name"
                        type="text"
                        required
                        placeholder="Contoh: Heavy Premium Henley Shirt"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg outline-none focus:bg-white focus:border-orange-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Kategori Basis</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value as BaseCategory)}
                        className="w-full bg-slate-50 border border-slate-205 text-xs px-2 py-2.5 rounded-lg font-bold"
                      >
                        <option value={BaseCategory.Kaos}>{BaseCategory.Kaos}</option>
                        <option value={BaseCategory.Hoodie}>{BaseCategory.Hoodie}</option>
                        <option value={BaseCategory.Jaket}>{BaseCategory.Jaket}</option>
                        <option value={BaseCategory.Kemeja}>{BaseCategory.Kemeja}</option>
                        <option value={BaseCategory.ToteBag}>{BaseCategory.ToteBag}</option>
                        <option value={BaseCategory.Celana}>{BaseCategory.Celana}</option>
                        <option value={BaseCategory.Topi}>{BaseCategory.Topi}</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Harga Dasar (Pcs Polos)</label>
                      <input
                        type="number"
                        min="10000"
                        max="500000"
                        required
                        value={newProdBasePrice}
                        onChange={(e) => setNewProdBasePrice(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg outline-none focus:bg-white font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Nama Warna Launch</label>
                      <input
                        type="text"
                        value={newProdColorName}
                        onChange={(e) => setNewProdColorName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 id-input rounded-lg outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Hex Kode Warna (#FFF)</label>
                      <input
                        type="text"
                        value={newProdColorHex}
                        onChange={(e) => setNewProdColorHex(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg font-mono font-bold"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Deskripsi & Keunggulan</label>
                      <textarea
                        rows={2}
                        placeholder="Ulasan detail bahan katun, kerapatan rajutan..."
                        value={newProdDesc}
                        onChange={(e) => setNewProdDesc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs p-3 rounded-lg outline-none focus:bg-white"
                      />
                    </div>
                  </div>

                  <button
                    id="add-product-submit"
                    type="submit"
                    className="w-full bg-slate-950 text-white hover:bg-orange-500 font-bold py-3 rounded-xl text-xs tracking-wider transition-all cursor-pointer flex justify-center items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Masukkan ke Katalog
                  </button>
                </form>
              </div>

              {/* Products List & deletion (5 cols) */}
              <div className="lg:col-span-6 bg-white border border-slate-200 p-5 rounded-2xl space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                  Daftar Katalog Aktif ({productsList.length})
                </h4>

                <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto space-y-3 pb-2 pr-1">
                  {productsList.map((p) => (
                    <div key={p.id} className="flex items-center justify-between gap-3 text-xs pt-3 first:pt-0">
                      <div className="flex gap-2 items-center">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 text-slate-800">
                          👕
                        </div>
                        <div>
                          <h5 className="font-extrabold text-slate-900 leading-tight">{p.name}</h5>
                          <p className="text-[10px] text-slate-400">{p.category} • IDR {p.basePrice.toLocaleString("id-ID")}</p>
                        </div>
                      </div>

                      <button
                        id={`delete-prod-${p.id}`}
                        onClick={() => onRemoveProduct(p.id)}
                        className="text-slate-400 hover:text-red-650 cursor-pointer p-1"
                        title="Hapus Dari Katalog"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ADMIN SUB-VIEW 3: PARTNERING MITRA WORKSHOPS LIST */}
          {activeAdminSubTab === "mitra" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Bandung Cotton-Wear Crafts", location: "Cihampelas, Bandung", crafts: "Bordir Komputer & Kaos Heavyweight", leadTime: "3-5 Hari", capacity: "1.200 pcs / minggu" },
                { name: "Wonosari Jogja Tailoring", location: "Sleman, D.I. Yogyakarta", crafts: "Oxford Shirts & Seragam Kerja", leadTime: "4-7 Hari", capacity: "800 pcs / minggu" },
                { name: "Soreang Garment & Co", location: "Soreang, Kab. Bandung", crafts: "Fleece Hoodies & Windbreakers", leadTime: "5-8 Hari", capacity: "1.500 pcs / minggu" },
                { name: "Pekalongan Micro Batik & Craft", location: "Kedungwuni, Pekalongan", crafts: "Bahan kemeja saku, kain kustom digital", leadTime: "6-9 Hari", capacity: "500 pcs / minggu" }
              ].map((m, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 hover:shadow transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
                      🏭
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{m.name}</h4>
                      <p className="text-[10px] text-slate-400">{m.location}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-3 space-y-2 text-xs text-slate-600 font-sans">
                    <p>• Spesialis: <span className="font-bold text-slate-800">{m.crafts}</span></p>
                    <p>• Est Durasi: <span className="font-mono text-orange-600 font-semibold">{m.leadTime}</span></p>
                    <p>• Kapasitas Maks: <span className="font-bold text-slate-800">{m.capacity}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* Lightbox for Payment Receipt Preview */}
      {selectedReceiptToShow && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative border border-slate-250 overflow-hidden flex flex-col">
            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <span className="font-bold text-xs uppercase tracking-wider">Foto Resi Pembayaran Asli Pelanggan</span>
              <button
                type="button"
                onClick={() => setSelectedReceiptToShow(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-slate-100 flex items-center justify-center overflow-auto max-h-[80vh]">
              <img
                src={selectedReceiptToShow}
                alt="Bukti Transfer Asli"
                className="max-w-full max-h-[60vh] object-contain rounded-lg border border-slate-200 shadow-md"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-white border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => setSelectedReceiptToShow(null)}
                className="bg-slate-900 hover:bg-orange-500 font-bold text-xs text-white px-6 py-2.5 rounded-xl transition cursor-pointer"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
