'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, UtensilsCrossed, CalendarDays, Star, Quote, Award, ChefHat, Sparkles } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const testimonials = [
  { name: 'Priya Sharma', text: 'The butter chicken here is absolutely divine! Reminds me of my grandmother\'s cooking.', rating: 5, source: 'Zomato' },
  { name: 'Rahul Mehta', text: 'Best North Indian dining experience in the city. The dal makhani is a must-try!', rating: 5, source: 'Google' },
  { name: 'Ananya Patel', text: 'The Sunday brunch buffet is incredible. Such a warm and inviting atmosphere.', rating: 4, source: 'Swiggy' },
  { name: 'Vikram Singh', text: 'Exquisite flavors, beautiful presentation, and impeccable service. A true gem.', rating: 5, source: 'Zomato' },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #602628 0%, #4A1C1E 50%, #3A1415 100%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-custom relative z-10 pt-24">
          <div className="max-w-3xl">
            <motion.p className="text-accent font-medium tracking-[0.15em] uppercase mb-5 text-sm" {...fadeUp} transition={{ delay: 0.1 }}>
              Welcome to ReNorth
            </motion.p>
            <motion.h1 className="text-white mb-6 leading-[1.1]" {...fadeUp} transition={{ delay: 0.2 }}>
              Authentic North Indian <br />
              <span className="text-accent">Cuisine, Reimagined</span>
            </motion.h1>
            <motion.p className="text-white/60 text-lg max-w-xl mb-10 leading-relaxed" {...fadeUp} transition={{ delay: 0.3 }}>
              From the foothills to your table — every dish tells a story.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" {...fadeUp} transition={{ delay: 0.4 }}>
              <Link href="/reservations" className="btn-primary bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20 px-8 py-3.5">
                <CalendarDays className="w-4 h-4" />
                Book a Table
              </Link>
              <Link href="/menu" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm text-white border border-white/20 hover:bg-white/10 transition-all">
                <UtensilsCrossed className="w-4 h-4" />
                Explore Menu
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div className="section-title" {...fadeUp}>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Simple Steps</span>
            <h2>How It Works</h2>
            <p>Your journey to an unforgettable dining experience</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: '01', icon: UtensilsCrossed, title: 'Browse Menu', text: 'Explore our selection of authentic North Indian dishes and handcrafted beverages.' },
              { step: '02', icon: CalendarDays, title: 'Make a Reservation', text: 'Book your table online in seconds. No payment required for reservations.' },
              { step: '03', icon: Sparkles, title: 'Dine with Us', text: 'Enjoy a memorable dining experience with family and friends in warm ambiance.' },
            ].map((item, i) => (
              <motion.div key={i} className="glass-card p-8 text-center" {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(191, 139, 103, 0.1)' }}>
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-semibold tracking-wider text-accent">{item.step}</span>
                <h4 className="mt-2 mb-3">{item.title}</h4>
                <p className="text-text-muted text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* About */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div {...fadeUp}>
              <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #602628 0%, #9D5353 100%)' }}>
                <div className="aspect-[4/3] flex items-center justify-center">
                  <UtensilsCrossed className="w-16 h-16 text-white/20" />
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Our Story</span>
              <h2 className="mb-6">A Dining Experience Like No Other</h2>
              <div className="space-y-5">
                {[
                  { icon: ChefHat, text: 'Master chefs from Delhi and Lucknow curating every dish' },
                  { icon: Star, text: '100% authentic recipes using traditional cooking methods' },
                  { icon: Award, text: 'Exclusive seasonal menus featuring regional specialties' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(191, 139, 103, 0.1)' }}>
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-text-muted pt-1.5">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div className="section-title" {...fadeUp}>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Testimonials</span>
            <h2>What Our Guests Say</h2>
            <p>Hear from our beloved patrons</p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-10 md:p-12 text-center"
            >
              <Quote className="w-8 h-8 mx-auto mb-6" style={{ color: 'rgba(191, 139, 103, 0.3)' }} />
              <p className="text-lg leading-relaxed mb-8 text-text-muted italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-semibold">{testimonials[current].name}</p>
              <p className="text-sm text-text-muted">via {testimonials[current].source}</p>
            </motion.div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-primary' : 'w-2 bg-border'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Sunday CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-card p-12 md:p-16 text-center max-w-3xl mx-auto" style={{ background: 'rgba(96, 38, 40, 0.03)', borderColor: 'rgba(96, 38, 40, 0.1)' }}>
            <motion.div {...fadeUp}>
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Every Sunday</span>
              <h2 className="mb-4">Sundays at Our Table</h2>
              <p className="text-text-muted max-w-lg mx-auto mb-8">
                Join us for our signature Sunday brunch experience. Live music, special curated menu, 
                and the warmest hospitality in town.
              </p>
              <Link href="/sundays" className="btn-primary bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Awards */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div className="section-title" {...fadeUp}>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Recognition</span>
            <h2>Our Awards</h2>
            <p>Accolades from the finest platforms</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {['Zomato', 'Swiggy', 'Google', 'EazyDiner'].map((platform, i) => (
              <motion.div key={i} className="glass-card px-6 py-4 flex items-center gap-3" {...fadeUp} transition={{ delay: i * 0.05 }}>
                <Award className="w-5 h-5 text-accent" />
                <div>
                  <p className="font-semibold text-sm">{platform}</p>
                  <p className="text-xs text-text-muted">Top Rated 2024</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
