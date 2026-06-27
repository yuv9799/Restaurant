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
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <motion.h1 className="text-white mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Contact Us</motion.h1>
          <motion.p className="text-white/80 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            We'd love to hear from you. Get in touch with us.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="mb-8">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+911234567890" className="text-text-muted hover:text-primary">+91 12345 67890</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:hello@renorth.com" className="text-text-muted hover:text-primary">hello@renorth.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4>Address</h4>
                    <p className="text-text-muted">123, Rajpath Club Road,<br />Ahmedabad, Gujarat 380054</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4>Opening Hours</h4>
                    <div className="text-text-muted">
                      <p>Mon-Fri: 11:00 AM - 10:30 PM</p>
                      <p>Sat: 10:00 AM - 11:00 PM</p>
                      <p>Sun: 10:00 AM - 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-12 rounded-2xl overflow-hidden border border-border h-64">
                <div className="w-full h-full bg-background flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-text-muted text-sm">Find us on Google Maps</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="mb-8">Send a Message</h2>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <h3 className="mb-2">Message Sent!</h3>
                  <p className="text-text-muted">We'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                  {error && <div className="bg-error/10 text-error p-4 rounded-lg text-sm">{error}</div>}
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input type="text" required className="input-field" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input type="email" required className="input-field" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea required className="input-field" rows={6} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell us how we can help..." />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
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