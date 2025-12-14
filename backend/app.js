const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const planRoutes = require('./routes/planRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const followRoutes = require('./routes/followRoutes');
const feedRoutes = require('./routes/feedRoutes');


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('FitPlanHub API running');
});

// Auth routes
app.use('/api/auth', authRoutes);

// Plan routes
app.use('/api/plans', planRoutes);

// Subscription routes
app.use('/api/subscriptions', subscriptionRoutes);

// Follow routes
app.use('/api/trainers', followRoutes);

// Feed routes
app.use('/api/feed', feedRoutes);

// Profile routes
app.use('/api/profile', require('./routes/profileRoutes'));

module.exports = app;
