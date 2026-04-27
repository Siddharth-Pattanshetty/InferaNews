# InferaNews — Backend API

## What This Is

A Node.js backend API layer for InferaNews, an AI-powered news intelligence platform. The backend sits between a React frontend (built by another developer) and an existing FastAPI ML microservice, handling article management, admin authentication, ML service orchestration, and serving structured APIs for the frontend to consume. Users browse and analyze news anonymously; admins authenticate to publish and manage content.

## Core Value

When an admin publishes an article, the backend automatically processes it through the ML service (classification, summarization, similarity indexing) and stores the enriched result in MongoDB — so users see categorized, summarized, discoverable news without any manual tagging.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ News classification via ML service (TF-IDF + Logistic Regression) — existing ML microservice
- ✓ Text summarization via ML service (BART transformer) — existing ML microservice
- ✓ Semantic similarity search via ML service (FAISS + MiniLM) — existing ML microservice

### Active

<!-- Current scope. Building toward these. -->

- [ ] Node.js backend API with Express.js
- [ ] MongoDB database for articles and admin users
- [ ] Article CRUD (create, read, update, delete) with admin-only write access
- [ ] Admin authentication via JWT
- [ ] ML service integration — auto-classify, summarize, and find similar articles on publish
- [ ] Public article feed endpoint (browse, paginate)
- [ ] Public article search (keyword-based)
- [ ] ML proxy endpoints for frontend (classify, summarize, similar)
- [ ] Swagger/OpenAPI documentation for frontend developer
- [ ] Fix ML service model file name mismatch (classifier.py references wrong filenames)

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- User authentication / registration — v1 uses anonymous access for regular users
- Insights dashboard (trending, analytics) — deferred to v2
- External news API / RSS ingestion — admin-only article creation in v1
- Personalized news feed — requires user accounts (v2)
- ML response caching — premature optimization for v1
- Frontend development — handled by another developer
- Role-based multi-user admin system — single admin role sufficient for v1

## Context

- **Existing ML microservice** at `ml_services/` provides 3 endpoints: `/classify`, `/summarize`, `/similar`
- **Known issue:** `classifier.py` loads `logistic_regression_model.pkl` but actual file on disk is `svm_model.pkl` — needs fixing
- **No frontend, backend, or database exists yet** — only the ML service is implemented
- **Frontend developer** will consume the backend APIs — Swagger docs are essential for coordination
- **MongoDB** chosen as database (document-oriented fits article storage well)
- **Deployment targets:** Backend on Render, ML service on Docker/Render, DB on MongoDB Atlas
- **Branch:** Development happens on `backend-development` branch, separate from `main`

## Constraints

- **Tech stack**: Node.js + Express.js for backend, MongoDB for database
- **API contract**: Backend must expose RESTful endpoints compatible with React frontend
- **ML service dependency**: Backend must communicate with FastAPI ML service at runtime
- **Admin-only writes**: All article mutations require JWT authentication
- **No user auth**: Regular users access all read endpoints without authentication

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Node.js over Spring Boot | Lighter weight, faster to build, JavaScript ecosystem matches React frontend | — Pending |
| MongoDB over SQL | Document-oriented storage fits article data naturally, flexible schema | — Pending |
| JWT for admin auth | Stateless, simple to implement, no session store needed | — Pending |
| Anonymous user access | Reduces v1 complexity, users get value without account friction | — Pending |
| Separate branch | Backend development isolated from ML service changes on main | — Pending |
| Swagger API docs | Frontend developer needs clear API contract for parallel development | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-24 after initialization*
