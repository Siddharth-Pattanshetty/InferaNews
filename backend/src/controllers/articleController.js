const Article = require('../models/Article');
const mlService = require('../services/mlService');

// @desc    Get all articles (paginated, filterable, sortable)
// @route   GET /api/v1/articles
// @access  Public
const getArticles = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Sort: default newest first
    const sort = { createdAt: -1 };

    const [articles, total] = await Promise.all([
      Article.find(filter).sort(sort).skip(skip).limit(limit),
      Article.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: articles,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single article by ID
// @route   GET /api/v1/articles/:id
// @access  Public
const getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
      });
    }
    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create article
// @route   POST /api/v1/articles
// @access  Private (admin)
const createArticle = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    let category = req.body.category;
    let summary = '';

    // Auto-enrichment
    const [mlCategory, mlSummary] = await Promise.all([
      mlService.classifyText(title, description),
      mlService.summarizeText(content),
    ]);

    if (!category && mlCategory) {
      // Use ML category if admin didn't provide one
      category = mlCategory;
    }
    
    if (mlSummary) {
      summary = mlSummary;
    }

    const article = await Article.create({
      title,
      description,
      content,
      category: category || 'uncategorized',
      summary,
    });
    res.status(201).json({
      success: true,
      data: article,
    });
  } catch (error) {
    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update article
// @route   PUT /api/v1/articles/:id
// @access  Private (admin)
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
      });
    }
    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete article
// @route   DELETE /api/v1/articles/:id
// @access  Private (admin)
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
      });
    }
    res.json({
      success: true,
      message: 'Article deleted',
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Search articles by keyword
// @route   GET /api/v1/articles/search
// @access  Public
const searchArticles = async (req, res) => {
  try {
    const query = req.query.q;
    
    // Fallback to list view if query is empty
    if (!query || query.trim() === '') {
      return getArticles(req, res);
    }

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const skip = (page - 1) * limit;

    const filter = { $text: { $search: query } };
    const projection = { score: { $meta: 'textScore' } };
    const sort = { score: { $meta: 'textScore' } };

    const [articles, total] = await Promise.all([
      Article.find(filter, projection).sort(sort).skip(skip).limit(limit),
      Article.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: articles,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
};
