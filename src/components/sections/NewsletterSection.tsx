import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#160306] to-[#120305] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl glass-gold border border-brand-gold/40 p-8 sm:p-12 text-center overflow-hidden shadow-2xl">
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-burgundy/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-gold text-xs font-serif uppercase tracking-widest border border-brand-gold/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Royal Dispatch</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient">
              Stay Woven In
            </h2>

            <p className="text-xs sm:text-sm text-brand-cream/75 leading-relaxed font-sans">
              Get updates on new collections, exclusive launches, private bridal previews, and stories from our master weavers in Kanchipuram and Varanasi.
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center justify-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Welcome to the AARA Inner Circle. Use code <strong>AARA10</strong> for 10% off your first heirloom.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-brand-gold absolute left-4 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email for royal updates..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-brand-burgundy/60 border border-brand-gold/30 rounded-xl text-xs sm:text-sm text-brand-cream placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-burgundy-deep font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:opacity-95 transition-all shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[10px] text-brand-cream/50 pt-1">
              We respect your privacy. Unsubscribe anytime with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
