# Phase 6 Context: API Polish & Documentation

**Phase Goal:** Make the API frontend-developer-friendly and ensure basic protections are in place.
**Requirements:** INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, INFRA-06, INFRA-07

## Prior Phase Outputs
- `backend/src/server.js` — Already has CORS and Helmet (Security Headers) configured.
- `backend/src/controllers/articleController.js` — Already handles Mongoose `ValidationError` and returns 400 Bad Request.

## Locked Decisions

### D-01: Rate Limiting
**Decision:** Skipped.
**Behavior:** We will not install or configure `express-rate-limit`.
**Rationale:** User requested to skip it ("no need") for this milestone to keep things simple. Requirement INFRA-05 is waived.

### D-02: API Documentation Format
**Decision:** Markdown Documentation.
**Behavior:** We will not use Swagger/OpenAPI. Instead, we will create a clear, comprehensive `API_DOCS.md` inside the `backend/` directory. This file will list all available endpoints, their payloads, headers (like JWT), and example responses.
**Rationale:** Markdown is lightweight, doesn't add runtime dependencies, and perfectly serves the goal of informing frontend developers how to use the API. Requirement INFRA-01 is satisfied via Markdown instead of Swagger.

### D-03: Input Validation
**Decision:** Keep it simple (Mongoose only).
**Behavior:** We will continue to rely on Mongoose schema validation. If invalid data is sent, Mongoose throws a `ValidationError` which the controller catches and converts into a 400 response with the error messages. We will not add `express-validator`.
**Rationale:** Prevents unnecessary boilerplate. Requirement INFRA-02 is already satisfied by existing code.

## Implementation Notes
- Create `backend/API_DOCS.md` detailing all endpoints:
  - `POST /api/v1/auth/login`
  - `GET /api/v1/articles`
  - `GET /api/v1/articles/:id`
  - `POST /api/v1/articles` (Admin)
  - `PUT /api/v1/articles/:id` (Admin)
  - `DELETE /api/v1/articles/:id` (Admin)
  - `GET /api/v1/articles/search?q=`
  - `POST /api/v1/ml/classify` (Admin/Frontend)
  - `POST /api/v1/ml/summarize` (Admin/Frontend)
  - `POST /api/v1/ml/similar` (Admin/Frontend)
