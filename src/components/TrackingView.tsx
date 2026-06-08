import { useState, useMemo, FormEvent } from "react";
import { Order } from "../types";
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle, 
  Calendar,
  Box,
  Truck,
  FileText
} from "lucide-react";

interface TrackingViewProps {
  ordersList: Order[];
  defaultSearchId?: string | null;
}

export default function TrackingView({ ordersList, defaultSearchId }: TrackingViewProps) {
  const [searchId, setSearchId] = useState<string>(defaultSearchId || "");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(
    ordersList.find((o) => o.id === defaultSearchId) || (ordersList.length > 0 ? ordersList[ordersList.length - 1] : null)
  );

  const handleSearchTrigger = (e: FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    
    const found = ordersList.find(
      (o) => o.id.toLowerCase() === searchId.trim().toLowerCase()
    );
    setSearchedOrder(found || null);
  };

  // Define tracking status hierarchy steps
  const trackingSteps = [
    { title: "Menunggu Konfirmasi", desc: "Sistem memvalidasi pembayaran Virtual Account / E-Wallet dan mencatat spesifikasi." },
    { title: "Diproses", desc: "Spesifikasi desain diserahkan pada tim desain, penyelarasan warna kain baju polos disepakati." },
    { title: "Produksi", desc: "Proses pemotongan kemeja / kaos polos dan pembordiran / penyablonan oleh mitra konveksi lokal." },
    { title: "Pengiriman", desc: "Kurir telah mengambil paket kargo dan mengantarnya ke alamat fisik penerima." },
    { title: "Selesai", desc: "Paket kustom pakaian berhasil tiba ditangan konsumen secara aman." }
  ];

  // Helper index selector to light up active dots
  const activeStepIndex = useMemo(() => {
    if (!searchedOrder) return -1;
    return trackingSteps.findIndex(step => step.title === searchedOrder.status);
  }, [searchedOrder]);

  return (
    <div id="tracking-timeline-root" className="space-y-8">
      
      {/* Search Order Input Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-orange-400">Lacak Status Pesanan</h3>
          <p className="text-slate-300 text-xs mt-0.5">Masukkan Nomor ID Invoice (Contoh: CW-XXXXXX) untuk memantau progres jahitan secara riil.</p>
        </div>

        <form onSubmit={handleSearchTrigger} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="tracking-search-bar"
              type="text"
              placeholder="Masukkan ID Pesanan (cth: CW-612732)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs pl-9 pr-4 py-3 rounded-xl outline-none focus:border-orange-500 transition"
            />
          </div>
          <button
            id="tracking-search-submit"
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 font-bold px-6 py-3 rounded-xl text-xs transition cursor-pointer"
          >
            Lacak Pesanan
          </button>
        </form>
      </div>

      {/* Results view */}
      {searchedOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sisi Kiri: Visual Chronology timeline stepper (7 cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 md:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded font-mono uppercase">
                  ACTIVE TRACKING
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1">Timeline Progres Pakaian</h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Estimasi Kirim</span>
                <span className="text-xs font-bold font-mono text-orange-600">3-4 Hari Kerja</span>
              </div>
            </div>

            {/* Stepper list */}
            <div className="relative border-l-2 border-slate-200 ml-4 py-2 space-y-8">
              {trackingSteps.map((step, idx) => {
                const isPassed = idx < activeStepIndex;
                const isCurrent = idx === activeStepIndex;
                const isUpcoming = idx > activeStepIndex;

                return (
                  <div key={idx} className="relative pl-8">
                    {/* Circle indicators */}
                    <div className={`absolute left-0 top-1 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition ${
                      isPassed 
                        ? "bg-emerald-500 border-emerald-500 text-white" 
                        : isCurrent 
                          ? "bg-orange-500 border-orange-500 text-white animate-pulse" 
                          : "bg-white border-slate-300 text-slate-400"
                    }`}>
                      {isPassed ? "✓" : idx + 1}
                    </div>

                    {/* Step descriptions */}
                    <div className={`${isUpcoming ? "opacity-50" : ""}`}>
                      <h4 className={`text-sm font-extrabold ${isCurrent ? "text-orange-600 font-black" : "text-slate-900"}`}>
                        {step.title}
                        {isCurrent && <span className="text-[9px] bg-orange-100 text-orange-700 font-extrabold px-1.5 py-0.5 rounded ml-2 uppercase">Proses Sekarang</span>}
                        {isPassed && <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded ml-2">Selesai</span>}
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sisi Kanan: Information Order Specifications summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Package Identity metadata */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-orange-500" /> Detail Invoice
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>ID Tag</span>
                  <strong className="font-mono text-slate-950 font-bold text-xs">{searchedOrder.id}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Pemesan</span>
                  <span className="font-bold text-slate-800">{searchedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>No HP</span>
                  <span className="font-mono text-slate-800">{searchedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pembayaran</span>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                    {searchedOrder.paymentStatus === "Paid" ? "TERAKREDITASI (PAID)" : "PENDING"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Metode</span>
                  <span className="font-bold text-slate-800 text-[10px]">{searchedOrder.paymentMethod}</span>
                </div>
                
                <div className="pt-3 border-t border-slate-150">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-1">
                    Alamat Tujuan Kirim
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-700 bg-slate-50 border border-slate-150 p-2.5 rounded-lg">
                    {searchedOrder.shippingAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Custom designs list inside tracked Order */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5">
                <Box className="w-4 h-4 text-orange-500" /> Item Diproduksi
              </h3>

              <div className="space-y-3">
                {searchedOrder.items.map((it) => (
                  <div key={it.id} className="text-xs bg-slate-50 border border-slate-150 p-3 rounded-xl">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{it.product.name} ({it.quantity} pcs)</span>
                      <span className="font-mono text-orange-600 font-extrabold">Size {it.config.size}</span>
                    </div>
                    <ul className="mt-2 space-y-0.5 text-[10px] text-slate-500 list-disc pl-4 font-sans">
                      <li>Bahan Kain: {it.config.material}</li>
                      <li>Teknik Sablon: {it.config.technique}</li>
                      <li>Warna Dasar: {it.config.color.name}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto text-xl">
            ⚠️
          </div>
          <h4 className="text-slate-800 font-bold text-base">ID Pesanan Tidak Terdaftar</h4>
          <p className="text-slate-500 text-xs max-w-sm mx-auto">
            Pastikan Anda memasukkan kode ID invoice secara utuh dan benar (cth: CW-912837). Silakan lihat riwayat ID di Dashboard jika Anda lupa.
          </p>
        </div>
      )}

    </div>
  );
}
