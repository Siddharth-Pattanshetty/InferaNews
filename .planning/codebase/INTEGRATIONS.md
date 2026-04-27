# Integrations — InferaNews

## External APIs

| Service | Usage | Location |
|---------|-------|----------|
| Hugging Face Hub | Downloads `facebook/bart-large-cnn` model on first run | `ml_services/app/services/summarizer.py` |
| Hugging Face Hub | Downloads `all-MiniLM-L6-v2` sentence transformer on first run | `ml_services/app/services/similarity.py` |

**Note:** Both models are downloaded at module import time (server startup). No caching strategy beyond Hugging Face's default cache.

## Databases

**None.** No database connections in the codebase. All data is loaded from:
- Pickle files (`texts.pkl`) — pre-computed text corpus
- FAISS index file (`faiss.index`) — pre-built vector index
- Joblib files (`*.pkl`) — pre-trained sklearn models

The README mentions MongoDB but no MongoDB integration exists in the current code.

## Authentication

**None.** No auth middleware, API keys, or token validation on any endpoint.

## Webhooks / Event Systems

**None.**

## External Service Dependencies

| Dependency | Type | Required At |
|------------|------|-------------|
| Hugging Face model registry | Network | First startup only (model download) |

## Planned but Not Implemented

Per README.md, these are described but not present in code:
- **React frontend** — No frontend code exists
- **Node.js / Spring Boot backend** — No backend API layer exists
- **MongoDB** — No database integration
- **Frontend-to-backend integration** — Only the ML microservice exists

The project currently consists solely of the FastAPI ML microservice.
