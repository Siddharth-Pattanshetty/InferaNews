# Phase 2 Discussion Log: Admin Authentication

**Date:** 2026-04-25

## Questions & Answers

### Q1: Admin Seeding Strategy
**Options considered:**
- A) CLI script (`node scripts/seed-admin.js`) — explicit, separate step
- B) **Auto-seed on startup** ✅ — server checks on boot, creates if missing
- C) One-time setup endpoint (`POST /api/v1/setup`) — security risk
**User chose:** B — Auto-seed on startup
**Rationale:** No extra setup step for developers; simpler onboarding

### Q2: Token Response Format
**Options considered:**
- A) Token only (`{ token }`) — minimal
- B) **Token + admin profile + expiry** ✅ — full context for frontend
**User chose:** B (agent recommendation: "whichever is best")
**Rationale:** Frontend needs admin info for UI display and token expiry for refresh logic

### Q3: Auth Middleware Error Differentiation
**Options considered:**
- A) Generic 401 for all failures — simpler
- B) **Specific messages per failure type** ✅ — better UX
**User chose:** B — Different message for missing, expired, and malformed tokens
**Rationale:** Frontend can show appropriate UI per error type

### Q4: Admin Model Shape
**Options considered:**
- A) Full model (username, email, name, role, lastLogin) — extensible
- B) **Minimal model (username, password only)** ✅ — v1 simplicity
**User chose:** B — Just username and password
**Rationale:** Single admin level in v1; Mongoose timestamps cover createdAt/updatedAt
