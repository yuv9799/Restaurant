const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail.js');

// POST /api/v1/contact — Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    // Send email to restaurant
    await sendEmail({
      to: process.env.RESTAURANT_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #602628;">New Contact Form Submission</h1>
          <div style="background: #FAF7F2; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      `
    });

    // Send acknowledgment to user
    await sendEmail({
      to: email,
      subject: 'We\'ve Received Your Message — ReNorth',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #602628;">Thank You for Reaching Out!</h1>
          <p>Dear ${name},</p>
          <p>We've received your message and will get back to you as soon as possible.</p>
          <p style="color: #6B6157;">In the meantime, feel free to explore our menu and make a reservation!</p>
          <hr style="border: 1px solid #E8E1D5;" />
          <p style="color: #6B6157; font-size: 14px;">ReNorth — Where the Mountains Meet the Masala</p>
        </div>
      `
    });

    res.json({ message: 'Message sent successfully. We will get back to you soon.' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;