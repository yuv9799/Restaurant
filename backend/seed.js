require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User.model.js');
const Dish = require('./src/models/Dish.model.js');
const Drink = require('./src/models/Drink.model.js');
const Table = require('./src/models/Table.model.js');
const Award = require('./src/models/Award.model.js');
const Review = require('./src/models/Review.model.js');

const img = (name) => `https://source.unsplash.com/400x300/?${name},indian+food`;

const dishes = [
  // Breads
  { name: 'Dash Parwatah', description: 'Crispy layered flatbread from North Indian cuisine', category: 'breads', price: 89, isVeg: true, image: img('dash+paratha') },
  { name: 'Veg Paratha', description: 'Whole wheat paratha stuffed with mixed vegetables', category: 'breads', price: 79, isVeg: true, image: img('veg+paratha') },
  { name: 'Gobhi Naan', description: 'Soft naan bread stuffed with spiced cauliflower', category: 'breads', price: 99, isVeg: true, image: img('gobhi+naan') },
  { name: 'Aloo Naan', description: 'Tandoor naan stuffed with spiced potato filling', category: 'breads', price: 89, isVeg: true, image: img('aloo+naan') },
  { name: 'Aloo Paratha', description: 'Classic Punjabi paratha stuffed with spiced potatoes', category: 'breads', price: 79, isVeg: true, image: img('aloo+paratha') },
  { name: 'Garlic Naan', description: 'Tandoor-baked leavened bread rubbed with garlic and butter', category: 'breads', price: 79, isVeg: true, isBestSeller: true, image: img('garlic+naan') },
  { name: 'Keema Roti', description: 'Whole wheat roti stuffed with minced lamb keema', category: 'breads', price: 129, isVeg: false, image: img('keema+roti') },
  { name: 'Afghan Chapati', description: 'Thick soft flatbread inspired by Afghan cuisine', category: 'breads', price: 69, isVeg: true, image: img('afghan+chapati') },
  { name: 'Halli Naan', description: 'Traditional North Indian spiced naan bread', category: 'breads', price: 85, isVeg: true, image: img('naan+bread') },
  { name: 'Peshawari Naan', description: 'Stuffed naan with nuts, raisins, and coconut', category: 'breads', price: 99, isVeg: true, isChefSpecial: true, image: img('peshawari+naan') },
  { name: 'Roomali Roti', description: 'Paper-thin handkerchief bread cooked on inverted wok', category: 'breads', price: 49, isVeg: true, image: img('roomali+roti') },
  { name: 'Laccha Paratha', description: 'Layered whole wheat paratha cooked with ghee', category: 'breads', price: 69, isVeg: true, image: img('laccha+paratha') },
  { name: 'Tandoori Roti', description: 'Whole wheat bread baked in tandoor', category: 'breads', price: 45, isVeg: true, image: img('tandoori+roti') },
  // Starters
  { name: 'Paneer Tikka', description: 'Cottage cheese marinated in yogurt and spices, grilled in tandoor', category: 'starters', price: 349, isVeg: true, isChefSpecial: true, isBestSeller: true, image: img('paneer+tikka') },
  { name: 'Chicken Tikka', description: 'Tender chicken pieces marinated in aromatic spices, chargrilled', category: 'starters', price: 399, isVeg: false, isBestSeller: true, image: img('chicken+tikka') },
  { name: 'Fish Amritsari', description: 'Crispy fried sole fish marinated with gram flour and Punjabi spices', category: 'starters', price: 449, isVeg: false, isChefSpecial: true, image: img('fish+amritsari') },
  { name: 'Dal Ke Kabab', description: 'Crispy lentil-based kebabs with aromatic spices', category: 'starters', price: 249, isVeg: true, isChefSpecial: true, image: img('dal+kebab') },
  { name: 'Gobhi Tikka', description: 'Cauliflower florets marinated in tandoori spices, grilled', category: 'starters', price: 299, isVeg: true, image: img('gobhi+tikka') },
  { name: 'Veg Falafel', description: 'Crispy chickpea patties served with mint chutney', category: 'starters', price: 279, isVeg: true, image: img('falafel') },
  { name: 'Multigrain Tikka', description: 'Healthy multigrain vegetable tikka grilled in tandoor', category: 'starters', price: 289, isVeg: true, image: img('multigrain+tikka') },
  { name: 'Home Made Kebab', description: 'Traditional homemade-style minced meat kebabs', category: 'starters', price: 329, isVeg: false, isChefSpecial: true, image: img('homemade+kebab') },
  { name: 'Veg Seekh Kebab', description: 'Minced vegetable skewers with herbs and spices, tandoor-cooked', category: 'starters', price: 279, isVeg: true, image: img('veg+seekh+kebab') },
  { name: 'Prawn', description: 'Fresh succulent prawns cooked in aromatic Indian spices', category: 'starters', price: 549, isVeg: false, isChefSpecial: true, image: img('prawn+curry') },
  { name: 'Dahi Ke Kebab', description: 'Crispy yogurt kebabs with nuts and raisins, melt-in-mouth', category: 'starters', price: 329, isVeg: true, isChefSpecial: true, image: img('dahi+kebab') },
  { name: 'Hara Bhara Kebab', description: 'Spinach and potato patties with green herbs, shallow fried', category: 'starters', price: 299, isVeg: true, image: img('hara+bhara+kebab') },
  // Mains
  { name: 'Dal Makhani', description: 'Slow-cooked black lentils with cream and butter', category: 'mains', price: 379, isVeg: true, isBestSeller: true, image: img('dal+makhani') },
  { name: 'Shahi Paneer', description: 'Royal paneer curry with creamy cashew and cream gravy', category: 'mains', price: 419, isVeg: true, image: img('shahi+paneer') },
  { name: 'Tinda', description: 'Indian round gourd curry cooked with traditional spices', category: 'mains', price: 259, isVeg: true, image: img('tinda+gourd+curry') },
  { name: 'Veg Jalfrezi', description: 'Stir-fried mixed vegetables with Indian spices', category: 'mains', price: 289, isVeg: true, image: img('veg+jalfrezi') },
  { name: 'Keema', description: 'Spiced minced lamb curry cooked with peas and herbs', category: 'mains', price: 429, isVeg: false, image: img('keema+curry') },
  { name: 'Butter Chicken', description: 'Signature creamy tomato-based curry with tender tandoori chicken', category: 'mains', price: 499, isVeg: false, isChefSpecial: true, isBestSeller: true, image: img('butter+chicken') },
  { name: 'Paneer Butter Masala', description: 'Rich and creamy paneer curry with buttery tomato gravy', category: 'mains', price: 399, isVeg: true, isBestSeller: true, image: img('paneer+butter+masala') },
  { name: 'Rogan Josh', description: 'Kashmiri-style lamb curry with aromatic spices and yogurt', category: 'mains', price: 549, isVeg: false, isChefSpecial: true, image: img('rogan+josh') },
  { name: 'Chicken Curry', description: 'Classic North Indian chicken curry with onion-tomato base', category: 'mains', price: 399, isVeg: false, image: img('chicken+curry') },
  { name: 'Malai Kofta', description: 'Soft paneer and potato dumplings in rich creamy gravy', category: 'mains', price: 389, isVeg: true, image: img('malai+kofta') },
  { name: 'Chickpea Curry', description: 'Spiced chickpea curry with tangy and aromatic flavors', category: 'mains', price: 299, isVeg: true, image: img('chickpea+curry') },
  // Rice & Biryani
  { name: 'Veg Biryani', description: 'Aromatic basmati rice with mixed vegetables and biryani spices', category: 'rice-biryani', price: 349, isVeg: true, isBestSeller: true, image: img('veg+biryani') },
  { name: 'Mutton Biryani', description: 'Royal Hyderabad-style biryani with tender mutton pieces', category: 'rice-biryani', price: 529, isVeg: false, isChefSpecial: true, image: img('mutton+biryani') },
  { name: 'Chicken Biryani', description: 'Fragrant basmati rice layered with spiced chicken and saffron', category: 'rice-biryani', price: 449, isVeg: false, isBestSeller: true, image: img('chicken+biryani') },
  { name: 'Green Biryani', description: 'Fresh herb-infused biryani with coriander and mint', category: 'rice-biryani', price: 379, isVeg: true, isChefSpecial: true, image: img('green+biryani') },
  { name: 'Jeera Rice', description: 'Steamed basmati rice tempered with cumin seeds', category: 'rice-biryani', price: 169, isVeg: true, isJain: true, image: img('jeera+rice') },
  { name: 'Veg Pulao', description: 'Lightly spiced rice with garden vegetables and whole spices', category: 'rice-biryani', price: 249, isVeg: true, isJain: true, image: img('veg+pulao') },
  // Desserts
  { name: 'Shahi Kheer', description: 'Royal rice pudding with saffron, cardamom, and dry fruits', category: 'desserts', price: 249, isVeg: true, isChefSpecial: true, image: img('shahi+kheer') },
  { name: 'Veg Halwa', description: 'Rich semolina halwa with ghee, nuts, and raisins', category: 'desserts', price: 199, isVeg: true, image: img('veg+halwa') },
  { name: 'Gajar Halwa', description: 'Traditional carrot halwa slow-cooked with ghee and milk', category: 'desserts', price: 269, isVeg: true, isChefSpecial: true, image: img('gajar+halwa') },
  { name: 'Rasmalai', description: 'Soft paneer discs soaked in sweetened saffron-infused milk', category: 'desserts', price: 249, isVeg: true, isChefSpecial: true, image: img('rasmalai') },
  { name: 'Gulab Jamun', description: 'Deep-fried milk dumplings soaked in rose-scented sugar syrup', category: 'desserts', price: 199, isVeg: true, isBestSeller: true, image: img('gulab+jamun') },
  { name: 'Kulfi Falooda', description: 'Traditional Indian ice cream with vermicelli, rose syrup, nuts', category: 'desserts', price: 289, isVeg: true, isBestSeller: true, image: img('kulfi+falooda') },
  // Specials
  { name: 'Thali — Royal Feast', description: 'Complete North Indian meal with dal, paneer, roti, rice, and dessert', category: 'specials', price: 799, isVeg: true, isChefSpecial: true, isBestSeller: true, image: img('indian+thali+meal') },
];

