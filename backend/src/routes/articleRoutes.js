const express = require('express');
const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
} = require('../controllers/articleController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Public routes
router.get('/search', searchArticles);
router.get('/', getArticles);
router.get('/:id', getArticle);

// Protected routes (admin only)
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;
