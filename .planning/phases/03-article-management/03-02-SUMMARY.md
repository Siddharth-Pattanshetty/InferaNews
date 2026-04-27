# Plan 03-02 Summary: Article CRUD Controller + Routes

## What was built
- Created `src/controllers/articleController.js` — CRUD handlers with pagination, filtering, and sorting
- Created `src/routes/articleRoutes.js` — public read routes, admin-protected write routes
- Mounted article routes in `src/routes/index.js` under `/articles`

## Key details
- GET `/api/v1/articles` allows pagination (`page`, `limit`), category filtering (`category`), and default sorts by newest first (`createdAt: -1`).
- Protected endpoints (POST, PUT, DELETE) use the `protect` middleware to ensure only admins can modify articles.
- Controllers correctly handle mongoose validation errors and invalid ObjectIds (400/404 respectively).

## Requirements addressed
- ARTICLE-01: Admin can create articles (JWT protected)
- ARTICLE-02: Public can view paginated article list
- ARTICLE-03: Public can view a single article by ID
- ARTICLE-04: Admin can update an article (JWT protected)
- ARTICLE-05: Admin can delete an article (JWT protected)
- ARTICLE-07: Pagination includes total, page, pages, limit metadata
- ARTICLE-08: Category filtering enabled

## Self-Check: PASSED
