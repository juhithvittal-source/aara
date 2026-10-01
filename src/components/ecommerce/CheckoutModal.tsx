import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Smartphone, Building, Truck, ArrowRight, Lock, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, subtotalInr, discountInr, finalTotalInr, formatPrice, clearCart } = useCart();
  
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [orderId, setOrderId] = useState('');
  
  // Form fields
  const [formData, setFormData] = useState({
    fullName: 'Priyanka Sharma',
    email: 'priyanka.s@example.com',
    phone: '+91 98765 43210',
    address: '42, Royal Palms Avenue, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    country: 'India',
  });

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const generatedId = `AARA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');

    // Trigger celebration confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#680C1A', '#F3E5AB', '#ffffff'],
    });

    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#1A0407] border border-brand-gold/40 rounded-2xl shadow-2xl z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-brand-gold/20 flex items-center justify-between bg-brand-maroon/30">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-gold" />
            <h3 className="font-serif text-lg font-bold text-brand-gold-light">
              {step === 'success' ? 'Order Confirmed' : 'Haute Saree Drape Checkout'}
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-brand-cream/70 hover:text-brand-gold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content depending on Step */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Shipping Details */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="flex items-center justify-between border-b border-brand-gold/15 pb-2">
                <span className="text-xs font-serif uppercase tracking-widest text-brand-gold">
                  01. Shipping & Bridal Delivery Details
                </span>
                <span className="text-xs text-brand-cream/60">Step 1 of 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] text-brand-gold-light/80 block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-brand-burgundy/50 border border-brand-gold/30 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-brand-gold-light/80 block mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-brand-burgundy/50 border border-brand-gold/30 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] text-brand-gold-light/80 block mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-brand-burgundy/50 border border-brand-gold/30 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] text-brand-gold-light/80 block mb-1">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-brand-burgundy/50 border border-brand-gold/30 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-brand-gold-light/80 block mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-brand-burgundy/50 border border-brand-gold/30 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-brand-gold-light/80 block mb-1">Pincode / Postal Code</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-brand-burgundy/50 border border-brand-gold/30 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Order Quick Summary */}
              <div className="p-3.5 rounded-xl glass-gold/60 space-y-1.5 text-xs text-brand-cream/80">
                <div className="flex justify-between">
                  <span>Saree Order Total ({cart.length} items)</span>
                  <span className="font-bold text-brand-gold">{formatPrice(finalTotalInr)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-400">
                  <span>Shipping & Silk Insurance</span>
                  <span>Complimentary</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-burgundy-deep font-bold text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:opacity-95"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Payment Method */}
          {step === 'payment' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-brand-gold/15 pb-2">
                <span className="text-xs font-serif uppercase tracking-widest text-brand-gold">
                  02. Select Royal Payment Method
                </span>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs text-brand-gold hover:underline"
                >
                  Edit Details
                </button>
              </div>

              {/* Payment Option Selector */}
              <div className="space-y-2.5">
                {[
                  {
                    id: 'upi',
                    title: 'Instant UPI / QR / Google Pay / PhonePe',
                    subtitle: 'Fastest 1-tap payment in India with zero transaction fees',
                    icon: Smartphone,
                  },
                  {
                    id: 'card',
                    title: 'Credit / Debit Card (Visa, Mastercard, Amex)',
                    subtitle: 'Protected with 256-bit bank-grade TLS encryption',
                    icon: CreditCard,
                  },
                  {
                    id: 'netbanking',
                    title: 'Net Banking (All Indian Banks)',
                    subtitle: 'HDFC, ICICI, SBI, Axis, Kotak, and 50+ banks',
                    icon: Building,
                  },
                  {
                    id: 'cod',
                    title: 'Cash / Card on Delivery',
                    subtitle: 'Pay at your doorstep upon receiving the heirloom package',
                    icon: Truck,
                  },
                ].map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPaymentMethod(opt.id as any)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        paymentMethod === opt.id
                          ? 'border-brand-gold bg-brand-gold/15 shadow-gold-glow'
                          : 'border-brand-gold/20 glass-gold/40 hover:border-brand-gold/40'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === opt.id}
                        onChange={() => setPaymentMethod(opt.id as any)}
                        className="mt-1 accent-[#D4AF37]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-brand-gold" />
                          <h4 className="text-xs font-bold text-brand-cream">{opt.title}</h4>
                        </div>
                        <p className="text-[11px] text-brand-cream/60 mt-0.5">{opt.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery confirmation info */}
              <div className="p-3 rounded-xl bg-brand-burgundy/40 border border-brand-gold/20 text-xs text-brand-cream/80">
                <p>
                  Delivering to: <span className="text-brand-gold font-medium">{formData.fullName}</span>, {formData.address}, {formData.city} - {formData.pincode}
                </p>
              </div>

              {/* Place Order CTA */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-burgundy-deep font-bold text-sm flex items-center justify-center gap-2 shadow-gold-glow hover:opacity-95"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Confirm & Authorize {formatPrice(finalTotalInr)}</span>
              </button>
            </div>
          )}

          {/* STEP 3: Success Confirmation */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark text-brand-burgundy-deep mx-auto flex items-center justify-center shadow-gold-glow-lg animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs text-brand-gold uppercase tracking-widest font-serif font-semibold">
                  Auspicious Congratulations
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-gold-light">
                  Your Heirloom Drape is Reserved
                </h3>
                <p className="text-xs text-brand-cream/70 max-w-md mx-auto">
                  Thank you for welcoming AARA into your special celebrations. Our master weavers are hand-inspecting and packaging your saree in scented cotton muslin.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-4 rounded-xl glass-gold/80 border border-brand-gold/30 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-brand-gold/20 pb-2">
                  <span className="text-brand-gold-light/70">Order Reference:</span>
                  <span className="font-bold text-brand-gold font-mono">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gold-light/70">Estimated Delivery:</span>
                  <span className="text-brand-cream font-medium">Within 3 to 5 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gold-light/70">Authentication:</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Silk Mark Certificate Included
                  </span>
                </div>
                <div className="flex justify-between border-t border-brand-gold/20 pt-2 font-bold">
                  <span>Total Paid:</span>
                  <span className="text-brand-gold text-sm">{formatPrice(finalTotalInr)}</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3.5 px-4 rounded-xl border border-brand-gold text-brand-gold font-bold text-sm hover:bg-brand-gold hover:text-brand-burgundy-deep transition-all"
              >
                Return to Gallery & Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
