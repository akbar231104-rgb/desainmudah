import { CartItem } from "../types";
import { 
  ShoppingBag, 
  Trash2, 
  ArrowLeft, 
  ChevronRight, 
  Plus, 
  Minus, 
  Info, 
  Percent, 
  Truck 
} from "lucide-react";

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onNavigate: (view: "landing" | "catalog" | "studio" | "cart" | "tracking" | "dashboard" | "specs", selectedProdId?: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartView({ 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onNavigate, 
  onProceedToCheckout 
}: CartViewProps) {

  // Sum cart subtotal costs
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  
  // Simulated delivery costs
  const shippingCost = subtotal > 500000 ? 0 : 25000; // Free ongkir for orders > 500k
  
  // Total cost computed
  const grandTotal = subtotal + shippingCost;

  return (
    <div id="shopping-cart-root" className="space-y-6">
      
      {/* Back button link */}
      <button
        id="cart-back-btn"
        onClick={() => onNavigate("catalog")}
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition font-bold cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Lanjutkan Berbelanja
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sisi Kiri: List of clothes inside the cart (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mb-6">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              Keranjang Customwear ({cart.length} item)
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  🦖
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Keranjang Anda Masih Kosong</h3>
                  <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
                    Kreasikan logo keren buatan sendiri sekarang juga melalui studio desain baju interaktif kami!
                  </p>
                </div>
                <button
                  id="cart-empty-studio-cta"
                  onClick={() => onNavigate("studio")}
                  className="bg-orange-500 hover:bg-orange-600 font-bold px-6 py-3 rounded-xl text-xs text-white transition cursor-pointer"
                >
                  Mulai Rancang Desain
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-150 space-y-6">
                {cart.map((item, index) => (
                  <div key={item.id} className={`flex flex-col sm:flex-row gap-5 items-stretch ${index > 0 ? "pt-6" : ""}`}>
                    {/* Apparel color visual thumbnail representation */}
                    <div className="w-24 h-24 bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center justify-center shrink-0 self-center sm:self-auto uppercase">
                      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow text-slate-800 fill-current" style={{ color: item.config.color.hex }}>
                        {item.product.image === "kaos" && <path d="M 20 20 C 35 25 65 25 80 20 C 85 30 92 35 95 42 C 85 45 83 45 80 40 L 80 90 C 80 93 20 93 20 90 L 20 40 C 17 45 15 45 5 42 C 8 35 15 30 20 20 Z" />}
                        {item.product.image === "hoodie" && <path d="M 20 25 C 35 30 65 30 80 25 L 90 45 C 83 46 80 44 78 40 L 78 90 C 78 93 22 93 22 90 L 22 40 C 20 44 17 46 10 45 Z" />}
                        {item.product.image === "jk" || item.product.image === "jaket" && <path d="M 20 20 C 35 24 65 24 80 20 L 92 40 C 85 41 82 39 80 37 L 80 90 C 80 93 20 93 20 90 L 20 37 C 18 39 15 41 8 40 L 20 20 Z" />}
                        {item.product.image === "kemeja" && <path d="M 20 20 C 35 24 65 24 80 20 L 92 40 C 85 41 82 39 80 37 L 80 90 C 80 93 20 93 20 90 L 20 37 C 18 39 15 41 8 40 L 20 20 Z" />}
                        {item.product.image === "bag" && <g><path d="M 25 35 C 35 20 65 20 65 35" fill="none" stroke="currentColor" strokeWidth="6" /><rect x="23" y="35" width="54" height="52" rx="2" fill="currentColor" /></g>}
                      </svg>
                    </div>

                    {/* Specifications detail text */}
                    <div className="flex-1 space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-extrabold text-sm text-slate-900 leading-tight block">
                            {item.product.name} (Custom Design)
                          </h4>
                          <button
                            id={`remove-cart-${item.id}`}
                            onClick={() => onRemoveItem(item.id)}
                            className="text-slate-400 hover:text-red-500 cursor-pointer transition p-1"
                            title="Hapus Baju"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[10px] sm:text-xs text-slate-500">
                          <p>Ukuran: <strong className="text-slate-800">{item.config.size}</strong></p>
                          <p>Bahan: <strong className="text-slate-800">{item.config.material}</strong></p>
                          <p>Teknik: <strong className="text-slate-800">{item.config.technique}</strong></p>
                          <p>Warna: <strong className="text-slate-800">{item.config.color.name}</strong></p>
                          <p className="col-span-2 text-[10px] text-orange-600 font-semibold mt-0.5">
                            Grafis Lay: {item.config.elements.length} Elemen Aktif desainer
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-slate-100">
                        {/* Quantity controls counter */}
                        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5">
                          <button
                            id={`qty-minus-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer bg-white border border-slate-100 rounded"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="w-10 text-center font-bold text-xs font-mono">{item.quantity}</span>
                          
                          <button
                            id={`qty-plus-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer bg-white border border-slate-100 rounded"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price details */}
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block font-medium">
                            @ IDR {item.unitPrice.toLocaleString("id-ID")}
                          </span>
                          <span className="text-sm font-extrabold text-slate-950 font-mono">
                            IDR {item.totalPrice.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center gap-3">
              <Info className="w-5 h-5 text-orange-500 shrink-0" />
              <p className="text-[11px] text-slate-600 leading-relaxed">
                * Kuantitas pemesanan di atas **12 pcs** otomatis memotong harga satuan hingga **10-25%** sesuai tiered discount system CustomWear yang ramah komunitas lokalan.
              </p>
            </div>
          )}
        </div>

        {/* Sisi Kanan: Summary & Proceed to Checkout (4 cols) */}
        {cart.length > 0 && (
          <div className="lg:col-span-4 bg-white border border-slate-200 p-5 md:p-6 rounded-2xl space-y-6">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
              Ringkasan Belanja
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Total Harga Polos & Cetak</span>
                <span className="font-mono text-slate-900 font-bold">IDR {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-slate-400" /> Biaya Pengiriman</span>
                <span className="font-mono text-slate-900 font-bold">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-extrabold text-[10px] uppercase font-sans">Free Ongkir</span>
                  ) : (
                    `IDR ${shippingCost.toLocaleString("id-ID")}`
                  )}
                </span>
              </div>
              
              <div className="bg-orange-50 text-orange-900 text-[11px] p-2.5 rounded-lg border border-orange-100 flex items-center gap-2">
                <Percent className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span>Pembelian di atas Rp500.000 bebas ongkir se-Jawa!</span>
              </div>

              <div className="pt-4 border-t border-slate-150 flex justify-between items-baseline">
                <span className="font-extrabold text-slate-900 text-sm uppercase">Total Pembayaran</span>
                <span className="text-xl font-black font-mono text-orange-500">
                  IDR {grandTotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button
              id="proceed-checkout-cta"
              onClick={onProceedToCheckout}
              className="w-full bg-slate-950 hover:bg-orange-500 active:transform active:scale-95 text-xs text-white font-bold py-4 rounded-xl tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
            >
              LANJUTKAN KE CHECKOUT
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
