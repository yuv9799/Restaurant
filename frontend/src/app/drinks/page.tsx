'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import MenuCard from '@/components/MenuCard';
import { drinksApi } from '@/lib/api';

const drinkCategories = [
  { id: 'all', label: 'All' },
  { id: 'mocktails', label: 'Mocktails' },
  { id: 'cocktails', label: 'Cocktails' },
  { id: 'lassi-shakes', label: 'Lassi & Shakes' },
  { id: 'hot-beverages', label: 'Hot Beverages' },
  { id: 'soft-drinks', label: 'Soft Drinks' },
];

const sampleDrinks = [
  { _id: 'd1', name: 'Mint Cooler', description: 'Refreshing mint and lime cooler with a touch of honey', category: 'mocktails', price: 199, isBestSeller: true },
  { _id: 'd2', name: 'Mango Lassi', description: 'Thick creamy yogurt drink with Alphonso mango pulp', category: 'lassi-shakes', price: 179, isBestSeller: true },
  { _id: 'd3', name: 'Masala Chai', description: 'Traditional Indian spiced tea with ginger and cardamom', category: 'hot-beverages', price: 99, isBestSeller: true },
  { _id: 'd4', name: 'Virgin Mojito', description: 'Classic mojito with fresh mint, lime, and soda', category: 'mocktails', price: 219 },
  { _id: 'd5', name: 'Spiced Whiskey Sour', description: 'Whiskey sour with cardamom and cinnamon notes', category: 'cocktails', price: 529, isBestSeller: true },
  { _id: 'd6', name: 'Aam Panna', description: 'Traditional raw mango drink with cumin and mint', category: 'mocktails', price: 179, isBestSeller: true },
  { _id: 'd7', name: 'Sweet Lassi', description: 'Traditional sweet yogurt drink with cardamom', category: 'lassi-shakes', price: 149 },
  { _id: 'd8', name: 'Kashmiri Kahwa', description: 'Green tea with saffron, almonds, and dried fruits', category: 'hot-beverages', price: 149, isBestSeller: true },
  { _id: 'd9', name: 'Saffron Margarita', description: 'Premium tequila with saffron and lime', category: 'cocktails', price: 579, isBestSeller: true },
  { _id: 'd10', name: 'Fresh Lime Soda', description: 'Freshly squeezed lime with soda water', category: 'soft-drinks', price: 89 },
  { _id: 'd11', name: 'Rose Lassi', description: 'Rose-flavored creamy lassi with dry fruits', category: 'lassi-shakes', price: 189, isBestSeller: true },
  { _id: 'd12', name: 'Filter Coffee', description: 'South Indian filter coffee with frothy milk', category: 'hot-beverages', price: 119 },
];

export default function DrinksPage() {
  const [drinks, setDrinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { fetchDrinks(); }, [activeCategory, searchQuery]);

  const fetchDrinks = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (activeCategory !== 'all') params.category = activeCategory;
      if (searchQuery) params.search = searchQuery;
      const res = await drinksApi.getAll(params);
      setDrinks(res.data.drinks);
    } catch {
      let filtered = sampleDrinks;
      if (activeCategory !== 'all') filtered = filtered.filter(d => d.category === activeCategory);
      if (searchQuery) filtered = filtered.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setDrinks(filtered);
    } finally { setLoading(false); }
  };

  return (
    <div className="pt-24">
      <section className="pb-8 pt-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Beverages</span>
            <h1 className="mb-3">Drinks & Beverages</h1>
            <p className="text-text-muted text-sm">From traditional lassis to craft cocktails — find your perfect pairing</p>
          </div>

          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input type="text" placeholder="Search drinks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10 text-sm" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-text-muted" /></button>}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none justify-center flex-wrap">
            {drinkCategories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id ? 'bg-primary text-white' : 'bg-transparent text-text-muted hover:text-primary border border-border hover:border-primary/30'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card overflow-hidden"><div className="skeleton h-28" /><div className="p-6 space-y-3"><div className="skeleton h-5 w-3/4" /><div className="skeleton h-4 w-full" /></div></div>
              ))}
            </div>
          ) : drinks.length === 0 ? (
            <div className="text-center py-20"><p className="text-text-muted">No drinks found</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {drinks.map((drink: any) => (
                <MenuCard key={drink._id} name={drink.name} description={drink.description} price={drink.price} isVeg={true} isBestSeller={drink.isBestSeller} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
