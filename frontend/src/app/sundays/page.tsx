'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarDays, Music, Sun, Coffee, ArrowRight, Users } from 'lucide-react';

export default function SundaysPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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
      <section className="bg-gradient-to-br from-primary via-primary/90 to-accent/30 py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Sun className="w-12 h-12 text-accent mx-auto mb-4" />
            <h1 className="text-white mb-4">Sundays at Our Table</h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8">
              Every Sunday, we transform our restaurant into a celebration of food, music, and togetherness
            </p>
            <Link href="/reservations" className="btn-primary bg-accent text-white hover:bg-accent/90">
              <CalendarDays className="w-4 h-4" />
              Reserve Your Sunday Table
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Music, title: 'Live Music', text: 'Enjoy live musical performances from 12 PM to 4 PM' },
              { icon: Coffee, title: 'Special Brunch Menu', text: 'Exclusive Sunday brunch with unlimited servings' },
              { icon: Sun, title: 'Family Atmosphere', text: 'Warm, welcoming vibes for the whole family' },
            ].map((item, i) => (
              <motion.div key={i} className="card p-8 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                <h4 className="mb-2">{item.title}</h4>
                <p className="text-text-muted">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="section-title">
            <h2>Sunday Table Availability</h2>
            <p>Book your table for the upcoming Sundays - seats fill up fast!</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-3xl font-bold text-primary">{availableSeats}</p>
                <p className="text-sm text-text-muted">Seats Available</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#B33A3A]">{bookedSeats}</p>
                <p className="text-sm text-text-muted">Already Booked</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{totalSeats}</p>
                <p className="text-sm text-text-muted">Total Capacity</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-accent rounded-full h-3" style={{ width: `${(availableSeats / totalSeats) * 100}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {sundayTables.map((table, index) => (
              <motion.div
                key={table.id}
                className={`rounded-2xl p-6 border-2 transition-all ${
                  table.available
                    ? 'bg-[#4A7C59]/10 border-[#4A7C59]'
                    : 'bg-[#B33A3A]/10 border-[#B33A3A]'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="text-center mb-3">
                  <h3 className="text-lg font-bold text-primary">{table.table}</h3>
                  <p className="text-xs text-text-muted">Capacity: {table.capacity} guests</p>
                </div>
                <div className="space-y-1">
                  {table.times.map((time, i) => (
                    <div
                      key={i}
                      className={`text-center py-1 rounded text-sm ${
                        table.available
                          ? 'bg-[#4A7C59]/20 text-[#4A7C59]'
                          : 'bg-[#B33A3A]/20 text-[#B33A3A]'
                      }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#4A7C59]" />
              <span className="text-sm text-text-muted">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#B33A3A]" />
              <span className="text-sm text-text-muted">Booked</span>
            </div>
          </div>

          <div className="text-center">
            <Link href="/reservations" className="btn-primary inline-flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Reserve Your Sunday Table
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
