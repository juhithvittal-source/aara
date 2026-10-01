import React, { useRef } from 'react';
import { SAREES_DATA } from '../../data/sarees';
import { Saree } from '../../types';
import { ProductCard } from '../ecommerce/ProductCard';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewArrivalsSectionProps {
  onQuickView: (saree: Saree) => void;
  onOpenStudioWithSaree?: (saree: Saree) => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  onQuickView,
  onOpenStudioWithSaree,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const newArrivals = SAREES_DATA.filter((s) => s.isNewArrival || s.isBestseller).slice(0, 7);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="new-arrivals" className="py-24 bg-[#140305] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-gold text-xs font-serif uppercase tracking-widest border border-brand-gold/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Off The Looms</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-gradient">
              New Arrivals & Heirlooms
            </h2>
            <p className="text-sm text-brand-cream/70 leading-relaxed font-sans max-w-xl">
              Freshly completed weaves from our master looms in Kanchipuram and Varanasi, available in limited quantities.
            </p>
          </div>

          {/* Navigation Scroll Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-xl glass-gold text-brand-cream/80 hover:text-brand-gold border border-brand-gold/30 hover:border-brand-gold transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-xl glass-gold text-brand-cream/80 hover:text-brand-gold border border-brand-gold/30 hover:border-brand-gold transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory"
        >
          {newArrivals.map((saree) => (
            <div
              key={saree.id}
              className="min-w-[280px] sm:min-w-[320px] max-w-[340px] shrink-0 snap-start"
            >
              <ProductCard
                saree={saree}
                onQuickView={onQuickView}
                onOpenStudioWithSaree={onOpenStudioWithSaree}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
