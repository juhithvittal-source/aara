import React from 'react';
import { ShieldCheck, Award, Truck, RotateCcw, Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#120305] border-t border-brand-gold/30 relative overflow-hidden pt-16 pb-8">
      {/* Subtle top gold zari border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80" />

      {/* Trust Badges Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-brand-gold/15">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center p-4 rounded-xl glass-gold/40">
            <Award className="w-8 h-8 text-brand-gold mb-2" />
            <h4 className="text-sm font-serif font-bold text-brand-gold-light">100% Silk Mark</h4>
            <p className="text-xs text-brand-cream/60 mt-1">Government certified pure natural mulberry silk</p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-xl glass-gold/40">
            <ShieldCheck className="w-8 h-8 text-brand-gold mb-2" />
            <h4 className="text-sm font-serif font-bold text-brand-gold-light">Pure Gold Zari</h4>
            <p className="text-xs text-brand-cream/60 mt-1">Authentic electroplated silver & gold filaments</p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-xl glass-gold/40">
            <Truck className="w-8 h-8 text-brand-gold mb-2" />
            <h4 className="text-sm font-serif font-bold text-brand-gold-light">Worldwide Delivery</h4>
            <p className="text-xs text-brand-cream/60 mt-1">Insured express shipping across 120+ countries</p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-xl glass-gold/40">
            <RotateCcw className="w-8 h-8 text-brand-gold mb-2" />
            <h4 className="text-sm font-serif font-bold text-brand-gold-light">14-Day Easy Returns</h4>
            <p className="text-xs text-brand-cream/60 mt-1">Complimentary exchanges & bridal consultations</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Story Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-brand-gold bg-brand-maroon flex items-center justify-center shadow-gold-glow">
                <span className="font-serif font-bold text-brand-gold text-xl">A</span>
              </div>
              <span className="font-cinzel text-2xl font-bold text-gold-gradient">
                AARA SAREES
              </span>
            </div>
            <p className="text-xs text-brand-gold italic font-serif">
              “Tradition, Woven for Tomorrow.”
            </p>
            <p className="text-xs text-brand-cream/70 leading-relaxed max-w-sm">
              Crafting heirloom drapes through generational master weavers. Each saree is a timeless piece of Indian textile artistry, designed to be passed down through generations.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-burgundy-deep transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-burgundy-deep transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-brand-gold/40 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-burgundy-deep transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-serif font-semibold text-brand-gold text-sm tracking-wider uppercase mb-4">
              Collections
            </h5>
            <ul className="space-y-2 text-xs text-brand-cream/80">
              <li><a href="#collections" className="hover:text-brand-gold transition-colors">Kanjivaram Pure Silk</a></li>
              <li><a href="#collections" className="hover:text-brand-gold transition-colors">Varanasi Banarasi Brocade</a></li>
              <li><a href="#collections" className="hover:text-brand-gold transition-colors">Pastel Silk Organza</a></li>
              <li><a href="#collections" className="hover:text-brand-gold transition-colors">Royal Bridal Heirlooms</a></li>
              <li><a href="#collections" className="hover:text-brand-gold transition-colors">Chanderi & Kota Weaves</a></li>
              <li><a href="#collections" className="hover:text-brand-gold transition-colors">Contemporary Drape Couture</a></li>
            </ul>
          </div>

          {/* Craft Centers */}
          <div>
            <h5 className="font-serif font-semibold text-brand-gold text-sm tracking-wider uppercase mb-4">
              Weaving Looms
            </h5>
            <ul className="space-y-2 text-xs text-brand-cream/80">
              <li><span className="text-brand-gold-light/90">Kanchipuram</span>, Tamil Nadu</li>
              <li><span className="text-brand-gold-light/90">Varanasi</span>, Uttar Pradesh</li>
              <li><span className="text-brand-gold-light/90">Chanderi</span>, Madhya Pradesh</li>
              <li><span className="text-brand-gold-light/90">Yeola</span>, Maharashtra</li>
              <li><span className="text-brand-gold-light/90">Bhagalpur</span>, Bihar</li>
              <li><span className="text-brand-gold-light/90">Kota</span>, Rajasthan</li>
            </ul>
          </div>

          {/* Concierge & Support */}
          <div>
            <h5 className="font-serif font-semibold text-brand-gold text-sm tracking-wider uppercase mb-4">
              Bridal Concierge
            </h5>
            <div className="space-y-2.5 text-xs text-brand-cream/80">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+91 (044) 2833 9000</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>concierge@aarasarees.com</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>The AARA Flagship Palace, Nungambakkam High Rd, Chennai - 600034</span>
              </p>
              <p className="text-[11px] text-brand-gold-light/70 pt-2">
                Mon - Sun: 10:00 AM - 8:30 PM IST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Copyright & Policies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-brand-gold/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-brand-cream/60 gap-4">
        <p>© 2026 AARA SAREES PRIVATE LIMITED. All Rights Reserved.</p>
        
        <div className="flex items-center space-x-6">
          <a href="#footer" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
          <a href="#footer" className="hover:text-brand-gold transition-colors">Terms of Service</a>
          <a href="#footer" className="hover:text-brand-gold transition-colors">Shipping & Customs</a>
          <a href="#footer" className="hover:text-brand-gold transition-colors">Authenticity Certificate</a>
        </div>
      </div>
    </footer>
  );
};
