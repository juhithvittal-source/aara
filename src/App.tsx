import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Saree } from './types';

// Layout & 3D
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileMenu } from './components/layout/MobileMenu';
import { SilkParticleScene } from './components/3d/SilkParticleScene';

// Sections
import { HeroSection } from './components/sections/HeroSection';
import { CollectionSection } from './components/sections/CollectionSection';
import { ProductShowcase3D } from './components/sections/ProductShowcase3D';
import { FeaturedSection } from './components/sections/FeaturedSection';
import { CraftsmanshipSection } from './components/sections/CraftsmanshipSection';
import { WhyAaraSection } from './components/sections/WhyAaraSection';
import { NewArrivalsSection } from './components/sections/NewArrivalsSection';
import { AboutSection } from './components/sections/AboutSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { InstagramSection } from './components/sections/InstagramSection';
import { NewsletterSection } from './components/sections/NewsletterSection';

// E-Commerce Drawers & Modals
import { ProductQuickViewModal } from './components/ecommerce/ProductQuickViewModal';
import { CartDrawer } from './components/ecommerce/CartDrawer';
import { WishlistDrawer } from './components/ecommerce/WishlistDrawer';
import { SearchModal } from './components/ecommerce/SearchModal';
import { CheckoutModal } from './components/ecommerce/CheckoutModal';

const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewSaree, setQuickViewSaree] = useState<Saree | null>(null);

  const handleExploreClick = () => {
    const el = document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenStudio = () => {
    const el = document.getElementById('3d-studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenStudioWithSaree = (_saree: Saree) => {
    handleOpenStudio();
  };

  return (
    <div className="min-h-screen bg-[#140305] text-brand-ivory relative selection:bg-brand-gold selection:text-brand-burgundy-deep">
      {/* 3D Global Ambient Gold Silk Particles */}
      <SilkParticleScene />

      {/* Luxury Sticky Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenStudio={handleOpenStudio}
      />

      {/* Main Page Content */}
      <main>
        <HeroSection
          onExploreClick={handleExploreClick}
          onOpenStudio={handleOpenStudio}
        />
        <CollectionSection
          onQuickView={(saree) => setQuickViewSaree(saree)}
          onOpenStudioWithSaree={handleOpenStudioWithSaree}
        />
        <ProductShowcase3D />
        <FeaturedSection onExploreClick={handleExploreClick} />
        <CraftsmanshipSection />
        <WhyAaraSection />
        <NewArrivalsSection
          onQuickView={(saree) => setQuickViewSaree(saree)}
          onOpenStudioWithSaree={handleOpenStudioWithSaree}
        />
        <AboutSection />
        <TestimonialsSection />
        <InstagramSection />
        <NewsletterSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Responsive Slide-in Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* E-Commerce Interactive Drawers & Modals */}
      <ProductQuickViewModal
        saree={quickViewSaree}
        onClose={() => setQuickViewSaree(null)}
        onOpenStudioWithSaree={handleOpenStudioWithSaree}
      />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSaree={(saree) => setQuickViewSaree(saree)}
      />
      <CheckoutModal />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </CartProvider>
  );
}
