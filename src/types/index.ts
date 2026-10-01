export type SareeCategory = 
  | 'All'
  | 'Silk Sarees'
  | 'Kanjivaram'
  | 'Banarasi'
  | 'Organza'
  | 'Cotton'
  | 'Designer Sarees'
  | 'Bridal Collection';

export interface Saree {
  id: string;
  name: string;
  category: SareeCategory;
  price: number; // in INR
  originalPrice?: number;
  description: string;
  story: string;
  image: string;
  galleryImages: string[];
  color: string;
  colorHex: string;
  material: string;
  zariType: 'Pure Gold Zari' | 'Tested Zari' | 'Rose Gold Zari' | 'Antique Silver Zari' | 'Intricate Threadwork';
  weaveOrigin: string; // e.g. "Kanchipuram, Tamil Nadu", "Varanasi, Uttar Pradesh"
  length: string; // e.g. "5.5 meters + 0.8 meter blouse piece"
  occasion: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isBridal?: boolean;
  inStock: boolean;
  specifications: {
    fabric: string;
    weaveTime: string;
    careInstructions: string;
    silkMarkCertified: boolean;
    handloomMark: boolean;
    blouseIncluded: boolean;
  };
  model3DProps?: {
    primaryColor: string;
    secondaryColor: string;
    zariShine: number;
    fabricSheen: number;
  };
}

export interface CartItem {
  saree: Saree;
  quantity: number;
  selectedBlouse: 'Unstitched (Included)' | 'Custom Stitched (+$35 / ₹2,500)' | 'Heavy Zardozi Designer (+$60 / ₹4,500)';
}

export interface Currency {
  code: 'INR' | 'USD' | 'AED' | 'GBP' | 'EUR';
  symbol: string;
  rate: number; // 1 INR = rate * foreign
  label: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  review: string;
  sareePurchased: string;
  date: string;
  verified: boolean;
  avatar?: string;
}

export interface CraftStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  timeframe: string;
  image: string;
  highlights: string[];
}
