'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Gem, Cake, Diamond, Sparkles, PartyPopper, Smile, MoreHorizontal,
  Users, CalendarDays, Clock, ChevronLeft, ChevronRight, Check, Plus, Minus,
  UtensilsCrossed, Flame, Flower2, Minus as MinusIcon, Music, Guitar, Piano,
  VolumeX, Music2, Sun, Lamp, Flower, Sprout, X, BookOpen, PenLine, Camera,
  ChefHat, IceCream, ArrowRight, Loader2, CheckCircle, Send, Star, Quote,
  Shield, User, Share2, AlertTriangle, Wand2, Eye, EyeOff, Phone, Mail,
  MessageCircle, CalendarCheck, Sparkle, Crown, Wine, GlassWater, Salad,
  Soup, Beef, Fish, Cookie, Coffee, RefreshCcw, Info, CheckCheck,
} from 'lucide-react';
import {
  BASE_EXPERIENCE_PRICE, occasions, guestOptions, timeSlots,
  starters, mains, desserts, welcomeDrinks, pairingOptions,
  tableSettings, musicOptions, lightingOptions, flowerOptions,
  experiences, dietaryPreferences, spiceLevels, tastePreferences,
  chefFreedomOptions, contactMethods, sampleExperiences,
} from '@/lib/privateDiningData';

// ---------- Icon Mapper ----------
const iconMap: Record<string, any> = {
  Heart, Gem, Cake, Diamond, Sparkles, PartyPopper, Smile, MoreHorizontal,
  UtensilsCrossed, Flame, Flower2, Minus: MinusIcon, Music, Guitar, Piano,
  VolumeX, Music2, Sun, Lamp, Flower, Sprout, X, BookOpen, PenLine, Camera,
  ChefHat, IceCream, Star, Users, Crown, Wine, GlassWater, Salad, Soup,
  Beef, Fish, Cookie, Coffee, Sparkle, Shield, Wand2,
};

// ---------- Steps ----------
const steps = [
  { id: 1, label: 'Guests' },
  { id: 2, label: 'Date' },
  { id: 3, label: 'Dining' },
  { id: 4, label: 'Drinks' },
  { id: 5, label: 'Experience' },
  { id: 6, label: 'Special Requests' },
  { id: 7, label: 'Review' },
];

// ---------- Types ----------
interface GuestSelections {
  starters: string[];
  mains: string[];
  desserts: string[];
  drink: string;
}

const createGuestSelection = (): GuestSelections => ({ starters: [], mains: [], desserts: [], drink: '' });

interface ExperienceState {
  step: number;
  guestType: string;
  occasion: string;
  date: string;
  time: string;
  altTime: string;
  guestSelections: GuestSelections[];
  shared: { starters: string[]; mains: string[]; desserts: string[] };
  dietary: string[];
  allergies: string;
  spiceLevel: string;
  tastes: string[];
  loveIngredients: string[];
  dislikeIngredients: string[];
  welcomeDrink: string;
  pairing: string;
  tableSetting: string;
  music: string;
  lighting: string;
  flowers: string;
  selectedExperiences: string[];
  chefFreedom: boolean;
  chefFreedomSelections: string[];
  imagination: string;
  specialRequests: string;
  booking: {
    name: string; email: string; phone: string; partnerName: string;
    contactMethod: string; occasionDetails: string; notes: string;
  };
  confirmed: boolean;
  bookingRef: string;
  guest1: GuestSelections;
  guest2: GuestSelections;
}

const initialState: ExperienceState = {
  step: 1,
  guestType: 'couple',
  occasion: '',
  date: '',
  time: '',
  altTime: '',
  guestSelections: [createGuestSelection(), createGuestSelection()],
  shared: { starters: [], mains: [], desserts: [] },
  dietary: [],
  allergies: '',
  spiceLevel: '',
  tastes: [],
  loveIngredients: [],
  dislikeIngredients: [],
  welcomeDrink: '',
  pairing: '',
  tableSetting: '',
  music: '',
  lighting: '',
  flowers: '',
  selectedExperiences: [],
  chefFreedom: false,
  chefFreedomSelections: [],
  imagination: '',
  specialRequests: '',
  booking: {
    name: '', email: '', phone: '', partnerName: '',
    contactMethod: 'Email', occasionDetails: '', notes: '',
  },
  confirmed: false,
  bookingRef: '',
  guest1: createGuestSelection(),
  guest2: createGuestSelection(),
};

// ---------- Helper: find item by id ----------
const findItem = (list: any[], id: string) => list.find(i => i.id === id);

type DishCategory = 'starters' | 'mains' | 'desserts';

