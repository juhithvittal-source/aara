import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Check } from 'lucide-react';
import { Saree } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  saree: Saree;
  onQuickView: (saree: Saree) => void;
  onOpenStudioWithSaree?: (saree: Saree) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  saree,
  onQuickView,
  onOpenStudioWithSaree,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const { addToCart, formatPrice } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorite = isInWishlist(saree.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(saree, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(saree);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(saree)}
      className="group relative rounded-2xl bg-[#23090F]/70 border border-brand-gold/25 hover:border-brand-gold/70 transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-gold-glow hover:-translate-y-1.5"
    >
      {/* Card Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-maroon/30">
        <img
          src={saree.image}
          alt={saree.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-deep/90 via-transparent to-black/30 opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Badges (Bestseller / Bridal / Pure Zari) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {saree.isBestseller && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-gold text-brand-burgundy-deep shadow-md">
              Bestseller
            </span>
          )}
          {saree.isBridal && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-burgundy text-brand-gold-light border border-brand-gold/50 shadow-md">
              Bridal Drape
            </span>
          )}
          {saree.isNewArrival && !saree.isBestseller && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#18392B] text-[#A3E3C7] border border-[#2B7354]/40 shadow-md">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full glass-gold text-brand-cream hover:text-brand-gold transition-transform duration-300 hover:scale-110 z-10"
          aria-label={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-brand-gold text-brand-gold' : 'text-brand-cream/80'
            }`}
          />
        </button>

        {/* Quick View & 3D Viewer Hover Action Bar */}
        <div
          className={`absolute bottom-3 left-3 right-3 flex items-center gap-2 z-10 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(saree);
            }}
            className="flex-1 py-2 px-3 rounded-xl glass-gold text-brand-gold-light hover:text-brand-gold text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-brand-gold transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          {onOpenStudioWithSaree && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenStudioWithSaree(saree);
              }}
              className="py-2 px-3 rounded-xl bg-brand-gold/20 hover:bg-brand-gold text-brand-gold hover:text-brand-burgundy-deep text-xs font-semibold flex items-center justify-center gap-1 border border-brand-gold/50 transition-all"
              title="View in 3D Studio"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          {/* Category & Origin */}
          <div className="flex items-center justify-between text-[11px] text-brand-gold mb-1">
            <span className="font-serif uppercase tracking-widest">{saree.category}</span>
            <div className="flex items-center gap-1 text-brand-gold-light">
              <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
              <span className="font-bold">{saree.rating.toFixed(1)}</span>
              <span className="text-brand-cream/50 text-[10px]">({saree.reviewCount})</span>
            </div>
          </div>

          {/* Saree Name */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-brand-cream group-hover:text-brand-gold transition-colors line-clamp-1 mb-1.5">
            {saree.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-brand-cream/65 line-clamp-2 leading-relaxed mb-3">
            {saree.description}
          </p>

          {/* Fabric & Zari tag */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-maroon/60 text-brand-cream/70 border border-brand-gold/20">
              {saree.material}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-maroon/60 text-brand-gold-light/90 border border-brand-gold/20">
              {saree.zariType}
            </span>
          </div>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-3 border-t border-brand-gold/15 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-base sm:text-lg font-bold text-brand-gold">
                {formatPrice(saree.price)}
              </span>
              {saree.originalPrice && (
                <span className="text-xs text-brand-cream/40 line-through">
                  {formatPrice(saree.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-brand-cream/50">Taxes Included</span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center ${
              isAddedRecently
                ? 'bg-emerald-700 text-white border-emerald-500 scale-105'
                : 'border-brand-gold/40 bg-brand-gold/10 hover:bg-brand-gold hover:text-brand-burgundy-deep text-brand-gold shadow-sm'
            }`}
            aria-label="Add to Bag"
          >
            {isAddedRecently ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
