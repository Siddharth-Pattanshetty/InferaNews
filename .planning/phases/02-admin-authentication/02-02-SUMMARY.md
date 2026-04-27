# Plan 02-02 Summary: Login + Auth Middleware

## What was built
- Created `src/controllers/authController.js` — login handler with JWT generation
- Created `src/middleware/auth.js` — JWT verification with differentiated errors
- Created `src/routes/authRoutes.js` — POST /login and GET /me (protected)
- Updated `src/routes/index.js` — mounted auth routes at /auth

## Endpoints
- `POST /api/v1/auth/login` — authenticate with username/password, returns JWT
- `GET /api/v1/auth/me` — validate token, returns admin profile (protected)

## Auth middleware error differentiation
| Scenario | Status | Message |
|----------|--------|---------|
| No Authorization header | 401 | "No token provided" |
| Expired JWT | 401 | "Token expired" |
| Malformed / bad signature | 401 | "Invalid token" |

## Login response format
```json
{ "success": true, "token": "eyJ...", "admin": { "id": "...", "username": "admin" }, "expiresIn": "7d" }
```

## Requirements addressed
- AUTH-01: Admin can log in and receive JWT token
- AUTH-03: JWT middleware protects admin-only routes

## Self-Check: PASSED
