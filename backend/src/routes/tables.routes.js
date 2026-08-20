const express = require('express');
const router = express.Router();
const Table = require('../models/Table.model.js');
const Reservation = require('../models/Reservation.model.js');

// GET /api/v1/tables/status — Get table availability
router.get('/status', async (req, res) => {
  try {
    const { date } = req.query;

    const tables = await Table.find({ isActive: true }).sort({ tableNumber: 1 });

    let reservations = [];
    if (date) {
      reservations = await Reservation.find({
        date: new Date(date),
        status: { $ne: 'cancelled' }
      });
    }

    const tablesWithStatus = tables.map(table => {
      const reservedBy = reservations.filter(r => r.tableNumber === table.tableNumber);
      return {
        ...table.toObject(),
        isBooked: reservedBy.length > 0
      };
    });

    res.json({ tables: tablesWithStatus });
  } catch (error) {
    console.error('Get table status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/v1/tables — Add table (admin)
router.post('/', async (req, res) => {
  try {
    const table = new Table(req.body);
    await table.save();
    res.status(201).json({ table, message: 'Table added successfully' });
  } catch (error) {
    console.error('Add table error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;