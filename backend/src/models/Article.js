const mongoose = require('mongoose');

const CATEGORIES = [
  'politics',
  'entertainment',
  'technology',
  'sports',
  'business',
  'health',
  'science',
  'world',
  'uncategorized',
];

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    // ML-enriched fields — populated by ML service in Phase 4
    category: {
      type: String,
      enum: CATEGORIES,
      default: 'uncategorized',
    },
    summary: {
      type: String,
      default: '',
    },
    similarArticles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
  },
  { timestamps: true }
);

// Text index for future search capability
articleSchema.index({ title: 'text', description: 'text', content: 'text' });

module.exports = mongoose.model('Article', articleSchema);
module.exports.CATEGORIES = CATEGORIES;
