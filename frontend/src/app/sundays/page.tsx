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

  const totalSeats = sundayTables.reduce((acc, t) => acc + t.capacity, 0);
  const bookedSeats = sundayTables.filter(t => !t.available).reduce((acc, t) => acc + t.capacity, 0);
  const availableSeats = totalSeats - bookedSeats;

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary via-primary/90 to-accent/30 py-12 md:py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Sun className="w-8 h-8 md:w-12 md:h-12 text-accent mx-auto mb-3 md:mb-4" />
            <h1 className="text-white mb-3 md:mb-4 text-3xl md:text-5xl">Sundays at Our Table</h1>
            <p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto mb-6 md:mb-8 px-4">
              Every Sunday, we transform our restaurant into a celebration of food, music, and togetherness
            </p>
            <Link href="/reservations" className="btn-primary bg-accent text-white hover:bg-accent/90 inline-flex justify-center text-sm md:text-base">
              <CalendarDays className="w-4 h-4" />
              Reserve Your Sunday Table
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-8 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
            {[
              { icon: Music, title: 'Live Music', text: 'Enjoy live musical performances from 12 PM to 4 PM' },
              { icon: Coffee, title: 'Special Brunch Menu', text: 'Exclusive Sunday brunch with unlimited servings' },
              { icon: Sun, title: 'Family Atmosphere', text: 'Warm, welcoming vibes for the whole family' },
            ].map((item, i) => (
              <motion.div key={i} className="card p-6 md:p-8 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <item.icon className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <h4 className="text-base md:text-xl mb-1 md:mb-2">{item.title}</h4>
                <p className="text-text-muted text-sm md:text-base">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="section-title mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl">Sunday Table Availability</h2>
            <p className="text-sm md:text-base">Book your table for the upcoming Sundays - seats fill up fast!</p>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-border max-w-4xl mx-auto mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-4 md:mb-6">
              <div className="text-center">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-accent mx-auto mb-1 md:mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-primary">{availableSeats}</p>
                <p className="text-[10px] md:text-sm text-text-muted">Available</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-error">{bookedSeats}</p>
                <p className="text-[10px] md:text-sm text-text-muted">Booked</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">{totalSeats}</p>
                <p className="text-[10px] md:text-sm text-text-muted">Total</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
              <div className="bg-accent rounded-full h-2 md:h-3" style={{ width: `${(availableSeats / totalSeats) * 100}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-7xl mx-auto mb-8 md:mb-12">
            {sundayTables.map((table, index) => (
              <motion.div key={table.id} className={`rounded-xl md:rounded-2xl p-3 md:p-6 border-2 transition-all ${table.available ? 'bg-[#4A7C59]/10 border-[#4A7C59]' : 'bg-[#B33A3A]/10 border-[#B33A3A]'}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                <div className="text-center mb-2 md:mb-3">
                  <h3 className="text-sm md:text-lg font-bold text-primary">{table.table}</h3>
                  <p className="text-[10px] md:text-xs text-text-muted">Cap: {table.capacity}</p>
                </div>
                <div className="space-y-1">
                  {table.times.map((time, i) => (
                    <div key={i} className={`text-center py-0.5 md:py-1 rounded text-[10px] md:text-sm ${table.available ? 'bg-[#4A7C59]/20 text-[#4A7C59]' : 'bg-[#B33A3A]/20 text-[#B33A3A]'}`}>
                      {time}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-[#4A7C59]" />
              <span className="text-[10px] md:text-sm text-text-muted">Available</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-[#B33A3A]" />
              <span className="text-[10px] md:text-sm text-text-muted">Booked</span>
            </div>
          </div>

          <div className="text-center">
            <Link href="/reservations" className="btn-primary inline-flex items-center gap-2 text-sm md:text-base">
              <CalendarDays className="w-4 h-4 md:w-5 md:h-5" />
              Reserve Your Sunday Table
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
