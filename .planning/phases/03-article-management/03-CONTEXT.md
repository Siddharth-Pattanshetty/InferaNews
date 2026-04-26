# Phase 3 Context: Article Management

**Phase Goal:** Build full article CRUD endpoints with pagination, filtering, and sorting — admin-protected for write operations, public for reads.
**Requirements:** ARTICLE-01 through ARTICLE-08

## Prior Phase Outputs
- `backend/src/middleware/auth.js` — `protect` middleware for admin-only routes
- `backend/src/routes/index.js` — placeholder for `router.use('/articles', articleRoutes)`
- `backend/src/controllers/` — pattern established with `authController.js`
- Error format: `{ success: false, message }` — all responses must follow this pattern
- Express body parsing: `express.json({ limit: '10mb' })` already configured

## Locked Decisions

### D-01: Article Model — Core Fields Only (Phase 3)
**Decision:** Model includes only admin-authored fields. ML-enriched fields added in Phase 4.
**Schema for Phase 3:**
```javascript
{
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true },
  content:     { type: String, required: true },
  category:    { type: String, enum: [...], default: 'uncategorized' },
  summary:     { type: String, default: '' },
  similarArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
}
// With timestamps: true → createdAt, updatedAt
```
**Note:** `category`, `summary`, and `similarArticles` are defined in the schema now (so the model is stable) but will be populated by ML service in Phase 4. For Phase 3, category defaults to `'uncategorized'`, summary defaults to empty string, similarArticles defaults to empty array.
**Rationale:** Avoids schema migrations later; ML enrichment just populates existing fields.

### D-02: Pagination — 10 Items Per Page
**Decision:** Default page size: 10, configurable via `?limit=N` query param.
**Max limit:** 50 (prevent abuse)
**Response format:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 42,
    "page": 1,
    "pages": 5,
    "limit": 10
  }
}
```

### D-03: Category — Enum Controlled by ML
**Decision:** Category field uses Mongoose enum validation.
**Known categories** (from the ML classifier's training labels — standard news categories):
```javascript
['politics', 'entertainment', 'technology', 'sports', 'business', 'health', 'science', 'world', 'uncategorized']
```
**Rationale:** Enum prevents garbage data; ML classifier assigns one of these. Admin can manually override category on create/update. Default is 'uncategorized' for articles not yet classified.

### D-04: Hard Delete
**Decision:** `DELETE /api/v1/articles/:id` permanently removes the document from MongoDB.
**No soft delete.** No `isDeleted` flag.
**Rationale:** v1 simplicity; articles can be re-created if deleted by mistake.

## Implementation Notes
- Article model: `backend/src/models/Article.js`
- Article controller: `backend/src/controllers/articleController.js`
- Article routes: `backend/src/routes/articleRoutes.js`
- Mount: `router.use('/articles', articleRoutes)` in `routes/index.js`
- Write routes (create, update, delete) use `protect` middleware
- Read routes (list, getById) are public (no auth required)
- Sorting: default `{ createdAt: -1 }` (newest first)
- Category filter: `?category=technology` query param
