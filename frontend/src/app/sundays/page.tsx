'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarDays, Music, Sun, Coffee, ArrowRight, Users } from 'lucide-react';

export default function SundaysPage() {
  const sundayTables = [
    { id: 1, table: 'Table 1', capacity: 4, available: true, times: ['11:30 AM', '1:30 PM', '3:30 PM'] },
    { id: 2, table: 'Table 2', capacity: 4, available: false, times: ['11:30 AM'] },
    { id: 3, table: 'Table 3', capacity: 6, available: true, times: ['11:30 AM', '1:30 PM'] },
    { id: 4, table: 'Table 4', capacity: 6, available: true, times: ['1:30 PM', '3:30 PM'] },
    { id: 5, table: 'Table 5', capacity: 8, available: false, times: ['11:30 AM'] },
    { id: 6, table: 'Table 6', capacity: 8, available: true, times: ['11:30 AM', '1:30 PM', '3:30 PM'] },
    { id: 7, table: 'Table 7', capacity: 10, available: true, times: ['1:30 PM', '3:30 PM'] },
    { id: 8, table: 'Table 8', capacity: 10, available: true, times: ['11:30 AM', '1:30 PM', '3:30 PM'] },
  ];

  const total = sundayTables.reduce((a, t) => a + t.capacity, 0);
  const booked = sundayTables.filter(t => !t.available).reduce((a, t) => a + t.capacity, 0);
  const available = total - booked;

  return (
    <div className="pt-24">
      <section className="pb-8 pt-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <Sun className="w-10 h-10 text-accent mx-auto mb-4" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Every Sunday</span>
            <h1 className="mb-3">Sundays at Our Table</h1>
            <p className="text-text-muted text-sm max-w-lg mx-auto mb-8">
              Every Sunday, we transform our restaurant into a celebration of food, music, and togetherness
            </p>
            <Link href="/reservations" className="btn-primary bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20">
              <CalendarDays className="w-4 h-4" /> Reserve Your Sunday Table
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto">
            {[
              { icon: Music, title: 'Live Music', text: 'Enjoy live musical performances from 12 PM to 4 PM' },
              { icon: Coffee, title: 'Special Brunch Menu', text: 'Exclusive Sunday brunch with unlimited servings' },
              { icon: Sun, title: 'Family Atmosphere', text: 'Warm, welcoming vibes for the whole family' },
            ].map((item, i) => (
              <motion.div key={i} className="glass-card p-6 text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-accent/10">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-sm mb-1.5">{item.title}</h4>
                <p className="text-text-muted text-xs">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center mb-8">
            <h3>Table Availability</h3>
            <p className="text-sm text-text-muted mt-2">Book your table for the upcoming Sundays</p>
          </div>

          <div className="glass-card p-6 max-w-lg mx-auto mb-10 text-center">
            <div className="flex items-center justify-center gap-8 mb-4">
              <div><Users className="w-6 h-6 text-accent mx-auto mb-1" /><p className="text-2xl font-bold text-primary">{available}</p><p className="text-xs text-text-muted">Available</p></div>
              <div><p className="text-2xl font-bold text-error">{booked}</p><p className="text-xs text-text-muted mt-1">Booked</p></div>
              <div><p className="text-2xl font-bold text-primary">{total}</p><p className="text-xs text-text-muted mt-1">Total</p></div>
            </div>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${(available / total) * 100}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
            {sundayTables.map((t, i) => (
              <motion.div key={t.id} className={`rounded-xl p-4 border-2 ${t.available ? 'border-success/20 bg-success/5' : 'border-error/20 bg-error/5'}`}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                <div className="text-center mb-2">
                  <h4 className="text-sm font-bold">{t.table}</h4>
                  <p className="text-[10px] text-text-muted">Cap: {t.capacity}</p>
                </div>
                <div className="space-y-1">
                  {t.times.map((time, j) => (
                    <div key={j} className={`text-center py-0.5 rounded text-[10px] ${t.available ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>{time}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-success" /><span className="text-xs text-text-muted">Available</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-error" /><span className="text-xs text-text-muted">Booked</span></div>
          </div>

          <div className="text-center">
            <Link href="/reservations" className="btn-primary inline-flex"><CalendarDays className="w-4 h-4" /> Reserve Your Sunday Table <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
