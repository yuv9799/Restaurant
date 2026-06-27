const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler.js');

// Import routes
const authRoutes = require('./routes/auth.routes.js');
const menuRoutes = require('./routes/menu.routes.js');
const drinksRoutes = require('./routes/drinks.routes.js');
const reservationRoutes = require('./routes/reservations.routes.js');
const tableRoutes = require('./routes/tables.routes.js');
const privateDiningRoutes = require('./routes/privateDining.routes.js');
const awardRoutes = require('./routes/awards.routes.js');
const reviewRoutes = require('./routes/reviews.routes.js');
const contactRoutes = require('./routes/contact.routes.js');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/drinks', drinksRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/tables', tableRoutes);
app.use('/api/v1/private-dining', privateDiningRoutes);
app.use('/api/v1/awards', awardRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

module.exports = app;