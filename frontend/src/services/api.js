// Mock Data
const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'SpaceX Launches Next-Gen Satellite Array',
    category: 'Technology',
    summary: 'SpaceX successfully deployed 50 new satellites to improve global internet coverage. The launch marks a milestone in reusable rocket technology.',
    content: 'Full article text goes here... SpaceX successfully deployed 50 new satellites to improve global internet coverage. The launch marks a milestone in reusable rocket technology. The Falcon 9 booster landed perfectly on the droneship.',
    date: '2023-10-27T10:00:00Z',
  },
  {
    id: '2',
    title: 'Global Markets Rally on Tech Earnings',
    category: 'Finance',
    summary: 'Major indices hit record highs today following stronger-than-expected earnings reports from leading technology companies.',
    content: 'Full article text goes here... Major indices hit record highs today following stronger-than-expected earnings reports from leading technology companies. Investors remain optimistic about Q4 projections.',
    date: '2023-10-27T14:30:00Z',
  },
  {
    id: '3',
    title: 'New AI Model Outperforms Humans in Diagnostic Tests',
    category: 'Health',
    summary: 'A new neural network developed by researchers has shown a 15% improvement over human doctors in identifying rare anomalies in medical scans.',
    content: 'Full article text goes here... A new neural network developed by researchers has shown a 15% improvement over human doctors in identifying rare anomalies in medical scans. The model uses a novel attention mechanism.',
    date: '2023-10-26T09:15:00Z',
  }
];

export const api = {
  getArticles: async () => {
    return new Promise(resolve => setTimeout(() => resolve([...MOCK_ARTICLES]), 500));
  },
  getArticleById: async (id) => {
    return new Promise(resolve => setTimeout(() => {
      const article = MOCK_ARTICLES.find(a => a.id === id);
      resolve(article || null);
    }, 500));
  },
  analyzeText: async (text) => {
    return new Promise(resolve => setTimeout(() => {
      resolve({
        category: 'Technology',
        summary: 'This is an AI-generated summary of the provided text. It condenses the main points into a quick read.',
        similarArticles: [MOCK_ARTICLES[0], MOCK_ARTICLES[2]]
      });
    }, 1500));
  },
  publishArticle: async (data) => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true, id: 'new-id' }), 1000));
  },
  deleteArticle: async (id) => {
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  }
};
