# Phase 2 Context: Admin Authentication

**Phase Goal:** Implement JWT-based authentication so admins can log in and access protected routes.
**Requirements:** AUTH-01, AUTH-02, AUTH-03, AUTH-04

## Prior Phase Outputs
- `backend/src/config/env.js` exports `JWT_SECRET` and `JWT_EXPIRY` (already configured in .env)
- `backend/src/middleware/` directory exists — auth middleware goes here
- `backend/src/routes/index.js` has placeholder comment for `/auth` route mount
- `backend/src/models/` directory exists — Admin model goes here
- Error handler returns `{ success: false, message }` format — auth errors should match

## Locked Decisions

### D-01: Admin Seeding — Auto-seed on Startup
**Decision:** Server checks for admin on boot; creates one if none exists.
**Default credentials:** username: `admin`, password: `admin123`
**Behavior:** On first run, logs to console: `"⚠ Default admin created (username: admin). Change password immediately."`
**Rationale:** Simpler than a separate CLI script; no extra step for developers setting up locally.
**File:** `backend/src/config/seed.js` — called from `server.js` after `connectDB()`.

### D-02: Token Response Format
**Decision:** Login returns full context for frontend convenience.
**Response shape:**
```json
{
  "success": true,
  "token": "eyJhbG...",
  "admin": {
    "id": "64abc...",
    "username": "admin"
  },
  "expiresIn": "7d"
}
```
**Token delivery:** Plain string in response body. Frontend handles storage.
**No refresh tokens in v1.** Token lasts `JWT_EXPIRY` (default 7d).

### D-03: Differentiated Auth Error Responses
**Decision:** Auth middleware returns specific error messages per failure type.
| Scenario | Status | Message |
|----------|--------|---------|
| No Authorization header | 401 | "No token provided" |
| Token expired | 401 | "Token expired" |
| Malformed / bad signature | 401 | "Invalid token" |
**Rationale:** Frontend can show appropriate UI (login prompt vs session expired modal).

### D-04: Minimal Admin Model
**Decision:** Admin model has only `username` and `password`.
**Schema:**
```javascript
{
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
}
// With timestamps: true → adds createdAt, updatedAt
```
**Password handling:** Hashed with bcrypt (10 salt rounds) via Mongoose pre-save hook.
**No email, no role, no lastLogin** — v1 has a single admin level.

## Dependencies
- `jsonwebtoken` — JWT creation and verification (MUST be installed)
- `bcryptjs` — Password hashing (pure JS, no native compilation issues on Windows)
- Express, Mongoose — already installed from Phase 1

## Implementation Notes
- Auth middleware goes in `backend/src/middleware/auth.js`
- Auth routes in `backend/src/routes/authRoutes.js`
- Auth controller in `backend/src/controllers/authController.js`
- Admin model in `backend/src/models/Admin.js`
- Seed logic in `backend/src/config/seed.js`
- Mount auth routes: `router.use('/auth', authRoutes)` in `routes/index.js`
