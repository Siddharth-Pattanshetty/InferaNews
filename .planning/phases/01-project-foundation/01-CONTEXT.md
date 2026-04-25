# Phase 1: Project Foundation - Context

**Gathered:** 2026-04-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Set up the Node.js + Express backend project structure inside `backend/`, establish MongoDB connection via Mongoose, configure environment variables for the full v1 lifecycle, and set up API route versioning under `/api/v1/`. The ML service bug (FIX-01) is already resolved by the developer — skip it.

</domain>

<decisions>
## Implementation Decisions

### Project Location & Structure
- **D-01:** Backend lives in `backend/` at project root, alongside `ml_services/`
- **D-02:** Standard layered folder structure inside `backend/src/`:
  - `src/controllers/` — Route handlers
  - `src/routes/` — Express route definitions
  - `src/services/` — Business logic + ML service client
  - `src/models/` — Mongoose schemas
  - `src/middleware/` — Auth, validation, error handling
  - `src/config/` — DB connection, env vars, constants
  - `src/utils/` — Helpers, response formatters

### Environment Configuration
- **D-03:** Full v1 config in `.env` from day one:
  - `PORT` — Server port
  - `MONGODB_URI` — Database connection string
  - `ML_SERVICE_URL` — FastAPI ML service base URL
  - `JWT_SECRET` — Token signing secret
  - `JWT_EXPIRY` — Token expiration duration
  - `CORS_ORIGIN` — Allowed frontend origin
  - `NODE_ENV` — Environment mode (development/production)
- **D-04:** `.env.example` provided with placeholder values for developer onboarding

### MongoDB Setup
- **D-05:** Support both local MongoDB and MongoDB Atlas via `MONGODB_URI` env var
- **D-06:** `.env.example` shows both connection string formats (local and Atlas)
- **D-07:** Developer chooses their own MongoDB setup — no hard dependency on either

### ML Service Bug Fix
- **D-08:** FIX-01 (classifier.py model filename mismatch) is already resolved by the developer — skip in this phase

### Agent's Discretion
- Entry point file naming (`server.js` vs `app.js` vs `index.js`)
- Specific npm package versions
- ESLint/Prettier configuration details
- .gitignore contents for Node.js

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Codebase
- `.planning/codebase/STACK.md` — Current ML service tech stack and dependencies
- `.planning/codebase/STRUCTURE.md` — Current project directory layout
- `.planning/codebase/CONCERNS.md` — Known issues including model file mismatch (already fixed)

### Research
- `.planning/research/STACK.md` — Recommended Node.js stack with package list
- `.planning/research/ARCHITECTURE.md` — Recommended layered architecture and project structure
- `.planning/research/PITFALLS.md` — Common pitfalls to avoid during setup

### Project
- `.planning/PROJECT.md` — Project constraints (Node.js + Express, MongoDB, JWT)
- `.planning/REQUIREMENTS.md` — SETUP-01 through SETUP-05, FIX-01

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — this is a greenfield Node.js project. No existing backend code.

### Established Patterns
- ML service uses modular service pattern (classifier.py, similarity.py, summarizer.py) — backend should follow similar modularity
- ML service has no env var support — backend should set a better example with proper .env config

### Integration Points
- `ml_services/` runs on port 8000 by default — backend's `ML_SERVICE_URL` should default to `http://localhost:8000`
- Backend will be a sibling directory to `ml_services/` at project root

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. User wants clean, modular setup that's ready for all subsequent phases (auth, CRUD, ML integration).

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-project-foundation*
*Context gathered: 2026-04-25*
