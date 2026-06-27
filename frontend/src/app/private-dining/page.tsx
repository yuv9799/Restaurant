'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Star, Shield, Users, Send, CheckCircle } from 'lucide-react';
import { privateDiningApi } from '@/lib/api';

export default function PrivateDiningPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', time: '',
    guestCount: '2', packageType: 'for-2', specialRequests: ''
  });
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
    } catch (err) {
      setError('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10" />
        <div className="absolute inset-0 bg-[#602628] z-0" />
        <div className="container-custom relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-white mb-4">Private Dining</h1>
            <p className="text-white/80 text-xl max-w-2xl">
              An intimate dining experience for you and your loved ones, with panoramic views and personalized service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[
              { guests: 'For 2 Guests', price: '₹3,999', features: ['Private dining room', '5-course curated menu', 'Welcome drink', 'Personal chef interaction'] },
              { guests: 'For 4 Guests', price: '₹6,999', features: ['Premium private suite', '7-course tasting menu', 'Welcome drinks for all', 'Personal chef + sommelier', 'Customized decorations'] },
            ].map((pkg, i) => (
              <motion.div key={i} className="card p-8 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="mb-2">{pkg.guests}</h3>
                <p className="text-3xl font-bold text-primary mb-6">{pkg.price}</p>
                <div className="space-y-3 mb-8">
                  {pkg.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-text-muted">
                      <Star className="w-4 h-4 text-accent" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: ChefHat, title: 'Exclusive Chef', text: 'A dedicated master chef curates your menu' },
              { icon: Shield, title: 'Premium Service', text: 'Dedicated staff for your private event' },
              { icon: Star, title: 'Customized Menu', text: 'Tailor the menu to your preferences' },
            ].map((f, i) => (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-8 h-8 text-accent" />
                </div>
                <h4 className="mb-2">{f.title}</h4>
                <p className="text-text-muted">{f.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Inquiry Form */}
          <div className="max-w-2xl mx-auto">
            <div className="section-title">
              <h2>Send an Inquiry</h2>
              <p>Fill in your details and we'll get back to you within 24 hours</p>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-12 text-center">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <h3 className="mb-2">Inquiry Sent!</h3>
                <p className="text-text-muted">Our team will contact you within 24 hours to finalize your private dining experience.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                {error && <div className="bg-error/10 text-error p-4 rounded-lg text-sm">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input type="text" required className="input-field" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input type="email" required className="input-field" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input type="tel" required className="input-field" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Package</label>
                    <select className="input-field" value={formData.packageType} onChange={(e) => { setFormData({...formData, packageType: e.target.value, guestCount: e.target.value === 'for-2' ? '2' : '4'}); }}>
                      <option value="for-2">For 2 Guests</option>
                      <option value="for-4">For 4 Guests</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date *</label>
                    <input type="date" required min={today} className="input-field" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time *</label>
                    <input type="time" required className="input-field" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests</label>
                  <textarea className="input-field" rows={4} value={formData.specialRequests} onChange={(e) => setFormData({...formData, specialRequests: e.target.value})} placeholder="Any dietary preferences, allergies, or special occasion..." />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? 'Sending...' : <><Send className="w-4 h-4" /> Send Inquiry</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}