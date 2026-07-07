'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Plus, Minus, X, ChevronDown } from 'lucide-react';
import MenuCard from '@/components/MenuCard';
import { menuApi } from '@/lib/api';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'breads', label: 'Breads' },
  { id: 'rice-biryani', label: 'Rice & Biryani' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'specials', label: 'Specials' },
];

const fallbackDishes = [
  { _id: '1', name: 'Butter Chicken', description: 'Tender chicken in rich tomato and butter gravy', price: 449, category: 'mains', isVeg: false, isChefSpecial: true, isBestSeller: true },
  { _id: '2', name: 'Dal Makhani', description: 'Slow-cooked black lentils with cream and butter', price: 379, category: 'mains', isVeg: true, isBestSeller: true },
  { _id: '3', name: 'Garlic Naan', description: 'Tandoor-baked leavened bread rubbed with garlic and butter', price: 79, category: 'breads', isVeg: true, isBestSeller: true },
  { _id: '4', name: 'Chicken Biryani', description: 'Aromatic basmati rice with tender marinated chicken', price: 399, category: 'rice-biryani', isVeg: false, isBestSeller: true },
  { _id: '5', name: 'Gulab Jamun', description: 'Deep-fried milk dumplings soaked in rose syrup', price: 149, category: 'desserts', isVeg: true, isBestSeller: true },
  { _id: '6', name: 'Paneer Tikka', description: 'Cottage cheese marinated in yogurt and spices, grilled in tandoor', price: 349, category: 'starters', isVeg: true, isChefSpecial: true, isBestSeller: true },
  { _id: '7', name: 'Chicken Tikka', description: 'Tender chicken marinated in aromatic spices, chargrilled', price: 399, category: 'starters', isVeg: false, isBestSeller: true },
  { _id: '8', name: 'Shahi Paneer', description: 'Royal paneer curry with creamy cashew and cream gravy', price: 419, category: 'mains', isVeg: true },
];

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'dish' | 'drink';
}

export default function MenuPage() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchDishes();
    const saved = localStorage.getItem('rn_cart');
    if (saved) try { setCart(JSON.parse(saved)); } catch {}
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    localStorage.setItem('rn_cart', JSON.stringify(cart));
  }, [cart]);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;
      const res = await menuApi.getAll(params);
      setDishes(res.data.dishes);
    } catch {
      let filtered = fallbackDishes;
      if (selectedCategory !== 'all') filtered = filtered.filter(d => d.category === selectedCategory);
      if (searchQuery) filtered = filtered.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setDishes(filtered);
    } finally {
      setLoading(false);
    }
  };

  const filtered = selectedCategory === 'all' && !searchQuery ? dishes : dishes;

  const addToCart = (dish: any) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === dish._id);
      if (existing) {
        return prev.map(item => item._id === dish._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { _id: dish._id, name: dish.name, price: dish.price, quantity: 1, type: 'dish' }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item._id !== id) return item;
      const newQty = item.quantity + delta;
      return newQty <= 0 ? null : { ...item, quantity: newQty };
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary to-primary/90 py-12 md:py-16">
        <div className="container-custom text-center">
          <motion.h1 className="text-white mb-4 text-3xl md:text-5xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Our Menu
          </motion.h1>
          <motion.p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Authentic North Indian cuisine crafted with passion
          </motion.p>
        </div>
      </section>

      {/* Cart FAB */}
      <button onClick={() => setCartOpen(true)} className="fixed bottom-6 right-6 z-40 bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95">
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{cartCount}</span>}
      </button>

      {/* Filters Bar */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="container-custom py-3 md:py-4">
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-text-muted" />
            <input type="text" placeholder="Search menu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10 md:pl-12 text-sm md:text-base" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-text-muted" /></button>}
          </div>
          {/* Mobile filter toggle */}
          <button onClick={() => setShowFilters(!showFilters)} className="md:hidden flex items-center gap-2 text-sm text-text-muted mb-2">
            Category <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <div className={`${showFilters ? 'flex' : 'hidden'} md:flex gap-2 overflow-x-auto pb-1 scrollbar-none`}>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setShowFilters(false); }} className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'bg-primary text-white' : 'bg-background text-text-muted hover:bg-border'}`}>
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
          ) : filtered.length === 0 ? (
            <div className="text-center py-16"><p className="text-text-muted text-lg md:text-xl">No dishes found</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filtered.map((dish: any) => (
                <div key={dish._id} className="relative">
                  <MenuCard name={dish.name} description={dish.description} price={dish.price} isVeg={dish.isVeg} isChefSpecial={dish.isChefSpecial} isBestSeller={dish.isBestSeller} />
                  <button onClick={() => addToCart(dish)} className="absolute bottom-4 right-4 bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary/90 transition-all active:scale-90 shadow-md">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-heading text-xl">Your Order ({cartCount})</h3>
              <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-background rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-text-muted text-center py-12">Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item._id} className="flex items-center justify-between bg-background rounded-xl p-3">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-text-muted text-xs">₹{item.price} × {item.quantity} = <span className="text-primary font-bold">₹{item.price * item.quantity}</span></p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => updateQty(item._id, -1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-border transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="font-semibold text-sm w-5 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item._id, 1)} className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => removeFromCart(item._id)} className="ml-1 p-1 text-error/60 hover:text-error"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-border p-4 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-text-muted">Subtotal</span><span className="font-bold">₹{cartTotal}</span></div>
                <div className="flex justify-between text-sm"><span className="text-text-muted">Tax (5%)</span><span className="font-bold">₹{Math.round(cartTotal * 0.05)}</span></div>
                <div className="flex justify-between text-lg font-bold text-primary border-t border-border pt-3"><span>Total</span><span>₹{cartTotal + Math.round(cartTotal * 0.05)}</span></div>
                <a href="/reservations?cart=1" className="btn-primary w-full justify-center text-sm md:text-base"><ShoppingCart className="w-4 h-4" /> Proceed to Checkout</a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
