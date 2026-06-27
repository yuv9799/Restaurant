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
  { _id: 'd2', name: 'Mango Lassi', description: 'Thick and creamy yogurt drink with Alphonso mango pulp', category: 'lassi-shakes', price: 179, isBestSeller: true },
  { _id: 'd3', name: 'Masala Chai', description: 'Traditional Indian spiced tea with ginger and cardamom', category: 'hot-beverages', price: 99, isBestSeller: true },
  { _id: 'd4', name: 'Virgin Mojito', description: 'Classic mojito with fresh mint, lime, and soda', category: 'mocktails', price: 219 },
  { _id: 'd5', name: 'Spiced Whiskey Sour', description: 'Whiskey sour with cardamom and cinnamon notes', category: 'cocktails', price: 529, isBestSeller: true },
  { _id: 'd6', name: 'Aam Panna', description: 'Traditional raw mango drink with cumin and mint', category: 'mocktails', price: 179, isBestSeller: true },
  { _id: 'd7', name: 'Sweet Lassi', description: 'Traditional sweet yogurt drink with cardamom', category: 'lassi-shakes', price: 149 },
  { _id: 'd8', name: 'Kashmiri Kahwa', description: 'Green tea with saffron, almonds, and dried fruits', category: 'hot-beverages', price: 149, isBestSeller: true },
  { _id: 'd9', name: 'Saffron Margarita', description: 'Premium tequila with saffron and lime', category: 'cocktails', price: 579, isBestSeller: true },
  { _id: 'd10', name: 'Fresh Lime Soda', description: 'Freshly squeezed lime with soda water', category: 'soft-drinks', price: 89, isBestSeller: true },
  { _id: 'd11', name: 'Old Delhi Martini', description: 'Gin martini with a twist of Indian botanicals', category: 'cocktails', price: 499, isBestSeller: true },
  { _id: 'd12', name: 'Buttermilk (Chaas)', description: 'Spiced buttermilk with mint and cumin', category: 'soft-drinks', price: 79 },
  { _id: 'd13', name: 'Rose Lassi', description: 'Rose-flavored creamy lassi with dry fruits', category: 'lassi-shakes', price: 189, isBestSeller: true },
  { _id: 'd14', name: 'Mango Bellini', description: 'Sparkling wine with Alphonso mango puree', category: 'cocktails', price: 549 },
  { _id: 'd15', name: 'Filter Coffee', description: 'South Indian filter coffee with frothy milk', category: 'hot-beverages', price: 119 },
  { _id: 'd16', name: 'Oreo Shake', description: 'Creamy chocolate shake with Oreo cookies', category: 'lassi-shakes', price: 219 },
  { _id: 'd17', name: 'Hot Chocolate', description: 'Rich and creamy hot chocolate with marshmallows', category: 'hot-beverages', price: 179 },
  { _id: 'd18', name: 'Fruit Punch', description: 'Mixed fruit juice punch with seasonal fruits', category: 'mocktails', price: 209 },
  { _id: 'd19', name: 'Blue Lagoon', description: 'Blue curacao mocktail with lemonade and cherry', category: 'mocktails', price: 239 },
  { _id: 'd20', name: 'Coconut Water', description: 'Chilled tender coconut water', category: 'soft-drinks', price: 99 },
];

export default function DrinksPage() {
  const [drinks, setDrinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    } catch (error) {
      console.error('Error fetching drinks, using sample:', error);
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
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <motion.h1 className="text-white mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Drinks & Beverages
          </motion.h1>
          <motion.p className="text-white/80 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            From traditional lassis to craft cocktails — find your perfect pairing
          </motion.p>
        </div>
      </section>

      <div className="border-b border-border bg-white">
        <div className="container-custom py-4">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input type="text" placeholder="Search drinks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-12" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-text-muted" /></button>}
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {drinkCategories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-primary text-white' : 'bg-background text-text-muted hover:bg-border'}`}>{cat.label}</button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card overflow-hidden">
                  <div className="skeleton h-48" /><div className="p-6 space-y-3"><div className="skeleton h-6 w-3/4" /><div className="skeleton h-4 w-full" /><div className="skeleton h-4 w-1/2" /></div>
                </div>
              ))}
            </div>
          ) : drinks.length === 0 ? (
            <div className="text-center py-20"><p className="text-text-muted text-xl">No drinks found</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {drinks.map((drink: any) => (
                <MenuCard key={drink._id} name={drink.name} description={drink.description} price={drink.price} isVeg={true} isBestSeller={drink.isBestSeller}  />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}