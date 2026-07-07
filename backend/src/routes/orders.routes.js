const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order.model.js');
const Payment = require('../models/Payment.model.js');
const { authenticate } = require('../middleware/auth.middleware.js');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/v1/orders — Create order + Razorpay order
router.post('/', async (req, res) => {
  try {
    const { customer, items, orderType, notes } = req.body;

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
      customer, items, subtotal, tax, total,
      orderType: orderType || 'dine-in',
      notes: notes || ''
    });
    await order.save();

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100, // Razorpay uses paise
      currency: 'INR',
      receipt: order._id.toString(),
      notes: { orderId: order._id.toString() }
    });

    order.paymentId = razorpayOrder.id;
    await order.save();

    res.status(201).json({
      order,
      razorpayOrderId: razorpayOrder.id,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
      amount: total * 100,
      currency: 'INR',
      message: 'Order created. Proceed to payment.'
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/v1/orders/verify-payment — Verify after Razorpay checkout
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid signature', success: false });
    }

    // Find order by razorpay order ID
    const order = await Order.findOne({ paymentId: razorpay_order_id });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const payment = new Payment({
      orderId: order._id,
      userId: order.userId,
      amount: order.total,
      method: 'razorpay',
      status: 'completed',
      transactionId: razorpay_payment_id,
      gatewayResponse: { razorpay_order_id, razorpay_payment_id },
      paidAt: new Date()
    });
    await payment.save();

    order.paymentStatus = 'completed';
    order.status = 'confirmed';
    order.paymentId = razorpay_payment_id;
    await order.save();

    res.json({ success: true, message: 'Payment verified', order });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/v1/orders/webhook — Razorpay webhook
router.post('/webhook', async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto.createHmac('sha256', secret).update(JSON.stringify(req.body)).digest('hex');

    if (shasum !== req.headers['x-razorpay-signature']) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const event = req.body.event;
    if (event === 'payment.captured' || event === 'order.paid') {
      const razorpayOrderId = req.body.payload?.payment?.entity?.order_id;
      const paymentId = req.body.payload?.payment?.entity?.id;

      const order = await Order.findOne({ paymentId: razorpayOrderId });
      if (order && order.paymentStatus !== 'completed') {
        order.paymentStatus = 'completed';
        order.status = 'confirmed';
        await order.save();

        await Payment.create({
          orderId: order._id,
          amount: order.total,
          method: 'razorpay',
          status: 'completed',
          transactionId: paymentId,
          paidAt: new Date()
        });
      }
    }

    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/v1/orders — Get orders
router.get('/', authenticate, async (req, res) => {
  try {
    const filter = {};
    if (req.user.role !== 'admin') filter['customer.email'] = req.user.email;
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
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
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
