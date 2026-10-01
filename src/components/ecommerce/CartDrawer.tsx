import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotalInr,
    discountInr,
    finalTotalInr,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPrice,
    setIsCheckoutOpen,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  // Free shipping threshold: 50,000 INR
  const freeShippingThreshold = 50000;
  const shippingProgress = Math.min(100, (subtotalInr / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotalInr);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback({ message: res.message, isError: !res.success });
    if (res.success) setCouponInput('');
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide Drawer */}
      <div className="relative w-full max-w-md bg-[#180407] border-l border-brand-gold/30 h-full flex flex-col justify-between shadow-2xl z-10">
        {/* Drawer Header */}
        <div className="p-5 border-b border-brand-gold/20 flex items-center justify-between bg-brand-maroon/30">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-brand-gold" />
            <h3 className="font-serif text-lg font-bold text-brand-gold-light">
              Your Shopping Bag
            </h3>
            <span className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-brand-cream/70 hover:text-brand-gold hover:bg-brand-burgundy/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-brand-burgundy-deep px-5 py-3 border-b border-brand-gold/15">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-brand-gold-light flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              {amountNeeded === 0
                ? 'Complimentary Express Shipping Unlocked!'
                : `Add ${formatPrice(amountNeeded)} more for Free Express Delivery`}
            </span>
            <span className="font-bold text-brand-gold">{Math.round(shippingProgress)}%</span>
          </div>
          <div className="w-full bg-brand-maroon/60 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-gold to-brand-champagne h-full transition-all duration-500 rounded-full"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full border border-brand-gold/30 flex items-center justify-center bg-brand-burgundy/30">
                <ShoppingBag className="w-8 h-8 text-brand-gold/60" />
              </div>
              <h4 className="font-serif text-lg text-brand-gold-light">Your Bag is Empty</h4>
              <p className="text-xs text-brand-cream/60 max-w-xs">
                Discover our handwoven silk sarees and bring home an heirloom treasure.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-xl border border-brand-gold text-brand-gold text-xs font-bold hover:bg-brand-gold hover:text-brand-burgundy-deep transition-all"
              >
                Explore Saree Collections
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.saree.id}-${item.selectedBlouse}`}
                className="flex gap-4 p-3.5 rounded-xl glass-gold/50 border border-brand-gold/20"
              >
                {/* Saree Thumbnail */}
                <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 border border-brand-gold/30">
                  <img
                    src={item.saree.image}
                    alt={item.saree.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-brand-cream line-clamp-1">
                        {item.saree.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.saree.id)}
                        className="text-brand-cream/50 hover:text-red-400 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-brand-gold mt-0.5">{item.saree.material}</p>
                    <p className="text-[10px] text-brand-cream/60 italic line-clamp-1">
                      Blouse: {item.selectedBlouse}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 border border-brand-gold/30 rounded-lg px-2 py-0.5 bg-brand-burgundy/40">
                      <button
                        onClick={() => updateQuantity(item.saree.id, item.quantity - 1)}
                        className="text-brand-gold hover:text-white text-xs font-bold px-1"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold text-brand-cream">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.saree.id, item.quantity + 1)}
                        className="text-brand-gold hover:text-white text-xs font-bold px-1"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-serif text-sm font-bold text-brand-gold">
                      {formatPrice(item.saree.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Coupon & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-brand-gold/25 bg-brand-maroon/20 space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-brand-gold absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. AARA10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-brand-burgundy/50 border border-brand-gold/30 rounded-xl text-xs text-brand-cream placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-gold/20 border border-brand-gold/50 text-brand-gold text-xs font-bold hover:bg-brand-gold hover:text-brand-burgundy-deep transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* Active Coupon Tag */}
              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-500/30">
                  <span>Coupon &lsquo;{appliedCoupon}&rsquo; Applied (-{formatPrice(discountInr)})</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-brand-cream/60 hover:text-red-400 text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponFeedback && !appliedCoupon && (
                <p
                  className={`text-[11px] ${
                    couponFeedback.isError ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {couponFeedback.message}
                </p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-brand-cream/80 pt-2 border-t border-brand-gold/15">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalInr)}</span>
              </div>
              {discountInr > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Privilege Discount</span>
                  <span>-{formatPrice(discountInr)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Insured Shipping</span>
                <span className="text-brand-gold">
                  {amountNeeded === 0 ? 'FREE' : 'Complimentary'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-brand-gold-light pt-2 border-t border-brand-gold/20">
                <span>Grand Total</span>
                <span className="text-brand-gold text-base">{formatPrice(finalTotalInr)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-burgundy-deep font-bold text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:opacity-95 transition-all"
            >
              <span>Proceed to Drape Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-brand-cream/50 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-brand-gold" />
              100% Encrypted & Authenticated Payment Guarantee
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
