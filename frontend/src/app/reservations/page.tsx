'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Loader2, CreditCard, ShoppingCart, ChevronLeft } from 'lucide-react';
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' });
  const [errs, setErrs] = useState<any>({});
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (hasCart) { try { const s = localStorage.getItem('rn_cart'); if (s) setCart(JSON.parse(s)); } catch {} }
  }, [hasCart]);

  useEffect(() => {
    if (form.date) {
      setLoadingSlots(true);
      reservationApi.getAvailability(form.date).then(r => setAvailSlots(r.data.slots))
        .catch(() => setAvailSlots(timeSlots.map(s => ({ time: s.value, available: true }))))
        .finally(() => setLoadingSlots(false));
    }
  }, [form.date]);

  const validate = () => {
    const e: any = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required';
    if (!form.phone.trim() || !/^[0-9+\-\s]{7,15}$/.test(form.phone)) e.phone = 'Valid phone required';
    if (!form.date) e.date = 'Required';
    if (!form.time) e.time = 'Select a time';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartTotal = cartSubtotal + Math.round(cartSubtotal * 0.05);

  const openRazorpay = (data: any) => new Promise<void>((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: data.razorpayKey,
      amount: data.amount,
      currency: data.currency,
      name: 'ReNorth Restaurant',
      description: 'Food pre-order',
      order_id: data.razorpayOrderId,
      prefill: { name: form.name, email: form.email, contact: form.phone },
      handler: async (r: any) => {
        try {
          await ordersApi.verifyPayment({ razorpay_order_id: r.razorpay_order_id, razorpay_payment_id: r.razorpay_payment_id, razorpay_signature: r.razorpay_signature });
          resolve();
        } catch { reject(new Error('Payment verification failed')); }
      },
      modal: { ondismiss: () => reject(new Error('Payment cancelled')) },
      theme: { color: '#602628' },
    });
    rzp.on('payment.failed', () => reject(new Error('Payment failed')));
    rzp.open();
  });

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await reservationApi.create({
        name: form.name, email: form.email, phone: form.phone,
        date: form.date, time: form.time, numberOfPeople: parseInt(form.guests),
        specialRequests: form.notes,
      });
      const bid = res.data.reservation?._id || 'RN' + Date.now().toString(36).toUpperCase();
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
      setError(err.message || err.response?.data?.message || 'Something went wrong');
    } finally { setLoading(false); }
  };

  if (step === 'confirm') {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 md:p-12 text-center max-w-md w-full">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-success/10">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="mb-2">Booking Confirmed</h2>
          <p className="text-text-muted text-sm mb-6">Your table has been reserved{cart.length > 0 ? ' and payment was successful' : ''}.</p>
          <div className="bg-background rounded-xl p-5 mb-6">
            <p className="text-xs text-text-muted mb-1">Booking ID</p>
            <p className="text-xl font-bold text-primary font-mono tracking-wider">{bookingId}</p>
          </div>
          <div className="text-left space-y-2 text-sm mb-6 bg-background rounded-xl p-4">
            <p><span className="text-text-muted">Date:</span> <span className="font-semibold">{form.date}</span></p>
            <p><span className="text-text-muted">Time:</span> <span className="font-semibold">{timeSlots.find(s => s.value === form.time)?.label || form.time}</span></p>
            <p><span className="text-text-muted">Guests:</span> <span className="font-semibold">{form.guests}</span></p>
            {cartTotal > 0 && <p><span className="text-text-muted">Paid:</span> <span className="font-semibold text-primary">₹{cartTotal}</span></p>}
          </div>
          <button onClick={() => router.push('/')} className="btn-primary w-full justify-center">Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <section className="pb-8 pt-12">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">{hasCart ? 'Checkout' : 'Reservations'}</span>
            <h1 className="mb-3">{hasCart ? 'Complete Your Order' : 'Book a Table'}</h1>
            <p className="text-text-muted text-sm">{hasCart ? 'Reserve your table and pre-order your meal' : 'Reserve your experience at ReNorth'}</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-10">
              {['Details', 'Payment', 'Confirm'].map((label, i) => {
                const state = i === 0 ? 'done' : i === 1 ? (step === 'payment' ? 'active' : step === 'confirm' ? 'done' : 'pending') : (step === 'confirm' ? 'active' : 'pending');
                const isDone = state === 'done';
                const isActive = state === 'active';
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isDone ? 'bg-success text-white' : isActive ? 'bg-primary text-white' : 'bg-border text-text-muted'
                    }`}>{isDone ? '✓' : i + 1}</div>
                    <span className={`text-xs font-medium hidden sm:inline ${isActive ? 'text-primary' : isDone ? 'text-success' : 'text-text-muted'}`}>{label}</span>
                    {i < 2 && <div className="w-6 h-px bg-border ml-1" />}
                  </div>
                );
              })}
            </div>

            <form onSubmit={step === 'payment' ? handlePay : (e) => { e.preventDefault(); if (validate()) setStep('payment'); }} className="space-y-6">
              {error && <div className="bg-error/5 border border-error/20 text-error p-3 rounded-xl text-sm">{error}</div>}
              {Object.keys(errs).length > 0 && <div className="bg-error/5 border border-error/20 text-error p-3 rounded-xl text-sm">Please fix the highlighted fields.</div>}

              {hasCart && cart.length > 0 && (
                <div className="glass-card p-5">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> Your Order</h4>
                  <div className="space-y-1.5 text-sm">
                    {cart.map((item, i) => (
                      <div key={i} className="flex justify-between text-text-muted"><span>{item.name} &times; {item.quantity}</span><span>₹{item.price * item.quantity}</span></div>
                    ))}
                    <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-primary"><span>Total</span><span>₹{cartTotal}</span></div>
                  </div>
                </div>
              )}

              {step === 'details' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                      { key: 'phone', label: 'Phone', type: 'tel', placeholder: 'Phone number' },
                      { key: 'email', label: 'Email', type: 'email', placeholder: 'Email address' },
                      { key: 'date', label: 'Date', type: 'date' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                        <input type={f.type} value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value, ...(f.key === 'date' ? { time: '' } : {})})}
                          className={`input-field text-sm ${errs[f.key] ? 'border-error' : ''}`} placeholder={f.placeholder} min={f.type === 'date' ? today : undefined} />
                        {errs[f.key] && <p className="text-error text-xs mt-1">{errs[f.key]}</p>}
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Guests</label>
                      <select value={form.guests} onChange={e => setForm({...form, guests: e.target.value})} className="input-field text-sm">
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3"><Clock className="w-3.5 h-3.5 inline mr-1.5" /> Time</label>
                    {form.date ? (
                      loadingSlots ? (
                        <p className="text-text-muted text-sm flex items-center gap-2"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading...</p>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {timeSlots.map(slot => {
                            const a = availSlots.find(a => a.time === slot.value);
                            const avail = a?.available !== false;
                            return (
                              <button key={slot.value} type="button" disabled={!avail} onClick={() => setForm({...form, time: slot.value})}
                                className={`p-2.5 rounded-xl text-xs font-medium transition-all border ${!avail ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed' : form.time === slot.value ? 'bg-primary text-white border-primary' : 'bg-white text-text border-border hover:border-primary/50'}`}>
                                <div>{slot.label}</div>
                                {!avail && <div className="text-[10px] mt-0.5">Full</div>}
                              </button>
                            );
                          })}
                        </div>
                      )
                    ) : <p className="text-text-muted text-sm">Select a date first</p>}
                    {errs.time && <p className="text-error text-xs mt-1">{errs.time}</p>}
                  </div>

                  <textarea className="input-field text-sm" rows={2} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Special requests (optional)" />

                  <button type="submit" className="btn-primary w-full justify-center"><CreditCard className="w-4 h-4" /> Continue to Payment</button>
                </>
              )}

              {step === 'payment' && (
                <>
                  <div className="glass-card p-5 space-y-2 text-sm">
                    <h4 className="font-semibold mb-3">Summary</h4>
                    <div className="flex justify-between"><span className="text-text-muted">Name</span><span className="font-semibold">{form.name}</span></div>
                    <div className="flex justify-between"><span className="text-text-muted">Date</span><span className="font-semibold">{form.date}</span></div>
                    <div className="flex justify-between"><span className="text-text-muted">Time</span><span className="font-semibold">{timeSlots.find(s => s.value === form.time)?.label || form.time}</span></div>
                    <div className="flex justify-between"><span className="text-text-muted">Guests</span><span className="font-semibold">{form.guests}</span></div>
                    {cartTotal > 0 && <><div className="border-t border-border pt-2 mt-2" /><div className="flex justify-between"><span className="text-text-muted">Total</span><span className="font-bold text-primary">₹{cartTotal}</span></div></>}
                  </div>

                  {cartTotal > 0 ? (
                    <div className="bg-primary/5 rounded-xl p-4 text-sm text-text-muted">
                      Pay <strong>₹{cartTotal}</strong> via Razorpay for your food pre-order. Table booking is free.
                    </div>
                  ) : (
                    <div className="bg-primary/5 rounded-xl p-4 text-sm text-text-muted">
                      No payment needed — table booking is free.
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep('details')} className="btn-secondary flex-1 justify-center text-sm"><ChevronLeft className="w-4 h-4" /> Back</button>
                    <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center text-sm">
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing</> : <><CheckCircle className="w-4 h-4" /> {cartTotal > 0 ? `Pay ₹${cartTotal}` : 'Confirm Booking'}</>}
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
    <Suspense fallback={<div className="pt-24 min-h-screen flex items-center justify-center"><div className="skeleton w-32 h-6" /></div>}>
      <ReservationsPage />
    </Suspense>
  );
}
