'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border" style={{ background: '#1A1A1A' }}>
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-primary)' }}>
                <span className="text-white font-bold text-sm font-heading">R</span>
              </div>
              <span className="font-heading text-xl font-bold text-white">ReNorth</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">Where the Mountains Meet the Masala</p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-5">Navigation</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: '/menu', label: 'Menu' },
                { href: '/drinks', label: 'Drinks' },
                { href: '/reservations', label: 'Reservations' },
                { href: '/private-dining', label: 'Private Dining' },
                { href: '/sundays', label: 'Sundays at Our Table' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="text-gray-500 hover:text-white transition-colors text-sm">{link.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-5">
              <Clock className="w-3.5 h-3.5 inline mr-1.5" />
              Hours
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between text-gray-500"><span>Mon - Fri</span><span>11:00 AM - 10:30 PM</span></div>
              <div className="flex justify-between text-gray-500"><span>Saturday</span><span>10:00 AM - 11:00 PM</span></div>
              <div className="flex justify-between text-gray-500"><span>Sunday</span><span>10:00 AM - 10:00 PM</span></div>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-5">Contact</h4>
            <div className="flex flex-col gap-3.5 text-sm">
              <a href="tel:+911234567890" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-accent" /> +91 12345 67890
              </a>
              <a href="mailto:hello@renorth.com" className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-accent" /> hello@renorth.com
              </a>
              <div className="flex items-start gap-3 text-gray-500">
                <MapPin className="w-3.5 h-3.5 text-accent mt-0.5" />
                <span>123, Rajpath Club Road, Ahmedabad, Gujarat 380054</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} ReNorth. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