const drinks = [
  { name: 'Mint Cooler', description: 'Refreshing mint and lime cooler with a touch of honey', category: 'mocktails', price: 199, isBestSeller: true, image: img('mint+cooler') },
  { name: 'Virgin Mojito', description: 'Classic mojito with fresh mint, lime, and soda', category: 'mocktails', price: 219, image: img('virgin+mojito') },
  { name: 'Aam Panna', description: 'Traditional raw mango drink with cumin and mint', category: 'mocktails', price: 179, isBestSeller: true, image: img('aam+panna') },
  { name: 'Mango Lassi', description: 'Thick and creamy yogurt drink with Alphonso mango pulp', category: 'lassi-shakes', price: 179, isBestSeller: true, image: img('mango+lassi') },
  { name: 'Masala Chai', description: 'Traditional Indian spiced tea with ginger and cardamom', category: 'hot-beverages', price: 99, isBestSeller: true, image: img('masala+chai') },
  { name: 'Filter Coffee', description: 'South Indian filter coffee with frothy milk', category: 'hot-beverages', price: 119, image: img('filter+coffee') },
  { name: 'Fresh Lime Soda', description: 'Freshly squeezed lime with soda water', category: 'soft-drinks', price: 89, isBestSeller: true, image: img('fresh+lime+soda') },
  { name: 'Sweet Lassi', description: 'Traditional sweet yogurt drink with cardamom', category: 'lassi-shakes', price: 149, image: img('sweet+lassi') },
];

