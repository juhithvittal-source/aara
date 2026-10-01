import React from 'react';
import { INSTAGRAM_POSTS } from '../../data/sarees';
import { Instagram, Heart } from 'lucide-react';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#160306] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-serif uppercase tracking-widest">
            <Instagram className="w-4 h-4" />
            <span>Follow the AARA Story</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-gradient">
            @aarasarees on Instagram
          </h2>
          <p className="text-xs sm:text-sm text-brand-cream/60">
            Tag #AARABride or #AARAHeirloom to be featured on our royal fashion gallery.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-300 hover:shadow-gold-glow"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                <Instagram className="w-6 h-6 text-brand-gold mb-1" />
                <span className="text-[10px] text-brand-cream/90 font-medium line-clamp-2">
                  {post.caption}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-brand-gold mt-1">
                  <Heart className="w-3 h-3 fill-brand-gold" /> {post.likes}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
