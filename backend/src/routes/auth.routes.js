const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.model.js');
const generateOTP = require('../utils/generateOTP.js');
const sendEmail = require('../utils/sendEmail.js');
const { authenticate } = require('../middleware/auth.middleware.js');

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map();

// POST /api/v1/auth/send-otp
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const otp = generateOTP();
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // 10 min expiry

    // Send OTP email
    const emailSent = await sendEmail({
      to: email,
      subject: 'Your ReNorth OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #602628;">Welcome to ReNorth</h1>
          <p>Your one-time password (OTP) for login is:</p>
          <div style="background: #FAF7F2; padding: 20px; text-align: center; border-radius: 12px; margin: 20px 0;">
            <h2 style="color: #602628; font-size: 36px; letter-spacing: 8px;">${otp}</h2>
          </div>
          <p>This OTP is valid for 10 minutes.</p>
          <p style="color: #6B6157; font-size: 14px;">If you didn't request this, please ignore this email.</p>
          <hr style="border: 1px solid #E8E1D5;" />
          <p style="color: #6B6157; font-size: 14px;">ReNorth — Where the Mountains Meet the Masala</p>
        </div>
      `
    });

    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/v1/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp, name, phone } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const storedData = otpStore.get(email);

    if (!storedData) {
      return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP verified - create or update user
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name: name || '', phone: phone || '' });
    }

    user.lastLogin = new Date();
    if (name) user.name = name;
    if (phone) user.phone = phone;
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Clear OTP
    otpStore.delete(email);

    // Set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/v1/auth/me
router.get('/me', authenticate, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      phone: req.user.phone,
      role: req.user.role
    }
  });
});

// POST /api/v1/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;