import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart, formatPrice } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToBag = (saree: any) => {
    addToCart(saree, 1);
    removeFromWishlist(saree.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Slide Drawer */}
      <div className="relative w-full max-w-md bg-[#180407] border-l border-brand-gold/30 h-full flex flex-col justify-between shadow-2xl z-10">
        {/* Header */}
        <div className="p-5 border-b border-brand-gold/20 flex items-center justify-between bg-brand-maroon/30">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-brand-gold fill-brand-gold" />
            <h3 className="font-serif text-lg font-bold text-brand-gold-light">
              Your Saved Sarees
            </h3>
            <span className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full font-bold">
              {wishlist.length}
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-full text-brand-cream/70 hover:text-brand-gold hover:bg-brand-burgundy/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full border border-brand-gold/30 flex items-center justify-center bg-brand-burgundy/30">
                <Heart className="w-8 h-8 text-brand-gold/60" />
              </div>
              <h4 className="font-serif text-lg text-brand-gold-light">Your Wishlist is Empty</h4>
              <p className="text-xs text-brand-cream/60 max-w-xs">
                Save your favorite bridal and handloom drapes to revisit anytime.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-2.5 rounded-xl border border-brand-gold text-brand-gold text-xs font-bold hover:bg-brand-gold hover:text-brand-burgundy-deep transition-all"
              >
                Browse Heirloom Collection
              </button>
            </div>
          ) : (
            wishlist.map((saree) => (
              <div
                key={saree.id}
                className="flex gap-4 p-3.5 rounded-xl glass-gold/50 border border-brand-gold/20"
              >
                {/* Saree Thumbnail */}
                <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 border border-brand-gold/30">
                  <img
                    src={saree.image}
                    alt={saree.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-brand-cream line-clamp-1">
                        {saree.name}
                      </h4>
                      <button
                        onClick={() => removeFromWishlist(saree.id)}
                        className="text-brand-cream/50 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-brand-gold mt-0.5">{saree.material}</p>
                    <span className="font-serif text-sm font-bold text-brand-gold-light block mt-1">
                      {formatPrice(saree.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleMoveToBag(saree)}
                    className="mt-2 py-1.5 px-3 rounded-lg bg-brand-gold text-brand-burgundy-deep text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-all shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-5 border-t border-brand-gold/20 bg-brand-maroon/20">
            <button
              onClick={() => {
                wishlist.forEach((saree) => addToCart(saree, 1));
                setIsWishlistOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-burgundy-deep font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:opacity-95"
            >
              <span>Move All ({wishlist.length}) to Bag</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
