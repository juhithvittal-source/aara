import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, Globe } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { CURRENCIES } from '../../data/sarees';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  onOpenStudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenMobileMenu,
  onOpenStudio,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const { totalItems, setIsCartOpen, currency, setCurrencyCode } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Collections', href: '#collections' },
    { name: 'New Arrivals', href: '#new-arrivals' },
    { name: '3D Drape Studio', href: '#3d-studio', isSpecial: true },
    { name: 'Craftsmanship', href: '#craftsmanship' },
    { name: 'Heritage', href: '#about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-brand-burgundy-deep/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={onOpenMobileMenu}
                className="p-2 rounded-full text-brand-gold-light hover:text-brand-gold hover:bg-brand-burgundy/40 transition-colors"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo & Tagline */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-brand-gold/60 bg-gradient-to-br from-brand-maroon to-brand-burgundy flex items-center justify-center shadow-gold-glow transition-transform duration-300 group-hover:scale-105">
                <span className="font-serif font-bold text-brand-gold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-gold-gradient">
                  AARA
                </span>
                <span className="text-[9px] tracking-[0.25em] text-brand-gold-light/70 uppercase font-sans -mt-0.5">
                  Haute Sarees
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 relative py-1 ${
                    link.isSpecial
                      ? 'text-brand-gold font-semibold flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-gold/40 bg-brand-gold/10 hover:bg-brand-gold/20'
                      : 'text-brand-cream/80 hover:text-brand-gold hover:tracking-wider'
                  }`}
                >
                  {link.isSpecial && <Sparkles className="w-3.5 h-3.5 animate-pulse" />}
                  {link.name}
                  {!link.isSpecial && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                  )}
                </a>
              ))}
            </nav>

            {/* Right Action Icons & Currency */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Currency Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                  className="flex items-center gap-1.5 text-xs text-brand-gold-light/80 hover:text-brand-gold px-2.5 py-1.5 rounded-full border border-brand-gold/20 hover:border-brand-gold/40 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="font-medium">{currency.code}</span>
                </button>

                {isCurrencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 glass-gold rounded-xl py-1.5 shadow-2xl z-50 animate-fadeIn">
                    {Object.values(CURRENCIES).map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrencyCode(curr.code);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between hover:bg-brand-gold/20 transition-colors ${
                          currency.code === curr.code
                            ? 'text-brand-gold font-bold bg-brand-gold/10'
                            : 'text-brand-cream/90'
                        }`}
                      >
                        <span>{curr.label}</span>
                        <span className="text-brand-gold-light/60">{curr.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Live Search Trigger */}
              <button
                onClick={onOpenSearch}
                className="p-2 rounded-full text-brand-cream/80 hover:text-brand-gold hover:bg-brand-burgundy/30 transition-colors"
                aria-label="Search Sarees"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Drawer Trigger */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 rounded-full text-brand-cream/80 hover:text-brand-gold hover:bg-brand-burgundy/30 transition-colors relative"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-brand-gold text-brand-burgundy-deep text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag / Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full border border-brand-gold/40 bg-gradient-to-r from-brand-maroon/80 to-brand-burgundy/80 text-brand-gold hover:border-brand-gold hover:shadow-gold-glow transition-all duration-300 group"
                aria-label="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-brand-gold text-brand-burgundy-deep text-[10px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-brand-gold-light hidden sm:inline">
                  Bag
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
