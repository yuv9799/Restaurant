if(global.__USE_EMBEDDED_DB__){module.exports=require("../db.js")["Payment"];return;}
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'INR' },
  method: {
    type: String,
    enum: ['card', 'upi', 'net-banking', 'cash', 'wallet'],
    default: 'card'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: { type: String },
  gatewayResponse: { type: Object },
  paidAt: { type: Date }
}, { timestamps: true });

paymentSchema.index({ orderId: 1 });
paymentSchema.index({ transactionId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
