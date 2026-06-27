const express = require('express');
const router = express.Router();
const Drink = require('../models/Drink.model.js');
const { authenticate, requireAdmin } = require('../middleware/auth.middleware.js');

// GET /api/v1/drinks — Get all drinks with filters
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = { isAvailable: true };

    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const drinks = await Drink.find(filter).sort({ createdAt: -1 });
    res.json({ drinks });
  } catch (error) {
    console.error('Get drinks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/v1/drinks/:id — Get single drink
router.get('/:id', async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) return res.status(404).json({ message: 'Drink not found' });
    res.json({ drink });
  } catch (error) {
    console.error('Get drink error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/v1/drinks — Add drink (admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const drink = new Drink(req.body);
    await drink.save();
    res.status(201).json({ drink, message: 'Drink added successfully' });
  } catch (error) {
    console.error('Add drink error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/v1/drinks/:id — Update drink (admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const drink = await Drink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!drink) return res.status(404).json({ message: 'Drink not found' });
    res.json({ drink, message: 'Drink updated successfully' });
  } catch (error) {
    console.error('Update drink error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/v1/drinks/:id — Delete drink (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const drink = await Drink.findByIdAndDelete(req.params.id);
    if (!drink) return res.status(404).json({ message: 'Drink not found' });
    res.json({ message: 'Drink deleted successfully' });
  } catch (error) {
    console.error('Delete drink error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;