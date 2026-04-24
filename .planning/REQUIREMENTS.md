# Requirements: InferaNews Backend

**Defined:** 2026-04-24
**Core Value:** When an admin publishes an article, the backend automatically processes it through the ML service and stores enriched results so users see categorized, summarized, discoverable news.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Project Setup

- [ ] **SETUP-01**: Backend project initialized with Node.js + Express in `backend/` directory
- [ ] **SETUP-02**: MongoDB connection established via Mongoose with environment-based config
- [ ] **SETUP-03**: Project uses environment variables (.env) for all secrets and configuration
- [ ] **SETUP-04**: API routes versioned under `/api/v1/` prefix
- [ ] **SETUP-05**: Request logging enabled via Morgan or Pino middleware

### Authentication

- [ ] **AUTH-01**: Admin can log in with username and password, receiving a JWT token
- [ ] **AUTH-02**: Admin passwords are hashed with bcrypt before storage
- [ ] **AUTH-03**: JWT middleware protects all admin-only routes
- [ ] **AUTH-04**: Admin can be seeded via a setup script (no public registration)

### Article Management

- [ ] **ARTICLE-01**: Admin can create a new article (title, description, content) via protected endpoint
- [ ] **ARTICLE-02**: Anyone can fetch paginated list of articles (GET /api/v1/articles)
- [ ] **ARTICLE-03**: Anyone can fetch a single article by ID (GET /api/v1/articles/:id)
- [ ] **ARTICLE-04**: Admin can update an existing article via protected endpoint
- [ ] **ARTICLE-05**: Admin can delete an article via protected endpoint
- [ ] **ARTICLE-06**: Article list supports category filtering via query parameter
- [ ] **ARTICLE-07**: Article list supports sorting by creation date (newest first by default)
- [ ] **ARTICLE-08**: Pagination returns metadata (total count, current page, total pages)

### Search

- [ ] **SEARCH-01**: User can search articles by keyword (MongoDB text index on title + description + content)
- [ ] **SEARCH-02**: Search results are paginated

### ML Integration

- [ ] **ML-01**: Backend can call ML service `/classify` endpoint and return category
- [ ] **ML-02**: Backend can call ML service `/summarize` endpoint and return summary
- [ ] **ML-03**: Backend can call ML service `/similar` endpoint and return similar articles
- [ ] **ML-04**: ML proxy endpoints are available for frontend (POST /api/v1/classify, /summarize, /similar)
- [ ] **ML-05**: When admin creates an article, backend auto-classifies, summarizes, and finds similar articles
- [ ] **ML-06**: ML service errors are handled gracefully (article still saved if ML fails)
- [ ] **ML-07**: ML service URL is configurable via environment variable

### API Infrastructure

- [ ] **INFRA-01**: CORS configured to allow frontend origin
- [ ] **INFRA-02**: Input validation on all endpoints using Joi or Zod
- [ ] **INFRA-03**: Centralized error handling middleware with consistent error response format
- [ ] **INFRA-04**: Health check endpoint (GET /api/v1/health)
- [ ] **INFRA-05**: Swagger/OpenAPI documentation served at /api-docs
- [ ] **INFRA-06**: Rate limiting on API endpoints
- [ ] **INFRA-07**: Security headers via Helmet middleware

### ML Service Fix

- [ ] **FIX-01**: Fix classifier.py model filename mismatch (logistic_regression_model.pkl vs svm_model.pkl)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### User System

- **USER-01**: User can create account with email and password
- **USER-02**: User can log in and receive personalized feed
- **USER-03**: User can save/bookmark articles

### Analytics

- **ANALYTICS-01**: Admin can view trending articles
- **ANALYTICS-02**: Admin can see popular categories
- **ANALYTICS-03**: Admin dashboard with content metrics

### Advanced Features

- **ADV-01**: External news API integration for auto-ingestion
- **ADV-02**: Article scheduling (publish at future time)
- **ADV-03**: ML response caching with Redis
- **ADV-04**: Circuit breaker for ML service communication

## Out of Scope

| Feature | Reason |
|---------|--------|
| Frontend development | Handled by another developer |
| User registration/auth | Anonymous access in v1 |
| Comments/reactions | Not core to news intelligence value |
| File/image upload | Not in v1 scope |
| WebSocket real-time updates | Unnecessary complexity |
| Elasticsearch full-text search | MongoDB text index sufficient for v1 |
| Email notifications | No user accounts in v1 |
| GraphQL API | REST is simpler, frontend expects REST |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | — | Pending |
| SETUP-02 | — | Pending |
| SETUP-03 | — | Pending |
| SETUP-04 | — | Pending |
| SETUP-05 | — | Pending |
| AUTH-01 | — | Pending |
| AUTH-02 | — | Pending |
| AUTH-03 | — | Pending |
| AUTH-04 | — | Pending |
| ARTICLE-01 | — | Pending |
| ARTICLE-02 | — | Pending |
| ARTICLE-03 | — | Pending |
| ARTICLE-04 | — | Pending |
| ARTICLE-05 | — | Pending |
| ARTICLE-06 | — | Pending |
| ARTICLE-07 | — | Pending |
| ARTICLE-08 | — | Pending |
| SEARCH-01 | — | Pending |
| SEARCH-02 | — | Pending |
| ML-01 | — | Pending |
| ML-02 | — | Pending |
| ML-03 | — | Pending |
| ML-04 | — | Pending |
| ML-05 | — | Pending |
| ML-06 | — | Pending |
| ML-07 | — | Pending |
| INFRA-01 | — | Pending |
| INFRA-02 | — | Pending |
| INFRA-03 | — | Pending |
| INFRA-04 | — | Pending |
| INFRA-05 | — | Pending |
| INFRA-06 | — | Pending |
| INFRA-07 | — | Pending |
| FIX-01 | — | Pending |

**Coverage:**
- v1 requirements: 34 total
- Mapped to phases: 0
- Unmapped: 34 ⚠️

---
*Requirements defined: 2026-04-24*
*Last updated: 2026-04-24 after initial definition*
