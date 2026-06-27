'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarDays, Music, Sun, Coffee, ArrowRight } from 'lucide-react';
import { tablesApi } from '@/lib/api';

export default function SundaysPage() {
  const [tables, setTables] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTableStatus();
  }, [selectedDate]);

  const fetchTableStatus = async () => {
    setLoading(true);
    try {
      const response = await tablesApi.getStatus(selectedDate);
      setTables(response.data.tables);
    } catch (error) {
      console.error('Error fetching table status:', error);
      setTables([]);
    } finally {
      setLoading(false);
    }
  };

  const getNextSunday = () => {
    const date = new Date();
    date.setDate(date.getDate() + ((7 - date.getDay() + 1) % 7 || 7));
    return date;
  };

  return (
    <div className="pt-20">
      {/* Hero */}
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

      {/* Experience */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Music, title: 'Live Music', text: 'Enjoy live musical performances' },
              { icon: Coffee, title: 'Special Brunch Menu', text: 'Exclusive Sunday brunch curated by our chefs' },
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

          {/* Live Table Availability */}
          <div className="section-title">
            <h2>Live Table Availability</h2>
            <p>See what's available this Sunday</p>
          </div>

          <div className="max-w-lg mx-auto mb-8">
            <label className="block text-sm font-medium mb-2">Select Date</label>
            <input type="date" className="input-field" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
          </div>

          {loading ? (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="skeleton h-24 rounded-2xl" />
              ))}
            </div>
          ) : tables.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted">No tables configured yet</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
                <div className="flex justify-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#4A7C59]" />
                    <span className="text-sm text-text-muted">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#B33A3A]" />
                    <span className="text-sm text-text-muted">Booked</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tables.map((table: any) => (
                    <motion.div
                      key={table._id}
                      className={`p-6 rounded-2xl text-center transition-all ${
                        table.isBooked
                          ? 'bg-[#B33A3A]/10 border-2 border-[#B33A3A]'
                          : 'bg-[#4A7C59]/10 border-2 border-[#4A7C59]'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-lg font-bold">{table.tableNumber}</p>
                      <p className="text-xs text-text-muted">Table {table.tableNumber}</p>
                      <p className="text-xs text-text-muted">Capacity: {table.capacity}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="text-center mt-8">
                <Link href="/reservations" className="btn-primary">
                  <CalendarDays className="w-4 h-4" />
                  Reserve Your Sunday Table
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}