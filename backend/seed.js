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
  // ==================== STARTERS ====================
  { name: 'Paneer Tikka', description: 'Smoked cottage cheese marinated with aromatic spices and grilled in tandoor', category: 'starters', price: 325, isVeg: true, isChefSpecial: true, isBestSeller: true, image: img('paneer+tikka') },
  { name: 'Tandoori Chicken', description: 'Chicken marinated in yogurt and spices, chargrilled in clay oven', category: 'starters', price: 425, isVeg: false, isBestSeller: true, image: img('tandoori+chicken') },
  { name: 'Hara Bhara Kebab', description: 'Spinach and potato patties with green herbs, shallow fried', category: 'starters', price: 295, isVeg: true, image: img('hara+bhara+kebab') },
  { name: 'Chicken Seekh Kebab', description: 'Minced chicken skewers with fresh herbs and Indian spices', category: 'starters', price: 395, isVeg: false, image: img('chicken+seekh+kebab') },
  { name: 'Malai Broccoli', description: 'Broccoli florets in creamy cashew marinade, grilled to perfection', category: 'starters', price: 345, isVeg: true, image: img('malai+broccoli') },
  { name: 'Crispy Corn', description: 'Golden fried corn kernels tossed with peppers and chaat masala', category: 'starters', price: 275, isVeg: true, image: img('crispy+corn') },
  { name: 'Dahi Ke Kebab', description: 'Crispy yogurt kebabs with nuts and raisins, melt-in-mouth', category: 'starters', price: 315, isVeg: true, isChefSpecial: true, image: img('dahi+kebab') },
  { name: 'Amritsari Fish', description: 'Crispy fried fish marinated with gram flour and Punjabi spices', category: 'starters', price: 445, isVeg: false, isChefSpecial: true, image: img('amritsari+fish') },
  { name: 'Tandoori Prawns', description: 'Jumbo prawns marinated in yogurt and spices, chargrilled', category: 'starters', price: 525, isVeg: false, isChefSpecial: true, image: img('tandoori+prawns') },
  { name: 'Mushroom Galouti', description: 'Melt-in-mouth mushroom kebabs with royal Awadhi spices', category: 'starters', price: 375, isVeg: true, isChefSpecial: true, image: img('mushroom+galouti') },
  { name: 'Chicken 65', description: 'Crispy fried chicken tossed in fiery South Indian spice mix', category: 'starters', price: 395, isVeg: false, isBestSeller: true, image: img('chicken+65') },
  { name: 'Samosa Chaat', description: 'Crushed samosas topped with yogurt, chutneys and sev', category: 'starters', price: 245, isVeg: true, image: img('samosa+chaat') },
  { name: 'Aloo Tikki', description: 'Crispy potato patties with spiced chickpeas and chutneys', category: 'starters', price: 225, isVeg: true, image: img('aloo+tikki') },
  { name: 'Papdi Chaat', description: 'Crispy wafers with yogurt, chutneys and pomegranate', category: 'starters', price: 235, isVeg: true, image: img('papdi+chaat') },
  { name: 'Bharwan Mushrooms', description: 'Stuffed mushrooms with spiced cheese and herbs, grilled', category: 'starters', price: 365, isVeg: true, image: img('bharwan+mushroom') },
  { name: 'Mutton Seekh Kebab', description: 'Minced lamb skewers with fresh mint and Indian spices', category: 'starters', price: 475, isVeg: false, isChefSpecial: true, image: img('mutton+seekh+kebab') },
  { name: 'Chilli Paneer', description: 'Indo-Chinese style paneer tossed with peppers and soy glaze', category: 'starters', price: 325, isVeg: true, isBestSeller: true, image: img('chilli+paneer') },
  { name: 'Tandoori Momos', description: 'Steamed dumplings tossed in tandoori masala and chargrilled', category: 'starters', price: 295, isVeg: true, image: img('tandoori+momos') },
  { name: 'Achari Chicken Tikka', description: 'Chicken tikka marinated in pickling spices and chargrilled', category: 'starters', price: 425, isVeg: false, image: img('achari+chicken+tikka') },
  { name: 'Kasundi Fish Tikka', description: 'Fish tikka in tangy mustard marinade, grilled in tandoor', category: 'starters', price: 465, isVeg: false, isChefSpecial: true, image: img('kasundi+fish+tikka') },

  // ==================== MAINS ====================
  { name: 'Butter Chicken', description: 'Signature creamy tomato-based curry with tender tandoori chicken', category: 'mains', price: 495, isVeg: false, isChefSpecial: true, isBestSeller: true, image: img('butter+chicken') },
  { name: 'Chicken Tikka Masala', description: 'Grilled chicken tikka simmered in rich spiced tomato gravy', category: 'mains', price: 475, isVeg: false, isBestSeller: true, image: img('chicken+tikka+masala') },
  { name: 'Kadhai Chicken', description: 'Chicken cooked with bell peppers in rustic kadhai masala', category: 'mains', price: 465, isVeg: false, image: img('kadhai+chicken') },
  { name: 'Chicken Chettinad', description: 'Fiery South Indian chicken curry with roasted spices and coconut', category: 'mains', price: 485, isVeg: false, image: img('chicken+chettinad') },
  { name: 'Mutton Rogan Josh', description: 'Kashmiri-style lamb curry with aromatic spices and yogurt', category: 'mains', price: 575, isVeg: false, isChefSpecial: true, image: img('mutton+rogan+josh') },
  { name: 'Mutton Keema', description: 'Spiced minced lamb cooked with green peas and fresh herbs', category: 'mains', price: 525, isVeg: false, image: img('mutton+keema') },
  { name: 'Laal Maas', description: 'Fiery Rajasthani lamb curry with red chillies and ghee', category: 'mains', price: 595, isVeg: false, isChefSpecial: true, image: img('laal+maas') },
  { name: 'Dal Makhani', description: 'Slow-cooked black lentils with cream and butter', category: 'mains', price: 325, isVeg: true, isBestSeller: true, image: img('dal+makhani') },
  { name: 'Dal Tadka', description: 'Yellow lentils tempered with ghee, garlic and red chillies', category: 'mains', price: 275, isVeg: true, image: img('dal+tadka') },
  { name: 'Paneer Butter Masala', description: 'Rich and creamy paneer curry with buttery tomato gravy', category: 'mains', price: 395, isVeg: true, isBestSeller: true, image: img('paneer+butter+masala') },
  { name: 'Shahi Paneer', description: 'Royal paneer curry with creamy cashew and cream gravy', category: 'mains', price: 405, isVeg: true, image: img('shahi+paneer') },
  { name: 'Kadhai Paneer', description: 'Paneer and peppers tossed in rustic kadhai masala', category: 'mains', price: 385, isVeg: true, image: img('kadhai+paneer') },
  { name: 'Palak Paneer', description: 'Cottage cheese cubes in creamy spinach gravy with garlic', category: 'mains', price: 375, isVeg: true, image: img('palak+paneer') },
  { name: 'Malai Kofta', description: 'Soft paneer and potato dumplings in rich creamy gravy', category: 'mains', price: 395, isVeg: true, image: img('malai+kofta') },
  { name: 'Chana Masala', description: 'Chickpeas simmered in tangy onion-tomato masala', category: 'mains', price: 295, isVeg: true, image: img('chana+masala') },
  { name: 'Rajma Masala', description: 'Red kidney beans in rich onion-tomato gravy with spices', category: 'mains', price: 295, isVeg: true, image: img('rajma+masala') },
  { name: 'Bhindi Masala', description: 'Okra stir-fried with onions, tomatoes and Indian spices', category: 'mains', price: 325, isVeg: true, image: img('bhindi+masala') },
  { name: 'Vegetable Kofta Curry', description: 'Mixed vegetable dumplings in rich tomato-onion gravy', category: 'mains', price: 365, isVeg: true, image: img('veg+kofta+curry') },
  { name: 'Mushroom Masala', description: 'Button mushrooms in rich onion-tomato masala gravy', category: 'mains', price: 355, isVeg: true, image: img('mushroom+masala') },
  { name: 'Methi Malai Chicken', description: 'Chicken in creamy fenugreek and cashew gravy', category: 'mains', price: 495, isVeg: false, isChefSpecial: true, image: img('methi+malai+chicken') },

  // ==================== BREADS ====================
  { name: 'Plain Naan', description: 'Classic leavened bread baked in tandoor', category: 'breads', price: 95, isVeg: true, image: img('plain+naan') },
  { name: 'Butter Naan', description: 'Soft naan brushed with melted butter', category: 'breads', price: 115, isVeg: true, isBestSeller: true, image: img('butter+naan') },
  { name: 'Garlic Naan', description: 'Tandoor-baked naan rubbed with garlic and butter', category: 'breads', price: 145, isVeg: true, isBestSeller: true, image: img('garlic+naan') },
  { name: 'Cheese Naan', description: 'Naan stuffed with melted cheese and herbs', category: 'breads', price: 195, isVeg: true, image: img('cheese+naan') },
  { name: 'Tandoori Roti', description: 'Whole wheat bread baked in clay oven', category: 'breads', price: 75, isVeg: true, image: img('tandoori+roti') },
  { name: 'Butter Roti', description: 'Whole wheat bread brushed with butter', category: 'breads', price: 85, isVeg: true, image: img('butter+roti') },
  { name: 'Missi Roti', description: 'Spiced gram flour flatbread with ajwain and chillies', category: 'breads', price: 105, isVeg: true, image: img('missi+roti') },
  { name: 'Roomali Roti', description: 'Paper-thin handkerchief bread cooked on inverted wok', category: 'breads', price: 95, isVeg: true, image: img('roomali+roti') },
  { name: 'Laccha Paratha', description: 'Layered whole wheat paratha cooked with ghee', category: 'breads', price: 125, isVeg: true, image: img('laccha+paratha') },
  { name: 'Pudina Paratha', description: 'Whole wheat paratha stuffed with fresh mint', category: 'breads', price: 135, isVeg: true, image: img('pudina+paratha') },
  { name: 'Aloo Paratha', description: 'Whole wheat paratha stuffed with spiced potatoes', category: 'breads', price: 145, isVeg: true, image: img('aloo+paratha') },
  { name: 'Paneer Paratha', description: 'Paratha stuffed with spiced cottage cheese', category: 'breads', price: 175, isVeg: true, image: img('paneer+paratha') },
  { name: 'Gobi Paratha', description: 'Paratha stuffed with spiced cauliflower', category: 'breads', price: 145, isVeg: true, image: img('gobi+paratha') },
  { name: 'Onion Kulcha', description: 'Leavened bread stuffed with spiced onions', category: 'breads', price: 155, isVeg: true, image: img('onion+kulcha') },
  { name: 'Amritsari Kulcha', description: 'Punjabi stuffed kulcha with spiced potato filling', category: 'breads', price: 185, isVeg: true, isChefSpecial: true, image: img('amritsari+kulcha') },
  { name: 'Masala Kulcha', description: 'Kulcha topped with spices and fresh coriander', category: 'breads', price: 165, isVeg: true, image: img('masala+kulcha') },
  { name: 'Cheese Garlic Naan', description: 'Naan stuffed with cheese and topped with garlic butter', category: 'breads', price: 215, isVeg: true, image: img('cheese+garlic+naan') },
  { name: 'Methi Paratha', description: 'Whole wheat paratha with fenugreek leaves', category: 'breads', price: 135, isVeg: true, image: img('methi+paratha') },
  { name: 'Bajra Roti', description: 'Traditional pearl millet flatbread', category: 'breads', price: 95, isVeg: true, image: img('bajra+roti') },
  { name: 'Makki Di Roti', description: 'Punjabi cornmeal flatbread served with white butter', category: 'breads', price: 115, isVeg: true, image: img('makki+roti') },

  // ==================== RICE & BIRYANI ====================
  { name: 'Chicken Biryani', description: 'Fragrant basmati rice layered with spiced chicken and saffron', category: 'rice-biryani', price: 495, isVeg: false, isBestSeller: true, image: img('chicken+biryani') },
  { name: 'Mutton Biryani', description: 'Royal Hyderabad-style biryani with tender mutton pieces', category: 'rice-biryani', price: 595, isVeg: false, isChefSpecial: true, image: img('mutton+biryani') },
  { name: 'Hyderabadi Chicken Biryani', description: 'Authentic Hyderabadi dum biryani with saffron and mint', category: 'rice-biryani', price: 525, isVeg: false, isChefSpecial: true, image: img('hyderabadi+biryani') },
  { name: 'Lucknowi Mutton Biryani', description: 'Awadhi-style mutton biryani with aromatic spices', category: 'rice-biryani', price: 625, isVeg: false, isChefSpecial: true, image: img('lucknowi+biryani') },
  { name: 'Kolkata Chicken Biryani', description: 'Bengali-style biryani with potato and egg', category: 'rice-biryani', price: 495, isVeg: false, image: img('kolkata+biryani') },
  { name: 'Vegetable Biryani', description: 'Aromatic basmati rice with mixed vegetables and biryani spices', category: 'rice-biryani', price: 395, isVeg: true, isBestSeller: true, image: img('veg+biryani') },
  { name: 'Paneer Biryani', description: 'Fragrant rice layered with spiced paneer and saffron', category: 'rice-biryani', price: 425, isVeg: true, image: img('paneer+biryani') },
  { name: 'Egg Biryani', description: 'Flavorful rice with spiced boiled eggs and fried onions', category: 'rice-biryani', price: 375, isVeg: false, image: img('egg+biryani') },
  { name: 'Prawn Biryani', description: 'Coastal-style biryani with succulent prawns and spices', category: 'rice-biryani', price: 625, isVeg: false, isChefSpecial: true, image: img('prawn+biryani') },
  { name: 'Awadhi Biryani', description: 'Royal Awadhi dum biryani with saffron and kewra', category: 'rice-biryani', price: 575, isVeg: false, isChefSpecial: true, image: img('awadhi+biryani') },
  { name: 'Jeera Rice', description: 'Steamed basmati rice tempered with cumin seeds', category: 'rice-biryani', price: 225, isVeg: true, image: img('jeera+rice') },
  { name: 'Steamed Basmati Rice', description: 'Fluffy steamed basmati rice', category: 'rice-biryani', price: 195, isVeg: true, image: img('steamed+rice') },
  { name: 'Peas Pulao', description: 'Basmati rice cooked with green peas and whole spices', category: 'rice-biryani', price: 245, isVeg: true, image: img('peas+pulao') },
  { name: 'Vegetable Pulao', description: 'Lightly spiced rice with garden vegetables and whole spices', category: 'rice-biryani', price: 265, isVeg: true, image: img('veg+pulao') },
  { name: 'Kashmiri Pulao', description: 'Fragrant rice with dry fruits, saffron and rose water', category: 'rice-biryani', price: 325, isVeg: true, image: img('kashmiri+pulao') },
  { name: 'Saffron Rice', description: 'Basmati rice infused with saffron and ghee', category: 'rice-biryani', price: 345, isVeg: true, image: img('saffron+rice') },
  { name: 'Mushroom Pulao', description: 'Basmati rice with mushrooms and whole spices', category: 'rice-biryani', price: 295, isVeg: true, image: img('mushroom+pulao') },
  { name: 'Chicken Pulao', description: 'Fragrant rice cooked with chicken and whole spices', category: 'rice-biryani', price: 425, isVeg: false, image: img('chicken+pulao') },
  { name: 'Mutton Pulao', description: 'Aromatic rice with tender mutton and whole spices', category: 'rice-biryani', price: 525, isVeg: false, image: img('mutton+pulao') },
  { name: 'Lemon Rice', description: 'South Indian style rice with lemon, peanuts and curry leaves', category: 'rice-biryani', price: 235, isVeg: true, image: img('lemon+rice') },

  // ==================== DESSERTS ====================
  { name: 'Gulab Jamun', description: 'Deep-fried milk dumplings soaked in rose-scented sugar syrup', category: 'desserts', price: 165, isVeg: true, isBestSeller: true, image: img('gulab+jamun') },
  { name: 'Rasmalai', description: 'Soft paneer discs soaked in sweetened saffron-infused milk', category: 'desserts', price: 195, isVeg: true, isChefSpecial: true, image: img('rasmalai') },
  { name: 'Gajar Ka Halwa', description: 'Traditional carrot halwa slow-cooked with ghee and milk', category: 'desserts', price: 185, isVeg: true, isChefSpecial: true, image: img('gajar+halwa') },
  { name: 'Kulfi', description: 'Traditional Indian ice cream with cardamom and nuts', category: 'desserts', price: 155, isVeg: true, image: img('kulfi') },
  { name: 'Kesar Kulfi', description: 'Saffron-infused Indian ice cream with pistachios', category: 'desserts', price: 185, isVeg: true, image: img('kesar+kulfi') },
  { name: 'Mango Kulfi', description: 'Creamy mango-flavored Indian ice cream', category: 'desserts', price: 175, isVeg: true, image: img('mango+kulfi') },
  { name: 'Jalebi', description: 'Crispy spiral sweets soaked in saffron syrup', category: 'desserts', price: 145, isVeg: true, image: img('jalebi') },
  { name: 'Rabri Jalebi', description: 'Crispy jalebis served with thick sweetened milk', category: 'desserts', price: 225, isVeg: true, isChefSpecial: true, image: img('rabri+jalebi') },
  { name: 'Shahi Tukda', description: 'Royal bread pudding with saffron and dry fruits', category: 'desserts', price: 195, isVeg: true, isChefSpecial: true, image: img('shahi+tukda') },
  { name: 'Phirni', description: 'Creamy ground rice pudding with cardamom and saffron', category: 'desserts', price: 175, isVeg: true, image: img('phirni') },
  { name: 'Kheer', description: 'Traditional rice pudding with nuts and cardamom', category: 'desserts', price: 165, isVeg: true, image: img('kheer') },
  { name: 'Rasgulla', description: 'Soft spongy cottage cheese balls in sugar syrup', category: 'desserts', price: 155, isVeg: true, image: img('rasgulla') },
  { name: 'Moong Dal Halwa', description: 'Rich lentil halwa slow-cooked with ghee and saffron', category: 'desserts', price: 195, isVeg: true, isChefSpecial: true, image: img('moong+dal+halwa') },
  { name: 'Malpua', description: 'Crispy pancakes soaked in sugar syrup with nuts', category: 'desserts', price: 185, isVeg: true, image: img('malpua') },
  { name: 'Rabri', description: 'Thickened sweetened milk with cardamom and nuts', category: 'desserts', price: 175, isVeg: true, image: img('rabri') },
  { name: 'Besan Ladoo', description: 'Gram flour sweets with ghee and cardamom', category: 'desserts', price: 145, isVeg: true, image: img('besan+ladoo') },
  { name: 'Coconut Ladoo', description: 'Sweet coconut balls with condensed milk', category: 'desserts', price: 145, isVeg: true, image: img('coconut+ladoo') },
  { name: 'Chocolate Gulab Jamun', description: 'Classic gulab jamun with molten chocolate center', category: 'desserts', price: 195, isVeg: true, image: img('chocolate+gulab+jamun') },
  { name: 'Matka Kulfi', description: 'Traditional kulfi served in clay pot with pistachios', category: 'desserts', price: 225, isVeg: true, isBestSeller: true, image: img('matka+kulfi') },
  { name: 'Saffron Phirni', description: 'Royal saffron phirni with slivered almonds', category: 'desserts', price: 215, isVeg: true, isChefSpecial: true, image: img('saffron+phirni') },

  // ==================== SPECIALS ====================
  { name: 'Royal Thali', description: 'Complete royal feast with dal, paneer, roti, rice, and dessert', category: 'specials', price: 895, isVeg: true, isChefSpecial: true, isBestSeller: true, image: img('royal+thali') },
  { name: "Chef's Special Butter Chicken", description: 'Signature butter chicken with chef\'s secret spice blend', category: 'specials', price: 695, isVeg: false, isChefSpecial: true, isBestSeller: true, image: img('chef+butter+chicken') },
  { name: 'Signature Mutton Rogan Josh', description: 'Slow-cooked Kashmiri lamb curry with royal spices', category: 'specials', price: 795, isVeg: false, isChefSpecial: true, image: img('signature+rogan+josh') },
  { name: 'Royal Chicken Biryani', description: 'Dum-cooked biryani with saffron, kewra and tender chicken', category: 'specials', price: 725, isVeg: false, isChefSpecial: true, isBestSeller: true, image: img('royal+chicken+biryani') },
  { name: 'Special Paneer Tikka', description: 'Premium paneer tikka with truffle oil and exotic spices', category: 'specials', price: 525, isVeg: true, isChefSpecial: true, image: img('special+paneer+tikka') },
  { name: 'Truffle Mushroom Curry', description: 'Wild mushrooms in rich truffle-infused creamy gravy', category: 'specials', price: 595, isVeg: true, isChefSpecial: true, image: img('truffle+mushroom+curry') },
  { name: 'Smoked Dal Makhani', description: 'Black lentils slow-cooked and finished with smoke', category: 'specials', price: 425, isVeg: true, isChefSpecial: true, image: img('smoked+dal+makhani') },
  { name: 'Awadhi Mutton Korma', description: 'Royal Awadhi mutton curry with cashew and saffron', category: 'specials', price: 795, isVeg: false, isChefSpecial: true, image: img('awadhi+mutton+korma') },
  { name: 'Tandoori Lamb Chops', description: 'Lamb chops marinated in royal spices, chargrilled', category: 'specials', price: 895, isVeg: false, isChefSpecial: true, image: img('tandoori+lamb+chops') },
  { name: 'Royal Prawn Curry', description: 'Jumbo prawns in rich coconut and spice gravy', category: 'specials', price: 795, isVeg: false, isChefSpecial: true, image: img('royal+prawn+curry') },
  { name: 'Saffron Chicken Korma', description: 'Chicken in creamy saffron and cashew korma', category: 'specials', price: 695, isVeg: false, isChefSpecial: true, image: img('saffron+chicken+korma') },
  { name: 'Charcoal Chicken Tikka', description: 'Chicken tikka grilled over charcoal with smoky flavor', category: 'specials', price: 625, isVeg: false, isChefSpecial: true, image: img('charcoal+chicken+tikka') },
  { name: 'Signature Galouti Kebab', description: 'Melt-in-mouth galouti kebabs with royal Awadhi spices', category: 'specials', price: 675, isVeg: false, isChefSpecial: true, image: img('signature+galouti+kebab') },
  { name: 'Lucknowi Chicken Korma', description: 'Awadhi-style chicken korma with aromatic spices', category: 'specials', price: 595, isVeg: false, isChefSpecial: true, image: img('lucknowi+chicken+korma') },
  { name: 'Rajasthani Laal Maas', description: 'Fiery Rajasthani lamb curry with Mathania chillies', category: 'specials', price: 795, isVeg: false, isChefSpecial: true, image: img('rajasthani+laal+maas') },
  { name: 'Kashmiri Yakhni', description: 'Delicate Kashmiri yogurt-based lamb curry', category: 'specials', price: 695, isVeg: false, isChefSpecial: true, image: img('kashmiri+yakhni') },
  { name: "Chef's Special Paneer", description: 'Premium paneer dish with chef\'s signature sauce', category: 'specials', price: 525, isVeg: true, isChefSpecial: true, image: img('chef+paneer') },
  { name: 'Royal Seafood Platter', description: 'Assorted seafood delicacies with royal accompaniments', category: 'specials', price: 1195, isVeg: false, isChefSpecial: true, image: img('seafood+platter') },
  { name: 'Grand Mughlai Platter', description: 'Grand assortment of Mughlai delicacies', category: 'specials', price: 995, isVeg: false, isChefSpecial: true, image: img('mughlai+platter') },
  { name: 'Signature Biryani Platter', description: 'Signature biryani served with royal accompaniments', category: 'specials', price: 895, isVeg: false, isChefSpecial: true, isBestSeller: true, image: img('signature+biryani+platter') },
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
  { title: "People's Choice Award", platform: 'Google', year: 2023, description: 'Customer favorite' },
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
