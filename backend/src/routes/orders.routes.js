const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model.js');
const Payment = require('../models/Payment.model.js');
const { authenticate } = require('../middleware/auth.middleware.js');

// Simulated payment gateway
function processPayment(amount, method) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: 'TXN' + Date.now().toString(36).toUpperCase(),
        gatewayResponse: { status: 'completed', amount, method }
      });
    }, 1000);
  });
}

// POST /api/v1/orders — Create order with payment
router.post('/', async (req, res) => {
  try {
    const { customer, items, orderType, notes, paymentMethod } = req.body;

    if (!customer?.name || !customer?.email || !customer?.phone) {
      return res.status(400).json({ message: 'Customer details are required' });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'At least one item is required' });
    }

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    const order = new Order({
      userId: req.user?._id,
      customer,
      items,
      subtotal,
      tax,
      total,
      orderType: orderType || 'dine-in',
      notes: notes || ''
    });
    await order.save();

    // Process payment
    const paymentResult = await processPayment(total, paymentMethod || 'card');

    if (paymentResult.success) {
      const payment = new Payment({
        orderId: order._id,
        userId: req.user?._id,
        amount: total,
        method: paymentMethod || 'card',
        status: 'completed',
        transactionId: paymentResult.transactionId,
        gatewayResponse: paymentResult.gatewayResponse,
        paidAt: new Date()
      });
      await payment.save();

      order.paymentStatus = 'completed';
      order.paymentId = payment._id;
      order.status = 'confirmed';
      await order.save();
    }

    res.status(201).json({
      order,
      payment: paymentResult.success ? { transactionId: paymentResult.transactionId, status: 'completed' } : { status: 'failed' },
      message: 'Order placed successfully'
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/v1/orders — Get orders (user's own or all for admin)
router.get('/', authenticate, async (req, res) => {
  try {
    const filter = {};
    if (req.user.role !== 'admin') {
      filter['customer.email'] = req.user.email;
    }
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/v1/orders/:id — Get single order
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (req.user.role !== 'admin' && order.customer?.email !== req.user.email) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const payment = await Payment.findOne({ orderId: order._id });
    res.json({ order, payment });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/v1/orders/:id/status — Update order status (admin)
router.put('/:id/status', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order, message: 'Order status updated' });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
