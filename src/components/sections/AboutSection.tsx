import React from 'react';
import { Sparkles, Users, Award, Landmark, Heart } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#180407] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Story */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-brand-gold/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
                alt="AARA Master Craftsman weaving Silk Saree"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-burgundy-deep/90 via-transparent to-transparent opacity-60" />

              {/* Inset Quote Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-gold/90 border border-brand-gold/50 shadow-xl backdrop-blur-md">
                <p className="font-serif italic text-xs sm:text-sm text-brand-gold-light">
                  “We do not merely weave silk; we preserve the unbroken cultural lineage of Indian textile royalty.”
                </p>
                <span className="text-[10px] text-brand-cream/60 uppercase tracking-widest block mt-2 font-sans font-semibold">
                  — AARA Master Weaver Collective
                </span>
              </div>
            </div>

            {/* Small Floating Seal */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full glass-gold border border-brand-gold/60 flex flex-col items-center justify-center text-center p-2 shadow-gold-glow animate-float">
              <Award className="w-6 h-6 text-brand-gold mb-0.5" />
              <span className="text-[8px] font-serif uppercase tracking-widest text-brand-gold-light font-bold">
                Royal Heritage
              </span>
            </div>
          </div>

          {/* Right Column: Brand Narrative & Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-gold text-xs font-serif uppercase tracking-widest border border-brand-gold/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Heritage Story</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-gradient leading-tight">
              Where Heritage Meets Modern Elegance
            </h2>

            <p className="text-sm sm:text-base text-brand-cream/80 leading-relaxed font-sans">
              Founded on the belief that traditional Indian textiles are unmatched works of art, <span className="text-brand-gold font-semibold">AARA SAREES</span> bridges ancestral weaving techniques with contemporary luxury sensibilities.
            </p>

            <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed font-sans">
              Every saree in our collection is born from months of dedicated handloom craftsmanship. We work directly with over 400 weaver families in Kanchipuram, Varanasi, Chanderi, and Yeola, ensuring ethical patronage, fair wages, and the preservation of rare Korvai and Kadwa weaving traditions.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-brand-gold/20">
              <div className="p-3 rounded-xl glass-gold/40 border border-brand-gold/20">
                <span className="font-cinzel text-xl sm:text-2xl font-bold text-brand-gold block">
                  400+
                </span>
                <span className="text-[11px] text-brand-cream/70">Master Artisans Supported</span>
              </div>

              <div className="p-3 rounded-xl glass-gold/40 border border-brand-gold/20">
                <span className="font-cinzel text-xl sm:text-2xl font-bold text-brand-gold block">
                  100%
                </span>
                <span className="text-[11px] text-brand-cream/70">Silk Mark Certified</span>
              </div>

              <div className="p-3 rounded-xl glass-gold/40 border border-brand-gold/20 col-span-2 sm:col-span-1">
                <span className="font-cinzel text-xl sm:text-2xl font-bold text-brand-gold block">
                  18,000+
                </span>
                <span className="text-[11px] text-brand-cream/70">Weddings & Galas Draped</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
