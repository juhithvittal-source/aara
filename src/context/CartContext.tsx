import React, { createContext, useContext, useState, useEffect } from 'react';
import { Saree, CartItem, Currency } from '../types';
import { CURRENCIES } from '../data/sarees';

interface CartContextType {
  cart: CartItem[];
  addToCart: (saree: Saree, quantity?: number, selectedBlouse?: CartItem['selectedBlouse']) => void;
  removeFromCart: (sareeId: string) => void;
  updateQuantity: (sareeId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalInr: number;
  discountInr: number;
  finalTotalInr: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  currency: Currency;
  setCurrencyCode: (code: string) => void;
  formatPrice: (priceInr: number) => string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewSaree: Saree | null;
  setQuickViewSaree: (saree: Saree | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aara_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState<Currency>(CURRENCIES.INR);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [quickViewSaree, setQuickViewSaree] = useState<Saree | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('aara_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to persist cart:', e);
    }
  }, [cart]);

  const addToCart = (
    saree: Saree, 
    quantity = 1, 
    selectedBlouse: CartItem['selectedBlouse'] = 'Unstitched (Included)'
  ) => {
    setCart(prev => {
      const existing = prev.find(item => item.saree.id === saree.id && item.selectedBlouse === selectedBlouse);
      if (existing) {
        return prev.map(item => 
          item.saree.id === saree.id && item.selectedBlouse === selectedBlouse
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { saree, quantity, selectedBlouse }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (sareeId: string) => {
    setCart(prev => prev.filter(item => item.saree.id !== sareeId));
  };

  const updateQuantity = (sareeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sareeId);
      return;
    }
    setCart(prev => prev.map(item => item.saree.id === sareeId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AARA10' || clean === 'ROYAL10') {
      setAppliedCoupon(clean);
      return { success: true, message: '10% Royal Privilege discount applied!' };
    }
    if (clean === 'FESTIVE15' || clean === 'BRIDAL15') {
      setAppliedCoupon(clean);
      return { success: true, message: '15% Festive Celebration discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try AARA10 or FESTIVE15' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const setCurrencyCode = (code: string) => {
    if (CURRENCIES[code]) {
      setCurrency(CURRENCIES[code]);
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotalInr = cart.reduce((acc, item) => {
    let blouseCost = 0;
    if (item.selectedBlouse.includes('Custom Stitched')) blouseCost = 2500;
    if (item.selectedBlouse.includes('Heavy Zardozi')) blouseCost = 4500;
    return acc + (item.saree.price + blouseCost) * item.quantity;
  }, 0);

  const discountInr = appliedCoupon === 'FESTIVE15' || appliedCoupon === 'BRIDAL15'
    ? Math.round(subtotalInr * 0.15)
    : appliedCoupon === 'AARA10' || appliedCoupon === 'ROYAL10'
    ? Math.round(subtotalInr * 0.10)
    : 0;

  const finalTotalInr = Math.max(0, subtotalInr - discountInr);

  const formatPrice = (priceInr: number) => {
    const converted = priceInr * currency.rate;
    if (currency.code === 'INR') {
      return `${currency.symbol}${priceInr.toLocaleString('en-IN')}`;
    }
    return `${currency.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalInr,
        discountInr,
        finalTotalInr,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        currency,
        setCurrencyCode,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewSaree,
        setQuickViewSaree,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
