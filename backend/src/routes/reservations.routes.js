const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation.model.js');
const Table = require('../models/Table.model.js');
const sendEmail = require('../utils/sendEmail.js');
const { authenticate, requireAdmin } = require('../middleware/auth.middleware.js');

// POST /api/v1/reservations — Create reservation
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, time, numberOfPeople, seatingPreference, specialRequests } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !numberOfPeople) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Check availability
    const existingCount = await Reservation.countDocuments({
      date: new Date(date),
      time,
      status: { $ne: 'cancelled' }
    });

    if (existingCount >= 10) { // Max 10 reservations per time slot
      return res.status(400).json({ message: 'Sorry, this time slot is fully booked' });
    }

    const reservation = new Reservation({
      name, email, phone, date, time, numberOfPeople,
      seatingPreference: seatingPreference || 'indoor',
      specialRequests: specialRequests || ''
    });

    await reservation.save();

    // Also notify restaurant
    await sendEmail({
      to: process.env.RESTAURANT_EMAIL || process.env.EMAIL_USER,
      subject: `New Reservation — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #602628;">New Reservation Received</h1>
          <div style="background: #FAF7F2; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Guests:</strong> ${numberOfPeople}</p>
            <p><strong>Seating:</strong> ${seatingPreference}</p>
            ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ''}
          </div>
        </div>
      `
    });

    // Send confirmation to guest
    await sendEmail({
      to: email,
      subject: 'Reservation Confirmed — ReNorth',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #602628;">Reservation Confirmed! 🎉</h1>
          <p>Dear ${name},</p>
          <p>Your table at <strong>ReNorth</strong> has been booked successfully.</p>
          <div style="background: #FAF7F2; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Guests:</strong> ${numberOfPeople}</p>
            <p><strong>Seating:</strong> ${seatingPreference}</p>
            ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ''}
          </div>
          <p style="color: #6B6157;">We look forward to serving you!</p>
          <hr style="border: 1px solid #E8E1D5;" />
          <p style="color: #6B6157; font-size: 14px;">ReNorth — Where the Mountains Meet the Masala</p>
        </div>
      `
    });

    res.status(201).json({ reservation, message: 'Reservation created successfully' });
  } catch (error) {
    console.error('Create reservation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/v1/reservations/availability — Check available slots
router.get('/availability', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'Date is required' });

    const timeSlots = [
      '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '14:00', '14:30', '18:00', '18:30', '19:00', '19:30',
      '20:00', '20:30', '21:00', '21:30', '22:00'
    ];

    const reservations = await Reservation.find({
      date: new Date(date),
      status: { $ne: 'cancelled' }
    });

    const availableSlots = timeSlots.map(time => {
      const bookingCount = reservations.filter(r => r.time === time).length;
      return {
        time,
        available: bookingCount < 10,
        bookedCount: bookingCount
      };
    });

    res.json({ slots: availableSlots });
  } catch (error) {
    console.error('Get availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/v1/reservations/my — Get user's reservations
router.get('/my', authenticate, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user._id })
      .sort({ date: -1 });
    res.json({ reservations });
  } catch (error) {
    console.error('Get my reservations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/v1/reservations/:id — Cancel reservation
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Allow cancellation only if owned by user or admin
    if (reservation.userId?.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    reservation.status = 'cancelled';
    await reservation.save();

    res.json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    console.error('Cancel reservation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/v1/reservations/all — Get all reservations (admin)
router.get('/all', authenticate, requireAdmin, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: -1 });
    res.json({ reservations });
  } catch (error) {
    console.error('Get all reservations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;