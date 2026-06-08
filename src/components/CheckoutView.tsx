import { useState, useMemo, FormEvent } from "react";
import { CartItem, Order } from "../types";
import { 
  CreditCard, 
  MapPin, 
  Smartphone, 
  Mail, 
  User, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  Loader2,
  X,
  Sparkles
} from "lucide-react";

interface CheckoutViewProps {
  cart: CartItem[];
  onOrderSuccess: (order: Order) => void;
  onNavigate: (view: "landing" | "catalog" | "studio" | "cart" | "tracking" | "dashboard" | "specs", selectedProdId?: string) => void;
}

export default function CheckoutView({ cart, onOrderSuccess, onNavigate }: CheckoutViewProps) {
  // Back to cart if empty
  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const shippingCost = subtotal > 500000 ? 0 : 25000;
  const grandTotal = subtotal + shippingCost;

  // Form Fields State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank BCA (Manual)");
  
  // Validation indicator
  const [errorText, setErrorText] = useState("");
  
  // File upload for real-world transaction confirmation
  const [receiptImage, setReceiptImage] = useState<string>("");
  const [receiptFileName, setReceiptFileName] = useState<string>("");
  
  // Midtrans Sandboxed Interactive Modal Simulator State
  const [showPayModal, setShowPayModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");

  const handleCreateOrderClick = (e: FormEvent) => {
    e.preventDefault();
    setErrorText("");

    if (!customerName.trim()) return setErrorText("Nama lengkap wajib diisi.");
    if (!customerPhone.trim()) return setErrorText("Nomor handphone wajib diisi.");
    if (!customerEmail.trim() || !customerEmail.includes("@")) return setErrorText("Alamat email tidak valid.");
    if (!shippingAddress.trim() || shippingAddress.length < 10) return setErrorText("Alamat pengiriman fisik minimal 10 karakter.");

    // Generate unique FashionTech Order ID
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const orderId = `CW-${randomCode}`;
    setGeneratedOrderId(orderId);

    // Open Sandboxed Payment Modal window
    setShowPayModal(true);
  };

  // Simulate Midtrans successful billing trigger
  const handleSimulateSuccessPay = () => {
    setIsProcessingPayment(true);
    
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      
      const newOrder: Order = {
        id: generatedOrderId,
        customerName,
        customerPhone,
        customerEmail,
        shippingAddress,
        items: [...cart],
        totalAmount: grandTotal,
        paymentMethod,
        paymentStatus: "Paid",
        status: "Menunggu Konfirmasi",
        createdAt: new Date().toISOString()
      };

      // Call success listener to clean cart and push history
      setTimeout(() => {
        onOrderSuccess(newOrder);
        setShowPayModal(false);
        onNavigate("tracking", generatedOrderId);
      }, 1500);

    }, 1200);
  };

  return (
    <div id="checkout-container" className="space-y-6 relative">
      
      {/* Detail heading */}
      <button
        id="checkout-back-cart"
        onClick={() => onNavigate("cart")}
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-bold transition cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali Ke Keranjang
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form billing details (7 cols) */}
        <form onSubmit={handleCreateOrderClick} className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 space-y-6">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2 border-b border-slate-100 pb-3">
              <MapPin className="w-5 h-5 text-orange-500" /> Informasi Pengiriman & Penerima
            </h2>

            {errorText && (
              <div className="bg-red-50 text-red-700 text-xs p-3.5 rounded-lg flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nama Penerima */}
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nama Lengkap Penerima</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="checkout-name-input"
                    type="text"
                    required
                    placeholder="Contoh: Ahmad Rizky"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs pl-9 pr-4 py-3 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Nomor HP */}
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nomor HP / WHATSAPP</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="checkout-phone-input"
                    type="tel"
                    required
                    placeholder="Contoh: 0895323964130"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs pl-9 pr-4 py-3 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Alamat Email */}
              <div className="space-y-1.5 col-span-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Alamat Email Aktif (Notifikasi Progress)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="checkout-email-input"
                    type="email"
                    required
                    placeholder="Contoh: customwear@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs pl-9 pr-4 py-3 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition"
                  />
                </div>
                <span className="text-[10px] text-slate-400 italic block">Invoice dan resi pengerjaan konveksi lokal akan dikirim kesini.</span>
              </div>

              {/* Alamat Pengiriman Fisik */}
              <div className="space-y-1.5 col-span-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Alamat Lengkap Rumah / Kantor</label>
                <textarea
                  id="checkout-address-input"
                  required
                  rows={3}
                  placeholder="Nama Jalan, Blok, RT/RW, Kecamatan, Kota, Provinsi, Kode Pos..."
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-lg outline-none focus:border-orange-500 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* Payment Methods selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 space-y-4">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <CreditCard className="w-5 h-5 text-orange-500" /> Metode Pembayaran
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
              {[
                { name: "Transfer Bank BCA (Manual)", desc: "Transfer manual ke Rekening BCA M. Akbar", icon: "🏦" },
                { name: "Transfer Bank Mandiri (Manual)", desc: "Transfer manual ke Rekening Mandiri M. Akbar", icon: "🏦" },
                { name: "QRIS / E-Wallet (DANA/Gopay/OVO)", desc: "DANA/Gopay/ShopeePay ke 0895323964130", icon: "📱" }
              ].map((opt) => (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => setPaymentMethod(opt.name)}
                  className={`p-3 text-left border rounded-xl transition cursor-pointer flex gap-3 ${
                    paymentMethod === opt.name 
                      ? "bg-slate-900 border-slate-900 text-white" 
                      : "bg-slate-50 border-slate-205 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-xl self-center">{opt.icon}</span>
                  <div>
                    <h4 className="font-extrabold text-xs">{opt.name}</h4>
                    <p className={`text-[10px] mt-0.5 ${paymentMethod === opt.name ? "text-slate-300" : "text-slate-400"}`}>
                      {opt.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Order Items Right panel summary (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-5 md:p-6 rounded-2xl space-y-6">
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Ringkasan Pesanan
          </h3>

          {/* Mini-list */}
          <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 space-y-3 pb-3">
            {cart.map((item, idx) => (
              <div key={item.id} className={`flex gap-3 justify-between items-center ${idx > 0 ? "pt-3" : ""}`}>
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: item.config.color.hex }} />
                  <div>
                    <h5 className="font-extrabold text-[11px] text-slate-950 truncate max-w-xs">{item.product.name}</h5>
                    <p className="text-[10px] text-slate-400">{item.quantity} pcs • Ukuran {item.config.size}</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-slate-900">
                  IDR {item.totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-150 pt-4 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal Item</span>
              <span className="font-mono text-slate-900 font-bold">IDR {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Ongkos Pengiriman J&T</span>
              <span className="font-mono text-slate-900 font-bold">
                {shippingCost === 0 ? "FREE" : `IDR ${shippingCost.toLocaleString("id-ID")}`}
              </span>
            </div>
            <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-extrabold text-slate-950 text-xs sm:text-sm uppercase">Total Tagihan</span>
              <span className="text-xl font-black font-mono text-orange-500">
                IDR {grandTotal.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <button
            id="checkout-submit-form"
            onClick={handleCreateOrderClick}
            className="w-full bg-orange-500 hover:bg-orange-600 active:transform active:scale-95 text-xs text-white font-bold py-4 rounded-xl tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
          >
            BUAT PESANAN SEKARANG
          </button>
        </div>

      </div>

      {/* ==================== REAL MANUAL TRANSFER INVOICE POPUP ==================== */}
      {showPayModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">💳</span>
                <span className="font-bold text-xs tracking-wider uppercase">Layanan Invoice Pembayaran Asli</span>
              </div>
              <button
                id="close-midtrans-modal"
                onClick={() => setShowPayModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-center">
              <div>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Menunggu Transfer Manual
                </span>
                <p className="font-mono text-xs font-bold text-slate-400 mt-2">DOKUMEN INVOICE: {generatedOrderId}</p>
                <h3 className="text-2xl font-black font-mono text-slate-900 mt-1">
                  IDR {grandTotal.toLocaleString("id-ID")}
                </h3>
              </div>

              {/* Paying visual placeholder */}
              {isProcessingPayment ? (
                <div className="space-y-4 py-8 flex flex-col items-center justify-center font-sans">
                  <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                  <p className="text-slate-600 font-bold text-xs">Mengunggah bukti bayar & mengirim ke antrean konveksi...</p>
                </div>
              ) : paymentSuccess ? (
                <div className="space-y-3 py-6 text-center flex flex-col items-center justify-center font-sans">
                  <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                  <h4 className="font-black text-slate-900 text-base">Pesanan Berhasil Dikirim!</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Bukti bayar terekam di antrean konveksi. Admin akan mengonfirmasi via WhatsApp / Email {customerEmail} sesegera mungkin.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-left font-sans">
                  
                  {/* Account Instructions Box */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-3">
                    <h4 className="font-extrabold text-xs text-slate-800">Tujuan Transfer Pembayaran Asli:</h4>
                    
                    {paymentMethod.includes("BCA") && (
                      <div className="space-y-1 text-xs">
                        <p className="text-slate-400 text-[10px] uppercase font-bold">Bank Penerima</p>
                        <p className="font-extrabold text-slate-900">BANK BCA (Cabang Jakarta/Tangerang)</p>
                        <p className="text-slate-400 text-[10px] uppercase font-bold mt-2">Nomor Rekening</p>
                        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-100">
                          <code className="text-lg font-black text-orange-600 tracking-wider">0241042718</code>
                          <button 
                            type="button" 
                            onClick={() => {
                              navigator.clipboard.writeText("0241042718");
                              alert("Nomor Rekening BCA disalin!");
                            }}
                            className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded font-bold cursor-pointer transition"
                          >
                            Salin No
                          </button>
                        </div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold mt-2">Atas Nama Pemilik</p>
                        <p className="font-bold text-slate-950">M. Akbar</p>
                      </div>
                    )}

                    {paymentMethod.includes("Mandiri") && (
                      <div className="space-y-1 text-xs">
                        <p className="text-slate-400 text-[10px] uppercase font-bold">Bank Penerima</p>
                        <p className="font-extrabold text-slate-900">BANK MANDIRI (Rek Kerja Resmi)</p>
                        <p className="text-slate-400 text-[10px] uppercase font-bold mt-2">Nomor Rekening</p>
                        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-100">
                          <code className="text-lg font-black text-blue-600 tracking-wider">1550012378901</code>
                          <button 
                            type="button" 
                            onClick={() => {
                              navigator.clipboard.writeText("1550012378901");
                              alert("Nomor Rekening Mandiri disalin!");
                            }}
                            className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded font-bold cursor-pointer transition"
                          >
                            Salin No
                          </button>
                        </div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold mt-2">Atas Nama Pemilik</p>
                        <p className="font-bold text-slate-950">M. Akbar</p>
                      </div>
                    )}

                    {paymentMethod.includes("QRIS") && (
                      <div className="space-y-2 text-xs">
                        <p className="text-slate-400 text-[10px] uppercase font-bold text-center">Scan QR / Transfer E-Wallet</p>
                        <div className="w-40 h-40 bg-slate-100 border border-slate-200 rounded-lg mx-auto flex flex-col items-center justify-center p-1 relative">
                          {/* Beautiful simulated dynamic QR code */}
                          <div className="w-36 h-36 border border-slate-350 relative flex flex-col items-center justify-center bg-white p-2">
                            <span className="text-[10px] font-black tracking-widest text-[#D32F2F]">Q R I S</span>
                            <div className="w-24 h-24 bg-slate-900 flex items-center justify-center relative rounded m-1">
                              {/* QR Pattern visual styling */}
                              <div className="absolute inset-2 bg-white flex items-center justify-center">
                                <div className="w-16 h-16 bg-slate-900 rounded flex items-center justify-center">
                                  <span className="text-[8px] bg-white px-1 font-extrabold rounded">CW</span>
                                </div>
                              </div>
                            </div>
                            <span className="text-[8px] font-bold text-slate-500">Shopee/Gopay/DANA - Akbar</span>
                          </div>
                        </div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold text-center mt-2">No WHATSAPP & E-Wallet</p>
                        <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-100">
                          <code className="text-sm font-black text-rose-600 tracking-wider">0895-3239-64130</code>
                          <button 
                            type="button" 
                            onClick={() => {
                              navigator.clipboard.writeText("0895323964130");
                              alert("Nomor WA / E-Wallet berhasil disalin!");
                            }}
                            className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded font-bold cursor-pointer transition"
                          >
                            Salin
                          </button>
                        </div>
                        <p className="text-[9px] text-slate-400 text-center">*Atas nama transfer e-wallet: <strong>M. Akbar</strong></p>
                      </div>
                    )}

                  </div>

                  {/* Interactive Upload Receipt Box */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-widest block">
                      Lampirkan File Bukti Transfer (Screenshot/Foto Resi)*
                    </label>
                    
                    {receiptImage ? (
                      <div className="relative border border-slate-200 rounded-xl p-2 bg-slate-50 flex items-center gap-3">
                        <img 
                          src={receiptImage} 
                          alt="Uploaded receipt" 
                          className="w-14 h-14 object-cover rounded-lg border border-slate-200 hover:scale-105 transition"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-extrabold text-slate-800 truncate">{receiptFileName || "resi_transfer.png"}</p>
                          <p className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">✓ Siap Dikirim ke Admin</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setReceiptImage("");
                            setReceiptFileName("");
                          }}
                          className="p-1 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-slate-200 hover:border-orange-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition bg-slate-50 hover:bg-white text-center hover:shadow-inner">
                        <span className="text-xl mb-1">📸</span>
                        <span className="text-[11px] font-extrabold text-slate-800">Klik untuk Pilih Gambar Bukti Transfer</span>
                        <span className="text-[9px] text-slate-400 mt-0.5">Sistem akan menyimpannya langsung ke database order</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setReceiptFileName(file.name);
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setReceiptImage(event.target?.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                </div>
              )}

              {/* Action dispatch controls */}
              {!isProcessingPayment && !paymentSuccess && (
                <div className="space-y-2 pt-2">
                  <button
                    id="midtrans-simulate-paid"
                    onClick={() => {
                      if (!receiptImage) {
                        alert("Silakan pilih file bukti transfer/screenshot resi terlebih dahulu agar admin dapat memverifikasi pembayaran Anda!");
                        return;
                      }
                      
                      setIsProcessingPayment(true);
                      
                      setTimeout(() => {
                        setIsProcessingPayment(false);
                        setPaymentSuccess(true);
                        
                        const newOrder: Order = {
                          id: generatedOrderId,
                          customerName,
                          customerPhone,
                          customerEmail,
                          shippingAddress,
                          items: [...cart],
                          totalAmount: grandTotal,
                          paymentMethod,
                          paymentStatus: "Pending", // Admin validates this
                          status: "Menunggu Konfirmasi",
                          paymentReceipt: receiptImage,
                          createdAt: new Date().toISOString()
                        };

                        setTimeout(() => {
                          onOrderSuccess(newOrder);
                          setShowPayModal(false);
                          setReceiptImage("");
                          setReceiptFileName("");
                          onNavigate("tracking", generatedOrderId);
                        }, 1200);

                      }, 1000);
                    }}
                    className="w-full bg-slate-900 hover:bg-orange-500 text-xs text-white font-extrabold py-3.5 rounded-xl cursor-pointer shadow transition flex items-center justify-center gap-1.5 uppercase tracking-widest"
                  >
                    Kirim Konfirmasi Bukti Transfer
                  </button>
                  <button
                    onClick={() => setShowPayModal(false)}
                    className="w-full text-slate-400 text-[10px] font-semibold py-1.5 cursor-pointer hover:text-slate-900 transition underline"
                  >
                    Nanti / Perbaiki Detail Alamat
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
