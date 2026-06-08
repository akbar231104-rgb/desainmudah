import { useState } from "react";
import { 
  SITEMAP_DATA, 
  USER_FLOW_STEPS, 
  ERD_ENTITIES, 
  PROJECT_FOLDER_STRUCTURE, 
  DESIGN_TOKENS 
} from "../data/techDocs";
import { 
  Network, 
  GitCommit, 
  Database, 
  FolderTree, 
  Palette, 
  ChevronRight, 
  Layers, 
  CheckCircle,
  FileText
} from "lucide-react";

export default function TechDocsView() {
  const [activeTab, setActiveTab] = useState<"sitemap" | "userflow" | "erd" | "folders" | "tokens">("sitemap");

  return (
    <div id="tech-docs-container" className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8">
      {/* Intro Header */}
      <div className="mb-8">
        <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
          Technical Specifications Sheet
        </span>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Sistem Arsitektur & Perencanaan Proyek</h2>
        <p className="text-slate-600 mt-2 text-sm md:text-base max-w-3xl">
          Dokumentasi detail sitemap platform, alur interaksi pengguna (user flow), diagram database (ERD), struktur modul backend-frontend, serta panduan styling untuk startup FashionTech **CustomWear**.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-6">
        <button
          id="tab-sitemap"
          onClick={() => setActiveTab("sitemap")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "sitemap" 
              ? "bg-slate-900 text-white shadow-sm" 
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Network className="w-4 h-4" />
          Sitemap Platform
        </button>

        <button
          id="tab-userflow"
          onClick={() => setActiveTab("userflow")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "userflow" 
              ? "bg-slate-900 text-white shadow-sm" 
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <GitCommit className="w-4 h-4" />
          User Flow
        </button>

        <button
          id="tab-erd"
          onClick={() => setActiveTab("erd")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "erd" 
              ? "bg-slate-900 text-white shadow-sm" 
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Database className="w-4 h-4" />
          Database ERD
        </button>

        <button
          id="tab-folders"
          onClick={() => setActiveTab("folders")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "folders" 
              ? "bg-slate-900 text-white shadow-sm" 
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FolderTree className="w-4 h-4" />
          Folder Project
        </button>

        <button
          id="tab-tokens"
          onClick={() => setActiveTab("tokens")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "tokens" 
              ? "bg-slate-900 text-white shadow-sm" 
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Palette className="w-4 h-4" />
          UI & Typography
        </button>
      </div>

      {/* 1. SITEMAP VIEW */}
      {activeTab === "sitemap" && (
        <div className="space-y-6">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
            <h4 className="text-orange-950 font-bold text-sm">Prinsip Arsitektur Halaman (Sitemap)</h4>
            <p className="text-orange-900 text-xs mt-1">
              Desain ini dibuat searah/modular agar pengguna tidak diselimuti navigasi yang terlalu lambat saat mendesain apparel polos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 flex flex-col justify-between shadow-md">
              <div>
                <span className="text-xs text-orange-400 font-semibold tracking-wide uppercase">Entry Point</span>
                <h3 className="text-lg font-bold mt-1 tracking-tight">{SITEMAP_DATA.root}</h3>
                <p className="text-slate-400 text-xs mt-2">
                  Gerbang utama mengenalkan USP (Unique Selling Proposition) CustomWear ke konsumen baru.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-orange-300 font-medium">
                Sistem Navigasi Utama <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {SITEMAP_DATA.branches.map((branch, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm transition hover:shadow-md">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Modul App</span>
                <h4 className="text-base font-bold text-slate-900 mt-1">{branch.name}</h4>
                <ul className="mt-3 space-y-2">
                  {branch.pages.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. USER FLOW VIEW */}
      {activeTab === "userflow" && (
        <div className="space-y-6">
          <div className="relative border-l-2 border-orange-200 ml-4 md:ml-6 py-2 space-y-8">
            {USER_FLOW_STEPS.map((step, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10">
                {/* Visual Circle Milestone */}
                <span className="absolute left-0 top-1.5 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold ring-4 ring-orange-100">
                  {idx + 1}
                </span>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">{step.step}</h4>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider self-start sm:self-center">
                      Pelaku: {step.actor}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. DATABASE ERD VIEW */}
      {activeTab === "erd" && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-orange-400 p-4 rounded-xl font-mono text-center text-xs border border-slate-800">
            MySQL / MariaDB Schema (Hubungan One-To-Many Relasional / ERD)
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ERD_ENTITIES.map((entity, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-900 text-white px-4 py-3 font-mono text-xs font-bold tracking-wider flex items-center justify-between">
                  <span>🔹 {entity.name}</span>
                  <span className="text-slate-400 text-[10px] uppercase font-sans">MySQL Table</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="p-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Field Name</th>
                        <th className="p-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Datatype</th>
                        <th className="p-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fungsi Deskriptif</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {entity.fields.map((field, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 text-xs font-mono font-bold text-slate-800">{field.name}</td>
                          <td className="p-3 text-xs font-mono text-orange-600">{field.type}</td>
                          <td className="p-3 text-xs text-slate-600 leading-relaxed font-sans">{field.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 text-blue-900 rounded-xl p-4 border border-blue-200 flex items-start gap-3 mt-4 text-xs md:text-sm">
            <Layers className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Interaksi Foreign Key:</span>
              <p className="mt-1 leading-relaxed">
                Tabel <code className="bg-blue-100 px-1 rounded">custom_designs</code> memetakan produk asli di <code className="bg-blue-100 px-1 rounded">products.id</code>, sementara pesanan pembayaran divalidasi ke <code className="bg-blue-100 px-1 rounded">orders</code> dan rincian belanjaan tersimpan secara atomik di <code className="bg-blue-100 px-1 rounded">order_items</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. FOLDER STRUCTURE */}
      {activeTab === "folders" && (
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md">
            <div className="bg-slate-800 text-slate-300 px-4 py-3 text-xs flex items-center justify-between border-b border-slate-700">
              <span className="font-mono font-bold">📂 Laravel + React folder-blueprint.txt</span>
              <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded">Tree View</span>
            </div>
            <pre className="p-5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
              {PROJECT_FOLDER_STRUCTURE}
            </pre>
          </div>
          <p className="text-xs text-slate-500 italic">
            * Catatan: Arsitektur di atas didesain mengacu pada standar terbaik Laravel 11 terintegrasi dengan modular JSX React Frontend untuk rendering optimal canvas Fabric.js.
          </p>
        </div>
      )}

      {/* 5. DESIGN TOKENS */}
      {activeTab === "tokens" && (
        <div className="space-y-8">
          {/* Colors Card */}
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-orange-500 rounded-full" />
              Sistem Pewarnaan (Color Swatches)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DESIGN_TOKENS.colors.map((c, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  {/* Hex preview */}
                  <div className="h-20" style={{ backgroundColor: c.hex.split(" ")[0] }} />
                  <div className="p-4">
                    <h5 className="font-bold text-xs text-slate-900 uppercase tracking-wider">{c.theme}</h5>
                    <code className="text-[11px] text-orange-600 block mt-1 font-semibold">{c.hex}</code>
                    <p className="text-slate-600 text-xs mt-2 leading-relaxed">{c.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-orange-500 rounded-full" />
              Tipografi Profesional & Vibe Layout
            </h4>
            <div className="space-y-4">
              {DESIGN_TOKENS.typography.map((t, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm tracking-tight">{t.type}</h5>
                    <p className="text-slate-500 text-xs font-mono mt-1">Font Family: {t.font} | {t.size}</p>
                  </div>
                  <div className="text-right text-xs text-slate-600 max-w-md italic border-l-2 border-slate-200 pl-3 md:border-l-0 md:pl-0">
                    {t.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
