const express = require('express');
const { proxyClassify, proxySummarize, proxySimilar } = require('../controllers/mlController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/classify', protect, proxyClassify);
router.post('/summarize', protect, proxySummarize);
router.post('/similar', protect, proxySimilar);

module.exports = router;
