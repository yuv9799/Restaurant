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

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

const testimonials = [
  {
    name: 'Priya Sharma',
    text: 'The butter chicken here is absolutely divine! Reminds me of my grandmother\'s cooking.',
    rating: 5,
    source: 'Zomato'
  },
  {
    name: 'Rahul Mehta',
    text: 'Best North Indian dining experience in the city. The dal makhani is a must-try!',
    rating: 5,
    source: 'Google'
  },
  {
    name: 'Ananya Patel',
    text: 'The Sunday brunch buffet is incredible. Such a warm and inviting atmosphere.',
    rating: 4,
    source: 'Swiggy'
  },
  {
    name: 'Vikram Singh',
    text: 'Exquisite flavors, beautiful presentation, and impeccable service. A true gem.',
    rating: 5,
    source: 'Zomato'
  }
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url('data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect fill="#602628"/><circle cx="200" cy="200" r="100" fill="#7a3032" opacity="0.3"/><circle cx="800" cy="400" r="150" fill="#9D5353" opacity="0.2"/><circle cx="400" cy="600" r="80" fill="#BF8B67" opacity="0.15"/><circle cx="1000" cy="200" r="120" fill="#7a3032" opacity="0.2"/><path d="M0 800 Q300 600 600 700 T1200 650 L1200 800 Z" fill="#FAF7F2" opacity="0.05"/></svg>')}` 
          }}
        />
        
        <div className="container-custom relative z-20 text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              className="text-accent font-medium tracking-widest uppercase mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to ReNorth
            </motion.p>
            
            <motion.h1 
              className="text-white mb-6 text-5xl md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Authentic North Indian <br />
              <span className="text-accent">Cuisine, Reimagined</span>
            </motion.h1>
            
            <motion.p 
              className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              From the foothills to your table — every dish tells a story.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/reservations" className="btn-primary text-lg px-10 py-4">
                <CalendarDays className="w-5 h-5" />
                Book a Table
              </Link>
              <Link href="/menu" className="btn-secondary border-white text-white hover:bg-white hover:text-primary text-lg px-10 py-4">
                <UtensilsCrossed className="w-5 h-5" />
                Explore Menu
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            className="section-title"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Why Choose ReNorth?</h2>
            <p>Experience the finest North Indian cuisine crafted with tradition and passion</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Wheat,
                title: 'Fresh Ingredients Daily',
                text: 'We source the finest spices and freshest produce every morning to ensure authentic flavors.'
              },
              {
                icon: ChefHat,
                title: 'Authentic Recipes',
                text: 'Our recipes have been passed down through generations, preserving the true taste of North India.'
              },
              {
                icon: Award,
                title: 'Award-Winning Service',
                text: 'Recognized for excellence in hospitality and culinary innovation across multiple platforms.'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="card p-8 text-center"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="mb-4">{feature.title}</h4>
                <p className="text-text-muted">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <hr className="divider container-custom" />

      {/* How It Works */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            className="section-title"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>How It Works</h2>
            <p>Your journey to an unforgettable dining experience</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-0.5 bg-border" />
            
            {[
              { step: '01', icon: UtensilsCrossed, title: 'Browse Menu', text: 'Explore our wide selection of authentic North Indian dishes' },
              { step: '02', icon: CalendarDays, title: 'Make a Reservation', text: 'Book your table online in just a few clicks' },
              { step: '03', icon: Sparkles, title: 'Dine with Us', text: 'Enjoy a memorable dining experience with family and friends' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <span className="text-accent font-bold text-sm">{item.step}</span>
                <h4 className="mt-2 mb-3">{item.title}</h4>
                <p className="text-text-muted">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider container-custom" />

      {/* Benefits Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                  <div className="text-center p-8">
                    <UtensilsCrossed className="w-20 h-20 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60 font-heading text-xl">A Taste of Tradition</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6">A Dining Experience <br />Like No Other</h2>
              <div className="space-y-6">
                {[
                  { icon: ChefHat, text: 'Master chefs from Delhi and Lucknow curating every dish' },
                  { icon: Wheat, text: '100% authentic recipes using traditional cooking methods' },
                  { icon: Soup, text: 'Exclusive seasonal menus featuring regional specialties' },
                  { icon: Salad, text: 'Farm-to-table ingredients sourced from local producers' },
                  { icon: Sparkles, text: 'Live music and curated ambiance for special evenings' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
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

      <hr className="divider container-custom" />

      {/* Testimonials Carousel */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            className="section-title"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>What Our Guests Say</h2>
            <p>Hear from our beloved patrons</p>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card p-10 text-center"
            >
              <Quote className="w-10 h-10 text-accent/40 mx-auto mb-6" />
              <p className="text-lg italic mb-8 text-text-muted">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <h4 className="mb-1">{testimonials[currentTestimonial].name}</h4>
              <span className="text-sm text-text-muted">
                via {testimonials[currentTestimonial].source}
              </span>
            </motion.div>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentTestimonial ? 'bg-primary w-8' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sunday Special CTA Banner */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-accent font-medium tracking-widest uppercase mb-4">Every Sunday</p>
            <h2 className="text-white mb-4">Sundays at Our Table</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join us for our signature Sunday brunch experience. Live music, special curated menu, 
              and the warmest hospitality in town.
            </p>
            <Link href="/sundays" className="btn-primary bg-accent text-white hover:bg-accent/90 px-10 py-4">
              Learn More
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Awards Preview */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            className="section-title"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Our Recognition</h2>
            <p>Awards and accolades from the finest platforms</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            {['Zomato', 'Swiggy', 'Google', 'EazyDiner'].map((platform, i) => (
              <motion.div
                key={i}
                className="card px-8 py-6 flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Award className="w-8 h-8 text-accent" />
                <div>
                  <p className="font-semibold">{platform}</p>
                  <p className="text-sm text-text-muted">Top Rated 2024</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}