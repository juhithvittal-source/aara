import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Sparkles, Check, ShieldCheck, Clock, Award, Scissors } from 'lucide-react';
import { Saree, CartItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductQuickViewModalProps {
  saree: Saree | null;
  onClose: () => void;
  onOpenStudioWithSaree?: (saree: Saree) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  saree,
  onClose,
  onOpenStudioWithSaree,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedBlouse, setSelectedBlouse] = useState<CartItem['selectedBlouse']>('Unstitched (Included)');
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart, formatPrice } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!saree) return null;

  const images = [saree.image, ...(saree.galleryImages || [])];
  const isFavorite = isInWishlist(saree.id);

  const handleAddToCart = () => {
    addToCart(saree, quantity, selectedBlouse);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#1C0508] border border-brand-gold/40 rounded-2xl shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full glass-gold text-brand-cream hover:text-brand-gold hover:scale-110 transition-transform"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images & Gallery */}
        <div className="w-full md:w-1/2 p-5 bg-brand-maroon/20 flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-gold/20">
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-brand-gold/30">
            <img
              src={images[selectedImageIndex] || saree.image}
              alt={saree.name}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* 3D Studio Shortcut Overlay */}
            {onOpenStudioWithSaree && (
              <button
                onClick={() => {
                  onClose();
                  onOpenStudioWithSaree(saree);
                }}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-brand-burgundy/90 border border-brand-gold/60 text-brand-gold text-xs font-semibold flex items-center gap-1.5 shadow-gold-glow hover:bg-brand-gold hover:text-brand-burgundy-deep transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>View Drape in 3D</span>
              </button>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-brand-gold scale-105 shadow-gold-glow'
                      : 'border-brand-gold/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Options */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-5 flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-brand-gold">
              <span className="uppercase tracking-widest font-serif">{saree.category}</span>
              <div className="flex items-center gap-1">
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <span className="font-bold ml-1 text-brand-cream">{saree.rating.toFixed(1)}</span>
                <span className="text-brand-cream/50 text-[11px]">({saree.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Saree Title */}
            <h2 className="font-serif text-2xl font-bold text-brand-gold-light mt-1 mb-2">
              {saree.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif text-2xl font-bold text-brand-gold">
                {formatPrice(saree.price)}
              </span>
              {saree.originalPrice && (
                <span className="text-sm text-brand-cream/40 line-through">
                  {formatPrice(saree.originalPrice)}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-500/30">
                In Stock & Handloom Certified
              </span>
            </div>

            {/* Description & Story */}
            <p className="text-xs text-brand-cream/80 leading-relaxed mb-4">
              {saree.story || saree.description}
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px] p-3 rounded-xl glass-gold/50 mb-5">
              <div>
                <span className="text-brand-gold-light/60">Origin:</span>{' '}
                <span className="text-brand-cream font-medium">{saree.weaveOrigin}</span>
              </div>
              <div>
                <span className="text-brand-gold-light/60">Zari:</span>{' '}
                <span className="text-brand-cream font-medium">{saree.zariType}</span>
              </div>
              <div>
                <span className="text-brand-gold-light/60">Length:</span>{' '}
                <span className="text-brand-cream font-medium">{saree.length}</span>
              </div>
              <div>
                <span className="text-brand-gold-light/60">Weave Time:</span>{' '}
                <span className="text-brand-cream font-medium">{saree.specifications.weaveTime}</span>
              </div>
            </div>

            {/* Blouse Stitching Options */}
            <div className="space-y-2 mb-5">
              <label className="text-xs font-serif font-semibold text-brand-gold flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                <span>Blouse Customization</span>
              </label>
              <div className="space-y-1.5">
                {[
                  'Unstitched (Included)',
                  'Custom Stitched (+$35 / ₹2,500)',
                  'Heavy Zardozi Designer (+$60 / ₹4,500)',
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedBlouse(option as CartItem['selectedBlouse'])}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between border ${
                      selectedBlouse === option
                        ? 'border-brand-gold bg-brand-gold/15 text-brand-gold-light font-semibold shadow-sm'
                        : 'border-brand-gold/20 text-brand-cream/70 hover:border-brand-gold/40'
                    }`}
                  >
                    <span>{option}</span>
                    {selectedBlouse === option && <Check className="w-4 h-4 text-brand-gold" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-medium text-brand-cream/80">Quantity:</span>
              <div className="flex items-center gap-3 glass-gold px-3 py-1.5 rounded-xl border border-brand-gold/30">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-brand-gold hover:text-white font-bold text-sm px-1.5"
                >
                  -
                </button>
                <span className="text-xs font-bold text-brand-cream w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-brand-gold hover:text-white font-bold text-sm px-1.5"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-gold-glow ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-burgundy-deep hover:opacity-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(saree)}
                className="p-3.5 rounded-xl glass-gold text-brand-cream hover:text-brand-gold border border-brand-gold/40 hover:scale-105 transition-transform"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? 'fill-brand-gold text-brand-gold' : ''
                  }`}
                />
              </button>
            </div>

            {/* Trust Seals footer */}
            <div className="flex items-center justify-around text-[10px] text-brand-gold-light/70 pt-2 border-t border-brand-gold/15">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-brand-gold" /> Silk Mark
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> Certified Pure Zari
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-gold" /> 14-Day Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
