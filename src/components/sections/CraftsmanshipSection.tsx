import React, { useState } from 'react';
import { CRAFTSMANSHIP_STAGES } from '../../data/sarees';
import { Sparkles, CheckCircle2, Clock, ChevronRight } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="craftsmanship" className="py-24 bg-[#140305] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-gold text-xs font-serif uppercase tracking-widest border border-brand-gold/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generational Mastery</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-gradient">
            Handcrafted by Tradition
          </h2>
          <p className="text-sm sm:text-base text-brand-cream/70 leading-relaxed font-sans">
            Follow the journey of pure silk from sacred silkworm filatures to intricate handlooms and regal heirlooms.
          </p>
        </div>

        {/* 3 Steps Navigation Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {CRAFTSMANSHIP_STAGES.map((stage, idx) => (
            <button
              key={stage.step}
              onClick={() => setActiveStep(idx)}
              className={`p-5 rounded-2xl text-left transition-all duration-500 border relative overflow-hidden ${
                activeStep === idx
                  ? 'border-brand-gold bg-brand-maroon/70 shadow-gold-glow scale-102'
                  : 'border-brand-gold/20 glass-gold hover:border-brand-gold/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-cinzel text-2xl font-bold text-brand-gold">
                  {stage.step}
                </span>
                <span className="text-[11px] text-brand-gold-light/70 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-brand-gold" /> {stage.timeframe}
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-brand-cream mb-1">
                {stage.title}
              </h4>
              <p className="text-xs text-brand-cream/60 line-clamp-1">
                {stage.subtitle}
              </p>

              {activeStep === idx && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold to-brand-champagne" />
              )}
            </button>
          ))}
        </div>

        {/* Active Stage Detailed Spotlight */}
        <div className="rounded-3xl glass-gold border border-brand-gold/30 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Stage Image */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-brand-gold/40 shadow-lg">
            <img
              src={CRAFTSMANSHIP_STAGES[activeStep].image}
              alt={CRAFTSMANSHIP_STAGES[activeStep].title}
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-gold text-brand-gold text-xs font-serif font-bold">
              Stage {CRAFTSMANSHIP_STAGES[activeStep].step}
            </div>
          </div>

          {/* Right: Stage Content & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs text-brand-gold font-serif uppercase tracking-widest block mb-1">
                {CRAFTSMANSHIP_STAGES[activeStep].subtitle}
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-brand-gold-light mb-3">
                {CRAFTSMANSHIP_STAGES[activeStep].title}
              </h3>
              <p className="text-sm text-brand-cream/80 leading-relaxed">
                {CRAFTSMANSHIP_STAGES[activeStep].description}
              </p>
            </div>

            {/* Highlights bullet grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {CRAFTSMANSHIP_STAGES[activeStep].highlights.map((highlight, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-brand-cream/90">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Step navigation CTA */}
            <div className="pt-4 flex items-center justify-between border-t border-brand-gold/15">
              <span className="text-xs text-brand-gold-light/60">
                Phase {activeStep + 1} of {CRAFTSMANSHIP_STAGES.length}
              </span>

              <button
                onClick={() => setActiveStep((activeStep + 1) % CRAFTSMANSHIP_STAGES.length)}
                className="inline-flex items-center gap-1.5 text-xs text-brand-gold font-bold hover:text-brand-champagne transition-colors"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
