const mlService = require('../services/mlService');

const proxyClassify = async (req, res) => {
  const { headline, short_description } = req.body;
  const category = await mlService.classifyText(headline, short_description);
  res.json({ success: true, category });
};

const proxySummarize = async (req, res) => {
  const { text } = req.body;
  const summary = await mlService.summarizeText(text);
  res.json({ success: true, summary });
};

const proxySimilar = async (req, res) => {
  const { headline, short_description, k } = req.body;
  const results = await mlService.findSimilar(headline, short_description, k);
  res.json({ success: true, results });
};

module.exports = {
  proxyClassify,
  proxySummarize,
  proxySimilar,
};
