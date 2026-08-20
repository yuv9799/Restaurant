const express = require('express');
const router = express.Router();
const Award = require('../models/Award.model.js');

// GET /api/v1/awards — Get all awards
router.get('/', async (req, res) => {
  try {
    const { platform, year } = req.query;
    const filter = {};

    if (platform) filter.platform = platform;
    if (year) filter.year = parseInt(year);

    const awards = await Award.find(filter).sort({ year: -1 });
    res.json({ awards });
  } catch (error) {
    console.error('Get awards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/v1/awards — Add award (admin)
router.post('/', async (req, res) => {
  try {
    const award = new Award(req.body);
    await award.save();
    res.status(201).json({ award, message: 'Award added successfully' });
  } catch (error) {
    console.error('Add award error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;