const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish.model.js');
const { authenticate, requireAdmin } = require('../middleware/auth.middleware.js');

// GET /api/v1/menu — Get all dishes with filters
router.get('/', async (req, res) => {
  try {
    const { category, veg, nonveg, jain, search } = req.query;
    const filter = { isAvailable: true };

    if (category) filter.category = category;
    if (veg === 'true') filter.isVeg = true;
    if (nonveg === 'true') filter.isVeg = false;
    if (jain === 'true') filter.isJain = true;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const dishes = await Dish.find(filter).sort({ createdAt: -1 });
    res.json({ dishes });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/v1/menu/:id — Get single dish
router.get('/:id', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json({ dish });
  } catch (error) {
    console.error('Get dish error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/v1/menu — Add dish (admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const dish = new Dish(req.body);
    await dish.save();
    res.status(201).json({ dish, message: 'Dish added successfully' });
  } catch (error) {
    console.error('Add dish error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/v1/menu/:id — Update dish (admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json({ dish, message: 'Dish updated successfully' });
  } catch (error) {
    console.error('Update dish error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/v1/menu/:id — Delete dish (admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json({ message: 'Dish deleted successfully' });
  } catch (error) {
    console.error('Delete dish error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;