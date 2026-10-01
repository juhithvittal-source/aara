import React from 'react';
import { FabricCanvasBackground } from '../3d/FabricCanvasBackground';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const FeaturedSection: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  return (
    <section className="relative py-28 bg-[#1A0407] overflow-hidden">
      {/* 3D Silk Ribbon Waves Background */}
      <FabricCanvasBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-gold text-xs font-serif uppercase tracking-widest border border-brand-gold/40 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cinematic Masterpiece</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-gold-gradient leading-tight">
            The Art of Indian Weaving
          </h2>

          <p className="font-serif italic text-lg sm:text-2xl text-brand-champagne/90">
            “Every thread carries generations of craftsmanship. Every drape tells a story.”
          </p>

          <p className="text-sm sm:text-base text-brand-cream/75 leading-relaxed font-sans max-w-2xl mx-auto">
            From the sacred looms of Varanasi to the temple corridors of Kanchipuram, our artisans dedicate hundreds of hours to transform raw cocoon silk and pure metallic zari into wearable poetry.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold via-brand-champagne to-brand-gold-dark text-brand-burgundy-deep font-bold text-sm sm:text-base flex items-center gap-2 shadow-gold-glow hover:scale-105 transition-all"
            >
              <span>Explore Masterpiece Drapes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
