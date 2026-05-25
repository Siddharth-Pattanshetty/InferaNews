const express = require('express');
const rateLimit = require('express-rate-limit');
const { proxyClassify, proxySummarize, proxySimilar } = require('../controllers/mlController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// 1. Rate Limiting for Public Endpoints
// Limit each IP to 20 requests per windowMs (1 minute)
const publicMlLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, 
  message: {
    success: false,
    message: 'Too many ML requests from this IP, please try again after a minute.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 2. Input Validation Middleware
const validateSummarizeInput = (req, res, next) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ success: false, message: 'Text input is required and must be a string.' });
  }
  if (text.length < 50) {
    return res.status(400).json({ success: false, message: 'Text is too short to summarize (minimum 50 characters).' });
  }
  if (text.length > 5000) {
    return res.status(400).json({ success: false, message: 'Text exceeds maximum length for public summarization (maximum 5000 characters).' });
  }
  next();
};

const validateSimilarInput = (req, res, next) => {
  const { headline, short_description } = req.body;
  const textLength = (headline || '').length + (short_description || '').length;
  if (textLength > 1000) {
    return res.status(400).json({ success: false, message: 'Input exceeds maximum length for similarity search.' });
  }
  next();
};

// ==========================================
// PUBLIC ROUTES
// ==========================================
// Expose summarize and similar for the civilian Analyze tab
router.post('/public/summarize', publicMlLimiter, validateSummarizeInput, proxySummarize);
router.post('/public/similar', publicMlLimiter, validateSimilarInput, proxySimilar);

// ==========================================
// ADMIN ROUTES
// ==========================================
// Protected routes for the publishing pipeline (no strict length limits or harsh rate limits needed here)
router.post('/admin/classify', protect, proxyClassify);
router.post('/admin/summarize', protect, proxySummarize);
router.post('/admin/similar', protect, proxySimilar);

// Backwards compatibility for existing admin frontend/backend calls before we switch frontend
// (We can remove these later if we update all backend references to use /admin/classify)
router.post('/classify', protect, proxyClassify);
router.post('/summarize', protect, proxySummarize);
router.post('/similar', protect, proxySimilar);

module.exports = router;
