# Phase 4 Context: ML Service Integration

**Phase Goal:** Connect backend to FastAPI ML microservice — proxy endpoints for frontend and automatic processing when admin publishes articles.
**Requirements:** ML-01 through ML-07

## Prior Phase Outputs
- `backend/src/models/Article.js` — Schema has `category`, `summary`, and `similarArticles` fields waiting for population.
- `backend/src/controllers/articleController.js` — `createArticle` and `updateArticle` exist but currently just save whatever is sent in the request body.
- `backend/src/config/env.js` — `ML_SERVICE_URL` is configured and defaults to `http://localhost:8000`.

## Locked Decisions

### D-01: Auto-Enrichment Flow
**Decision:** Synchronous enrichment.
**Behavior:** During article creation (and potentially updates if title/content changes), the backend will await responses from the ML service for classification, summarization, and similarity. The admin waits for this to complete before getting the `201 Created` response.
**Rationale:** Simpler implementation. Ensures the article is immediately ready with full context.

### D-02: Proxy Endpoints Access
**Decision:** Protected for Frontend.
**Behavior:** Expose `/api/v1/ml/classify`, `/api/v1/ml/summarize`, and `/api/v1/ml/similar`. Because these were requested as "protected only allowed for frontend", we'll protect them so they aren't completely open to abuse. (Will use existing JWT `protect` middleware or restrict by CORS origin if strict anonymity is required by the frontend).
**Rationale:** Prevents unauthorized scraping/abuse of the ML service.

### D-03: HTTP Client
**Decision:** Native Node.js `fetch`.
**Behavior:** Use standard `fetch` API for all HTTP requests to `ML_SERVICE_URL`. No `axios` or external HTTP packages.
**Rationale:** Native to Node.js 24, zero dependencies.

### D-04: Graceful Degradation
**Decision:** Defaults + Error Logging.
**Behavior:** If the ML service is down or returns 5xx errors, the backend catches the error, logs it (`console.error`), and continues saving the article using default values (`uncategorized`, empty summary, empty similar articles).
**Rationale:** Ensures the core CMS functionality (creating articles) does not break if the AI microservice crashes.

## Implementation Notes
- ML Service Wrapper: `backend/src/services/mlService.js` — encapsulates all `fetch` calls to the Python API.
- Article Controller: Update `createArticle` in `articleController.js` to call `mlService.js` functions before `Article.create()`.
- ML Routes: `backend/src/routes/mlRoutes.js` mounted at `/api/v1/ml` for proxying.
- The ML `/similar` endpoint expects `headline` and `short_description`. We will map `article.title` to `headline` and `article.description` to `short_description`.
