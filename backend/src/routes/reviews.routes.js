const express = require('express');
const router = express.Router();
const Review = require('../models/Review.model.js');
const { authenticate } = require('../middleware/auth.middleware.js');

// GET /api/v1/reviews — Get all reviews with filters
router.get('/', async (req, res) => {
  try {
    const { platform, rating, page = 1, limit = 10 } = req.query;
    const filter = { isVerified: true };

    if (platform) filter.platform = platform;
    if (rating) filter.rating = parseInt(rating);

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Review.countDocuments(filter);

    const reviews = await Review.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Calculate rating distribution
    const distribution = await Review.aggregate([
      { $match: { isVerified: true } },
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);

    const avgRating = await Review.aggregate([
      { $match: { isVerified: true } },
      { $group: { _id: null, average: { $avg: '$rating' } } }
    ]);

    res.json({
      reviews,
      pagination: {
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit))
      },
      stats: {
        averageRating: avgRating[0]?.average || 0,
        totalReviews: total,
        distribution
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/v1/reviews — Submit a review
router.post('/', authenticate, async (req, res) => {
  try {
    const { platform, rating, comment } = req.body;

    if (!platform || !rating || !comment) {
      return res.status(400).json({ message: 'Platform, rating, and comment are required' });
    }

    const review = new Review({
      userId: req.user._id,
      reviewerName: req.user.name || req.user.email,
      platform,
      rating,
      comment,
      isVerified: true
    });

    await review.save();
    res.status(201).json({ review, message: 'Review submitted successfully' });
  } catch (error) {
    console.error('Submit review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;