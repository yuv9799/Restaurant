if(global.__USE_EMBEDDED_DB__){module.exports=require("../db.js")["Dish"];return;}
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['starters', 'mains', 'breads', 'rice-biryani', 'desserts', 'specials']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    default: '/images/default-dish.jpg'
  },
  isVeg: {
    type: Boolean,
    default: true
  },
  isJain: {
    type: Boolean,
    default: false
  },
  isChefSpecial: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

dishSchema.index({ category: 1 });

module.exports = mongoose.model('Dish', dishSchema);