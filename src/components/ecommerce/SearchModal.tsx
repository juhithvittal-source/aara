import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { SAREES_DATA } from '../../data/sarees';
import { Saree } from '../../types';
import { useCart } from '../../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSaree: (saree: Saree) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSaree,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { formatPrice } = useCart();

  const searchSuggestions = [
    'Kanjivaram Silk',
    'Banarasi Brocade',
    'Bridal Red',
    'Organza Pastel',
    'Pure Gold Zari',
    'Chanderi Tissue',
    'Cocktail Drape',
  ];

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return SAREES_DATA.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.category.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term) ||
        s.material.toLowerCase().includes(term) ||
        s.color.toLowerCase().includes(term) ||
        s.weaveOrigin.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 pb-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#1D0509] border border-brand-gold/40 rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-brand-gold/20 flex items-center gap-3 bg-brand-maroon/40">
          <Search className="w-5 h-5 text-brand-gold shrink-0" />
          <input
            type="text"
            placeholder="Search by weave, fabric, color, or region (e.g., Kanjivaram, Gold Zari, Organza)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-brand-cream placeholder:text-brand-cream/40 text-sm focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-brand-cream/60 hover:text-brand-gold"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-brand-cream/70 hover:text-brand-gold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-3 border-b border-brand-gold/15 bg-brand-burgundy-deep/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-brand-gold-light/60 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-gold" /> Popular:
          </span>
          {searchSuggestions.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="text-xs px-2.5 py-1 rounded-full glass-gold text-brand-cream/80 hover:text-brand-gold hover:border-brand-gold shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {searchTerm && searchResults.length === 0 ? (
            <div className="text-center py-10 text-brand-cream/60">
              <p className="font-serif text-base text-brand-gold-light">No sarees found for &lsquo;{searchTerm}&rsquo;</p>
              <p className="text-xs mt-1">Try exploring &ldquo;Kanjivaram&rdquo;, &ldquo;Banarasi&rdquo;, or &ldquo;Silk&rdquo;</p>
            </div>
          ) : !searchTerm ? (
            <div className="py-6 text-center text-brand-cream/50 text-xs">
              Type to explore the AARA Haute Saree collection
            </div>
          ) : (
            searchResults.map((saree) => (
              <div
                key={saree.id}
                onClick={() => {
                  onSelectSaree(saree);
                  onClose();
                }}
                className="flex items-center gap-4 p-3 rounded-xl glass-gold/40 hover:glass-gold border border-brand-gold/20 hover:border-brand-gold/60 cursor-pointer transition-all group"
              >
                <div className="w-14 h-16 rounded-lg overflow-hidden shrink-0 border border-brand-gold/30">
                  <img
                    src={saree.image}
                    alt={saree.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-brand-gold uppercase tracking-wider font-serif">
                    {saree.category} • {saree.weaveOrigin}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-brand-cream group-hover:text-brand-gold transition-colors truncate">
                    {saree.name}
                  </h4>
                  <p className="text-xs text-brand-cream/60 truncate">{saree.description}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-serif text-sm font-bold text-brand-gold block">
                    {formatPrice(saree.price)}
                  </span>
                  <span className="text-[10px] text-emerald-400">In Stock</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
