import React from 'react';
import { Award, Feather, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export const WhyAaraSection: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Authentic Craftsmanship',
      description: 'Preserving century-old handloom techniques passed down through generations of master weaver families.',
      badge: 'Certified Heritage',
    },
    {
      icon: Feather,
      title: 'Premium Natural Fabrics',
      description: 'Hand-sorted Mulberry and wild Tussar silks selected for organic tensile luster, softness, and skin breathability.',
      badge: '100% Pure Silk',
    },
    {
      icon: Sparkles,
      title: 'Handwoven Excellence',
      description: 'True Korvai interlocking borders, Kadwa brocade inlays, and electroplated pure gold zari with zero compromise.',
      badge: 'Pure Gold Zari',
    },
    {
      icon: HeartHandshake,
      title: 'Made for Celebrations',
      description: 'Heirlooms curated for royal weddings, muhurthams, and unforgettable moments meant to be treasured forever.',
      badge: 'Lifetime Heirloom',
    },
  ];

  return (
    <section className="py-24 bg-[#180407] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-gold text-xs font-serif uppercase tracking-widest border border-brand-gold/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The AARA Promise</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-gradient">
            Why Choose AARA SAREES
          </h2>
          <p className="text-sm sm:text-base text-brand-cream/70 leading-relaxed font-sans">
            Every drape represents the pinnacle of Indian textile luxury, ethical artisan patronage, and generational devotion.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="group p-6 rounded-2xl glass-gold/60 hover:glass-gold border border-brand-gold/25 hover:border-brand-gold/70 transition-all duration-500 flex flex-col justify-between hover:-translate-y-2 hover:shadow-gold-glow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-maroon border border-brand-gold/40 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-serif tracking-wider text-brand-gold-light/60 px-2 py-0.5 rounded-md border border-brand-gold/20">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-brand-cream group-hover:text-brand-gold transition-colors mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-brand-cream/70 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-gold/15 flex items-center justify-between text-[11px] text-brand-gold opacity-80 group-hover:opacity-100">
                  <span>Authenticity Guaranteed</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
