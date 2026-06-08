import { useState, useEffect } from "react";
import { Product, CartItem, Order, DesignConfig, BaseCategory } from "./types";
import { PRODUCT_CATALOG } from "./data/catalog";

// Import modular children interfaces
import LandingView from "./components/LandingView";
import CatalogView from "./components/CatalogView";
import DesignStudioView from "./components/DesignStudioView";
import CartView from "./components/CartView";
import CheckoutView from "./components/CheckoutView";
import TrackingView from "./components/TrackingView";
import DashboardView from "./components/DashboardView";
import TechDocsView from "./components/TechDocsView";

import { 
  Sparkles, 
  Shirt, 
  Calculator, 
  ShoppingBag, 
  Search, 
  Settings, 
  Cpu, 
  FileCheck,
  Menu,
  X,
  MapPin,
  FileCode,
  Github
} from "lucide-react";

export default function App() {
  // Navigation Router states
  const [activeView, setActiveView] = useState<"landing" | "catalog" | "studio" | "cart" | "checkout" | "tracking" | "dashboard" | "specs">("landing");
  const [selectedStudioProdId, setSelectedStudioProdId] = useState<string | null>(null);
  
  // Mobile menu overlay toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Data persistent schemas in-memory (synced with admin and checkout)
  const [products, setProducts] = useState<Product[]>(PRODUCT_CATALOG);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Pre-seed some highly authentic orders so status management and tracking work immediately!
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "CW-418295",
      customerName: "Ahmad Rizky",
      customerPhone: "0895323964130",
      customerEmail: "customwear@gmail.com",
      shippingAddress: "Jl. Karyawan 3, Karang Tengah, Tangerang",
      paymentMethod: "Transfer Bank (BCA VA)",
      paymentStatus: "Paid",
      status: "Produksi",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      items: [
        {
          id: "cart-pre-1",
          product: PRODUCT_CATALOG[0], // Kaos
          quantity: 12, // Lusinan
          unitPrice: 55000,
          totalPrice: 660000,
          config: {
            productId: PRODUCT_CATALOG[0].id,
            color: PRODUCT_CATALOG[0].availableColors[0], // black
            size: "L",
            material: PRODUCT_CATALOG[0].materials[0].name,
            technique: PRODUCT_CATALOG[0].printTechniques[0].name,
            elements: [{ id: "el-1", type: "logo", content: "⚡", x: 0, y: -5, scale: 1, rotation: 0 }],
            viewSide: "front"
          }
        }
      ],
      totalAmount: 685000 // including fake shipping
    },
    {
      id: "CW-957134",
      customerName: "Clarissa Utama",
      customerPhone: "0819876543",
      customerEmail: "clarissa@senslabel.co",
      shippingAddress: "Perumahan Indah Asri Blok C-10, Kec. Kebayoran Baru, Jakarta Selatan, 12110",
      paymentMethod: "QR Pembayaran (QRIS)",
      paymentStatus: "Paid",
      status: "Pengiriman",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      items: [
        {
          id: "cart-pre-2",
          product: PRODUCT_CATALOG[1], // Hoodie
          quantity: 12,
          unitPrice: 135000,
          totalPrice: 1620000,
          config: {
            productId: PRODUCT_CATALOG[1].id,
            color: PRODUCT_CATALOG[1].availableColors[1], // shadow black
            size: "XL",
            material: PRODUCT_CATALOG[1].materials[0].name,
            technique: PRODUCT_CATALOG[1].printTechniques[1].name,
            elements: [{ id: "el-2", type: "text", content: "SENS", color: "#F9FAF8", x: 0, y: 10, scale: 1.2, rotation: 10 }],
            viewSide: "front"
          }
        }
      ],
      totalAmount: 1620000 // free ongkir
    }
  ]);

  // Handle active navigation lookups with preloaded parameters if needed
  const handleNavTransition = (
    view: "landing" | "catalog" | "studio" | "cart" | "tracking" | "dashboard" | "specs", 
    selectedProdId?: string
  ) => {
    setMobileMenuOpen(false);
    
    if (view === "studio") {
      setSelectedStudioProdId(selectedProdId || "prod-kaos-ultra");
      setActiveView("studio");
    } else if (view === "catalog") {
      setSelectedStudioProdId(selectedProdId || null); // Passes search context down if applicable
      setActiveView("catalog");
    } else if (view === "tracking") {
      setSelectedStudioProdId(selectedProdId || null); // Pre-sets search string to specific Order ID
      setActiveView("tracking");
    } else {
      setActiveView(view);
    }

    // Scroll to container top for seamless transitions
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add Item to Shopping Cart
  const handleAddToCart = (product: Product, config: DesignConfig, quantity: number, unitPrice: number) => {
    const newItem: CartItem = {
      id: `cart-item-${Date.now()}`,
      product,
      config,
      quantity,
      unitPrice,
      totalPrice: unitPrice * quantity
    };
    setCart([...cart, newItem]);
  };

  // Change quantity inside the cart
  const handleUpdateCartQuantity = (cartId: string, quantity: number) => {
    setCart(cart.map(item => {
      if (item.id === cartId) {
        // Redraw pricing tier discount internally for precision
        let discountPct = 0;
        if (quantity >= 12 && quantity < 50) {
          discountPct = 0.10;
        } else if (quantity >= 50 && quantity < 100) {
          discountPct = 0.15;
        } else if (quantity >= 100) {
          discountPct = 0.25;
        }

        // Standard customized baseline fee modeling
        const matCost = item.product.materials.find(m => m.name === item.config.material)?.priceSurcharge || 0;
        const techCost = item.product.printTechniques.find(t => t.name === item.config.technique)?.costPerUnit || 0;
        const baseUnit = item.product.basePrice + matCost + techCost + (item.config.elements.length * 4500);
        
        const activeUnit = Math.round(baseUnit * (1 - discountPct));
        
        return {
          ...item,
          quantity,
          unitPrice: activeUnit,
          totalPrice: activeUnit * quantity
        };
      }
      return item;
    }));
  };

  // Delete line item from cart
  const handleRemoveCartItem = (cartId: string) => {
    setCart(cart.filter(item => item.id !== cartId));
  };

  // Successful invoice transaction callback
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders([...orders, newOrder]);
    setCart([]); // Reset transaction state
  };

  // Admin triggers: modify dispatch state
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));
  };

  // Admin triggers: add product
  const handleAddProduct = (newProd: Product) => {
    setProducts([newProd, ...products]);
  };

  // Admin triggers: remove product
  const handleRemoveProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  // Compute quantity pill sum
  const cartPiecesSum = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      
      {/* ==================== GLOBAL NAVBAR ==================== */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Startup CustomWear signature Logo */}
            <div 
              onClick={() => handleNavTransition("landing")} 
              className="flex items-center gap-2 cursor-pointer font-extrabold text-slate-950 font-sans select-none"
            >
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white font-extrabold shadow-sm shadow-orange-500/20">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="text-base tracking-tight leading-none">CustomWear</span>
                <span className="text-[9px] text-orange-500 font-bold uppercase tracking-wider font-mono">FashionTech</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 text-xs text-slate-600 font-bold font-sans">
              <button 
                onClick={() => handleNavTransition("landing")} 
                className={`cursor-pointer hover:text-orange-500 transition py-1 ${activeView === "landing" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
              >
                Home
              </button>
              
              <button 
                id="nav-catalog"
                onClick={() => handleNavTransition("catalog")} 
                className={`cursor-pointer hover:text-orange-500 transition py-1 ${activeView === "catalog" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
              >
                Products Katalog
              </button>
              
              <button 
                id="nav-studio"
                onClick={() => handleNavTransition("studio")} 
                className={`cursor-pointer hover:text-orange-500 transition py-1 ${activeView === "studio" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
              >
                Design Studio
              </button>
              
              <button 
                onClick={() => handleNavTransition("tracking")} 
                className={`cursor-pointer hover:text-orange-500 transition py-1 ${activeView === "tracking" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
              >
                Order Tracking
              </button>

              <button 
                id="nav-dashboard"
                onClick={() => handleNavTransition("dashboard")} 
                className={`cursor-pointer hover:text-orange-500 transition py-1 ${activeView === "dashboard" ? "text-orange-500 border-b-2 border-orange-500" : ""}`}
              >
                Dashboard
              </button>

              <button 
                id="nav-specs"
                onClick={() => handleNavTransition("specs")} 
                className={`flex items-center gap-1 bg-slate-900 hover:bg-orange-500 text-white font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeView === "specs" ? "bg-orange-500" : ""
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                Sitemap &amp; ERD Specs
              </button>
            </div>

            {/* Right side cart & Hamburger buttons */}
            <div className="flex items-center gap-3">
              <button
                id="nav-cart-btn"
                onClick={() => handleNavTransition("cart")}
                className="bg-slate-100 hover:bg-slate-200 p-2.5 rounded-xl cursor-pointer relative transition"
                title="Lihat Keranjang"
              >
                <ShoppingBag className="w-4 h-4 text-slate-800" />
                {cartPiecesSum > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full font-mono animate-bounce">
                    {cartPiecesSum}
                  </span>
                )}
              </button>

              {/* Burger Toggle for small viewports */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-950 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown drawer overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3.5 text-xs font-bold font-sans">
            <button 
              onClick={() => handleNavTransition("landing")} 
              className="w-full text-left py-1 hover:text-orange-500 block"
            >
              Landing Home
            </button>
            <button 
              onClick={() => handleNavTransition("catalog")} 
              className="w-full text-left py-1 hover:text-orange-500 block"
            >
              Katalog Kategori Apparel
            </button>
            <button 
              onClick={() => handleNavTransition("studio")} 
              className="w-full text-left py-1 hover:text-orange-500 block"
            >
              Custom Design Studio
            </button>
            <button 
              onClick={() => handleNavTransition("tracking")} 
              className="w-full text-left py-1 hover:text-orange-500 block"
            >
              Pelacakan Estimasi (Tracking)
            </button>
            <button 
              onClick={() => handleNavTransition("dashboard")} 
              className="w-full text-left py-1 hover:text-orange-500 block"
            >
              User / Admin Console
            </button>
            <button 
              onClick={() => handleNavTransition("specs")} 
              className="w-full text-left py-2 hover:bg-orange-500 text-slate-900 hover:text-white rounded px-2 block transition flex items-center gap-1"
            >
              <FileCode className="w-3.5 h-3.5 text-slate-500" /> sitemap, ERD, Userflow
            </button>
          </div>
        )}
      </nav>

      {/* ==================== CORE CONTENT AREA ==================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Router condition selectors */}
        {activeView === "landing" && (
          <LandingView onNavigate={handleNavTransition} />
        )}

        {activeView === "catalog" && (
          <CatalogView 
            onNavigate={handleNavTransition} 
            preSelectedProdId={selectedStudioProdId} 
          />
        )}

        {activeView === "studio" && (
          <DesignStudioView 
            initialProductId={selectedStudioProdId} 
            onAddToCart={handleAddToCart}
            onNavigate={handleNavTransition} 
          />
        )}

        {activeView === "cart" && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onNavigate={handleNavTransition}
            onProceedToCheckout={() => setActiveView("checkout")}
          />
        )}

        {activeView === "checkout" && (
          <CheckoutView 
            cart={cart} 
            onOrderSuccess={handleOrderSuccess} 
            onNavigate={handleNavTransition} 
          />
        )}

        {activeView === "tracking" && (
          <TrackingView 
            ordersList={orders} 
            defaultSearchId={selectedStudioProdId} // In tracking state, selecting prod id parameters proxies the target search order code
          />
        )}

        {activeView === "dashboard" && (
          <DashboardView
            ordersList={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAddProduct={handleAddProduct}
            onRemoveProduct={handleRemoveProduct}
            onNavigate={handleNavTransition}
            productsList={products}
          />
        )}

        {activeView === "specs" && (
          <TechDocsView />
        )}

      </main>

      {/* ==================== GLOBAL FOOTER ==================== */}
      <footer className="bg-slate-950 text-white py-12 px-4 md:px-8 mt-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center text-white font-extrabold">
                ⚡
              </span>
              <span className="font-extrabold text-base tracking-tight leading-none text-white">CustomWear</span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              FashionTech Platform digital kustomisasi pakaian lokal premium standar ekspor. Memberdayakan ratusan micro-garment vendor lokal berkualifikasi distro se-Indonesia.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-orange-400 text-xs font-mono font-bold tracking-wider uppercase">Startup Navigation</h4>
            <div className="text-xs text-slate-400 space-y-2 flex flex-col items-start font-sans">
              <button onClick={() => handleNavTransition("landing")} className="hover:text-white transition">Landing Home</button>
              <button onClick={() => handleNavTransition("catalog")} className="hover:text-white transition">Products Catalog</button>
              <button onClick={() => handleNavTransition("studio")} className="hover:text-white transition">Design Studio Creator</button>
              <button onClick={() => handleNavTransition("dashboard")} className="hover:text-white transition">User &amp; Admin Panel</button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-orange-400 text-xs font-mono font-bold tracking-wider uppercase">Contact Support</h4>
            <div className="text-xs text-slate-400 space-y-1.5 font-sans">
              <p>📍 Jl. Karyawan 3, No. 64C, Ciledug, Karang Tengah, Tangerang</p>
              <p>📧 Email: customwear@gmail.com</p>
              <p>📞 Phone: 0895323964130</p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 CustomWear Indonesia Inc. All Rights Reserved.</p>
          <div className="flex gap-4 font-mono font-bold">
            <button onClick={() => handleNavTransition("specs")} className="text-orange-400 hover:underline">SITEMAP_ERD_blueprints.txt</button>
            <span>•</span>
            <span className="text-slate-600">LARAVEL_MYSQL_SANDBOX</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
