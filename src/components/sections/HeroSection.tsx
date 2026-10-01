import React from 'react';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Award } from 'lucide-react';
import { HeroSareeCloth } from '../3d/HeroSareeCloth';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenStudio,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#160306] via-[#24060B] to-[#140305]"
    >
      {/* 3D Flowing Silk Saree Canvas Background */}
      <HeroSareeCloth />

      {/* Ambient Lighting Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Royal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold border border-brand-gold/40 shadow-gold-glow animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span className="text-xs font-serif tracking-[0.2em] uppercase text-brand-gold-light">
                Haute Handloom Heritage
              </span>
            </div>

            {/* Main Brand Title */}
            <div className="space-y-2">
              <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gold-gradient drop-shadow-md">
                AARA SAREES
              </h1>
              <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-brand-champagne/90 tracking-wide">
                “Tradition, Woven for Tomorrow.”
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-brand-cream/80 max-w-xl leading-relaxed font-sans">
              Discover timeless Indian craftsmanship through sarees designed for celebrations, elegance, and every unforgettable moment. Each drape is handcrafted by master artisans using pure mulberry silk and electroplated gold zari.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold via-brand-champagne to-brand-gold-dark text-brand-burgundy-deep font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-gold-glow hover:scale-105 transition-all duration-300 group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenStudio}
                className="px-7 py-4 rounded-xl glass-gold text-brand-gold-light hover:text-brand-gold border border-brand-gold/50 font-semibold text-sm sm:text-base flex items-center gap-2 hover:border-brand-gold transition-all duration-300 shadow-sm"
              >
                <Compass className="w-4 h-4 text-brand-gold animate-spin-slow" />
                <span>3D Drape Studio</span>
              </button>
            </div>

            {/* Trust Micro Badges */}
            <div className="pt-6 border-t border-brand-gold/20 flex flex-wrap items-center gap-6 text-xs text-brand-cream/70">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-gold" />
                <span>100% Silk Mark Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Authentic 24K Gold Zari</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interaction Callout Badge */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-end justify-center pointer-events-none">
            <div className="p-4 rounded-2xl glass-gold/80 border border-brand-gold/30 shadow-2xl backdrop-blur-md max-w-xs space-y-2 pointer-events-auto hover:border-brand-gold/60 transition-colors">
              <div className="flex items-center justify-between text-xs text-brand-gold">
                <span className="font-serif uppercase tracking-wider font-semibold">
                  Live 3D Silk Simulation
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs text-brand-cream/75 leading-relaxed">
                Move your cursor to interact with the waving silk fabric. Experience realistic anisotropic luster, zari border reflections, and fluid dynamics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <a
        href="#collections"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] text-brand-gold-light/60 hover:text-brand-gold transition-colors z-20"
      >
        <span>Scroll to Explore</span>
        <div className="w-4 h-7 rounded-full border border-brand-gold/40 flex justify-center p-1">
          <div className="w-1 h-2 bg-brand-gold rounded-full animate-bounce" />
        </div>
      </a>
    </section>
  );
};
