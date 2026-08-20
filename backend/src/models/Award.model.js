if(global.__USE_EMBEDDED_DB__){module.exports=require("../db.js")["Award"];return;}
const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  platform: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  badgeImage: {
    type: String,
    default: '/images/default-award.jpg'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Award', awardSchema);