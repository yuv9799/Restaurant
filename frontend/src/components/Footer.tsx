'use client';

import Link from 'next/link';
import { UtensilsCrossed, Phone, Mail, MapPin, Clock, Globe, Camera, Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2B2B2B] text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-2xl font-bold text-white">
                ReNorth
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Where the Mountains Meet the Masala
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors" aria-label="Youtube">
                <Music className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link href="/menu" className="text-gray-400 hover:text-white transition-colors text-sm">Menu</Link>
              <Link href="/drinks" className="text-gray-400 hover:text-white transition-colors text-sm">Drinks</Link>
              <Link href="/reservations" className="text-gray-400 hover:text-white transition-colors text-sm">Reservations</Link>
              <Link href="/private-dining" className="text-gray-400 hover:text-white transition-colors text-sm">Private Dining</Link>
              <Link href="/sundays" className="text-gray-400 hover:text-white transition-colors text-sm">Sundays at Our Table</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-white font-heading mb-6">
              <Clock className="w-4 h-4 inline mr-2" />
              Opening Hours
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Monday - Friday</span>
                <span>11:00 AM - 10:30 PM</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Saturday</span>
                <span>10:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Sunday</span>
                <span>10:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading mb-6">Get in Touch</h4>
            <div className="flex flex-col gap-4 text-sm">
              <a href="tel:+911234567890" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-accent" />
                +91 12345 67890
              </a>
              <a href="mailto:hello@renorth.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-accent" />
                hello@renorth.com
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-accent mt-1" />
                <span>123, Rajpath Club Road,<br />Ahmedabad, Gujarat 380054</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ReNorth. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}