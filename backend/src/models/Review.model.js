if(global.__USE_EMBEDDED_DB__){module.exports=require("../db.js")["Review"];return;}
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewerName: {
    type: String,
    required: true,
    trim: true
  },
  platform: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

reviewSchema.index({ platform: 1 });
reviewSchema.index({ rating: -1 });

module.exports = mongoose.model('Review', reviewSchema);