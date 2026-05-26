const { prisma } = require('../config/db');
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
    const where = {};
    if (req.query.category) {
      where.category = req.query.category;
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);

    // Map _id to id for frontend compatibility
    const formattedArticles = articles.map(a => ({ ...a, _id: a.id }));

    res.json({
      success: true,
      data: formattedArticles,
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
    const article = await prisma.article.findUnique({
      where: { id: req.params.id },
      include: {
        similarArticles: true
      }
    });
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
      });
    }
    
    // Map _id to id for frontend compatibility
    const formattedArticle = { 
      ...article, 
      _id: article.id,
      similarArticles: article.similarArticles.map(sa => ({ ...sa, _id: sa.id }))
    };
    
    res.json({
      success: true,
      data: formattedArticle,
    });
  } catch (error) {
    if (error.code === 'P2023' || error.code === 'P2025') {
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

    const article = await prisma.article.create({
      data: {
        title,
        description,
        content,
        category: category || 'uncategorized',
        summary,
      }
    });
    
    res.status(201).json({
      success: true,
      data: { ...article, _id: article.id },
    });
  } catch (error) {
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
    const article = await prisma.article.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({
      success: true,
      data: { ...article, _id: article.id },
    });
  } catch (error) {
    if (error.code === 'P2025') {
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
    await prisma.article.delete({
      where: { id: req.params.id },
    });
    res.json({
      success: true,
      message: 'Article deleted',
    });
  } catch (error) {
    if (error.code === 'P2025') {
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

    const where = {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
    };

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);

    const formattedArticles = articles.map(a => ({ ...a, _id: a.id }));

    res.json({
      success: true,
      data: formattedArticles,
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
