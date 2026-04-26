# Plan 02-01 Summary: Admin Model + Seed

## What was built
- Installed `bcryptjs` and `jsonwebtoken` dependencies
- Created `src/models/Admin.js` — Mongoose schema with bcrypt pre-save hook
- Created `src/config/seed.js` — auto-seeds default admin on first startup
- Updated `src/server.js` — calls seedAdmin() after connectDB()

## Key details
- Password hashed with bcrypt (10 salt rounds) via pre-save middleware
- `comparePassword()` instance method for login verification
- `toJSON()` strips password from serialized output
- Seed is idempotent — only creates admin when collection is empty
- Default credentials: admin / admin123

## Requirements addressed
- AUTH-02: Admin passwords hashed with bcrypt
- AUTH-04: Admin seeded via startup auto-seed

## Self-Check: PASSED
