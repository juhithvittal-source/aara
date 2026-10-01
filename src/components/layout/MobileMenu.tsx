import React from 'react';
import { X, Sparkles, Heart, ShoppingBag, Search, Phone, Mail, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();

  if (!isOpen) return null;

  const links = [
    { name: 'Home', href: '#hero' },
    { name: 'Collections', href: '#collections' },
    { name: 'New Arrivals', href: '#new-arrivals' },
    { name: '3D Drape Studio', href: '#3d-studio', isSpecial: true },
    { name: 'Craftsmanship', href: '#craftsmanship' },
    { name: 'Brand Heritage', href: '#about' },
    { name: 'Customer Stories', href: '#testimonials' },
    { name: 'Contact Atelier', href: '#footer' },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out panel */}
      <div className="relative w-4/5 max-w-sm bg-brand-burgundy-deep border-r border-brand-gold/30 h-full p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-brand-gold/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-brand-gold bg-brand-maroon flex items-center justify-center">
                <span className="font-serif font-bold text-brand-gold text-sm">A</span>
              </div>
              <span className="font-cinzel text-lg font-bold text-gold-gradient">
                AARA SAREES
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-brand-cream/70 hover:text-brand-gold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Badges */}
          <div className="grid grid-cols-2 gap-2 my-5">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl glass-gold text-xs text-brand-gold-light hover:border-brand-gold transition-colors"
            >
              <Search className="w-4 h-4 text-brand-gold" />
              <span>Search Sarees</span>
            </button>
            <button
              onClick={() => {
                onClose();
                setIsWishlistOpen(true);
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl glass-gold text-xs text-brand-gold-light hover:border-brand-gold transition-colors"
            >
              <Heart className="w-4 h-4 text-brand-gold" />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  link.isSpecial
                    ? 'text-brand-gold bg-brand-gold/15 border border-brand-gold/30 font-semibold shadow-gold-glow'
                    : 'text-brand-cream/90 hover:text-brand-gold hover:bg-brand-burgundy/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.isSpecial && <Sparkles className="w-4 h-4 animate-spin" />}
                  <span>{link.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </a>
            ))}
          </nav>
        </div>

        {/* Footer info & Bag CTA */}
        <div className="pt-6 border-t border-brand-gold/20 space-y-4">
          <button
            onClick={() => {
              onClose();
              setIsCartOpen(true);
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-burgundy-deep font-bold text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:opacity-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>View Shopping Bag ({totalItems})</span>
          </button>

          <div className="text-[11px] text-brand-cream/60 space-y-1">
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-gold" /> Concierge: +91 44 2833 9000
            </p>
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-gold" /> contact@aarasarees.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
