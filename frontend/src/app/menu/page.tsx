'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
  // Starters
  { _id: 's1', name: 'Paneer Tikka', description: 'Smoked cottage cheese marinated with aromatic spices and grilled in tandoor', price: 325, category: 'starters', isVeg: true, isChefSpecial: true, isBestSeller: true },
  { _id: 's2', name: 'Tandoori Chicken', description: 'Chicken marinated in yogurt and spices, chargrilled in clay oven', price: 425, category: 'starters', isVeg: false, isBestSeller: true },
  { _id: 's3', name: 'Hara Bhara Kebab', description: 'Spinach and potato patties with green herbs, shallow fried', price: 295, category: 'starters', isVeg: true },
  { _id: 's4', name: 'Chicken Seekh Kebab', description: 'Minced chicken skewers with fresh herbs and Indian spices', price: 395, category: 'starters', isVeg: false },
  { _id: 's5', name: 'Malai Broccoli', description: 'Broccoli florets in creamy cashew marinade, grilled to perfection', price: 345, category: 'starters', isVeg: true },
  { _id: 's6', name: 'Crispy Corn', description: 'Golden fried corn kernels tossed with peppers and chaat masala', price: 275, category: 'starters', isVeg: true },
  { _id: 's7', name: 'Dahi Ke Kebab', description: 'Crispy yogurt kebabs with nuts and raisins, melt-in-mouth', price: 315, category: 'starters', isVeg: true, isChefSpecial: true },
  { _id: 's8', name: 'Amritsari Fish', description: 'Crispy fried fish marinated with gram flour and Punjabi spices', price: 445, category: 'starters', isVeg: false, isChefSpecial: true },
  { _id: 's9', name: 'Tandoori Prawns', description: 'Jumbo prawns marinated in yogurt and spices, chargrilled', price: 525, category: 'starters', isVeg: false, isChefSpecial: true },
  { _id: 's10', name: 'Mushroom Galouti', description: 'Melt-in-mouth mushroom kebabs with royal Awadhi spices', price: 375, category: 'starters', isVeg: true, isChefSpecial: true },
  { _id: 's11', name: 'Chicken 65', description: 'Crispy fried chicken tossed in fiery South Indian spice mix', price: 395, category: 'starters', isVeg: false, isBestSeller: true },
  { _id: 's12', name: 'Samosa Chaat', description: 'Crushed samosas topped with yogurt, chutneys and sev', price: 245, category: 'starters', isVeg: true },
  { _id: 's13', name: 'Aloo Tikki', description: 'Crispy potato patties with spiced chickpeas and chutneys', price: 225, category: 'starters', isVeg: true },
  { _id: 's14', name: 'Papdi Chaat', description: 'Crispy wafers with yogurt, chutneys and pomegranate', price: 235, category: 'starters', isVeg: true },
  { _id: 's15', name: 'Bharwan Mushrooms', description: 'Stuffed mushrooms with spiced cheese and herbs, grilled', price: 365, category: 'starters', isVeg: true },
  { _id: 's16', name: 'Mutton Seekh Kebab', description: 'Minced lamb skewers with fresh mint and Indian spices', price: 475, category: 'starters', isVeg: false, isChefSpecial: true },
  { _id: 's17', name: 'Chilli Paneer', description: 'Indo-Chinese style paneer tossed with peppers and soy glaze', price: 325, category: 'starters', isVeg: true, isBestSeller: true },
  { _id: 's18', name: 'Tandoori Momos', description: 'Steamed dumplings tossed in tandoori masala and chargrilled', price: 295, category: 'starters', isVeg: true },
  { _id: 's19', name: 'Achari Chicken Tikka', description: 'Chicken tikka marinated in pickling spices and chargrilled', price: 425, category: 'starters', isVeg: false },
  { _id: 's20', name: 'Kasundi Fish Tikka', description: 'Fish tikka in tangy mustard marinade, grilled in tandoor', price: 465, category: 'starters', isVeg: false, isChefSpecial: true },

  // Mains
  { _id: 'm1', name: 'Butter Chicken', description: 'Signature creamy tomato-based curry with tender tandoori chicken', price: 495, category: 'mains', isVeg: false, isChefSpecial: true, isBestSeller: true },
  { _id: 'm2', name: 'Chicken Tikka Masala', description: 'Grilled chicken tikka simmered in rich spiced tomato gravy', price: 475, category: 'mains', isVeg: false, isBestSeller: true },
  { _id: 'm3', name: 'Kadhai Chicken', description: 'Chicken cooked with bell peppers in rustic kadhai masala', price: 465, category: 'mains', isVeg: false },
  { _id: 'm4', name: 'Chicken Chettinad', description: 'Fiery South Indian chicken curry with roasted spices and coconut', price: 485, category: 'mains', isVeg: false },
  { _id: 'm5', name: 'Mutton Rogan Josh', description: 'Kashmiri-style lamb curry with aromatic spices and yogurt', price: 575, category: 'mains', isVeg: false, isChefSpecial: true },
  { _id: 'm6', name: 'Mutton Keema', description: 'Spiced minced lamb cooked with green peas and fresh herbs', price: 525, category: 'mains', isVeg: false },
  { _id: 'm7', name: 'Laal Maas', description: 'Fiery Rajasthani lamb curry with red chillies and ghee', price: 595, category: 'mains', isVeg: false, isChefSpecial: true },
  { _id: 'm8', name: 'Dal Makhani', description: 'Slow-cooked black lentils with cream and butter', price: 325, category: 'mains', isVeg: true, isBestSeller: true },
  { _id: 'm9', name: 'Dal Tadka', description: 'Yellow lentils tempered with ghee, garlic and red chillies', price: 275, category: 'mains', isVeg: true },
  { _id: 'm10', name: 'Paneer Butter Masala', description: 'Rich and creamy paneer curry with buttery tomato gravy', price: 395, category: 'mains', isVeg: true, isBestSeller: true },
  { _id: 'm11', name: 'Shahi Paneer', description: 'Royal paneer curry with creamy cashew and cream gravy', price: 405, category: 'mains', isVeg: true },
  { _id: 'm12', name: 'Kadhai Paneer', description: 'Paneer and peppers tossed in rustic kadhai masala', price: 385, category: 'mains', isVeg: true },
  { _id: 'm13', name: 'Palak Paneer', description: 'Cottage cheese cubes in creamy spinach gravy with garlic', price: 375, category: 'mains', isVeg: true },
  { _id: 'm14', name: 'Malai Kofta', description: 'Soft paneer and potato dumplings in rich creamy gravy', price: 395, category: 'mains', isVeg: true },
  { _id: 'm15', name: 'Chana Masala', description: 'Chickpeas simmered in tangy onion-tomato masala', price: 295, category: 'mains', isVeg: true },
  { _id: 'm16', name: 'Rajma Masala', description: 'Red kidney beans in rich onion-tomato gravy with spices', price: 295, category: 'mains', isVeg: true },
  { _id: 'm17', name: 'Bhindi Masala', description: 'Okra stir-fried with onions, tomatoes and Indian spices', price: 325, category: 'mains', isVeg: true },
  { _id: 'm18', name: 'Vegetable Kofta Curry', description: 'Mixed vegetable dumplings in rich tomato-onion gravy', price: 365, category: 'mains', isVeg: true },
  { _id: 'm19', name: 'Mushroom Masala', description: 'Button mushrooms in rich onion-tomato masala gravy', price: 355, category: 'mains', isVeg: true },
  { _id: 'm20', name: 'Methi Malai Chicken', description: 'Chicken in creamy fenugreek and cashew gravy', price: 495, category: 'mains', isVeg: false, isChefSpecial: true },

  // Breads
  { _id: 'b1', name: 'Plain Naan', description: 'Classic leavened bread baked in tandoor', price: 95, category: 'breads', isVeg: true },
  { _id: 'b2', name: 'Butter Naan', description: 'Soft naan brushed with melted butter', price: 115, category: 'breads', isVeg: true, isBestSeller: true },
  { _id: 'b3', name: 'Garlic Naan', description: 'Tandoor-baked naan rubbed with garlic and butter', price: 145, category: 'breads', isVeg: true, isBestSeller: true },
  { _id: 'b4', name: 'Cheese Naan', description: 'Naan stuffed with melted cheese and herbs', price: 195, category: 'breads', isVeg: true },
  { _id: 'b5', name: 'Tandoori Roti', description: 'Whole wheat bread baked in clay oven', price: 75, category: 'breads', isVeg: true },
  { _id: 'b6', name: 'Butter Roti', description: 'Whole wheat bread brushed with butter', price: 85, category: 'breads', isVeg: true },
  { _id: 'b7', name: 'Missi Roti', description: 'Spiced gram flour flatbread with ajwain and chillies', price: 105, category: 'breads', isVeg: true },
  { _id: 'b8', name: 'Roomali Roti', description: 'Paper-thin handkerchief bread cooked on inverted wok', price: 95, category: 'breads', isVeg: true },
  { _id: 'b9', name: 'Laccha Paratha', description: 'Layered whole wheat paratha cooked with ghee', price: 125, category: 'breads', isVeg: true },
  { _id: 'b10', name: 'Pudina Paratha', description: 'Whole wheat paratha stuffed with fresh mint', price: 135, category: 'breads', isVeg: true },
  { _id: 'b11', name: 'Aloo Paratha', description: 'Whole wheat paratha stuffed with spiced potatoes', price: 145, category: 'breads', isVeg: true },
  { _id: 'b12', name: 'Paneer Paratha', description: 'Paratha stuffed with spiced cottage cheese', price: 175, category: 'breads', isVeg: true },
  { _id: 'b13', name: 'Gobi Paratha', description: 'Paratha stuffed with spiced cauliflower', price: 145, category: 'breads', isVeg: true },
  { _id: 'b14', name: 'Onion Kulcha', description: 'Leavened bread stuffed with spiced onions', price: 155, category: 'breads', isVeg: true },
  { _id: 'b15', name: 'Amritsari Kulcha', description: 'Punjabi stuffed kulcha with spiced potato filling', price: 185, category: 'breads', isVeg: true, isChefSpecial: true },
  { _id: 'b16', name: 'Masala Kulcha', description: 'Kulcha topped with spices and fresh coriander', price: 165, category: 'breads', isVeg: true },
  { _id: 'b17', name: 'Cheese Garlic Naan', description: 'Naan stuffed with cheese and topped with garlic butter', price: 215, category: 'breads', isVeg: true },
  { _id: 'b18', name: 'Methi Paratha', description: 'Whole wheat paratha with fenugreek leaves', price: 135, category: 'breads', isVeg: true },
  { _id: 'b19', name: 'Bajra Roti', description: 'Traditional pearl millet flatbread', price: 95, category: 'breads', isVeg: true },
  { _id: 'b20', name: 'Makki Di Roti', description: 'Punjabi cornmeal flatbread served with white butter', price: 115, category: 'breads', isVeg: true },

  // Rice & Biryani
  { _id: 'r1', name: 'Chicken Biryani', description: 'Fragrant basmati rice layered with spiced chicken and saffron', price: 495, category: 'rice-biryani', isVeg: false, isBestSeller: true },
  { _id: 'r2', name: 'Mutton Biryani', description: 'Royal Hyderabad-style biryani with tender mutton pieces', price: 595, category: 'rice-biryani', isVeg: false, isChefSpecial: true },
  { _id: 'r3', name: 'Hyderabadi Chicken Biryani', description: 'Authentic Hyderabadi dum biryani with saffron and mint', price: 525, category: 'rice-biryani', isVeg: false, isChefSpecial: true },
  { _id: 'r4', name: 'Lucknowi Mutton Biryani', description: 'Awadhi-style mutton biryani with aromatic spices', price: 625, category: 'rice-biryani', isVeg: false, isChefSpecial: true },
  { _id: 'r5', name: 'Kolkata Chicken Biryani', description: 'Bengali-style biryani with potato and egg', price: 495, category: 'rice-biryani', isVeg: false },
  { _id: 'r6', name: 'Vegetable Biryani', description: 'Aromatic basmati rice with mixed vegetables and biryani spices', price: 395, category: 'rice-biryani', isVeg: true, isBestSeller: true },
  { _id: 'r7', name: 'Paneer Biryani', description: 'Fragrant rice layered with spiced paneer and saffron', price: 425, category: 'rice-biryani', isVeg: true },
  { _id: 'r8', name: 'Egg Biryani', description: 'Flavorful rice with spiced boiled eggs and fried onions', price: 375, category: 'rice-biryani', isVeg: false },
  { _id: 'r9', name: 'Prawn Biryani', description: 'Coastal-style biryani with succulent prawns and spices', price: 625, category: 'rice-biryani', isVeg: false, isChefSpecial: true },
  { _id: 'r10', name: 'Awadhi Biryani', description: 'Royal Awadhi dum biryani with saffron and kewra', price: 575, category: 'rice-biryani', isVeg: false, isChefSpecial: true },
  { _id: 'r11', name: 'Jeera Rice', description: 'Steamed basmati rice tempered with cumin seeds', price: 225, category: 'rice-biryani', isVeg: true },
  { _id: 'r12', name: 'Steamed Basmati Rice', description: 'Fluffy steamed basmati rice', price: 195, category: 'rice-biryani', isVeg: true },
  { _id: 'r13', name: 'Peas Pulao', description: 'Basmati rice cooked with green peas and whole spices', price: 245, category: 'rice-biryani', isVeg: true },
  { _id: 'r14', name: 'Vegetable Pulao', description: 'Lightly spiced rice with garden vegetables and whole spices', price: 265, category: 'rice-biryani', isVeg: true },
  { _id: 'r15', name: 'Kashmiri Pulao', description: 'Fragrant rice with dry fruits, saffron and rose water', price: 325, category: 'rice-biryani', isVeg: true },
  { _id: 'r16', name: 'Saffron Rice', description: 'Basmati rice infused with saffron and ghee', price: 345, category: 'rice-biryani', isVeg: true },
  { _id: 'r17', name: 'Mushroom Pulao', description: 'Basmati rice with mushrooms and whole spices', price: 295, category: 'rice-biryani', isVeg: true },
  { _id: 'r18', name: 'Chicken Pulao', description: 'Fragrant rice cooked with chicken and whole spices', price: 425, category: 'rice-biryani', isVeg: false },
  { _id: 'r19', name: 'Mutton Pulao', description: 'Aromatic rice with tender mutton and whole spices', price: 525, category: 'rice-biryani', isVeg: false },
  { _id: 'r20', name: 'Lemon Rice', description: 'South Indian style rice with lemon, peanuts and curry leaves', price: 235, category: 'rice-biryani', isVeg: true },

  // Desserts
  { _id: 'd1', name: 'Gulab Jamun', description: 'Deep-fried milk dumplings soaked in rose-scented sugar syrup', price: 165, category: 'desserts', isVeg: true, isBestSeller: true },
  { _id: 'd2', name: 'Rasmalai', description: 'Soft paneer discs soaked in sweetened saffron-infused milk', price: 195, category: 'desserts', isVeg: true, isChefSpecial: true },
  { _id: 'd3', name: 'Gajar Ka Halwa', description: 'Traditional carrot halwa slow-cooked with ghee and milk', price: 185, category: 'desserts', isVeg: true, isChefSpecial: true },
  { _id: 'd4', name: 'Kulfi', description: 'Traditional Indian ice cream with cardamom and nuts', price: 155, category: 'desserts', isVeg: true },
  { _id: 'd5', name: 'Kesar Kulfi', description: 'Saffron-infused Indian ice cream with pistachios', price: 185, category: 'desserts', isVeg: true },
  { _id: 'd6', name: 'Mango Kulfi', description: 'Creamy mango-flavored Indian ice cream', price: 175, category: 'desserts', isVeg: true },
  { _id: 'd7', name: 'Jalebi', description: 'Crispy spiral sweets soaked in saffron syrup', price: 145, category: 'desserts', isVeg: true },
  { _id: 'd8', name: 'Rabri Jalebi', description: 'Crispy jalebis served with thick sweetened milk', price: 225, category: 'desserts', isVeg: true, isChefSpecial: true },
  { _id: 'd9', name: 'Shahi Tukda', description: 'Royal bread pudding with saffron and dry fruits', price: 195, category: 'desserts', isVeg: true, isChefSpecial: true },
  { _id: 'd10', name: 'Phirni', description: 'Creamy ground rice pudding with cardamom and saffron', price: 175, category: 'desserts', isVeg: true },
  { _id: 'd11', name: 'Kheer', description: 'Traditional rice pudding with nuts and cardamom', price: 165, category: 'desserts', isVeg: true },
  { _id: 'd12', name: 'Rasgulla', description: 'Soft spongy cottage cheese balls in sugar syrup', price: 155, category: 'desserts', isVeg: true },
  { _id: 'd13', name: 'Moong Dal Halwa', description: 'Rich lentil halwa slow-cooked with ghee and saffron', price: 195, category: 'desserts', isVeg: true, isChefSpecial: true },
  { _id: 'd14', name: 'Malpua', description: 'Crispy pancakes soaked in sugar syrup with nuts', price: 185, category: 'desserts', isVeg: true },
  { _id: 'd15', name: 'Rabri', description: 'Thickened sweetened milk with cardamom and nuts', price: 175, category: 'desserts', isVeg: true },
  { _id: 'd16', name: 'Besan Ladoo', description: 'Gram flour sweets with ghee and cardamom', price: 145, category: 'desserts', isVeg: true },
  { _id: 'd17', name: 'Coconut Ladoo', description: 'Sweet coconut balls with condensed milk', price: 145, category: 'desserts', isVeg: true },
  { _id: 'd18', name: 'Chocolate Gulab Jamun', description: 'Classic gulab jamun with molten chocolate center', price: 195, category: 'desserts', isVeg: true },
  { _id: 'd19', name: 'Matka Kulfi', description: 'Traditional kulfi served in clay pot with pistachios', price: 225, category: 'desserts', isVeg: true, isBestSeller: true },
  { _id: 'd20', name: 'Saffron Phirni', description: 'Royal saffron phirni with slivered almonds', price: 215, category: 'desserts', isVeg: true, isChefSpecial: true },

  // Specials
  { _id: 'p1', name: 'Royal Thali', description: 'Complete royal feast with dal, paneer, roti, rice, and dessert', price: 895, category: 'specials', isVeg: true, isChefSpecial: true, isBestSeller: true },
  { _id: 'p2', name: 'Chef\u2019s Special Butter Chicken', description: 'Signature butter chicken with chef\u2019s secret spice blend', price: 695, category: 'specials', isVeg: false, isChefSpecial: true, isBestSeller: true },
  { _id: 'p3', name: 'Signature Mutton Rogan Josh', description: 'Slow-cooked Kashmiri lamb curry with royal spices', price: 795, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p4', name: 'Royal Chicken Biryani', description: 'Dum-cooked biryani with saffron, kewra and tender chicken', price: 725, category: 'specials', isVeg: false, isChefSpecial: true, isBestSeller: true },
  { _id: 'p5', name: 'Special Paneer Tikka', description: 'Premium paneer tikka with truffle oil and exotic spices', price: 525, category: 'specials', isVeg: true, isChefSpecial: true },
  { _id: 'p6', name: 'Truffle Mushroom Curry', description: 'Wild mushrooms in rich truffle-infused creamy gravy', price: 595, category: 'specials', isVeg: true, isChefSpecial: true },
  { _id: 'p7', name: 'Smoked Dal Makhani', description: 'Black lentils slow-cooked and finished with smoke', price: 425, category: 'specials', isVeg: true, isChefSpecial: true },
  { _id: 'p8', name: 'Awadhi Mutton Korma', description: 'Royal Awadhi mutton curry with cashew and saffron', price: 795, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p9', name: 'Tandoori Lamb Chops', description: 'Lamb chops marinated in royal spices, chargrilled', price: 895, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p10', name: 'Royal Prawn Curry', description: 'Jumbo prawns in rich coconut and spice gravy', price: 795, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p11', name: 'Saffron Chicken Korma', description: 'Chicken in creamy saffron and cashew korma', price: 695, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p12', name: 'Charcoal Chicken Tikka', description: 'Chicken tikka grilled over charcoal with smoky flavor', price: 625, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p13', name: 'Signature Galouti Kebab', description: 'Melt-in-mouth galouti kebabs with royal Awadhi spices', price: 675, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p14', name: 'Lucknowi Chicken Korma', description: 'Awadhi-style chicken korma with aromatic spices', price: 595, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p15', name: 'Rajasthani Laal Maas', description: 'Fiery Rajasthani lamb curry with Mathania chillies', price: 795, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p16', name: 'Kashmiri Yakhni', description: 'Delicate Kashmiri yogurt-based lamb curry', price: 695, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p17', name: 'Chef\u2019s Special Paneer', description: 'Premium paneer dish with chef\u2019s signature sauce', price: 525, category: 'specials', isVeg: true, isChefSpecial: true },
  { _id: 'p18', name: 'Royal Seafood Platter', description: 'Assorted seafood delicacies with royal accompaniments', price: 1195, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p19', name: 'Grand Mughlai Platter', description: 'Grand assortment of Mughlai delicacies', price: 995, category: 'specials', isVeg: false, isChefSpecial: true },
  { _id: 'p20', name: 'Signature Biryani Platter', description: 'Signature biryani served with royal accompaniments', price: 895, category: 'specials', isVeg: false, isChefSpecial: true, isBestSeller: true },
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
    if (saved) try { setCart(JSON.parse(saved)); } catch { }
  }, [selectedCategory, searchQuery]);

  useEffect(() => { localStorage.setItem('rn_cart', JSON.stringify(cart)); }, [cart]);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;
      const res = await menuApi.getAll(params);
      const fetched = res.data.dishes;
      if (fetched && fetched.length > 0) {
        setDishes(fetched);
      } else {
        applyFallback();
      }
    } catch {
      applyFallback();
    } finally { setLoading(false); }
  };

  const applyFallback = () => {
    let filtered = fallbackDishes;
    if (selectedCategory !== 'all') filtered = filtered.filter(d => d.category === selectedCategory);
    if (searchQuery) filtered = filtered.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setDishes(filtered);
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
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'bg-primary text-white' : 'bg-transparent text-text-muted hover:text-primary border border-border hover:border-primary/30'
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
                <Link href="/reservations?cart=1" className="btn-primary w-full justify-center"><ShoppingCart className="w-4 h-4" /> Proceed to Checkout</Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}