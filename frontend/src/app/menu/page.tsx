'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Minus, X, ShoppingCart } from 'lucide-react';
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
  _id: string; name: string; price: number; quantity: number; type: string;
}

export default function MenuPage() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetchDishes();
    const saved = localStorage.getItem('rn_cart');
    if (saved) try { setCart(JSON.parse(saved)); } catch {}
  }, [selectedCategory, searchQuery]);

  useEffect(() => { localStorage.setItem('rn_cart', JSON.stringify(cart)); }, [cart]);

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
    } finally { setLoading(false); }
  };

  const addToCart = (dish: any) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === dish._id);
      if (existing) return prev.map(item => item._id === dish._id ? { ...item, quantity: item.quantity + 1 } : item);
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

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item._id !== id));

  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="pt-24">
      <section className="pb-8 pt-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Our Menu</span>
            <h1 className="mb-3">Explore Our Menu</h1>
            <p className="text-text-muted text-sm">Authentic North Indian cuisine crafted with tradition and passion</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input type="text" placeholder="Search menu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10 text-sm" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-text-muted" /></button>}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none justify-center flex-wrap">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id ? 'bg-primary text-white' : 'bg-transparent text-text-muted hover:text-primary border border-border hover:border-primary/30'
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
          ) : dishes.length === 0 ? (
            <div className="text-center py-20"><p className="text-text-muted">No dishes found</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {dishes.map((dish: any) => (
                <div key={dish._id} className="relative group">
                  <MenuCard name={dish.name} description={dish.description} price={dish.price} isVeg={dish.isVeg} isChefSpecial={dish.isChefSpecial} isBestSeller={dish.isBestSeller} />
                  <button onClick={() => addToCart(dish)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white hover:border-primary shadow-sm">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {cartCount > 0 && (
        <button onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-primary text-white w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">{cartCount}</span>
        </button>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h3 className="font-heading text-lg">Your Order</h3>
              <button onClick={() => setCartOpen(false)} className="p-1.5 hover:bg-background rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-text-muted text-center py-12 text-sm">Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item._id} className="flex items-center justify-between bg-background rounded-xl p-3">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-text-muted text-xs mt-0.5">₹{item.price} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateQty(item._id, -1)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-border transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="font-semibold text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item._id, 1)} className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => removeFromCart(item._id)} className="ml-1.5 p-1 text-error/50 hover:text-error"><X className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-text-muted">Subtotal</span><span className="font-semibold">₹{cartTotal}</span></div>
                <div className="flex justify-between text-sm"><span className="text-text-muted">Tax (5%)</span><span className="font-semibold">₹{Math.round(cartTotal * 0.05)}</span></div>
                <div className="flex justify-between font-bold text-primary border-t border-border pt-3"><span>Total</span><span>₹{cartTotal + Math.round(cartTotal * 0.05)}</span></div>
                <a href="/reservations?cart=1" className="btn-primary w-full justify-center"><ShoppingCart className="w-4 h-4" /> Proceed to Checkout</a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
