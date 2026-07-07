'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CalendarDays } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/drinks', label: 'Drinks' },
  { href: '/private-dining', label: 'Private Dining' },
  { href: '/sundays', label: 'Sundays' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/awards', label: 'Awards' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className={`max-w-7xl mx-auto transition-all duration-300 rounded-2xl ${
        scrolled
          ? 'glass shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: scrolled ? 'var(--color-primary)' : 'rgba(96, 38, 40, 0.9)' }}>
              <span className="text-white font-bold text-sm font-heading">R</span>
            </div>
            <span className="font-heading text-xl font-bold" style={{ color: scrolled ? 'var(--color-primary)' : 'white' }}>
              ReNorth
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.href
                    ? scrolled ? 'text-primary bg-primary/5' : 'text-white bg-white/10'
                    : scrolled ? 'text-text-muted hover:text-primary hover:bg-primary/5' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/reservations"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                scrolled
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-white text-primary hover:bg-white/90'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Book a Table
            </Link>
          </div>

          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-text hover:bg-background' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="max-w-7xl mx-auto mt-2 glass overflow-hidden rounded-2xl lg:hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href ? 'text-primary bg-primary/5' : 'text-text-muted hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-border">
                <Link href="/reservations" className="btn-primary w-full justify-center text-sm">
                  <CalendarDays className="w-4 h-4" />
                  Book a Table
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
