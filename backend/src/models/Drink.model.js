if(global.__USE_EMBEDDED_DB__){module.exports=require("../db.js")["Drink"];return;}
const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
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
    enum: ['mocktails', 'cocktails', 'lassi-shakes', 'hot-beverages', 'soft-drinks']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    default: '/images/default-drink.jpg'
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

drinkSchema.index({ category: 1 });

module.exports = mongoose.model('Drink', drinkSchema);