'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, CheckCircle, Loader2, CreditCard, ShoppingCart, ChevronLeft, Users } from 'lucide-react';
import { reservationApi, ordersApi } from '@/lib/api';

declare global { interface Window { Razorpay: any } }

const timeSlots = [
  { label: '11:00 AM', value: '11:00' }, { label: '11:30 AM', value: '11:30' },
  { label: '12:00 PM', value: '12:00' }, { label: '12:30 PM', value: '12:30' },
  { label: '1:00 PM', value: '13:00' }, { label: '1:30 PM', value: '13:30' },
  { label: '2:00 PM', value: '14:00' }, { label: '6:00 PM', value: '18:00' },
  { label: '6:30 PM', value: '18:30' }, { label: '7:00 PM', value: '19:00' },
  { label: '7:30 PM', value: '19:30' }, { label: '8:00 PM', value: '20:00' },
  { label: '8:30 PM', value: '20:30' }, { label: '9:00 PM', value: '21:00' },
  { label: '9:30 PM', value: '21:30' },
];

function ReservationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasCart = searchParams.get('cart') === '1';

  const [step, setStep] = useState<string>('details');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [availSlots, setAvailSlots] = useState<any[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    date: '', time: '', guests: '2',
    notes: '',
  });

  const [errs, setErrs] = useState<any>({});
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (hasCart) {
      try { const saved = localStorage.getItem('rn_cart'); if (saved) setCart(JSON.parse(saved)); } catch {}
    }
  }, [hasCart]);

  useEffect(() => {
    if (form.date) {
      setLoadingSlots(true);
      reservationApi.getAvailability(form.date).then(res => {
        setAvailSlots(res.data.slots);
      }).catch(() => {
        setAvailSlots(timeSlots.map(s => ({ time: s.value, available: true, bookedCount: 0 })));
      }).finally(() => setLoadingSlots(false));
    }
  }, [form.date]);

  const validate = () => {
    const e: any = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!form.email.includes('@')) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Required';
    else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) e.phone = 'Invalid phone';
    if (!form.date) e.date = 'Required';
    if (!form.time) e.time = 'Select a time';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartTax = Math.round(cartSubtotal * 0.05);
  const cartTotal = cartSubtotal + cartTax;

  const openRazorpay = (orderData: any) => {
    return new Promise<void>((resolve, reject) => {
      const options = {
        key: orderData.razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ReNorth Restaurant',
        description: 'Food pre-order',
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        handler: async function (response: any) {
          try {
            await ordersApi.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            resolve();
          } catch {
            reject(new Error('Payment verification failed'));
          }
        },
        modal: {
          ondismiss: () => reject(new Error('Payment cancelled')),
        },
        theme: { color: '#602628' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => reject(new Error('Payment failed')));
      rzp.open();
    });
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Create reservation first
      const res = await reservationApi.create({
        name: form.name, email: form.email, phone: form.phone,
        date: form.date, time: form.time,
        numberOfPeople: parseInt(form.guests),
        specialRequests: form.notes,
      });
      const bid = res.data.reservation?._id || 'RN' + Date.now().toString(36).toUpperCase();

      // 2. If cart has items, create order + pay
      if (cart.length > 0) {
        const orderRes = await ordersApi.create({
          customer: { name: form.name, email: form.email, phone: form.phone },
          items: cart.map(i => ({ itemId: i._id, name: i.name, quantity: i.quantity, price: i.price, type: i.type || 'dish' })),
          notes: form.notes,
        });

        await openRazorpay(orderRes.data);
        localStorage.removeItem('rn_cart');
      }

      setBookingId(bid);
      setStep('confirm');
    } catch (err: any) {
      setError(err.message || err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'confirm') {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-6 md:p-12 text-center max-w-md w-full">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-success" />
          </div>
          <h2 className="text-2xl md:text-3xl mb-2">Booking Confirmed!</h2>
          <p className="text-text-muted text-sm md:text-base mb-6">Your table has been reserved at ReNorth. {cart.length > 0 && 'Payment successful!'}</p>
          <div className="bg-primary/5 rounded-2xl p-4 md:p-6 mb-6 border-2 border-primary/10">
            <p className="text-xs text-text-muted mb-1">Booking ID</p>
            <p className="text-xl md:text-2xl font-bold text-primary font-mono tracking-wider break-all">{bookingId}</p>
          </div>
          <div className="text-left space-y-2 text-sm md:text-base mb-6 bg-background rounded-xl p-4">
            <p><span className="text-text-muted">Date:</span> <span className="font-semibold">{form.date}</span></p>
            <p><span className="text-text-muted">Time:</span> <span className="font-semibold">{timeSlots.find(s => s.value === form.time)?.label || form.time}</span></p>
            <p><span className="text-text-muted">Guests:</span> <span className="font-semibold">{form.guests}</span></p>
            {cartTotal > 0 && <p><span className="text-text-muted">Paid:</span> <span className="font-semibold text-primary">₹{cartTotal}</span></p>}
          </div>
          <button onClick={() => router.push('/')} className="btn-primary w-full justify-center text-sm md:text-base">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary to-primary/90 py-12 md:py-16">
        <div className="container-custom text-center">
          <motion.h1 className="text-white mb-4 text-3xl md:text-5xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {hasCart ? 'Checkout' : 'Book a Table'}
          </motion.h1>
          <motion.p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {hasCart ? 'Complete your order and reserve your table' : 'Reserve your experience at ReNorth'}
          </motion.p>
        </div>
      </section>

      <section className="section-padding py-8 md:py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step === 'details' ? 'text-primary' : 'text-success'}`}>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold ${step === 'details' ? 'bg-primary text-white' : 'bg-success text-white'}`}>1</div>
                <span className="text-xs md:text-sm font-medium hidden sm:inline">Details</span>
              </div>
              <div className="w-8 md:w-16 h-0.5 bg-border" />
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-text-muted'}`}>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold ${step === 'payment' ? 'bg-primary text-white' : 'bg-border text-text-muted'}`}>2</div>
                <span className="text-xs md:text-sm font-medium hidden sm:inline">Payment</span>
              </div>
              <div className="w-8 md:w-16 h-0.5 bg-border" />
              <div className="flex items-center gap-2 text-text-muted">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold bg-border text-text-muted">3</div>
                <span className="text-xs md:text-sm font-medium hidden sm:inline">Confirm</span>
              </div>
            </div>

            <form onSubmit={step === 'payment' ? handlePay : (e) => { e.preventDefault(); if (validate()) setStep('payment'); }} className="card p-4 md:p-8 space-y-5 md:space-y-6">
              {error && <div className="bg-error/10 text-error p-3 md:p-4 rounded-lg text-xs md:text-sm">{error}</div>}
              {Object.keys(errs).length > 0 && <div className="bg-error/10 text-error p-3 md:p-4 rounded-lg text-xs md:text-sm">Please fix the highlighted fields.</div>}

              {hasCart && cart.length > 0 && (
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-3 md:p-4">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> Your Order ({cart.length} items)</h4>
                  <div className="space-y-1 text-xs md:text-sm">
                    {cart.map((item, i) => (
                      <div key={i} className="flex justify-between text-text-muted"><span>{item.name} &times; {item.quantity}</span><span>₹{item.price * item.quantity}</span></div>
                    ))}
                    <div className="border-t border-accent/20 pt-1 flex justify-between font-bold text-primary"><span>Total</span><span>₹{cartTotal}</span></div>
                  </div>
                </div>
              )}

              {step === 'details' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    {[{ key: 'name', label: 'Name *', type: 'text', placeholder: 'Your name' },
                      { key: 'phone', label: 'Phone *', type: 'tel', placeholder: 'Phone number' },
                      { key: 'email', label: 'Email *', type: 'email', placeholder: 'Email' },
                      { key: 'date', label: 'Date *', type: 'date' },
                      { key: 'guests', label: 'Guests *', type: 'select' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-xs md:text-sm font-medium mb-1.5">{f.label}</label>
                        {f.key === 'guests' ? (
                          <select value={form.guests} onChange={e => setForm({...form, guests: e.target.value})} className="input-field text-sm md:text-base">
                            {Array.from({ length: 20 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                          </select>
                        ) : f.key === 'date' ? (
                          <input type="date" min={today} value={form.date} onChange={e => setForm({...form, date: e.target.value, time: ''})} className={`input-field text-sm md:text-base ${errs[f.key] ? 'border-error' : ''}`} />
                        ) : (
                          <input type={f.type} value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} className={`input-field text-sm md:text-base ${errs[f.key] ? 'border-error' : ''}`} placeholder={f.placeholder} />
                        )}
                        {errs[f.key] && <p className="text-error text-xs mt-1">{errs[f.key]}</p>}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-2"><Clock className="w-3 h-3 md:w-4 md:h-4 inline mr-1" /> Time *</label>
                    {form.date ? (
                      loadingSlots ? (
                        <div className="flex items-center gap-2 text-text-muted text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Loading available slots...</div>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {timeSlots.map(slot => {
                            const avail = availSlots.find(a => a.time === slot.value);
                            const isAvailable = avail?.available !== false;
                            return (
                              <button key={slot.value} type="button" disabled={!isAvailable} onClick={() => setForm({...form, time: slot.value})}
                                className={`p-2 md:p-3 rounded-lg text-xs md:text-sm font-semibold transition-all border-2 ${!isAvailable ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed' : form.time === slot.value ? 'bg-primary text-white border-primary' : 'bg-white text-text border-border hover:border-primary'}`}>
                                <div>{slot.label}</div>
                                {!isAvailable && <div className="text-[10px] md:text-xs mt-0.5">Full</div>}
                              </button>
                            );
                          })}
                        </div>
                      )
                    ) : <p className="text-text-muted text-xs md:text-sm">Select a date first</p>}
                    {errs.time && <p className="text-error text-xs mt-1">{errs.time}</p>}
                  </div>

                  <div>
                    <textarea className="input-field text-sm md:text-base" rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Special requests (dietary preferences, allergies, occasion...)" />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center text-sm md:text-base py-3 md:py-4">
                    <CreditCard className="w-4 h-4" /> Continue to Payment
                  </button>
                </>
              )}

              {step === 'payment' && (
                <>
                  <div className="bg-background rounded-xl p-4 md:p-6 space-y-2 text-sm md:text-base">
                    <h4 className="font-semibold mb-3">Booking Summary</h4>
                    <div className="flex justify-between"><span className="text-text-muted">Name</span><span className="font-semibold">{form.name}</span></div>
                    <div className="flex justify-between"><span className="text-text-muted">Date</span><span className="font-semibold">{form.date}</span></div>
                    <div className="flex justify-between"><span className="text-text-muted">Time</span><span className="font-semibold">{timeSlots.find(s => s.value === form.time)?.label || form.time}</span></div>
                    <div className="flex justify-between"><span className="text-text-muted">Guests</span><span className="font-semibold">{form.guests}</span></div>
                    {cartTotal > 0 && (
                      <><div className="border-t border-border pt-2 mt-2" />
                        <div className="flex justify-between"><span className="text-text-muted">Order Total</span><span className="font-bold text-primary text-lg">₹{cartTotal}</span></div>
                      </>
                    )}
                  </div>

                  {cartTotal > 0 ? (
                    <div className="bg-primary/5 rounded-xl p-3 md:p-4 text-xs md:text-sm space-y-2">
                      <p className="font-semibold text-primary">Pay with Razorpay</p>
                      <p className="text-text-muted">You&apos;ll be redirected to Razorpay&apos;s secure checkout to complete the payment of <strong>₹{cartTotal}</strong> for your food pre-order.</p>
                    </div>
                  ) : (
                    <div className="bg-primary/5 rounded-xl p-3 md:p-4 text-xs md:text-sm text-text-muted">
                      No payment required — table booking is free. Click confirm to reserve.
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep('details')} className="btn-secondary flex-1 justify-center text-sm md:text-base py-3 md:py-4">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center text-sm md:text-base py-3 md:py-4">
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <><CheckCircle className="w-4 h-4" /> {cartTotal > 0 ? `Pay ₹${cartTotal}` : 'Confirm Booking'}</>}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ReservationsPageWrapper() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen flex items-center justify-center"><div className="skeleton w-32 h-8" /></div>}>
      <ReservationsPage />
    </Suspense>
  );
}
