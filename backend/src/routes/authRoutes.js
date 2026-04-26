const express = require('express');
const { login } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// POST /api/v1/auth/login — Admin login
router.post('/login', login);

// GET /api/v1/auth/me — Get current admin (protected)
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});

module.exports = router;
