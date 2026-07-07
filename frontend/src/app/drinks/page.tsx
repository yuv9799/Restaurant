'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Plus, ChevronDown, ShoppingCart } from 'lucide-react';
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
  { _id: 'd2', name: 'Mango Lassi', description: 'Thick and creamy yogurt drink with Alphonso mango pulp', category: 'lassi-shakes', price: 179, isBestSeller: true },
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
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchDrinks();
  }, [activeCategory, searchQuery]);

  const fetchDrinks = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (activeCategory !== 'all') params.category = activeCategory;
      if (searchQuery) params.search = searchQuery;
      const response = await drinksApi.getAll(params);
      setDrinks(response.data.drinks);
    } catch {
      let filtered = sampleDrinks;
      if (activeCategory !== 'all') filtered = filtered.filter(d => d.category === activeCategory);
      if (searchQuery) filtered = filtered.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setDrinks(filtered);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary to-primary/90 py-12 md:py-16">
        <div className="container-custom text-center">
          <motion.h1 className="text-white mb-4 text-3xl md:text-5xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Drinks & Beverages
          </motion.h1>
          <motion.p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            From traditional lassis to craft cocktails — find your perfect pairing
          </motion.p>
        </div>
      </section>

      <div className="sticky top-20 z-30 border-b border-border bg-white/95 backdrop-blur-md">
        <div className="container-custom py-3 md:py-4">
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-text-muted" />
            <input type="text" placeholder="Search drinks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10 md:pl-12 text-sm md:text-base" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-text-muted" /></button>}
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-2 text-sm text-text-muted mb-2">
            Category <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <div className={`${showFilters ? 'flex' : 'hidden'} md:flex gap-2 overflow-x-auto pb-1 scrollbar-none`}>
            {drinkCategories.map((cat) => (
              <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setShowFilters(false); }} className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-primary text-white' : 'bg-background text-text-muted hover:bg-border'}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding py-8 md:py-16">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card overflow-hidden"><div className="skeleton h-32" /><div className="p-4 md:p-6 space-y-3"><div className="skeleton h-5 w-3/4" /><div className="skeleton h-4 w-full" /><div className="skeleton h-4 w-1/2" /></div></div>
              ))}
            </div>
          ) : drinks.length === 0 ? (
            <div className="text-center py-16"><p className="text-text-muted text-lg md:text-xl">No drinks found</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {drinks.map((drink: any) => (
                <div key={drink._id} className="relative">
                  <MenuCard name={drink.name} description={drink.description} price={drink.price} isVeg={true} isBestSeller={drink.isBestSeller} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
