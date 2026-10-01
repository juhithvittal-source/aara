import React, { createContext, useContext, useState, useEffect } from 'react';
import { Saree } from '../types';

interface WishlistContextType {
  wishlist: Saree[];
  addToWishlist: (saree: Saree) => void;
  removeFromWishlist: (sareeId: string) => void;
  toggleWishlist: (saree: Saree) => void;
  isInWishlist: (sareeId: string) => boolean;
  clearWishlist: () => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Saree[]>(() => {
    try {
      const saved = localStorage.getItem('aara_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('aara_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to persist wishlist:', e);
    }
  }, [wishlist]);

  const addToWishlist = (saree: Saree) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === saree.id)) return prev;
      return [...prev, saree];
    });
  };

  const removeFromWishlist = (sareeId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== sareeId));
  };

  const toggleWishlist = (saree: Saree) => {
    if (isInWishlist(saree.id)) {
      removeFromWishlist(saree.id);
    } else {
      addToWishlist(saree);
    }
  };

  const isInWishlist = (sareeId: string) => {
    return wishlist.some(item => item.id === sareeId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
