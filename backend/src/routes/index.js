const express = require('express');
const { prisma } = require('../config/db');
const router = express.Router();

// Health check endpoint
router.get('/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch (error) {
    dbStatus = 'error';
  }
  
  res.json({
    success: true,
    status: 'ok',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// Route mounts
const authRoutes = require('./authRoutes');
router.use('/auth', authRoutes);

const articleRoutes = require('./articleRoutes');
router.use('/articles', articleRoutes);

const mlRoutes = require('./mlRoutes');
router.use('/ml', mlRoutes);

module.exports = router;
