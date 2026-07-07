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
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10" />
        <div className="absolute inset-0 bg-[#602628] z-0" />
        <div className="container-custom relative z-20 px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-white mb-4 text-3xl md:text-5xl">Private Dining</h1>
            <p className="text-white/80 text-base md:text-xl max-w-2xl">
              An intimate dining experience for you and your loved ones, with panoramic views and personalized service
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-16">
            {[
              { guests: 'For 2 Guests', price: '₹3,999', features: ['Private dining room', '5-course curated menu', 'Welcome drink', 'Personal chef interaction'] },
              { guests: 'For 4 Guests', price: '₹6,999', features: ['Premium private suite', '7-course tasting menu', 'Welcome drinks for all', 'Personal chef + sommelier', 'Customized decorations'] },
            ].map((pkg, i) => (
              <motion.div key={i} className="card p-6 md:p-8 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Users className="w-8 h-8 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl mb-2">{pkg.guests}</h3>
                <p className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6">{pkg.price}</p>
                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {pkg.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-text-muted text-sm md:text-base">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-accent flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {[
              { icon: ChefHat, title: 'Exclusive Chef', text: 'A dedicated master chef curates your menu' },
              { icon: Shield, title: 'Premium Service', text: 'Dedicated staff for your private event' },
              { icon: Star, title: 'Customized Menu', text: 'Tailor the menu to your preferences' },
            ].map((f, i) => (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <f.icon className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <h4 className="text-base md:text-xl mb-1 md:mb-2">{f.title}</h4>
                <p className="text-text-muted text-sm md:text-base">{f.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto px-0 md:px-4">
            <div className="section-title mb-6 md:mb-12">
              <h2 className="text-2xl md:text-4xl">Send an Inquiry</h2>
              <p className="text-sm md:text-base">Fill in your details and we&apos;ll get back to you within 24 hours</p>
            </div>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 md:p-12 text-center">
                <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-success mx-auto mb-4" />
                <h3 className="text-lg md:text-xl mb-2">Inquiry Sent!</h3>
                <p className="text-text-muted text-sm md:text-base">Our team will contact you within 24 hours to finalize your private dining experience.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-4 md:p-8 space-y-4 md:space-y-6">
                {error && <div className="bg-error/10 text-error p-3 md:p-4 rounded-lg text-xs md:text-sm">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div><label className="block text-xs md:text-sm font-medium mb-1.5">Name *</label><input type="text" required className="input-field text-sm md:text-base" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                  <div><label className="block text-xs md:text-sm font-medium mb-1.5">Email *</label><input type="email" required className="input-field text-sm md:text-base" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
                  <div><label className="block text-xs md:text-sm font-medium mb-1.5">Phone *</label><input type="tel" required className="input-field text-sm md:text-base" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1.5">Package</label>
                    <select className="input-field text-sm md:text-base" value={formData.packageType} onChange={(e) => { setFormData({...formData, packageType: e.target.value, guestCount: e.target.value === 'for-2' ? '2' : '4'}); }}>
                      <option value="for-2">For 2 Guests</option>
                      <option value="for-4">For 4 Guests</option>
                    </select>
                  </div>
                  <div><label className="block text-xs md:text-sm font-medium mb-1.5">Date *</label><input type="date" required min={today} className="input-field text-sm md:text-base" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} /></div>
                  <div><label className="block text-xs md:text-sm font-medium mb-1.5">Time *</label><input type="time" required className="input-field text-sm md:text-base" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} /></div>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium mb-1.5">Special Requests</label>
                  <textarea className="input-field text-sm md:text-base" rows={3} value={formData.specialRequests} onChange={(e) => setFormData({...formData, specialRequests: e.target.value})} placeholder="Any dietary preferences, allergies, or special occasion..." />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm md:text-base py-3 md:py-4">
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
