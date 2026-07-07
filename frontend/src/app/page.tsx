'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, UtensilsCrossed, ChefHat, Award, Star, 
  Wheat, Soup, Salad, Sparkles, CalendarDays, ChevronLeft, ChevronRight,
  Quote
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const testimonials = [
  { name: 'Priya Sharma', text: 'The butter chicken here is absolutely divine! Reminds me of my grandmother\'s cooking.', rating: 5, source: 'Zomato' },
  { name: 'Rahul Mehta', text: 'Best North Indian dining experience in the city. The dal makhani is a must-try!', rating: 5, source: 'Google' },
  { name: 'Ananya Patel', text: 'The Sunday brunch buffet is incredible. Such a warm and inviting atmosphere.', rating: 4, source: 'Swiggy' },
  { name: 'Vikram Singh', text: 'Exquisite flavors, beautiful presentation, and impeccable service. A true gem.', rating: 5, source: 'Zomato' }
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="relative min-h-[70vh] md:min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90 z-10" />
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url('data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="#602628"/><circle cx="200" cy="200" r="100" fill="#7a3032" opacity="0.3"/><circle cx="800" cy="400" r="150" fill="#9D5353" opacity="0.2"/><circle cx="400" cy="600" r="80" fill="#BF8B67" opacity="0.15"/><circle cx="1000" cy="200" r="120" fill="#7a3032" opacity="0.2"/><path d="M0 800 Q300 600 600 700 T1200 650 L1200 800 Z" fill="#FAF7F2" opacity="0.05"/></svg>')}` }} />
        <div className="container-custom relative z-20 text-center py-16 md:py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.p className="text-accent font-medium tracking-widest uppercase mb-4 md:mb-6 text-xs md:text-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              Welcome to ReNorth
            </motion.p>
            <motion.h1 className="text-white mb-4 md:mb-6 text-4xl md:text-7xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Authentic North Indian <br />
              <span className="text-accent">Cuisine, Reimagined</span>
            </motion.h1>
            <motion.p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-12 px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              From the foothills to your table — every dish tells a story.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Link href="/reservations" className="btn-primary text-base md:text-lg px-6 md:px-10 py-3 md:py-4 justify-center">
                <CalendarDays className="w-4 h-4 md:w-5 md:h-5" />
                Book a Table
              </Link>
              <Link href="/menu" className="btn-secondary border-white text-white hover:bg-white hover:text-primary text-base md:text-lg px-6 md:px-10 py-3 md:py-4 justify-center">
                <UtensilsCrossed className="w-4 h-4 md:w-5 md:h-5" />
                Explore Menu
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-12 md:py-20 bg-background">
        <div className="container-custom">
          <motion.div className="section-title mb-8 md:mb-12" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-2xl md:text-4xl">Why Choose ReNorth?</h2>
            <p className="text-sm md:text-base">Experience the finest North Indian cuisine crafted with tradition and passion</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Wheat, title: 'Fresh Ingredients Daily', text: 'We source the finest spices and freshest produce every morning to ensure authentic flavors.' },
              { icon: ChefHat, title: 'Authentic Recipes', text: 'Our recipes have been passed down through generations, preserving the true taste of North India.' },
              { icon: Award, title: 'Award-Winning Service', text: 'Recognized for excellence in hospitality and culinary innovation across multiple platforms.' }
            ].map((feature, i) => (
              <motion.div key={i} className="card p-6 md:p-8 text-center" variants={fadeInUp}>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h4 className="text-lg md:text-xl mb-2 md:mb-4">{feature.title}</h4>
                <p className="text-text-muted text-sm md:text-base">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider container-custom my-0" />

      <section className="section-padding py-12 md:py-20 bg-background">
        <div className="container-custom">
          <motion.div className="section-title mb-8 md:mb-12" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-2xl md:text-4xl">How It Works</h2>
            <p className="text-sm md:text-base">Your journey to an unforgettable dining experience</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-0.5 bg-border" />
            {[
              { step: '01', icon: UtensilsCrossed, title: 'Browse Menu', text: 'Explore our wide selection of authentic North Indian dishes' },
              { step: '02', icon: CalendarDays, title: 'Make a Reservation', text: 'Book your table online in just a few clicks' },
              { step: '03', icon: Sparkles, title: 'Dine with Us', text: 'Enjoy a memorable dining experience with family and friends' }
            ].map((item, i) => (
              <motion.div key={i} className="text-center relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}>
                <div className="w-16 h-16 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 relative z-10">
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <span className="text-accent font-bold text-xs md:text-sm">{item.step}</span>
                <h4 className="text-lg md:text-xl mt-2 mb-2 md:mb-3">{item.title}</h4>
                <p className="text-text-muted text-sm md:text-base">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider container-custom my-0" />

      <section className="section-padding py-12 md:py-20 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                  <div className="text-center p-8">
                    <UtensilsCrossed className="w-12 h-12 md:w-20 md:h-20 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60 font-heading text-lg md:text-xl">A Taste of Tradition</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-4xl mb-4 md:mb-6">A Dining Experience Like No Other</h2>
              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: ChefHat, text: 'Master chefs from Delhi and Lucknow curating every dish' },
                  { icon: Wheat, text: '100% authentic recipes using traditional cooking methods' },
                  { icon: Soup, text: 'Exclusive seasonal menus featuring regional specialties' },
                  { icon: Salad, text: 'Farm-to-table ingredients sourced from local producers' },
                  { icon: Sparkles, text: 'Live music and curated ambiance for special evenings' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                    </div>
                    <p className="text-text-muted text-sm md:text-base pt-1 md:pt-1.5">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <hr className="divider container-custom my-0" />

      <section className="section-padding py-12 md:py-20 bg-background">
        <div className="container-custom">
          <motion.div className="section-title mb-8 md:mb-12" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-2xl md:text-4xl">What Our Guests Say</h2>
            <p className="text-sm md:text-base">Hear from our beloved patrons</p>
          </motion.div>
          <div className="max-w-3xl mx-auto relative">
            <motion.div key={currentTestimonial} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="card p-6 md:p-10 text-center">
              <Quote className="w-6 h-6 md:w-10 md:h-10 text-accent/40 mx-auto mb-4 md:mb-6" />
              <p className="text-base md:text-lg italic mb-6 md:mb-8 text-text-muted">&ldquo;{testimonials[currentTestimonial].text}&rdquo;</p>
              <div className="flex justify-center gap-1 mb-3 md:mb-4">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent" />
                ))}
              </div>
              <h4 className="text-lg md:text-xl mb-1">{testimonials[currentTestimonial].name}</h4>
              <span className="text-xs md:text-sm text-text-muted">via {testimonials[currentTestimonial].source}</span>
            </motion.div>
            <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrentTestimonial(i)} className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${i === currentTestimonial ? 'bg-primary w-6 md:w-8' : 'bg-border'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-12 md:py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-accent font-medium tracking-widest uppercase mb-3 md:mb-4 text-xs md:text-sm">Every Sunday</p>
            <h2 className="text-white mb-3 md:mb-4 text-2xl md:text-4xl">Sundays at Our Table</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base px-4">
              Join us for our signature Sunday brunch experience. Live music, special curated menu, 
              and the warmest hospitality in town.
            </p>
            <Link href="/sundays" className="btn-primary bg-accent text-white hover:bg-accent/90 px-6 md:px-10 py-3 md:py-4 inline-flex justify-center text-sm md:text-base">
              Learn More <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-padding py-12 md:py-20 bg-background">
        <div className="container-custom">
          <motion.div className="section-title mb-8 md:mb-12" initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-2xl md:text-4xl">Our Recognition</h2>
            <p className="text-sm md:text-base">Awards and accolades from the finest platforms</p>
          </motion.div>
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-8">
            {['Zomato', 'Swiggy', 'Google', 'EazyDiner'].map((platform, i) => (
              <motion.div key={i} className="card px-4 md:px-8 py-4 md:py-6 flex items-center gap-3 md:gap-4" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Award className="w-5 h-5 md:w-8 md:h-8 text-accent" />
                <div>
                  <p className="font-semibold text-sm md:text-base">{platform}</p>
                  <p className="text-xs md:text-sm text-text-muted">Top Rated 2024</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
