1# Roadmap: InferaNews Backend

**Created:** 2026-04-24
**Milestone:** v1.0 — Backend API
**Granularity:** Standard (5-8 phases)
**Total phases:** 6

## Overview

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Project Foundation | Express + MongoDB setup with config | SETUP-01..05, FIX-01 | 4 |
| 2 | Admin Authentication | JWT-based admin login and route protection | AUTH-01..04 | 3 |
| 3 | Article Management | Full CRUD with pagination, filtering, sorting | ARTICLE-01..08 | 5 |
| 4 | ML Service Integration | HTTP client, proxy endpoints, auto-processing | ML-01..07 | 4 |
| 5 | Search & Discovery | Keyword search with text index | SEARCH-01..02 | 2 |
| 6 | API Polish & Documentation | Swagger, validation, security, rate limiting | INFRA-01..07 | 5 |

---

## Phase Details

### Phase 1: Project Foundation
**Goal:** Set up the Node.js + Express project structure, connect to MongoDB, configure environment variables, and fix the existing ML service bug.
**Requirements:** SETUP-01, SETUP-02, SETUP-03, SETUP-04, SETUP-05, FIX-01
**Depends on:** Nothing

**Success criteria:**
1. `npm start` runs the Express server on configurable port
2. MongoDB connection established and verified (health check returns "connected")
3. All routes are prefixed with `/api/v1/`
4. ML service classifier.py model filenames match actual files on disk

---

### Phase 2: Admin Authentication
**Goal:** Implement JWT-based authentication so admins can log in and access protected routes.
**Requirements:** AUTH-01, AUTH-02, AUTH-03, AUTH-04
**Depends on:** Phase 1

**Success criteria:**
1. Admin can POST /api/v1/auth/login with credentials and receive JWT token
2. Protected routes return 401 without valid token, 200 with valid token
3. Admin seed script creates initial admin user with hashed password

---

### Phase 3: Article Management
**Goal:** Build full article CRUD endpoints with pagination, filtering, and sorting — admin-protected for write operations, public for reads.
**Requirements:** ARTICLE-01, ARTICLE-02, ARTICLE-03, ARTICLE-04, ARTICLE-05, ARTICLE-06, ARTICLE-07, ARTICLE-08
**Depends on:** Phase 2

**Success criteria:**
1. Admin can create, update, and delete articles (JWT required)
2. Anyone can fetch paginated article list with category filter and date sorting
3. Anyone can fetch single article by ID
4. Pagination response includes total count, current page, and total pages
5. Unauthenticated write attempts return 401

---

### Phase 4: ML Service Integration
**Goal:** Connect backend to FastAPI ML microservice — proxy endpoints for frontend and automatic processing when admin publishes articles.
**Requirements:** ML-01, ML-02, ML-03, ML-04, ML-05, ML-06, ML-07
**Depends on:** Phase 3

**Success criteria:**
1. POST /api/v1/classify, /summarize, /similar forward requests to ML service and return results
2. Creating an article auto-populates category, summary, and similar articles from ML service
3. If ML service is down, article is still saved (graceful degradation)
4. ML service URL is configurable via ML_SERVICE_URL environment variable

---

### Phase 5: Search & Discovery
**Goal:** Enable keyword-based article search using MongoDB text indexes.
**Requirements:** SEARCH-01, SEARCH-02
**Depends on:** Phase 3

**Success criteria:**
1. GET /api/v1/articles/search?q=keyword returns matching articles
2. Search results are paginated with same metadata format as article list

---

### Phase 6: API Polish & Documentation
**Goal:** Add Swagger docs, input validation, security headers, rate limiting, and CORS — making the API production-ready and frontend-developer-friendly.
**Requirements:** INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07
**Depends on:** Phase 4, Phase 5
**UI hint:** no

**Success criteria:**
1. Swagger UI accessible at /api-docs with all endpoints documented
2. Invalid request payloads return 400 with descriptive validation errors
3. CORS allows configured frontend origin
4. Rate limiting returns 429 on excessive requests
5. Security headers set via Helmet (verify with browser dev tools)

---

## Milestone Boundary

**v1.0 complete when:** All 6 phases pass success criteria. Backend serves as a fully functional API layer between React frontend and FastAPI ML microservice.

**v2.0 candidates:** User authentication, personalized feed, analytics dashboard, external news API ingestion, ML response caching.
