import React, { useState, useMemo } from 'react';
import { SAREES_DATA } from '../../data/sarees';
import { Saree, SareeCategory } from '../../types';
import { ProductCard } from '../ecommerce/ProductCard';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface CollectionSectionProps {
  onQuickView: (saree: Saree) => void;
  onOpenStudioWithSaree?: (saree: Saree) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onQuickView,
  onOpenStudioWithSaree,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SareeCategory>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories: SareeCategory[] = [
    'All',
    'Kanjivaram',
    'Banarasi',
    'Silk Sarees',
    'Organza',
    'Bridal Collection',
    'Designer Sarees',
    'Cotton',
  ];

  const filteredSarees = useMemo(() => {
    let list = [...SAREES_DATA];

    if (selectedCategory !== 'All') {
      list = list.filter((saree) => saree.category === selectedCategory);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, sortBy]);

  return (
    <section id="collections" className="py-20 bg-[#160306] relative">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-maroon/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-burgundy/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-gold text-brand-gold text-xs font-serif uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Handlooms</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-gradient">
            The Saree Collection
          </h2>
          <p className="text-sm sm:text-base text-brand-cream/70 leading-relaxed font-sans">
            Explore authentic handwoven silks from Kanchipuram, Varanasi, Chanderi, and Yeola. Each saree is a certified heritage creation adorned with pure zari.
          </p>
        </div>

        {/* Filter Tabs & Sorting Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-brand-gold/15">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-burgundy-deep font-bold shadow-gold-glow scale-105'
                    : 'glass-gold text-brand-cream/75 hover:text-brand-gold hover:border-brand-gold/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-brand-burgundy/60 border border-brand-gold/30 text-xs text-brand-cream rounded-xl px-3 py-2 focus:outline-none focus:border-brand-gold"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredSarees.map((saree) => (
            <ProductCard
              key={saree.id}
              saree={saree}
              onQuickView={onQuickView}
              onOpenStudioWithSaree={onOpenStudioWithSaree}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-2xl glass-gold border border-brand-gold/40 text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-gold-light mb-2">
            Looking for a Bespoke Custom Bridal Weave?
          </h3>
          <p className="text-xs sm:text-sm text-brand-cream/70 max-w-xl mx-auto mb-6">
            Consult directly with our master weaving artisans in Kanchipuram or Varanasi to weave your family crest, custom colorway, or heirloom motif.
          </p>
          <a
            href="#footer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-gold text-brand-gold text-xs sm:text-sm font-bold hover:bg-brand-gold hover:text-brand-burgundy-deep transition-all"
          >
            <span>Book Bridal Consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
};
