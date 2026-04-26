const { ML_SERVICE_URL } = require('../config/env');

/**
 * Classify text into a category
 * @param {string} headline
 * @param {string} shortDescription
 * @returns {Promise<string|null>} category or null on failure
 */
const classifyText = async (headline, shortDescription) => {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/classify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headline, short_description: shortDescription }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.category;
  } catch (error) {
    console.error('ML Service Error (classify):', error.message);
    return null;
  }
};

/**
 * Summarize text
 * @param {string} text
 * @returns {Promise<string|null>} summary or null on failure
 */
const summarizeText = async (text) => {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error('ML Service Error (summarize):', error.message);
    return null;
  }
};

/**
 * Find similar articles
 * @param {string} headline
 * @param {string} shortDescription
 * @param {number} k
 * @returns {Promise<Array|null>} array of results or null on failure
 */
const findSimilar = async (headline, shortDescription, k = 5) => {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/similar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headline, short_description: shortDescription, k }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('ML Service Error (similar):', error.message);
    return null;
  }
};

module.exports = {
  classifyText,
  summarizeText,
  findSimilar,
};
