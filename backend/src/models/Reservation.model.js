if(global.__USE_EMBEDDED_DB__){module.exports=require("../db.js")["Reservation"];return;}
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  seatingPreference: {
    type: String,
    enum: ['indoor', 'outdoor', 'private'],
    default: 'indoor'
  },
  specialRequests: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  tableNumber: {
    type: Number
  }
}, {
  timestamps: true
});

reservationSchema.index({ date: 1 });
reservationSchema.index({ email: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);