const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  res.json({
    success: true,
    status: 'ok',
    database: states[dbState] || 'unknown',
    timestamp: new Date().toISOString(),
  });
});

// Route mounts
const authRoutes = require('./authRoutes');
router.use('/auth', authRoutes);

// Future route mounts:
// router.use('/articles', articleRoutes);

module.exports = router;