function GuestMenuCard({
  guest,
  guestIndex,
  onToggle,
}: {
  guest: GuestSelections;
  guestIndex: number;
  onToggle: (category: DishCategory, id: string) => void;
}) {
  const menus: { category: DishCategory; label: string; dishes: typeof starters }[] = [
    { category: 'starters', label: 'Starters', dishes: starters },
    { category: 'mains', label: 'Main Course', dishes: mains },
    { category: 'desserts', label: 'Desserts', dishes: desserts },
  ];

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h5 className="font-semibold text-sm">Guest {guestIndex + 1}</h5>
          <p className="text-xs text-text-muted">What would you like?</p>
        </div>
      </div>
      {menus.map(menu => (
        <div key={menu.category} className="mb-5 last:mb-0">
          <h6 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">{menu.label}</h6>
          <div className="space-y-2">
            {menu.dishes.map(dish => {
              const selected = guest[menu.category].includes(dish.id);
              return (
                <div key={dish.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  selected ? 'border-primary bg-primary/5' : 'border-border hover:border-accent/50'
                }`}>
                  <div className="flex-1 min-w-0 mr-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{dish.name}</p>
                      {dish.tags.map(tag => <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-background text-text-muted">{tag}</span>)}
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">{dish.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">₹{dish.price.toLocaleString('en-IN')}</span>
                    <button
                      onClick={() => onToggle(menu.category, dish.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${selected ? 'bg-primary text-white' : 'bg-background text-text-muted hover:bg-primary hover:text-white'}`}
                    >
                      {selected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Main Component ----------
export default function PrivateDiningPage() {
  const [state, setState] = useState<ExperienceState>(initialState);
  const [showSummary, setShowSummary] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const builderRef = useRef<HTMLDivElement>(null);

  // Persist state to sessionStorage so selections survive navigation
  useEffect(() => {
    const saved = sessionStorage.getItem('rn_private_dining');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<ExperienceState> & { guest1?: GuestSelections; guest2?: GuestSelections };
        const legacySelections = [parsed.guest1, parsed.guest2].filter((guest): guest is GuestSelections => Boolean(guest));
        const guestSelections = parsed.guestSelections?.length ? parsed.guestSelections : legacySelections;
        const selections = guestSelections.length ? guestSelections : initialState.guestSelections;
        setState({ ...initialState, ...parsed, guestSelections: selections, guest1: selections[0], guest2: selections[1] || createGuestSelection() });
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('rn_private_dining', JSON.stringify(state));
  }, [state]);

  // ---------- Derived Pricing ----------
  const pricing = useMemo(() => {
    let total = BASE_EXPERIENCE_PRICE;
    const breakdown: { label: string; amount: number }[] = [
      { label: `Private Dining Experience for ${state.guestSelections.length}`, amount: BASE_EXPERIENCE_PRICE },
    ];

    state.guestSelections.forEach((guest, index) => {
      const guestItems = [
        ...guest.starters.map(id => findItem(starters, id)),
        ...guest.mains.map(id => findItem(mains, id)),
        ...guest.desserts.map(id => findItem(desserts, id)),
      ].filter(Boolean);
      const guestTotal = guestItems.reduce((sum, item) => sum + (item?.price || 0), 0);
      if (guestTotal > 0) { total += guestTotal; breakdown.push({ label: `Guest ${index + 1} Menu`, amount: guestTotal }); }
    });

    // Shared dishes
    const sharedItems = [
      ...state.shared.starters.map(id => findItem(starters, id)),
      ...state.shared.mains.map(id => findItem(mains, id)),
      ...state.shared.desserts.map(id => findItem(desserts, id)),
    ].filter(Boolean);
    const sharedTotal = sharedItems.reduce((s, i) => s + (i?.price || 0), 0);
    if (sharedTotal > 0) { total += sharedTotal; breakdown.push({ label: 'Shared Dishes', amount: sharedTotal }); }

    // Drinks
    const wd = findItem(welcomeDrinks, state.welcomeDrink);
    if (wd && wd.price > 0) { total += wd.price; breakdown.push({ label: wd.name, amount: wd.price }); }
    const pr = findItem(pairingOptions, state.pairing);
    if (pr && pr.price > 0) { total += pr.price; breakdown.push({ label: pr.name, amount: pr.price }); }

    // Ambience
    const ts = findItem(tableSettings, state.tableSetting);
    if (ts && ts.price > 0) { total += ts.price; breakdown.push({ label: `Table: ${ts.name}`, amount: ts.price }); }
    const mu = findItem(musicOptions, state.music);
    if (mu && mu.price > 0) { total += mu.price; breakdown.push({ label: `Music: ${mu.name}`, amount: mu.price }); }
    const li = findItem(lightingOptions, state.lighting);
    if (li && li.price > 0) { total += li.price; breakdown.push({ label: `Lighting: ${li.name}`, amount: li.price }); }
    const fl = findItem(flowerOptions, state.flowers);
    if (fl && fl.price > 0) { total += fl.price; breakdown.push({ label: `Flowers: ${fl.name}`, amount: fl.price }); }

    // Experiences
    const exItems = state.selectedExperiences.map(id => findItem(experiences, id)).filter(Boolean);
    const exTotal = exItems.reduce((s, i) => s + (i?.price || 0), 0);
    if (exTotal > 0) { total += exTotal; breakdown.push({ label: 'Special Experiences', amount: exTotal }); }

    return { total, breakdown };
  }, [state]);

  // ---------- Navigation ----------
  const goToStep = (step: number) => {
    setState(s => ({ ...s, step }));
    setError('');
  };

  const nextStep = () => {
    // Validation per step
    if (state.step === 1 && !state.occasion) {
      setError('Please select an occasion to continue.');
      return;
    }
    if (state.step === 2 && (!state.date || !state.time)) {
      setError('Please select a date and time to continue.');
      return;
    }
    if (state.step === 3) {
      const guestCount = state.guestSelections.reduce((sum, guest) => sum + guest.starters.length + guest.mains.length + guest.desserts.length, 0);
      const sharedCount = state.shared.starters.length + state.shared.mains.length + state.shared.desserts.length;
      if (guestCount === 0 && sharedCount === 0) {
        setError('Please select at least one dish for your menu.');
        return;
      }
    }
    if (state.step === 6 && !state.allergies.trim() && state.dietary.length === 0) {
      // Allow proceeding but encourage
    }
    setError('');
    setState(s => ({ ...s, step: Math.min(s.step + 1, 7) }));
  };

  const prevStep = () => {
    setError('');
    setState(s => ({ ...s, step: Math.max(s.step - 1, 1) }));
  };

  const resetExperience = () => {
    setState({ ...initialState, step: 1 });
    sessionStorage.removeItem('rn_private_dining');
    setError('');
  };

  // ---------- Toggle helpers ----------
  const toggleInArray = (arr: string[], id: string) =>
    arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];

  const toggleGuest = (guestIndex: number, category: DishCategory, id: string) => {
    setState(s => ({
      ...s,
      guestSelections: s.guestSelections.map((guest, index) => index === guestIndex
        ? { ...guest, [category]: toggleInArray(guest[category], id) }
        : guest),
      ...(guestIndex === 0 ? { guest1: { ...s.guest1, [category]: toggleInArray(s.guest1[category], id) } } : {}),
      ...(guestIndex === 1 ? { guest2: { ...s.guest2, [category]: toggleInArray(s.guest2[category], id) } } : {}),
    }));
  };

  const toggleGuest1 = (category: DishCategory, id: string) => toggleGuest(0, category, id);
  const toggleGuest2 = (category: DishCategory, id: string) => toggleGuest(1, category, id);

  const setGuestDrink = (guestIndex: number, drink: string) => {
    setState(s => ({
      ...s,
      guestSelections: s.guestSelections.map((guest, index) => index === guestIndex ? { ...guest, drink } : guest),
      ...(guestIndex === 0 ? { guest1: { ...s.guest1, drink } } : {}),
      ...(guestIndex === 1 ? { guest2: { ...s.guest2, drink } } : {}),
    }));
  };

  const setGuestCount = (guestCount: number, guestType: string) => {
    setState(s => ({
      ...s,
      guestType,
      guestSelections: Array.from({ length: guestCount }, (_, index) => s.guestSelections[index] || createGuestSelection()),
      guest1: s.guestSelections[0] || createGuestSelection(),
      guest2: s.guestSelections[1] || createGuestSelection(),
    }));
  };

  const toggleShared = (category: 'starters' | 'mains' | 'desserts', id: string) => {
    setState(s => ({
      ...s,
      shared: { ...s.shared, [category]: toggleInArray(s.shared[category], id) },
    }));
  };

  const toggleDietary = (item: string) => {
    setState(s => ({ ...s, dietary: toggleInArray(s.dietary, item) }));
  };

  const toggleTaste = (item: string) => {
    setState(s => ({ ...s, tastes: toggleInArray(s.tastes, item) }));
  };

  const toggleLoveIngredient = (item: string) => {
    setState(s => ({ ...s, loveIngredients: toggleInArray(s.loveIngredients, item) }));
  };

  const toggleDislikeIngredient = (item: string) => {
    setState(s => ({ ...s, dislikeIngredients: toggleInArray(s.dislikeIngredients, item) }));
  };

  const toggleExperience = (id: string) => {
    setState(s => ({ ...s, selectedExperiences: toggleInArray(s.selectedExperiences, id) }));
  };

  const toggleChefFreedom = (id: string) => {
    setState(s => ({ ...s, chefFreedomSelections: toggleInArray(s.chefFreedomSelections, id) }));
  };

  // ---------- Ingredient tag input ----------
  const [loveInput, setLoveInput] = useState('');
  const [dislikeInput, setDislikeInput] = useState('');

  const addLoveIngredient = () => {
    const val = loveInput.trim();
    if (val && !state.loveIngredients.includes(val)) {
      setState(s => ({ ...s, loveIngredients: [...s.loveIngredients, val] }));
    }
    setLoveInput('');
  };

  const addDislikeIngredient = () => {
    const val = dislikeInput.trim();
    if (val && !state.dislikeIngredients.includes(val)) {
      setState(s => ({ ...s, dislikeIngredients: [...s.dislikeIngredients, val] }));
    }
    setDislikeInput('');
  };

  // ---------- Booking submission ----------
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    // Validate booking form
    const b = state.booking;
    if (!b.name.trim() || !b.email.trim() || !b.phone.trim()) {
      setError('Please fill in your name, email, and phone number.');
      setSubmitting(false);
      return;
    }

    // Simulate booking request (connect to backend later)
    setTimeout(() => {
      const ref = 'RN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setState(s => ({ ...s, confirmed: true, bookingRef: ref }));
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  // ---------- Render helpers ----------
  const renderOccasionIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Heart;
    return <Icon className="w-5 h-5" />;
  };

  const renderAmbienceIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Sparkles;
    return <Icon className="w-5 h-5" />;
  };

  const renderExperienceIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Sparkles;
    return <Icon className="w-5 h-5" />;
  };

  const formatPrice = (n: number) => n.toLocaleString('en-IN');

  // ---------- Confirmation Screen ----------
  if (state.confirmed) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 md:p-12 text-center max-w-lg w-full"
        >
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-success/10">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h1 className="mb-3">Your Evening Is Being Prepared</h1>
          <p className="text-text-muted text-sm mb-6">
            Thank you, <span className="font-semibold text-primary">{state.booking.name || 'friend'}</span>.
            We've received your private dining request for{' '}
            <span className="font-semibold">{state.date}</span> at{' '}
            <span className="font-semibold">{timeSlots.find(t => t.value === state.time)?.label || state.time}</span>.
          </p>

          <div className="bg-background rounded-xl p-5 mb-6">
            <p className="text-xs text-text-muted mb-1">Booking Reference</p>
            <p className="text-2xl font-bold text-primary font-mono tracking-wider">{state.bookingRef}</p>
          </div>

          <div className="text-left space-y-2 text-sm mb-6 bg-background rounded-xl p-4">
            <p className="font-semibold mb-2">Your personalized experience includes:</p>
            <div className="flex items-center gap-2 text-text-muted"><Check className="w-3.5 h-3.5 text-success" /> Custom menu for both of you</div>
            <div className="flex items-center gap-2 text-text-muted"><Check className="w-3.5 h-3.5 text-success" /> Personalized preferences & dietary needs</div>
            <div className="flex items-center gap-2 text-text-muted"><Check className="w-3.5 h-3.5 text-success" /> Selected ambience & atmosphere</div>
            {state.selectedExperiences.length > 0 && (
              <div className="flex items-center gap-2 text-text-muted"><Check className="w-3.5 h-3.5 text-success" /> {state.selectedExperiences.length} special experience{state.selectedExperiences.length > 1 ? 's' : ''}</div>
            )}
            {state.chefFreedom && (
              <div className="flex items-center gap-2 text-text-muted"><Check className="w-3.5 h-3.5 text-success" /> Chef's surprise elements</div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => { setState(s => ({ ...s, confirmed: false, step: 7 })); }} className="btn-primary flex-1 justify-center text-sm">
              <Eye className="w-4 h-4" /> View My Experience
            </button>
            <a href="/" className="btn-secondary flex-1 justify-center text-sm">Back to ReNorth</a>
          </div>
        </motion.div>
      </div>
    );
  }

  // ---------- Main Page ----------
  return (
    <div className="pt-24">
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #602628 0%, #4A1C1E 50%, #3A1415 100%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-custom relative z-10 pt-16 pb-24">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-accent font-medium tracking-[0.15em] uppercase mb-5 text-sm flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Private Dining
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white mb-6 leading-[1.1]"
            >
              Private Dining, <span className="text-accent">Your Way</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-lg max-w-xl mb-4 leading-relaxed"
            >
              Create an intimate dining experience designed entirely around the two of you.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/40 text-base max-w-xl mb-10 leading-relaxed"
            >
              Choose your dishes, drinks, ambience, special moments, and personal touches. Tell us exactly how you'd like your evening to feel, and we'll prepare it for you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => builderRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20 px-8 py-3.5"
              >
                <Wand2 className="w-4 h-4" /> Create Your Experience
              </button>
              <button
                onClick={() => setShowSamples(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm text-white border border-white/20 hover:bg-white/10 transition-all"
              >
                <Eye className="w-4 h-4" /> View Sample Experiences
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SAMPLE EXPERIENCES MODAL ==================== */}
      <AnimatePresence>
        {showSamples && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowSamples(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-2xl">Sample Experiences</h3>
                <button onClick={() => setShowSamples(false)} className="p-1 hover:bg-background rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {sampleExperiences.map((exp, i) => {
                  const Icon = iconMap[exp.icon] || Heart;
                  return (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="card p-6 flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-accent/10">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{exp.title}</h4>
                          <span className="text-primary font-bold">₹{formatPrice(exp.price)}</span>
                        </div>
                        <p className="text-text-muted text-sm">{exp.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <button
                onClick={() => { setShowSamples(false); builderRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-primary w-full justify-center mt-6"
              >
                <Wand2 className="w-4 h-4" /> Design Your Own
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== BUILDER ==================== */}
      <section ref={builderRef} className="section-padding" id="builder">
        <div className="container-custom">
          <div className="section-title">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">Design Your Experience</span>
            <h2>Design Your Private Dining Experience</h2>
            <p>Every detail can be personalized. Tell us what you love, what you want to avoid, and how you'd like your evening to unfold.</p>
          </div>

          {/* Progress Indicator */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2 scrollbar-none">
              {steps.map((s, i) => {
                const isActive = state.step === s.id;
                const isDone = state.step > s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => goToStep(s.id)}
                    className="flex flex-col items-center gap-1.5 min-w-[60px] group"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isDone ? 'bg-success text-white' : isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-border text-text-muted group-hover:bg-primary/10'
                    }`}>
                      {isDone ? <Check className="w-4 h-4" /> : `0${s.id}`}
                    </div>
                    <span className={`text-[10px] font-medium whitespace-nowrap ${isActive ? 'text-primary' : isDone ? 'text-success' : 'text-text-muted'}`}>
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="w-full h-1 bg-border rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((state.step - 1) / 6) * 100}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* ============ LEFT: Builder Content ============ */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={state.step}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  {error && (
                    <div className="bg-error/5 border border-error/20 text-error p-3 rounded-xl text-sm mb-6 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
                    </div>
                  )}

                  {/* ===== STEP 1: WHO IS DINING ===== */}
                  {state.step === 1 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="mb-2">Who Is Dining?</h3>
                        <p className="text-text-muted text-sm mb-6">For the two of you, or a small gathering?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {guestOptions.map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => setGuestCount(opt.guests, opt.id)}
                              className={`card p-6 text-center transition-all ${
                                state.guestType === opt.id ? 'border-primary ring-2 ring-primary/20' : 'hover:border-accent'
                              }`}
                            >
                              <Users className={`w-8 h-8 mx-auto mb-3 ${state.guestType === opt.id ? 'text-primary' : 'text-text-muted'}`} />
                              <h4 className="text-sm mb-1">{opt.label}</h4>
                              <p className="text-xs text-text-muted">{opt.description}</p>
                              <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                                state.guestType === opt.id ? 'bg-primary text-white' : 'bg-background text-text-muted'
                              }`}>
                                <Users className="w-3 h-3" /> {opt.guests} Guests
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2">What Is the Occasion?</h3>
                        <p className="text-text-muted text-sm mb-6">Tell us what we're celebrating</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {occasions.map(occ => (
                            <button
                              key={occ.id}
                              onClick={() => setState(s => ({ ...s, occasion: occ.id }))}
                              className={`card p-4 flex flex-col items-center gap-2 text-center transition-all ${
                                state.occasion === occ.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-accent'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                state.occasion === occ.id ? 'bg-primary text-white' : 'bg-accent/10 text-accent'
                              }`}>
                                {renderOccasionIcon(occ.icon)}
                              </div>
                              <span className="text-xs font-medium">{occ.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ===== STEP 2: DATE & TIME ===== */}
                  {state.step === 2 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="mb-2">Preferred Date & Time</h3>
                        <p className="text-text-muted text-sm mb-6">Choose when you'd like to dine with us</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5">
                              <CalendarDays className="w-4 h-4 text-accent" /> Preferred Date
                            </label>
                            <input
                              type="date"
                              min={new Date().toISOString().split('T')[0]}
                              value={state.date}
                              onChange={e => setState(s => ({ ...s, date: e.target.value }))}
                              className="input-field text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-accent" /> Preferred Time
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {timeSlots.map(slot => (
                                <button
                                  key={slot.value}
                                  type="button"
                                  onClick={() => setState(s => ({ ...s, time: slot.value }))}
                                  className={`p-2.5 rounded-xl text-xs font-medium transition-all border ${
                                    state.time === slot.value ? 'bg-primary text-white border-primary' : 'bg-white text-text border-border hover:border-primary/50'
                                  }`}
                                >
                                  {slot.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-accent" /> Second Preferred Time <span className="text-text-muted font-normal text-xs">(optional)</span>
                        </label>
                        <p className="text-xs text-text-muted mb-3">In case your first choice is unavailable</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {timeSlots.filter(t => t.value !== state.time).map(slot => (
                            <button
                              key={slot.value}
                              type="button"
                              onClick={() => setState(s => ({ ...s, altTime: slot.value }))}
                              className={`p-2.5 rounded-xl text-xs font-medium transition-all border ${
                                state.altTime === slot.value ? 'bg-accent text-white border-accent' : 'bg-white text-text border-border hover:border-accent/50'
                              }`}
                            >
                              {slot.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ===== STEP 3: DINING (MENU) ===== */}
                  {state.step === 3 && (
                    <div className="space-y-10">
                      <div>
                        <h3 className="mb-2">Build Your Menu</h3>
                        <p className="text-text-muted text-sm mb-6">Choose exactly what you'd like to enjoy. Our chef will curate the experience around your selections.</p>
                      </div>

                      {/* Dietary Preferences */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Dietary Preferences</h4>
                        <p className="text-xs text-text-muted mb-4">Select any dietary requirements</p>
                        <div className="flex flex-wrap gap-2">
                          {dietaryPreferences.map(pref => (
                            <button
                              key={pref}
                              onClick={() => toggleDietary(pref)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                                state.dietary.includes(pref) ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-border hover:border-primary/30'
                              }`}
                            >
                              {pref}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Allergies */}
                      <div className="glass-card p-6 border-warning/30">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2 text-warning">
                          <AlertTriangle className="w-4 h-4" /> Allergies & Ingredients to Avoid
                        </h4>
                        <p className="text-xs text-text-muted mb-3">Tell our chef about any allergies, intolerances, or ingredients you'd like us to avoid.</p>
                        <textarea
                          className="input-field text-sm"
                          rows={3}
                          placeholder="Please avoid peanuts and shellfish. We would also prefer less spicy food."
                          value={state.allergies}
                          onChange={e => setState(s => ({ ...s, allergies: e.target.value }))}
                        />
                      </div>

                      {/* Spice Level */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Flame className="w-4 h-4 text-accent" /> Spice Level</h4>
                        <p className="text-xs text-text-muted mb-4">How much heat do you both enjoy?</p>
                        <div className="flex flex-wrap gap-2">
                          {spiceLevels.map(level => (
                            <button
                              key={level.id}
                              onClick={() => setState(s => ({ ...s, spiceLevel: level.id }))}
                              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
                                state.spiceLevel === level.id ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-border hover:border-primary/30'
                              }`}
                            >
                              {level.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Taste Preferences */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Star className="w-4 h-4 text-accent" /> Taste Preferences</h4>
                        <p className="text-xs text-text-muted mb-4">Select all that appeal to you</p>
                        <div className="flex flex-wrap gap-2">
                          {tastePreferences.map(taste => (
                            <button
                              key={taste}
                              onClick={() => toggleTaste(taste)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                                state.tastes.includes(taste) ? 'bg-accent text-white border-accent' : 'bg-white text-text-muted border-border hover:border-accent/30'
                              }`}
                            >
                              {taste}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Ingredients We Love */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Heart className="w-4 h-4 text-accent" /> Ingredients We Love</h4>
                        <p className="text-xs text-text-muted mb-3">Add ingredients you both enjoy</p>
                        <div className="flex gap-2 mb-3">
                          <input
                            className="input-field text-sm flex-1"
                            placeholder="e.g. Truffle, Mushroom, Chocolate"
                            value={loveInput}
                            onChange={e => setLoveInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addLoveIngredient(); } }}
                          />
                          <button onClick={addLoveIngredient} className="btn-primary px-4 text-sm"><Plus className="w-4 h-4" /></button>
                        </div>
                        {state.loveIngredients.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {state.loveIngredients.map(item => (
                              <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                                {item}
                                <button onClick={() => setState(s => ({ ...s, loveIngredients: s.loveIngredients.filter(i => i !== item) }))}>
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Ingredients We Don't Like */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><X className="w-4 h-4 text-error" /> Ingredients We Don't Like</h4>
                        <p className="text-xs text-text-muted mb-3">Add ingredients to avoid</p>
                        <div className="flex gap-2 mb-3">
                          <input
                            className="input-field text-sm flex-1"
                            placeholder="e.g. Olives, Coriander, Blue Cheese"
                            value={dislikeInput}
                            onChange={e => setDislikeInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addDislikeIngredient(); } }}
                          />
                          <button onClick={addDislikeIngredient} className="btn-primary px-4 text-sm"><Plus className="w-4 h-4" /></button>
                        </div>
                        {state.dislikeIngredients.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {state.dislikeIngredients.map(item => (
                              <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error/10 text-error text-xs font-medium">
                                {item}
                                <button onClick={() => setState(s => ({ ...s, dislikeIngredients: s.dislikeIngredients.filter(i => i !== item) }))}>
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* ===== MENU SELECTION ===== */}
                      <div className="border-t border-border pt-8">
                        <h4 className="text-lg font-semibold mb-2">Your Menu</h4>
                        <p className="text-text-muted text-sm mb-6">Choose dishes for each of you, or share them together.</p>

                        {state.guestSelections.length === 2 && (<>
                        {/* Guest 1 */}
                        <div className="glass-card p-6 mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                              <User className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-sm">Guest 1</h5>
                              <p className="text-xs text-text-muted">What would you like?</p>
                            </div>
                          </div>

                          {/* Starters */}
                          <div className="mb-5">
                            <h6 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Starters</h6>
                            <div className="space-y-2">
                              {starters.map(dish => (
                                <div key={dish.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  state.guest1.starters.includes(dish.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-accent/50'
                                }`}>
                                  <div className="flex-1 min-w-0 mr-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className="font-medium text-sm">{dish.name}</p>
                                      {dish.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-background text-text-muted">{tag}</span>
                                      ))}
                                    </div>
                                    <p className="text-xs text-text-muted mt-0.5">{dish.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-sm font-semibold text-primary">₹{formatPrice(dish.price)}</span>
                                    <button
                                      onClick={() => toggleGuest1('starters', dish.id)}
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                        state.guest1.starters.includes(dish.id) ? 'bg-primary text-white' : 'bg-background text-text-muted hover:bg-primary hover:text-white'
                                      }`}
                                    >
                                      {state.guest1.starters.includes(dish.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Mains */}
                          <div className="mb-5">
                            <h6 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Main Course</h6>
                            <div className="space-y-2">
                              {mains.map(dish => (
                                <div key={dish.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  state.guest1.mains.includes(dish.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-accent/50'
                                }`}>
                                  <div className="flex-1 min-w-0 mr-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className="font-medium text-sm">{dish.name}</p>
                                      {dish.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-background text-text-muted">{tag}</span>
                                      ))}
                                    </div>
                                    <p className="text-xs text-text-muted mt-0.5">{dish.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-sm font-semibold text-primary">₹{formatPrice(dish.price)}</span>
                                    <button
                                      onClick={() => toggleGuest1('mains', dish.id)}
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                        state.guest1.mains.includes(dish.id) ? 'bg-primary text-white' : 'bg-background text-text-muted hover:bg-primary hover:text-white'
                                      }`}
                                    >
                                      {state.guest1.mains.includes(dish.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Desserts */}
                          <div>
                            <h6 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Desserts</h6>
                            <div className="space-y-2">
                              {desserts.map(dish => (
                                <div key={dish.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  state.guest1.desserts.includes(dish.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-accent/50'
                                }`}>
                                  <div className="flex-1 min-w-0 mr-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className="font-medium text-sm">{dish.name}</p>
                                      {dish.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-background text-text-muted">{tag}</span>
                                      ))}
                                    </div>
                                    <p className="text-xs text-text-muted mt-0.5">{dish.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-sm font-semibold text-primary">₹{formatPrice(dish.price)}</span>
                                    <button
                                      onClick={() => toggleGuest1('desserts', dish.id)}
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                        state.guest1.desserts.includes(dish.id) ? 'bg-primary text-white' : 'bg-background text-text-muted hover:bg-primary hover:text-white'
                                      }`}
                                    >
                                      {state.guest1.desserts.includes(dish.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Guest 2 */}
                        <div className="glass-card p-6 mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center">
                              <User className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-sm">Guest 2</h5>
                              <p className="text-xs text-text-muted">What would your partner like?</p>
                            </div>
                          </div>

                          {/* Starters */}
                          <div className="mb-5">
                            <h6 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Starters</h6>
                            <div className="space-y-2">
                              {starters.map(dish => (
                                <div key={dish.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  state.guest2.starters.includes(dish.id) ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                                }`}>
                                  <div className="flex-1 min-w-0 mr-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className="font-medium text-sm">{dish.name}</p>
                                      {dish.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-background text-text-muted">{tag}</span>
                                      ))}
                                    </div>
                                    <p className="text-xs text-text-muted mt-0.5">{dish.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-sm font-semibold text-primary">₹{formatPrice(dish.price)}</span>
                                    <button
                                      onClick={() => toggleGuest2('starters', dish.id)}
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                        state.guest2.starters.includes(dish.id) ? 'bg-accent text-white' : 'bg-background text-text-muted hover:bg-accent hover:text-white'
                                      }`}
                                    >
                                      {state.guest2.starters.includes(dish.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Mains */}
                          <div className="mb-5">
                            <h6 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Main Course</h6>
                            <div className="space-y-2">
                              {mains.map(dish => (
                                <div key={dish.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  state.guest2.mains.includes(dish.id) ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                                }`}>
                                  <div className="flex-1 min-w-0 mr-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className="font-medium text-sm">{dish.name}</p>
                                      {dish.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-background text-text-muted">{tag}</span>
                                      ))}
                                    </div>
                                    <p className="text-xs text-text-muted mt-0.5">{dish.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-sm font-semibold text-primary">₹{formatPrice(dish.price)}</span>
                                    <button
                                      onClick={() => toggleGuest2('mains', dish.id)}
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                        state.guest2.mains.includes(dish.id) ? 'bg-accent text-white' : 'bg-background text-text-muted hover:bg-accent hover:text-white'
                                      }`}
                                    >
                                      {state.guest2.mains.includes(dish.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Desserts */}
                          <div>
                            <h6 className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Desserts</h6>
                            <div className="space-y-2">
                              {desserts.map(dish => (
                                <div key={dish.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  state.guest2.desserts.includes(dish.id) ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                                }`}>
                                  <div className="flex-1 min-w-0 mr-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className="font-medium text-sm">{dish.name}</p>
                                      {dish.tags.map(tag => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-background text-text-muted">{tag}</span>
                                      ))}
                                    </div>
                                    <p className="text-xs text-text-muted mt-0.5">{dish.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-sm font-semibold text-primary">₹{formatPrice(dish.price)}</span>
                                    <button
                                      onClick={() => toggleGuest2('desserts', dish.id)}
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                        state.guest2.desserts.includes(dish.id) ? 'bg-accent text-white' : 'bg-background text-text-muted hover:bg-accent hover:text-white'
                                      }`}
                                    >
                                      {state.guest2.desserts.includes(dish.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        </>)}

                        {state.guestSelections.length > 2 && state.guestSelections.map((guest, index) => (
                          <GuestMenuCard
                            key={index + 1}
                            guest={guest}
                            guestIndex={index}
                            onToggle={(category, id) => toggleGuest(index, category, id)}
                          />
                        ))}

                        {/* Shared Dishes */}
                        <div className="glass-card p-6 border-accent/30">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-success text-white flex items-center justify-center">
                              <Share2 className="w-5 h-5" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-sm">Share Dishes</h5>
                              <p className="text-xs text-text-muted">Select dishes to share together</p>
                            </div>
                          </div>

                          <div className="mb-5">
                            <h6 className="text-xs font-semibold uppercase tracking-wider text-success mb-3">Shared Starters</h6>
                            <div className="space-y-2">
                              {starters.map(dish => (
                                <div key={dish.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  state.shared.starters.includes(dish.id) ? 'border-success bg-success/5' : 'border-border hover:border-success/50'
                                }`}>
                                  <div className="flex-1 min-w-0 mr-3">
                                    <p className="font-medium text-sm">{dish.name}</p>
                                    <p className="text-xs text-text-muted mt-0.5">{dish.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-sm font-semibold text-primary">₹{formatPrice(dish.price)}</span>
                                    <button
                                      onClick={() => toggleShared('starters', dish.id)}
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                        state.shared.starters.includes(dish.id) ? 'bg-success text-white' : 'bg-background text-text-muted hover:bg-success hover:text-white'
                                      }`}
                                    >
                                      {state.shared.starters.includes(dish.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mb-5">
                            <h6 className="text-xs font-semibold uppercase tracking-wider text-success mb-3">Shared Mains</h6>
                            <div className="space-y-2">
                              {mains.map(dish => (
                                <div key={dish.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  state.shared.mains.includes(dish.id) ? 'border-success bg-success/5' : 'border-border hover:border-success/50'
                                }`}>
                                  <div className="flex-1 min-w-0 mr-3">
                                    <p className="font-medium text-sm">{dish.name}</p>
                                    <p className="text-xs text-text-muted mt-0.5">{dish.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-sm font-semibold text-primary">₹{formatPrice(dish.price)}</span>
                                    <button
                                      onClick={() => toggleShared('mains', dish.id)}
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                        state.shared.mains.includes(dish.id) ? 'bg-success text-white' : 'bg-background text-text-muted hover:bg-success hover:text-white'
                                      }`}
                                    >
                                      {state.shared.mains.includes(dish.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h6 className="text-xs font-semibold uppercase tracking-wider text-success mb-3">Shared Desserts</h6>
                            <div className="space-y-2">
                              {desserts.map(dish => (
                                <div key={dish.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                                  state.shared.desserts.includes(dish.id) ? 'border-success bg-success/5' : 'border-border hover:border-success/50'
                                }`}>
                                  <div className="flex-1 min-w-0 mr-3">
                                    <p className="font-medium text-sm">{dish.name}</p>
                                    <p className="text-xs text-text-muted mt-0.5">{dish.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <span className="text-sm font-semibold text-primary">₹{formatPrice(dish.price)}</span>
                                    <button
                                      onClick={() => toggleShared('desserts', dish.id)}
                                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                        state.shared.desserts.includes(dish.id) ? 'bg-success text-white' : 'bg-background text-text-muted hover:bg-success hover:text-white'
                                      }`}
                                    >
                                      {state.shared.desserts.includes(dish.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ===== STEP 4: DRINKS ===== */}
                  {state.step === 4 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="mb-2">Choose Your Drinks</h3>
                        <p className="text-text-muted text-sm mb-6">Select your welcome drink and pairing preferences</p>
                      </div>

                      {/* Welcome Drink */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><GlassWater className="w-4 h-4 text-accent" /> Welcome Drink</h4>
                        <p className="text-xs text-text-muted mb-4">Choose a welcome drink for your evening</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {welcomeDrinks.map(drink => (
                            <button
                              key={drink.id}
                              onClick={() => setState(s => ({ ...s, welcomeDrink: drink.id }))}
                              className={`card p-4 text-left transition-all ${
                                state.welcomeDrink === drink.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-accent'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-sm">{drink.name}</p>
                                <span className="text-sm font-semibold text-primary">₹{formatPrice(drink.price)}</span>
                              </div>
                              <p className="text-xs text-text-muted">{drink.description}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Pairing */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Wine className="w-4 h-4 text-accent" /> Pairing</h4>
                        <p className="text-xs text-text-muted mb-4">Choose a beverage pairing for your courses</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {pairingOptions.map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => setState(s => ({ ...s, pairing: opt.id }))}
                              className={`card p-4 text-left transition-all ${
                                state.pairing === opt.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-accent'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-sm">{opt.name}</p>
                                <span className="text-sm font-semibold text-primary">{opt.price > 0 ? `₹${formatPrice(opt.price)}` : 'Included'}</span>
                              </div>
                              <p className="text-xs text-text-muted">{opt.description}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Individual Drink Preferences */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Coffee className="w-4 h-4 text-accent" /> Individual Drink Preferences</h4>
                        <p className="text-xs text-text-muted mb-4">Select a drink for each guest</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {state.guestSelections.map((guest, index) => (
                            <div key={index}>
                              <label className="block text-sm font-medium mb-2 flex items-center gap-1.5">
                                <span className={`w-5 h-5 rounded-md ${index % 2 === 0 ? 'bg-primary' : 'bg-accent'} text-white flex items-center justify-center text-[10px] font-bold`}>{index + 1}</span>
                                Guest {index + 1}
                              </label>
                              <select
                                className="input-field text-sm"
                                value={guest.drink}
                                onChange={e => setGuestDrink(index, e.target.value)}
                              >
                                <option value="">Select a drink</option>
                                {welcomeDrinks.map(d => <option key={d.id} value={d.id}>{d.name} — ₹{d.price}</option>)}
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ===== STEP 5: EXPERIENCE (AMBIENCE) ===== */}
                  {state.step === 5 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="mb-2">Set the Mood</h3>
                        <p className="text-text-muted text-sm mb-6">Design the atmosphere for your evening</p>
                      </div>

                      {/* Table Setting */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><UtensilsCrossed className="w-4 h-4 text-accent" /> Table Setting</h4>
                        <p className="text-xs text-text-muted mb-4">Choose how your table is styled</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {tableSettings.map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => setState(s => ({ ...s, tableSetting: opt.id }))}
                              className={`card p-4 text-center transition-all ${
                                state.tableSetting === opt.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-accent'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                                state.tableSetting === opt.id ? 'bg-primary text-white' : 'bg-accent/10 text-accent'
                              }`}>
                                {renderAmbienceIcon(opt.icon)}
                              </div>
                              <p className="text-xs font-medium">{opt.name}</p>
                              <p className="text-[10px] text-text-muted mt-0.5">{opt.price > 0 ? `+₹${formatPrice(opt.price)}` : 'Included'}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Music */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Music className="w-4 h-4 text-accent" /> Music</h4>
                        <p className="text-xs text-text-muted mb-4">Set the soundtrack for your evening</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {musicOptions.map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => setState(s => ({ ...s, music: opt.id }))}
                              className={`card p-4 text-center transition-all ${
                                state.music === opt.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-accent'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                                state.music === opt.id ? 'bg-primary text-white' : 'bg-accent/10 text-accent'
                              }`}>
                                {renderAmbienceIcon(opt.icon)}
                              </div>
                              <p className="text-xs font-medium">{opt.name}</p>
                              <p className="text-[10px] text-text-muted mt-0.5">{opt.price > 0 ? `+₹${formatPrice(opt.price)}` : 'Included'}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Lighting */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Lamp className="w-4 h-4 text-accent" /> Lighting</h4>
                        <p className="text-xs text-text-muted mb-4">Choose the lighting for your table</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {lightingOptions.map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => setState(s => ({ ...s, lighting: opt.id }))}
                              className={`card p-4 text-center transition-all ${
                                state.lighting === opt.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-accent'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                                state.lighting === opt.id ? 'bg-primary text-white' : 'bg-accent/10 text-accent'
                              }`}>
                                {renderAmbienceIcon(opt.icon)}
                              </div>
                              <p className="text-xs font-medium">{opt.name}</p>
                              <p className="text-[10px] text-text-muted mt-0.5">{opt.price > 0 ? `+₹${formatPrice(opt.price)}` : 'Included'}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Flowers */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Flower2 className="w-4 h-4 text-accent" /> Flowers</h4>
                        <p className="text-xs text-text-muted mb-4">Add a floral touch to your table</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {flowerOptions.map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => setState(s => ({ ...s, flowers: opt.id }))}
                              className={`card p-4 text-center transition-all ${
                                state.flowers === opt.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-accent'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                                state.flowers === opt.id ? 'bg-primary text-white' : 'bg-accent/10 text-accent'
                              }`}>
                                {renderAmbienceIcon(opt.icon)}
                              </div>
                              <p className="text-xs font-medium">{opt.name}</p>
                              <p className="text-[10px] text-text-muted mt-0.5">{opt.price > 0 ? `+₹${formatPrice(opt.price)}` : 'Included'}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Special Experiences */}
                      <div className="border-t border-border pt-8">
                        <h4 className="text-lg font-semibold mb-2">Make It Memorable</h4>
                        <p className="text-text-muted text-sm mb-6">Add special touches to make your evening unforgettable</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {experiences.map(exp => (
                            <button
                              key={exp.id}
                              onClick={() => toggleExperience(exp.id)}
                              className={`card p-4 text-left transition-all ${
                                state.selectedExperiences.includes(exp.id) ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-accent'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                  state.selectedExperiences.includes(exp.id) ? 'bg-primary text-white' : 'bg-accent/10 text-accent'
                                }`}>
                                  {renderExperienceIcon(exp.icon)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className="font-medium text-sm">{exp.name}</p>
                                    <span className="text-sm font-semibold text-primary">₹{formatPrice(exp.price)}</span>
                                  </div>
                                  <p className="text-xs text-text-muted mt-0.5">{exp.description}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  state.selectedExperiences.includes(exp.id) ? 'bg-primary text-white' : 'bg-background text-text-muted'
                                }`}>
                                  {state.selectedExperiences.includes(exp.id) ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ===== STEP 6: SPECIAL REQUESTS ===== */}
                  {state.step === 6 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="mb-2">Tell Us What You Imagine</h3>
                        <p className="text-text-muted text-sm mb-6">This is your space to dream. Tell us how you'd like your evening to feel.</p>
                      </div>

                      {/* Imagination */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" /> Tell Us How You'd Like Your Evening to Feel</h4>
                        <p className="text-xs text-text-muted mb-3">Share any dreams, memories, or ideas for your evening</p>
                        <textarea
                          className="input-field text-sm"
                          rows={5}
                          placeholder="Tell us anything you'd like us to know. Perhaps there's a dish you've always wanted to try, a special memory you'd like us to recreate, a surprise you'd like us to prepare, or simply a particular atmosphere you'd love..."
                          value={state.imagination}
                          onChange={e => setState(s => ({ ...s, imagination: e.target.value }))}
                        />
                      </div>

                      {/* Special Requests */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-1 flex items-center gap-2"><PenLine className="w-4 h-4 text-accent" /> Special Requests</h4>
                        <p className="text-xs text-text-muted mb-3">Any specific requests for your evening</p>
                        <textarea
                          className="input-field text-sm"
                          rows={3}
                          placeholder="We'd like the evening to be quiet and intimate. My partner loves chocolate, so we'd love a chocolate-based dessert."
                          value={state.specialRequests}
                          onChange={e => setState(s => ({ ...s, specialRequests: e.target.value }))}
                        />
                      </div>

                      {/* Chef's Freedom */}
                      <div className="glass-card p-6 border-accent/30">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-sm font-semibold flex items-center gap-2"><ChefHat className="w-4 h-4 text-accent" /> Let Our Chef Surprise You</h4>
                            <p className="text-xs text-text-muted mt-1">I'm happy for the chef to make a few selections for us.</p>
                          </div>
                          <button
                            onClick={() => setState(s => ({ ...s, chefFreedom: !s.chefFreedom }))}
                            className={`relative w-12 h-7 rounded-full transition-all ${state.chefFreedom ? 'bg-primary' : 'bg-border'}`}
                          >
                            <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${state.chefFreedom ? 'left-6' : 'left-1'}`} />
                          </button>
                        </div>

                        {state.chefFreedom && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-text-muted mb-4">Tell us your preferences and we'll create a few surprise elements around them.</p>
                            <div className="flex flex-wrap gap-2">
                              {chefFreedomOptions.map(opt => (
                                <button
                                  key={opt.id}
                                  onClick={() => toggleChefFreedom(opt.id)}
                                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                                    state.chefFreedomSelections.includes(opt.id) ? 'bg-accent text-white border-accent' : 'bg-white text-text-muted border-border hover:border-accent/30'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ===== STEP 7: REVIEW ===== */}
                  {state.step === 7 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="mb-2">Your Evening, Designed by You</h3>
                        <p className="text-text-muted text-sm mb-6">Review your personalized experience before booking</p>
                      </div>

                      {/* Your Date */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><CalendarDays className="w-4 h-4 text-accent" /> Your Date</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-background rounded-xl p-3">
                            <p className="text-xs text-text-muted mb-1">Date</p>
                            <p className="font-semibold">{state.date || 'Not selected'}</p>
                          </div>
                          <div className="bg-background rounded-xl p-3">
                            <p className="text-xs text-text-muted mb-1">Time</p>
                            <p className="font-semibold">{timeSlots.find(t => t.value === state.time)?.label || state.time || 'Not selected'}</p>
                          </div>
                        </div>
                        {state.altTime && (
                          <p className="text-xs text-text-muted mt-2">Backup time: {timeSlots.find(t => t.value === state.altTime)?.label}</p>
                        )}
                      </div>

                      {/* Your Menu */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><UtensilsCrossed className="w-4 h-4 text-accent" /> Your Menu</h4>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-semibold text-primary mb-2">Guest 1</p>
                            <div className="flex flex-wrap gap-1.5">
                              {[...state.guest1.starters, ...state.guest1.mains, ...state.guest1.desserts].map(id => {
                                const item = findItem([...starters, ...mains, ...desserts], id);
                                return item ? <span key={id} className="px-2.5 py-1 rounded-lg bg-primary/5 text-primary text-xs">{item.name}</span> : null;
                              })}
                              {state.guest1.starters.length + state.guest1.mains.length + state.guest1.desserts.length === 0 && (
                                <span className="text-xs text-text-muted">No dishes selected</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-accent mb-2">Guest 2</p>
                            <div className="flex flex-wrap gap-1.5">
                              {[...state.guest2.starters, ...state.guest2.mains, ...state.guest2.desserts].map(id => {
                                const item = findItem([...starters, ...mains, ...desserts], id);
                                return item ? <span key={id} className="px-2.5 py-1 rounded-lg bg-accent/5 text-accent text-xs">{item.name}</span> : null;
                              })}
                              {state.guest2.starters.length + state.guest2.mains.length + state.guest2.desserts.length === 0 && (
                                <span className="text-xs text-text-muted">No dishes selected</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-success mb-2">Shared</p>
                            <div className="flex flex-wrap gap-1.5">
                              {[...state.shared.starters, ...state.shared.mains, ...state.shared.desserts].map(id => {
                                const item = findItem([...starters, ...mains, ...desserts], id);
                                return item ? <span key={id} className="px-2.5 py-1 rounded-lg bg-success/5 text-success text-xs">{item.name}</span> : null;
                              })}
                              {state.shared.starters.length + state.shared.mains.length + state.shared.desserts.length === 0 && (
                                <span className="text-xs text-text-muted">No shared dishes</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Your Preferences */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Your Preferences</h4>
                        <div className="space-y-2 text-sm">
                          {state.dietary.length > 0 && (
                            <div className="flex gap-2"><span className="text-text-muted w-28 flex-shrink-0">Dietary:</span><span className="font-medium">{state.dietary.join(', ')}</span></div>
                          )}
                          {state.allergies && (
                            <div className="flex gap-2"><span className="text-text-muted w-28 flex-shrink-0">Allergies:</span><span className="font-medium text-warning">{state.allergies}</span></div>
                          )}
                          {state.spiceLevel && (
                            <div className="flex gap-2"><span className="text-text-muted w-28 flex-shrink-0">Spice:</span><span className="font-medium">{spiceLevels.find(s => s.id === state.spiceLevel)?.label}</span></div>
                          )}
                          {state.tastes.length > 0 && (
                            <div className="flex gap-2"><span className="text-text-muted w-28 flex-shrink-0">Tastes:</span><span className="font-medium">{state.tastes.join(', ')}</span></div>
                          )}
                          {state.loveIngredients.length > 0 && (
                            <div className="flex gap-2"><span className="text-text-muted w-28 flex-shrink-0">Love:</span><span className="font-medium">{state.loveIngredients.join(', ')}</span></div>
                          )}
                          {state.dislikeIngredients.length > 0 && (
                            <div className="flex gap-2"><span className="text-text-muted w-28 flex-shrink-0">Avoid:</span><span className="font-medium">{state.dislikeIngredients.join(', ')}</span></div>
                          )}
                          {state.dietary.length === 0 && !state.allergies && !state.spiceLevel && state.tastes.length === 0 && state.loveIngredients.length === 0 && state.dislikeIngredients.length === 0 && (
                            <p className="text-xs text-text-muted">No preferences specified</p>
                          )}
                        </div>
                      </div>

                      {/* Your Atmosphere */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" /> Your Atmosphere</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {state.tableSetting && (
                            <div className="bg-background rounded-xl p-3">
                              <p className="text-xs text-text-muted mb-1">Table</p>
                              <p className="font-semibold">{tableSettings.find(t => t.id === state.tableSetting)?.name}</p>
                            </div>
                          )}
                          {state.music && (
                            <div className="bg-background rounded-xl p-3">
                              <p className="text-xs text-text-muted mb-1">Music</p>
                              <p className="font-semibold">{musicOptions.find(m => m.id === state.music)?.name}</p>
                            </div>
                          )}
                          {state.lighting && (
                            <div className="bg-background rounded-xl p-3">
                              <p className="text-xs text-text-muted mb-1">Lighting</p>
                              <p className="font-semibold">{lightingOptions.find(l => l.id === state.lighting)?.name}</p>
                            </div>
                          )}
                          {state.flowers && (
                            <div className="bg-background rounded-xl p-3">
                              <p className="text-xs text-text-muted mb-1">Flowers</p>
                              <p className="font-semibold">{flowerOptions.find(f => f.id === state.flowers)?.name}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Your Experiences */}
                      {state.selectedExperiences.length > 0 && (
                        <div className="glass-card p-6">
                          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Crown className="w-4 h-4 text-accent" /> Your Experiences</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {state.selectedExperiences.map(id => {
                              const exp = findItem(experiences, id);
                              return exp ? <span key={id} className="px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs">{exp.name}</span> : null;
                            })}
                          </div>
                        </div>
                      )}

                      {/* Chef's Freedom */}
                      {state.chefFreedom && (
                        <div className="glass-card p-6 border-accent/30">
                          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><ChefHat className="w-4 h-4 text-accent" /> Chef's Surprises</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {state.chefFreedomSelections.map(id => {
                              const opt = chefFreedomOptions.find(o => o.id === id);
                              return opt ? <span key={id} className="px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs">{opt.label}</span> : null;
                            })}
                          </div>
                        </div>
                      )}

                      {/* Your Notes */}
                      {(state.imagination || state.specialRequests) && (
                        <div className="glass-card p-6">
                          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><PenLine className="w-4 h-4 text-accent" /> Your Notes</h4>
                          {state.imagination && <p className="text-sm text-text-muted mb-3 italic">&ldquo;{state.imagination}&rdquo;</p>}
                          {state.specialRequests && <p className="text-sm text-text-muted italic">&ldquo;{state.specialRequests}&rdquo;</p>}
                        </div>
                      )}

                      {/* Estimated Total */}
                      <div className="glass-card p-6 border-primary/20">
                        <h4 className="text-sm font-semibold mb-4 flex items-center gap-2"><Info className="w-4 h-4 text-accent" /> Estimated Total</h4>
                        <div className="space-y-2 text-sm mb-4">
                          {pricing.breakdown.map((item, i) => (
                            <div key={i} className="flex justify-between">
                              <span className="text-text-muted">{item.label}</span>
                              <span className="font-medium">₹{formatPrice(item.amount)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-2xl font-bold text-primary">₹{formatPrice(pricing.total)}</span>
                        </div>
                        <p className="text-[10px] text-text-muted mt-2">Final pricing will be confirmed by our team. Taxes as applicable.</p>
                      </div>

                      {/* Booking Form */}
                      <div className="glass-card p-6">
                        <h4 className="text-sm font-semibold mb-4 flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-accent" /> Your Details</h4>
                        <form onSubmit={handleBooking} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1.5">Full Name</label>
                              <input
                                type="text"
                                required
                                className="input-field text-sm"
                                placeholder="Your name"
                                value={state.booking.name}
                                onChange={e => setState(s => ({ ...s, booking: { ...s.booking, name: e.target.value } }))}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1.5">Guest / Partner Name</label>
                              <input
                                type="text"
                                className="input-field text-sm"
                                placeholder="Partner's name"
                                value={state.booking.partnerName}
                                onChange={e => setState(s => ({ ...s, booking: { ...s.booking, partnerName: e.target.value } }))}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1.5">Email</label>
                              <input
                                type="email"
                                required
                                className="input-field text-sm"
                                placeholder="you@example.com"
                                value={state.booking.email}
                                onChange={e => setState(s => ({ ...s, booking: { ...s.booking, email: e.target.value } }))}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                              <input
                                type="tel"
                                required
                                className="input-field text-sm"
                                placeholder="Phone number"
                                value={state.booking.phone}
                                onChange={e => setState(s => ({ ...s, booking: { ...s.booking, phone: e.target.value } }))}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1.5">Preferred Contact Method</label>
                              <select
                                className="input-field text-sm"
                                value={state.booking.contactMethod}
                                onChange={e => setState(s => ({ ...s, booking: { ...s.booking, contactMethod: e.target.value } }))}
                              >
                                {contactMethods.map(m => <option key={m} value={m}>{m}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1.5">Occasion Details</label>
                              <input
                                type="text"
                                className="input-field text-sm"
                                placeholder="e.g. 5th Anniversary"
                                value={state.booking.occasionDetails}
                                onChange={e => setState(s => ({ ...s, booking: { ...s.booking, occasionDetails: e.target.value } }))}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1.5">Additional Notes</label>
                            <textarea
                              className="input-field text-sm"
                              rows={2}
                              placeholder="Anything else we should know?"
                              value={state.booking.notes}
                              onChange={e => setState(s => ({ ...s, booking: { ...s.booking, notes: e.target.value } }))}
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={submitting}
                            className="btn-primary w-full justify-center"
                          >
                            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Request Private Dining</>}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ===== Navigation Buttons ===== */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <button
                  onClick={prevStep}
                  disabled={state.step === 1}
                  className="btn-secondary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={resetExperience}
                  className="text-xs text-text-muted hover:text-error transition-colors flex items-center gap-1.5"
                >
                  <RefreshCcw className="w-3.5 h-3.5" /> Reset
                </button>
                {state.step < 7 ? (
                  <button onClick={nextStep} className="btn-primary text-sm">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => builderRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-primary text-sm"
                  >
                    <CheckCheck className="w-4 h-4" /> Review Complete
                  </button>
                )}
              </div>
            </div>

            {/* ============ RIGHT: Sticky Summary ============ */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-sm">Your Private Dining Experience</h4>
                    <button onClick={() => setShowSummary(!showSummary)} className="lg:hidden p-1 hover:bg-background rounded-lg">
                      {showSummary ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className={`space-y-3 text-sm ${showSummary ? '' : 'hidden lg:block'}`}>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Guests</span>
                      <span className="font-semibold">{guestOptions.find(g => g.id === state.guestType)?.guests || 2}</span>
                    </div>
                    {state.occasion && (
                      <div className="flex justify-between">
                        <span className="text-text-muted">Occasion</span>
                        <span className="font-semibold">{occasions.find(o => o.id === state.occasion)?.label}</span>
                      </div>
                    )}
                    {state.date && (
                      <div className="flex justify-between">
                        <span className="text-text-muted">Date</span>
                        <span className="font-semibold">{state.date}</span>
                      </div>
                    )}
                    {state.time && (
                      <div className="flex justify-between">
                        <span className="text-text-muted">Time</span>
                        <span className="font-semibold">{timeSlots.find(t => t.value === state.time)?.label}</span>
                      </div>
                    )}

                    {state.guestSelections.map((guest, index) => {
                      const dishes = [...guest.starters, ...guest.mains, ...guest.desserts];
                      return (
                        <div key={index} className={index === 0 ? 'border-t border-border pt-3' : ''}>
                          <p className={`text-xs font-semibold mb-1.5 ${index % 2 === 0 ? 'text-primary' : 'text-accent'}`}>Guest {index + 1}</p>
                          <div className="flex flex-wrap gap-1">
                            {dishes.map(id => {
                              const item = findItem([...starters, ...mains, ...desserts], id);
                              return item ? <span key={id} className={`text-[10px] px-2 py-0.5 rounded ${index % 2 === 0 ? 'bg-primary/5 text-primary' : 'bg-accent/5 text-accent'}`}>{item.name}</span> : null;
                            })}
                            {dishes.length === 0 && <span className="text-[10px] text-text-muted">No dishes</span>}
                          </div>
                        </div>
                      );
                    })}

                    {/* Shared */}
                    {[...state.shared.starters, ...state.shared.mains, ...state.shared.desserts].length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-success mb-1.5">Shared</p>
                        <div className="flex flex-wrap gap-1">
                          {[...state.shared.starters, ...state.shared.mains, ...state.shared.desserts].map(id => {
                            const item = findItem([...starters, ...mains, ...desserts], id);
                            return item ? <span key={id} className="text-[10px] px-2 py-0.5 rounded bg-success/5 text-success">{item.name}</span> : null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Experiences */}
                    {state.selectedExperiences.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-text-muted mb-1.5">Experiences</p>
                        <div className="flex flex-wrap gap-1">
                          {state.selectedExperiences.map(id => {
                            const exp = findItem(experiences, id);
                            return exp ? <span key={id} className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent">{exp.name}</span> : null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Chef's Freedom */}
                    {state.chefFreedom && (
                      <div className="flex items-center gap-1.5 text-xs text-accent">
                        <ChefHat className="w-3.5 h-3.5" /> Chef's surprises enabled
                      </div>
                    )}

                    {/* Total */}
                    <div className="border-t border-border pt-3 flex justify-between items-center">
                      <span className="font-semibold">Estimated Total</span>
                      <span className="text-xl font-bold text-primary">₹{formatPrice(pricing.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Mobile bottom bar */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border p-4 shadow-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-text-muted">Estimated Total</p>
                      <p className="text-lg font-bold text-primary">₹{formatPrice(pricing.total)}</p>
                    </div>
                    <button
                      onClick={() => { if (state.step < 7) nextStep(); else builderRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="btn-primary text-sm"
                    >
                      {state.step < 7 ? <>Next <ChevronRight className="w-4 h-4" /></> : <><CheckCheck className="w-4 h-4" /> Review</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== COUPLE-FOCUSED CTA ==================== */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #602628 0%, #4A1C1E 50%, #3A1415 100%)' }}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Heart className="w-10 h-10 text-accent mx-auto mb-4" />
              <h2 className="text-white mb-4">Your Table. Your Menu. Your Evening.</h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                Tell us what you both love. We'll take care of the rest.
              </p>
              <button
                onClick={() => builderRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20"
              >
                <Wand2 className="w-4 h-4" /> Design Your Evening
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}