const tables = Array.from({ length: 15 }, (_, i) => ({
  tableNumber: i + 1,
  capacity: [2, 2, 4, 4, 4, 6, 2, 2, 4, 4, 6, 2, 4, 4, 2][i],
  section: ['indoor', 'indoor', 'indoor', 'indoor', 'indoor', 'indoor', 'outdoor', 'outdoor', 'outdoor', 'outdoor', 'outdoor', 'private', 'private', 'private', 'private'][i]
}));

const awards = [
  { title: 'Best North Indian Restaurant', platform: 'Zomato', year: 2024, description: 'Awarded for exceptional dining experience' },
  { title: 'Top Rated Fine Dining', platform: 'Google', year: 2024, description: '4.8 stars from 2000+ reviews' },
  { title: 'Excellence in Service', platform: 'Swiggy', year: 2023, description: 'Outstanding hospitality' },
  { title: 'Best Ambiance Award', platform: 'EazyDiner', year: 2024, description: 'Warm and inviting atmosphere' },
  { title: 'Culinary Excellence', platform: 'Zomato', year: 2023, description: 'Innovative North Indian cuisine' },
  { title: 'People\'s Choice Award', platform: 'Google', year: 2023, description: 'Customer favorite' },
  { title: 'Best Sunday Brunch', platform: 'EazyDiner', year: 2024, description: 'Most indulgent Sunday brunch' },
  { title: 'Top 10 Restaurants in Ahmedabad', platform: 'Times Food', year: 2024, description: 'Featured in Times Food Guide' }
];

