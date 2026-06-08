export enum BaseCategory {
  Kaos = "Kaos",
  Hoodie = "Hoodie",
  Jaket = "Jaket",
  Kemeja = "Kemeja",
  ToteBag = "Tote Bag",
  Celana = "Celana",
  Topi = "Topi"
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: BaseCategory;
  description: string;
  image: string; // Base canvas visual (front/back template overlay)
  basePrice: number;
  availableColors: ProductColor[];
  availableSizes: string[];
  materials: { name: string; priceSurcharge: number; desc: string }[];
  printTechniques: { name: string; costPerUnit: number; desc: string }[];
  popular?: boolean;
}

export interface CanvasElement {
  id: string;
  type: "text" | "logo";
  content: string; // The text content or image file source/placeholder
  color?: string; // Text color
  fontFamily?: string;
  x: number; // Percent positioning (-50 to 50 relative to center)
  y: number;
  scale: number; // Multiply size
  rotation: number; // Angles in degrees
}

export interface DesignConfig {
  productId: string;
  color: ProductColor;
  size: string;
  material: string;
  technique: string;
  elements: CanvasElement[];
  viewSide: "front" | "back";
}

export interface CartItem {
  id: string;
  product: Product;
  config: DesignConfig;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  status: "Menunggu Konfirmasi" | "Diproses" | "Produksi" | "Pengiriman" | "Selesai";
  trackingNumber?: string;
  createdAt: string;
  paymentReceipt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
}
