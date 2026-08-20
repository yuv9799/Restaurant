if(global.__USE_EMBEDDED_DB__){module.exports=require("../db.js")["Table"];return;}
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  section: {
    type: String,
    required: true,
    enum: ['indoor', 'outdoor', 'private']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Table', tableSchema);