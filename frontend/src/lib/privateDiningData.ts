// ============================================================
// Private Dining Customization Data
// Structured so it can be connected to a backend later.
// ============================================================

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  image?: string;
  category: 'starters' | 'mains' | 'desserts';
}

export interface DrinkOption {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export interface AmbienceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface ExperienceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

// ---------- Base Experience ----------
export const BASE_EXPERIENCE_PRICE = 3999;

// ---------- Occasions ----------
export const occasions = [
  { id: 'romantic-date', label: 'Romantic Date', icon: 'Heart' },
  { id: 'anniversary', label: 'Anniversary', icon: 'Gem' },
  { id: 'birthday', label: 'Birthday', icon: 'Cake' },
  { id: 'proposal', label: 'Proposal', icon: 'Diamond' },
  { id: 'engagement', label: 'Engagement', icon: 'Sparkles' },
  { id: 'celebration', label: 'Celebration', icon: 'PartyPopper' },
  { id: 'just-because', label: 'Just Because', icon: 'Smile' },
  { id: 'other', label: 'Other', icon: 'MoreHorizontal' },
];

// ---------- Guest Count Options ----------
export const guestOptions = [
  { id: 'couple', label: 'Just the two of us', description: 'An intimate evening for two', guests: 2 },
  { id: 'small', label: 'Small celebration', description: 'Up to 4 guests', guests: 4 },
  { id: 'family', label: 'Family / private group', description: 'Up to 8 guests', guests: 8 },
];

// ---------- Time Slots ----------
export const timeSlots = [
  { label: '6:00 PM', value: '18:00' },
  { label: '6:30 PM', value: '18:30' },
  { label: '7:00 PM', value: '19:00' },
  { label: '7:30 PM', value: '19:30' },
  { label: '8:00 PM', value: '20:00' },
  { label: '8:30 PM', value: '20:30' },
  { label: '9:00 PM', value: '21:00' },
];

// ---------- Starters ----------
export const starters: MenuItem[] = [
  { id: 'st-truffle-croquettes', name: 'Truffle Mushroom Croquettes', description: 'Crispy croquettes with wild mushrooms and black truffle aioli', price: 450, tags: ['Vegetarian'], category: 'starters' },
  { id: 'st-burrata', name: 'Burrata & Heirloom Tomato', description: 'Creamy burrata with heirloom tomatoes, basil oil and aged balsamic', price: 520, tags: ['Vegetarian', 'Gluten-Free'], category: 'starters' },
  { id: 'st-lotus-stem', name: 'Crispy Lotus Stem', description: 'Crispy lotus stem tossed in a sweet-spicy honey glaze', price: 380, tags: ['Vegetarian', 'Vegan'], category: 'starters' },
  { id: 'st-smoked-paneer', name: 'Smoked Paneer', description: 'House-smoked paneer with charred peppers and mint chutney', price: 420, tags: ['Vegetarian'], category: 'starters' },
  { id: 'st-charred-prawns', name: 'Charred Prawns', description: 'Charred jumbo prawns with garlic butter and lemon', price: 650, tags: ['Seafood'], category: 'starters' },
  { id: 'st-chicken-tikka', name: 'Galouti Chicken Tikka', description: 'Melt-in-mouth chicken tikka with royal Awadhi spices', price: 480, tags: ['Non-Vegetarian'], category: 'starters' },
];

// ---------- Mains ----------
export const mains: MenuItem[] = [
  { id: 'mn-truffle-pasta', name: 'Truffle Pasta', description: 'Handmade pasta in a creamy black truffle sauce', price: 680, tags: ['Vegetarian'], category: 'mains' },
  { id: 'mn-mushroom-risotto', name: 'Wild Mushroom Risotto', description: 'Creamy arborio rice with wild mushrooms and parmesan', price: 620, tags: ['Vegetarian'], category: 'mains' },
  { id: 'mn-herb-chicken', name: 'Herb-Crusted Chicken', description: 'Chicken breast with a herb crust, served with seasonal vegetables', price: 720, tags: ['Non-Vegetarian'], category: 'mains' },
  { id: 'mn-grilled-fish', name: 'Grilled Fish', description: 'Fresh catch grilled with lemon butter and herbs', price: 780, tags: ['Seafood'], category: 'mains' },
  { id: 'mn-paneer-wellington', name: 'Paneer Wellington', description: 'Spiced paneer wrapped in flaky pastry with mushroom duxelles', price: 650, tags: ['Vegetarian'], category: 'mains' },
  { id: 'mn-chef-special', name: "Seasonal Chef's Special", description: 'A surprise main course crafted by our chef using seasonal ingredients', price: 700, tags: ['Chef\'s Choice'], category: 'mains' },
];

// ---------- Desserts ----------
export const desserts: MenuItem[] = [
  { id: 'ds-chocolate-fondant', name: 'Chocolate Fondant', description: 'Molten chocolate cake with vanilla bean ice cream', price: 350, tags: ['Vegetarian'], category: 'desserts' },
  { id: 'ds-creme-brulee', name: 'Crème Brûlée', description: 'Classic vanilla bean crème brûlée with caramelized sugar', price: 320, tags: ['Vegetarian', 'Gluten-Free'], category: 'desserts' },
  { id: 'ds-tiramisu', name: 'Tiramisu', description: 'Espresso-soaked ladyfingers with mascarpone cream', price: 340, tags: ['Vegetarian'], category: 'desserts' },
  { id: 'ds-berry-cheesecake', name: 'Berry Cheesecake', description: 'Creamy cheesecake with a fresh berry compote', price: 360, tags: ['Vegetarian'], category: 'desserts' },
  { id: 'ds-chef-dessert', name: "Chef's Dessert Special", description: 'A surprise dessert crafted by our pastry chef', price: 380, tags: ['Chef\'s Choice'], category: 'desserts' },
];

// ---------- Drinks ----------
export const welcomeDrinks: DrinkOption[] = [
  { id: 'wd-signature-mocktail', name: 'Signature Mocktail', description: 'Our house-crafted seasonal mocktail', price: 250, tags: ['Non-Alcoholic'] },
  { id: 'wd-seasonal-cooler', name: 'Seasonal Cooler', description: 'Refreshing cooler with seasonal fruits and herbs', price: 220, tags: ['Non-Alcoholic'] },
  { id: 'wd-sparkling', name: 'Sparkling Welcome Drink', description: 'Sparkling beverage with a touch of citrus', price: 300, tags: ['Non-Alcoholic'] },
  { id: 'wd-chef-special', name: "Chef's Special", description: 'A surprise welcome drink created by our mixologist', price: 280, tags: ['Non-Alcoholic'] },
];

export const pairingOptions: DrinkOption[] = [
  { id: 'pr-none', name: 'No Pairing', description: 'Enjoy your meal without a beverage pairing', price: 0, tags: [] },
  { id: 'pr-mocktail', name: 'Mocktail Pairing', description: 'A curated mocktail pairing for each course', price: 600, tags: ['Non-Alcoholic'] },
  { id: 'pr-premium', name: 'Premium Beverage Pairing', description: 'Premium non-alcoholic beverage pairing with each course', price: 900, tags: ['Non-Alcoholic'] },
  { id: 'pr-chef', name: "Chef-Selected Pairing", description: 'Let our chef select the perfect pairings for your menu', price: 750, tags: ['Chef\'s Choice'] },
];

// ---------- Ambience ----------
export const tableSettings: AmbienceOption[] = [
  { id: 'ts-classic', name: 'Classic', description: 'Elegant classic table setting', price: 0, icon: 'UtensilsCrossed' },
  { id: 'ts-romantic', name: 'Romantic', description: 'Soft tones and intimate styling', price: 300, icon: 'Heart' },
  { id: 'ts-candlelit', name: 'Candlelit', description: 'Candles and warm glow throughout', price: 500, icon: 'Flame' },
  { id: 'ts-floral', name: 'Floral', description: 'Fresh flowers adorning the table', price: 600, icon: 'Flower2' },
  { id: 'ts-minimal', name: 'Minimal', description: 'Clean, modern, understated elegance', price: 0, icon: 'Minus' },
  { id: 'ts-celebration', name: 'Celebration', description: 'Festive styling for special moments', price: 450, icon: 'PartyPopper' },
];

export const musicOptions: AmbienceOption[] = [
  { id: 'mu-soft-jazz', name: 'Soft Jazz', description: 'Smooth jazz in the background', price: 0, icon: 'Music' },
  { id: 'mu-acoustic', name: 'Acoustic', description: 'Live acoustic guitar', price: 800, icon: 'Guitar' },
  { id: 'mu-romantic', name: 'Romantic', description: 'Curated romantic playlist', price: 0, icon: 'Heart' },
  { id: 'mu-classical', name: 'Classical', description: 'Classical piano pieces', price: 600, icon: 'Piano' },
  { id: 'mu-none', name: 'No Music', description: 'Complete silence for your evening', price: 0, icon: 'VolumeX' },
  { id: 'mu-custom', name: 'Your Preference', description: 'Tell us what you\'d like to hear', price: 0, icon: 'Music2' },
];

export const lightingOptions: AmbienceOption[] = [
  { id: 'li-warm', name: 'Warm & Intimate', description: 'Soft warm lighting for a cozy feel', price: 0, icon: 'Sun' },
  { id: 'li-candlelight', name: 'Candlelight', description: 'Candlelit ambiance throughout', price: 300, icon: 'Flame' },
  { id: 'li-ambient', name: 'Soft Ambient', description: 'Gentle ambient lighting', price: 0, icon: 'Lamp' },
  { id: 'li-celebration', name: 'Celebration', description: 'Brighter, festive lighting', price: 200, icon: 'Sparkles' },
];

export const flowerOptions: AmbienceOption[] = [
  { id: 'fl-none', name: 'No Flowers', description: 'Keep the table simple', price: 0, icon: 'X' },
  { id: 'fl-roses', name: 'Roses', description: 'A bouquet of fresh roses', price: 500, icon: 'Flower2' },
  { id: 'fl-seasonal', name: 'Seasonal Flowers', description: 'Fresh seasonal arrangements', price: 400, icon: 'Flower' },
  { id: 'fl-minimal', name: 'Minimal Floral', description: 'A small, elegant floral accent', price: 250, icon: 'Sprout' },
];

// ---------- Special Experiences ----------
export const experiences: ExperienceOption[] = [
  { id: 'ex-personalized-menu', name: 'Personalized Menu', description: 'A printed menu created especially for your evening', price: 350, icon: 'BookOpen' },
  { id: 'ex-handwritten-note', name: 'Handwritten Note', description: 'Leave a personal message at the table', price: 150, icon: 'PenLine' },
  { id: 'ex-anniversary-setup', name: 'Anniversary Setup', description: 'Romantic table styling with personalized details', price: 500, icon: 'Gem' },
  { id: 'ex-birthday-surprise', name: 'Birthday Surprise', description: 'A special dessert and celebration setup', price: 450, icon: 'Cake' },
  { id: 'ex-proposal-setup', name: 'Proposal Setup', description: 'A beautifully prepared setting for your special moment', price: 800, icon: 'Diamond' },
  { id: 'ex-photography', name: 'Photography', description: 'Capture a few special moments during your evening', price: 1200, icon: 'Camera' },
  { id: 'ex-chef-interaction', name: 'Chef Interaction', description: 'Meet the chef and hear the story behind your dishes', price: 300, icon: 'ChefHat' },
  { id: 'ex-dessert-presentation', name: 'Dessert Presentation', description: 'A personalized dessert presentation', price: 350, icon: 'IceCream' },
];

// ---------- Dietary Preferences ----------
export const dietaryPreferences = [
  'Vegetarian', 'Vegan', 'Jain', 'Gluten-Free', 'Dairy-Free',
  'Egg-Free', 'Nut-Free', 'Halal', 'No Seafood', 'No Meat', 'Other',
];

// ---------- Spice Levels ----------
export const spiceLevels = [
  { id: 'none', label: 'No Spice', description: 'Mild and gentle' },
  { id: 'mild', label: 'Mild', description: 'A gentle warmth' },
  { id: 'medium', label: 'Medium', description: 'Balanced heat' },
  { id: 'spicy', label: 'Spicy', description: 'A bold kick' },
  { id: 'very-spicy', label: 'Very Spicy', description: 'For the brave' },
];

// ---------- Taste Preferences ----------
export const tastePreferences = [
  'Rich & Creamy', 'Light & Fresh', 'Smoky', 'Spicy', 'Sweet',
  'Savoury', 'Tangy', 'Umami', "Chef's Choice",
];

// ---------- Chef's Freedom Options ----------
export const chefFreedomOptions = [
  { id: 'cf-surprise-starter', label: 'Surprise Starter', description: 'A surprise starter crafted by our chef' },
  { id: 'cf-surprise-main', label: 'Surprise Main', description: 'A surprise main course' },
  { id: 'cf-surprise-dessert', label: 'Surprise Dessert', description: 'A surprise dessert' },
  { id: 'cf-surprise-drink', label: 'Surprise Drink', description: 'A surprise welcome drink' },
  { id: 'cf-full-chef', label: "Full Chef's Choice", description: 'Let our chef design the entire experience' },
];

// ---------- Contact Methods ----------
export const contactMethods = ['Email', 'Phone', 'WhatsApp'];

// ---------- Sample Experiences (for hero secondary CTA) ----------
export const sampleExperiences = [
  {
    id: 'sample-anniversary',
    title: 'The Anniversary Evening',
    description: 'Candlelit table, roses, soft jazz, and a personalized dessert for two.',
    price: 5499,
    icon: 'Gem',
  },
  {
    id: 'sample-proposal',
    title: 'The Proposal',
    description: 'A beautifully prepared setting, photography, and a surprise dessert presentation.',
    price: 7999,
    icon: 'Diamond',
  },
  {
    id: 'sample-romantic',
    title: 'The Romantic Date',
    description: 'Warm intimate lighting, acoustic music, and a chef-curated tasting menu.',
    price: 4999,
    icon: 'Heart',
  },
];