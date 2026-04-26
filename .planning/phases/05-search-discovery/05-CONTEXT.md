# Phase 5 Context: Search & Discovery

**Phase Goal:** Enable keyword-based article search using MongoDB text indexes.
**Requirements:** SEARCH-01, SEARCH-02

## Prior Phase Outputs
- `backend/src/models/Article.js` — Already has a compound text index on `title`, `description`, and `content`.
- `backend/src/controllers/articleController.js` — Already has pagination logic that we need to replicate/reuse for search.
- `backend/src/routes/articleRoutes.js` — Currently has `GET /` and `GET /:id`. We will add `GET /search`.

## Locked Decisions

### D-01: Result Sorting
**Decision:** Relevance-based sorting.
**Behavior:** The search endpoint will use MongoDB's text score (`{ $meta: "textScore" }`) to sort results so that the most relevant articles appear first, rather than just the newest ones.
**Rationale:** Standard expected behavior for keyword searches.

### D-02: Empty Query Behavior
**Decision:** Fallback to list view.
**Behavior:** If a user hits `/api/v1/articles/search` without a `q` parameter (or if `q` is empty), the endpoint will simply return all articles paginated, matching the behavior of `GET /api/v1/articles`.
**Rationale:** Prevents frontend crashes and provides a graceful fallback if the search box is cleared.

### D-03: Pagination Format
**Decision:** Strict match with Phase 3.
**Behavior:** The response will include `total`, `page`, `pages`, and `limit` in the `pagination` object.

## Implementation Notes
- The new endpoint `GET /api/v1/articles/search` must be defined **before** `GET /api/v1/articles/:id` in the Express router so it doesn't get swallowed as an ID.
- The `searchArticles` controller function will be added to `articleController.js`.
