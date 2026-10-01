import React, { useState } from 'react';
import { CUSTOMER_REVIEWS } from '../../data/sarees';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CUSTOMER_REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === CUSTOMER_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = CUSTOMER_REVIEWS[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#140305] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-gold text-xs font-serif uppercase tracking-widest border border-brand-gold/40">
            <Star className="w-3.5 h-3.5 fill-brand-gold" />
            <span>Patron Testimonials</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-gradient">
            Stories from Our Brides & Connoisseurs
          </h2>
          <p className="text-sm sm:text-base text-brand-cream/70 leading-relaxed font-sans">
            Hear from women across the world who chose AARA for their most sacred and memorable celebrations.
          </p>
        </div>

        {/* Testimonial Card Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 sm:p-12 rounded-3xl glass-gold border border-brand-gold/40 shadow-2xl space-y-6">
            <Quote className="w-12 h-12 text-brand-gold/30 absolute top-6 right-8 pointer-events-none" />

            {/* Stars */}
            <div className="flex text-brand-gold gap-1">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
              ))}
            </div>

            {/* Quote Review */}
            <p className="font-serif italic text-base sm:text-xl text-brand-cream/95 leading-relaxed">
              &ldquo;{current.review}&rdquo;
            </p>

            {/* Author & Saree Details */}
            <div className="pt-6 border-t border-brand-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-lg font-bold text-brand-gold-light">
                    {current.author}
                  </h4>
                  {current.verified && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Patron
                    </span>
                  )}
                </div>
                <p className="text-xs text-brand-cream/60">{current.location}</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] text-brand-gold uppercase tracking-wider block">
                  Saree Chosen
                </span>
                <span className="text-xs font-serif font-bold text-brand-gold-light">
                  {current.sareePurchased}
                </span>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full glass-gold text-brand-cream hover:text-brand-gold border border-brand-gold/30 hover:border-brand-gold transition-all"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {CUSTOMER_REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === idx
                      ? 'w-8 bg-brand-gold shadow-gold-glow'
                      : 'bg-brand-gold/30 hover:bg-brand-gold/60'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full glass-gold text-brand-cream hover:text-brand-gold border border-brand-gold/30 hover:border-brand-gold transition-all"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