const reviews = [
  { reviewerName: 'Priya Sharma', platform: 'Zomato', rating: 5, comment: 'The butter chicken here is absolutely divine!', isVerified: true },
  { reviewerName: 'Rahul Mehta', platform: 'Google', rating: 5, comment: 'Best North Indian dining experience in the city.', isVerified: true },
  { reviewerName: 'Ananya Patel', platform: 'Swiggy', rating: 4, comment: 'The Sunday brunch buffet is incredible.', isVerified: true },
  { reviewerName: 'Vikram Singh', platform: 'Zomato', rating: 5, comment: 'Exquisite flavors and impeccable service.', isVerified: true },
  { reviewerName: 'Neha Gupta', platform: 'Google', rating: 5, comment: 'Perfect anniversary celebration at ReNorth.', isVerified: true },
  { reviewerName: 'Amit Kumar', platform: 'Swiggy', rating: 4, comment: 'Great food, great ambiance.', isVerified: true },
  { reviewerName: 'Sunita Reddy', platform: 'EazyDiner', rating: 5, comment: 'North Indian food at its finest.', isVerified: true },
  { reviewerName: 'Kiran Joshi', platform: 'Google', rating: 5, comment: 'Hands down the best restaurant in town.', isVerified: true },
  { reviewerName: 'Deepak Verma', platform: 'Swiggy', rating: 5, comment: 'The live music on Sundays is lovely.', isVerified: true },
  { reviewerName: 'Rohit Khanna', platform: 'Zomato', rating: 5, comment: 'The kheer and gulab jamun are the best!', isVerified: true },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');
    await Promise.all([Dish.deleteMany({}), Drink.deleteMany({}), Table.deleteMany({}), Award.deleteMany({}), Review.deleteMany({}), User.deleteMany({})]);
    console.log('Cleared existing data.');
    await Dish.insertMany(dishes); console.log(`Seeded ${dishes.length} dishes.`);
    await Drink.insertMany(drinks); console.log(`Seeded ${drinks.length} drinks.`);
    await Table.insertMany(tables); console.log(`Seeded ${tables.length} tables.`);
    await Award.insertMany(awards); console.log(`Seeded ${awards.length} awards.`);
    await Review.insertMany(reviews); console.log(`Seeded ${reviews.length} reviews.`);
    const adminUser = new User({ email: 'admin@renorth.com', name: 'Admin', role: 'admin' });
    await adminUser.save(); console.log('Created admin user: admin@renorth.com');
    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) { console.error('Seed error:', error); process.exit(1); }
}
seed();