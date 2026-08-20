const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail.js');

// POST /api/v1/private-dining/inquiry
router.post('/inquiry', async (req, res) => {
  try {
    const { name, email, phone, date, time, guestCount, packageType, specialRequests } = req.body;

    if (!name || !email || !phone || !date || !time || !guestCount || !packageType) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Send email to restaurant
    await sendEmail({
      to: process.env.RESTAURANT_EMAIL || process.env.EMAIL_USER,
      subject: 'New Private Dining Inquiry — ReNorth',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #602628;">New Private Dining Inquiry</h1>
          <div style="background: #FAF7F2; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-IN')}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Guests:</strong> ${guestCount}</p>
            <p><strong>Package:</strong> ${packageType}</p>
            ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ''}
          </div>
        </div>
      `
    });

    // Send confirmation to guest
    await sendEmail({
      to: email,
      subject: 'Private Dining Inquiry Received — ReNorth',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #602628;">Thank You for Your Inquiry!</h1>
          <p>Dear ${name},</p>
          <p>We've received your private dining inquiry. Our team will get back to you within 24 hours.</p>
          <div style="background: #FAF7F2; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>Package:</strong> ${packageType}</p>
            <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-IN')}</p>
            <p><strong>Guests:</strong> ${guestCount}</p>
          </div>
          <p style="color: #6B6157;">For urgent inquiries, please call us.</p>
          <hr style="border: 1px solid #E8E1D5;" />
          <p style="color: #6B6157; font-size: 14px;">ReNorth — Where the Mountains Meet the Masala</p>
        </div>
      `
    });

    res.status(201).json({ message: 'Inquiry submitted successfully. We will contact you shortly.' });
  } catch (error) {
    console.error('Private dining inquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;