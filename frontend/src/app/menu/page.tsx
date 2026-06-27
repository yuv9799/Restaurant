'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import MenuCard from '@/components/MenuCard';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'breads', label: 'Breads' },
  { id: 'rice-biryani', label: 'Rice & Biryani' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'specials', label: 'Specials' },
];

const dishes = [
  { _id: '1', name: 'Butter Chicken', description: 'Chicken in creamy tomato-butter gravy', price: 449, category: 'mains', isVeg: false, isChefSpecial: true, isBestSeller: true },
  { _id: '2', name: 'Dal Makhani', description: 'Black lentils slow-cooked with cream', price: 379, category: 'mains', isVeg: true, isBestSeller: true },
  { _id: '3', name: 'Garlic Naan', description: 'Tandoor baked bread with garlic butter', price: 79, category: 'breads', isVeg: true },
  { _id: '4', name: 'Chicken Biryani', description: 'Aromatic basmati rice with chicken', price: 399, category: 'rice-biryani', isVeg: false, isBestSeller: true },
  { _id: '5', name: 'Gulab Jamun', description: 'Milk dumplings in rose syrup', price: 149, category: 'desserts', isVeg: true },
  { _id: '6', name: 'Paneer Tikka', description: 'Grilled cottage cheese in spices', price: 349, category: 'starters', isVeg: true, isChefSpecial: true },
  { _id: '7', name: 'Chicken Tikka', description: 'Char-grilled chicken marinated in yogurt and spices', price: 399, category: 'starters', isVeg: false, isBestSeller: true },
  { _id: '8', name: 'Aloo Paratha', description: 'Stuffed wheat flatbread with spiced potatoes', price: 79, category: 'breads', isVeg: true },
  { _id: '9', name: 'Veg Pulao', description: 'Fragrant rice with mixed vegetables', price: 249, category: 'rice-biryani', isVeg: true },
  { _id: '10', name: 'Mutton Rogan Josh', description: 'Tender lamb in aromatic Kashmiri spices', price: 549, category: 'mains', isVeg: false, isChefSpecial: true },
  { _id: '11', name: 'Shahi Paneer', description: 'Cottage cheese in rich cashew-cream gravy', price: 399, category: 'mains', isVeg: true },
  { _id: '12', name: 'Fish Curry', description: 'Coastal-style fish in coconut-tamarind gravy', price: 449, category: 'mains', isVeg: false },
  { _id: '13', name: 'Chole Bhature', description: 'Spiced chickpeas with fluffy fried bread', price: 299, category: 'mains', isVeg: true, isBestSeller: true },
  { _id: '14', name: 'Rasmalai', description: 'Soft paneer discs in saffron milk', price: 179, category: 'desserts', isVeg: true },
  { _id: '15', name: 'Kheer', description: 'Traditional rice pudding with nuts', price: 149, category: 'desserts', isVeg: true },
  { _id: '16', name: 'Tandoori Roti', description: 'Clay oven baked whole wheat bread', price: 45, category: 'breads', isVeg: true },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = dishes.filter((dish: any) => {
    const matchCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    const matchSearch = !searchQuery || dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary to-primary/90 py-16">
        <div className="container-custom text-center">
          <motion.h1 className="text-white mb-4" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            Our Menu
          </motion.h1>
          <motion.p className="text-white/80 max-w-2xl mx-auto" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
            Authentic North Indian cuisine crafted with passion
          </motion.p>
        </div>
      </section>

      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="container-custom py-4">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id ? 'bg-primary text-white' : 'bg-background text-text-muted hover:bg-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-muted text-xl">No dishes found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((dish: any) => (
                <MenuCard
                  key={dish._id}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                  isVeg={dish.isVeg}
                  isChefSpecial={dish.isChefSpecial}
                  isBestSeller={dish.isBestSeller}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
