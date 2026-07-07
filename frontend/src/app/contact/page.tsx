'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { contactApi } from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await contactApi.submit(formData);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary to-primary/90 py-12 md:py-16">
        <div className="container-custom text-center">
          <motion.h1 className="text-white mb-4 text-3xl md:text-5xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Contact Us</motion.h1>
          <motion.p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            We&apos;d love to hear from you. Get in touch with us.
          </motion.p>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h2 className="text-2xl md:text-4xl mb-6 md:mb-8">Get in Touch</h2>
              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: Phone, title: 'Phone', content: <a href="tel:+911234567890" className="text-text-muted hover:text-primary text-sm md:text-base">+91 12345 67890</a> },
                  { icon: Mail, title: 'Email', content: <a href="mailto:hello@renorth.com" className="text-text-muted hover:text-primary text-sm md:text-base">hello@renorth.com</a> },
                  { icon: MapPin, title: 'Address', content: <p className="text-text-muted text-sm md:text-base">123, Rajpath Club Road,<br />Ahmedabad, Gujarat 380054</p> },
                  { icon: Clock, title: 'Opening Hours', content: <div className="text-text-muted text-sm md:text-base"><p>Mon-Fri: 11:00 AM - 10:30 PM</p><p>Sat: 10:00 AM - 11:00 PM</p><p>Sun: 10:00 AM - 10:00 PM</p></div> },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm md:text-xl">{item.title}</h4>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 md:mt-12 rounded-2xl overflow-hidden border border-border h-48 md:h-64">
                <div className="w-full h-full bg-background flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2" />
                    <p className="text-text-muted text-xs md:text-sm">Find us on Google Maps</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-4xl mb-6 md:mb-8">Send a Message</h2>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 md:p-12 text-center">
                  <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-success mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl mb-2">Message Sent!</h3>
                  <p className="text-text-muted text-sm md:text-base">We&apos;ll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-4 md:p-8 space-y-4 md:space-y-6">
                  {error && <div className="bg-error/10 text-error p-3 md:p-4 rounded-lg text-xs md:text-sm">{error}</div>}
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1.5">Name *</label>
                    <input type="text" required className="input-field text-sm md:text-base" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1.5">Email *</label>
                    <input type="email" required className="input-field text-sm md:text-base" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-1.5">Message *</label>
                    <textarea required className="input-field text-sm md:text-base" rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell us how we can help..." />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm md:text-base py-3 md:py-4">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
