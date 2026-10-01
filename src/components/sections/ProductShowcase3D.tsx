import React, { useState } from 'react';
import { SareeModelViewer } from '../3d/SareeModelViewer';
import { Sparkles, Sun, Moon, Flame, Camera, RotateCw, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SAREES_DATA } from '../../data/sarees';

export const ProductShowcase3D: React.FC = () => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [lightingPreset, setLightingPreset] = useState<'studio' | 'palace' | 'sunset' | 'noir'>('palace');
  const [autoRotate, setAutoRotate] = useState(true);
  const [fabricSheen, setFabricSheen] = useState(0.85);
  const [zariShine, setZariShine] = useState(0.92);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart, formatPrice } = useCart();

  const colorways = [
    {
      name: 'Royal Crimson Gold',
      primary: '#5a0a14',
      secondary: '#d4af37',
      label: 'Crimson & Zari',
      sareeRef: SAREES_DATA[0],
    },
    {
      name: 'Midnight Peacock Teal',
      primary: '#0a302e',
      secondary: '#d4af37',
      label: 'Peacock & Gold',
      sareeRef: SAREES_DATA[2],
    },
    {
      name: 'Varanasi Deep Maroon',
      primary: '#38050c',
      secondary: '#f3e5ab',
      label: 'Heritage Maroon',
      sareeRef: SAREES_DATA[1],
    },
    {
      name: 'Rose Gold Organza',
      primary: '#9c5454',
      secondary: '#e5b88f',
      label: 'Blush Rose',
      sareeRef: SAREES_DATA[3],
    },
    {
      name: 'Imperial Emerald & Ruby',
      primary: '#073d2a',
      secondary: '#ffd700',
      label: 'Yeola Emerald',
      sareeRef: SAREES_DATA[6],
    },
    {
      name: 'Nocturne Black Brocade',
      primary: '#120c0d',
      secondary: '#c5a059',
      label: 'Obsidian & Copper',
      sareeRef: SAREES_DATA[9],
    },
  ];

  const activeColor = colorways[selectedColorIndex];

  const handleAddCurrentToBag = () => {
    addToCart(activeColor.sareeRef, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <section id="3d-studio" className="py-24 bg-gradient-to-b from-[#140305] via-[#20050A] to-[#120305] relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-gold text-brand-gold text-xs font-serif uppercase tracking-widest border border-brand-gold/40 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Experience</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-gradient">
            The 3D Drape Studio
          </h2>
          <p className="text-sm sm:text-base text-brand-cream/70 leading-relaxed font-sans">
            Rotate, examine, and customize the drape under royal palace candlelight and studio lights. Experience the tactile weight and metallic sheen of genuine Indian silk.
          </p>
        </div>

        {/* 3D Studio Card */}
        <div className="rounded-3xl glass-gold border border-brand-gold/40 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* Left / Center: Interactive 3D Canvas */}
          <div className="lg:col-span-8 relative h-[420px] lg:h-auto bg-gradient-to-b from-[#1C0508]/80 to-[#100204]/90 flex items-center justify-center">
            <SareeModelViewer
              primaryColor={activeColor.primary}
              secondaryColor={activeColor.secondary}
              zariShine={zariShine}
              fabricSheen={fabricSheen}
              lightingPreset={lightingPreset}
              autoRotate={autoRotate}
            />

            {/* Quick Canvas Overlay Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs pointer-events-none">
              <div className="glass-gold px-3 py-1.5 rounded-full text-brand-gold-light pointer-events-auto flex items-center gap-1.5 text-[11px]">
                <RotateCw className="w-3 h-3 text-brand-gold" />
                <span>Drag to Rotate 360° • Pinch / Scroll to Zoom</span>
              </div>

              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-3 py-1.5 rounded-full pointer-events-auto text-[11px] font-semibold transition-all ${
                  autoRotate
                    ? 'bg-brand-gold text-brand-burgundy-deep'
                    : 'glass-gold text-brand-cream/80 hover:text-brand-gold'
                }`}
              >
                Auto-Rotate: {autoRotate ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Right: Studio Controls Panel */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-[#1A0407]/95 border-t lg:border-t-0 lg:border-l border-brand-gold/25 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Product Info Preview */}
              <div className="border-b border-brand-gold/20 pb-4">
                <span className="text-[10px] text-brand-gold font-serif uppercase tracking-widest block mb-1">
                  Selected Drape
                </span>
                <h3 className="font-serif text-xl font-bold text-brand-gold-light">
                  {activeColor.name}
                </h3>
                <span className="text-base font-bold text-brand-gold">
                  {formatPrice(activeColor.sareeRef.price)}
                </span>
              </div>

              {/* 1. Colorway Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-serif font-semibold text-brand-gold flex items-center justify-between">
                  <span>1. Select Silk & Zari Palette</span>
                  <span className="text-[10px] text-brand-cream/60">{activeColor.label}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colorways.map((col, idx) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`p-2 rounded-xl text-left transition-all border flex items-center gap-2 ${
                        selectedColorIndex === idx
                          ? 'border-brand-gold bg-brand-gold/15 shadow-gold-glow'
                          : 'border-brand-gold/20 glass-gold hover:border-brand-gold/40'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/40 shrink-0 shadow-sm"
                        style={{ backgroundColor: col.primary }}
                      />
                      <span className="text-[10px] font-medium text-brand-cream line-clamp-1">
                        {col.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Lighting Ambiance Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-serif font-semibold text-brand-gold flex items-center justify-between">
                  <span>2. Studio Lighting Ambiance</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'palace', label: 'Palace Candlelight', icon: Flame },
                    { id: 'studio', label: 'Daylight Studio', icon: Camera },
                    { id: 'sunset', label: 'Golden Hour Sunset', icon: Sun },
                    { id: 'noir', label: 'Editorial Noir', icon: Moon },
                  ].map((light) => {
                    const Icon = light.icon;
                    return (
                      <button
                        key={light.id}
                        onClick={() => setLightingPreset(light.id as any)}
                        className={`p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all border ${
                          lightingPreset === light.id
                            ? 'border-brand-gold bg-brand-gold/20 text-brand-gold font-bold shadow-sm'
                            : 'border-brand-gold/20 glass-gold text-brand-cream/70 hover:text-brand-gold'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span className="text-[11px] truncate">{light.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Luster / Sheen Sliders */}
              <div className="space-y-3 pt-2 border-t border-brand-gold/15">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-brand-cream/80">
                    <span>Mulberry Silk Luster</span>
                    <span className="text-brand-gold font-mono">{Math.round(fabricSheen * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="1.0"
                    step="0.05"
                    value={fabricSheen}
                    onChange={(e) => setFabricSheen(parseFloat(e.target.value))}
                    className="w-full accent-[#D4AF37] bg-brand-maroon h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-brand-cream/80">
                    <span>24K Zari Reflectivity</span>
                    <span className="text-brand-gold font-mono">{Math.round(zariShine * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="1.0"
                    step="0.05"
                    value={zariShine}
                    onChange={(e) => setZariShine(parseFloat(e.target.value))}
                    className="w-full accent-[#D4AF37] bg-brand-maroon h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Direct Add to Bag CTA */}
            <div className="pt-4 border-t border-brand-gold/20 space-y-2">
              <button
                onClick={handleAddCurrentToBag}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-gold-glow transition-all ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-burgundy-deep hover:opacity-95'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {activeColor.label} to Shopping Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
