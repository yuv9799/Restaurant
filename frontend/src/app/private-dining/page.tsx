'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Star, Shield, Users, Send, CheckCircle } from 'lucide-react';
import { privateDiningApi } from '@/lib/api';

export default function PrivateDiningPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', time: '', guestCount: '2', packageType: 'for-2', specialRequests: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await privateDiningApi.submitInquiry(formData);
      setSubmitted(true);
    } catch { setError('Failed to submit inquiry.'); } finally { setLoading(false); }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-24">
      <section className="pb-8 pt-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Exclusive</span>
            <h1 className="mb-3">Private Dining</h1>
            <p className="text-text-muted text-sm">An intimate dining experience for you and your loved ones</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
            {[
              { guests: 'For 2 Guests', price: '₹3,999', features: ['Private dining room', '5-course curated menu', 'Welcome drink', 'Personal chef interaction'] },
              { guests: 'For 4 Guests', price: '₹6,999', features: ['Premium private suite', '7-course tasting menu', 'Welcome drinks for all', 'Personal chef + sommelier', 'Customized decorations'] },
            ].map((pkg, i) => (
              <motion.div key={i} className="glass-card p-8 text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="mb-2">{pkg.guests}</h3>
                <p className="text-2xl font-bold text-primary mb-5">{pkg.price}</p>
                <div className="space-y-2.5 mb-6">
                  {pkg.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-text-muted text-sm">
                      <Star className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
            {[
              { icon: ChefHat, title: 'Exclusive Chef', text: 'A dedicated master chef curates your menu' },
              { icon: Shield, title: 'Premium Service', text: 'Dedicated staff for your private event' },
              { icon: Star, title: 'Customized Menu', text: 'Tailor the menu to your preferences' },
            ].map((f, i) => (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-accent/10">
                  <f.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-sm mb-1.5">{f.title}</h4>
                <p className="text-text-muted text-xs">{f.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h3>Send an Inquiry</h3>
              <p className="text-sm text-text-muted mt-2">We&apos;ll get back to you within 24 hours</p>
            </div>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 text-center">
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                <h3 className="mb-2">Inquiry Sent!</h3>
                <p className="text-text-muted text-sm">Our team will contact you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
                {error && <div className="text-error text-sm bg-error/5 p-3 rounded-xl border border-error/20">{error}</div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[{ key: 'name', label: 'Name', type: 'text' }, { key: 'email', label: 'Email', type: 'email' }, { key: 'phone', label: 'Phone', type: 'tel' }].map(f => (
                    <div key={f.key}><label className="block text-sm font-medium mb-1.5">{f.label}</label>
                      <input type={f.type} required className="input-field text-sm" value={(formData as any)[f.key]} onChange={e => setFormData({...formData, [f.key]: e.target.value})} /></div>
                  ))}
                  <div><label className="block text-sm font-medium mb-1.5">Package</label>
                    <select className="input-field text-sm" value={formData.packageType} onChange={e => setFormData({...formData, packageType: e.target.value, guestCount: e.target.value === 'for-2' ? '2' : '4'})}>
                      <option value="for-2">For 2 Guests</option><option value="for-4">For 4 Guests</option></select></div>
                  <div><label className="block text-sm font-medium mb-1.5">Date</label>
                    <input type="date" required min={today} className="input-field text-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1.5">Time</label>
                    <input type="time" required className="input-field text-sm" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} /></div>
                </div>
                <textarea className="input-field text-sm" rows={3} value={formData.specialRequests} onChange={e => setFormData({...formData, specialRequests: e.target.value})} placeholder="Special requests" />
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm">{loading ? 'Sending...' : <><Send className="w-4 h-4" /> Send Inquiry</>}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
