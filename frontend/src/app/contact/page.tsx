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
    try { await contactApi.submit(formData); setSubmitted(true); }
    catch { setError('Failed to send message.'); } finally { setLoading(false); }
  };

  return (
    <div className="pt-24">
      <section className="pb-8 pt-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Get in Touch</span>
            <h1 className="mb-3">Contact Us</h1>
            <p className="text-text-muted text-sm">We&apos;d love to hear from you</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div>
              <h3 className="mb-6">Contact Information</h3>
              <div className="space-y-6">
                {[
                  { icon: Phone, title: 'Phone', content: <a href="tel:+911234567890" className="text-text-muted hover:text-primary text-sm">+91 12345 67890</a> },
                  { icon: Mail, title: 'Email', content: <a href="mailto:hello@renorth.com" className="text-text-muted hover:text-primary text-sm">hello@renorth.com</a> },
                  { icon: MapPin, title: 'Address', content: <p className="text-text-muted text-sm">123, Rajpath Club Road, Ahmedabad, Gujarat 380054</p> },
                  { icon: Clock, title: 'Opening Hours', content: <div className="text-text-muted text-sm"><p>Mon-Fri: 11:00 AM - 10:30 PM</p><p>Sat: 10:00 AM - 11:00 PM</p><p>Sun: 10:00 AM - 10:00 PM</p></div> },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/5">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6">Send a Message</h3>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 text-center">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                  <h4 className="mb-2">Message Sent!</h4>
                  <p className="text-text-muted text-sm">We&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <div className="text-error text-sm bg-error/5 p-3 rounded-xl border border-error/20">{error}</div>}
                  <div><label className="block text-sm font-medium mb-1.5">Name</label><input type="text" required className="input-field text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1.5">Email</label><input type="email" required className="input-field text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-1.5">Message</label><textarea required className="input-field text-sm" rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="How can we help?" /></div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-sm">{loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending</> : <><Send className="w-4 h-4" /> Send Message</>}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
