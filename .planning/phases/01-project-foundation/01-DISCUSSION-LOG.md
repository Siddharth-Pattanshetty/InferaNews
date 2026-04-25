# Phase 1: Project Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-25
**Phase:** 01-project-foundation
**Areas discussed:** Project Structure, ML Service Bug Fix, Environment Configuration, MongoDB Setup

---

## Project Structure — Location

| Option | Description | Selected |
|--------|-------------|----------|
| `backend/` at project root | Sits alongside `ml_services/`, clean separation | ✓ |
| Project root directly | `package.json` at root, `src/` alongside `ml_services/` | |
| Something else | Custom location | |

**User's choice:** `backend/` at project root
**Notes:** Matches the project overview document's described folder structure.

---

## Project Structure — Folder Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Standard layered | controllers/, routes/, services/, models/, middleware/, config/ | ✓ |
| Flat | Everything in src/ with naming conventions | |
| Feature-based | src/articles/, src/auth/ with own controller/route/model each | |

**User's choice:** Standard layered
**Notes:** Industry standard for Express.js projects, clean separation of concerns.

---

## ML Service Bug Fix

| Option | Description | Selected |
|--------|-------------|----------|
| Update code to match files | Change classifier.py to load svm_model.pkl | |
| Rename files to match code | Rename svm_model.pkl to logistic_regression_model.pkl | |
| Already fixed | User has already resolved the mismatch | ✓ |

**User's choice:** Already fixed — skip FIX-01
**Notes:** User confirmed the bug is resolved. No action needed in this phase.

---

## Environment Configuration

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal | PORT, MONGODB_URI, ML_SERVICE_URL only | |
| Full v1 upfront | PORT, MONGODB_URI, ML_SERVICE_URL, JWT_SECRET, JWT_EXPIRY, CORS_ORIGIN, NODE_ENV | ✓ |

**User's choice:** Full v1 upfront
**Notes:** Avoids revisiting config setup in later phases.

---

## MongoDB Setup

| Option | Description | Selected |
|--------|-------------|----------|
| Local MongoDB only | mongodb://localhost:27017/inferanews | |
| MongoDB Atlas only | Cloud-based, free tier | |
| Support both | MONGODB_URI env var, .env.example shows both formats | ✓ |

**User's choice:** Support both via env var
**Notes:** Maximum flexibility — developer chooses their preferred MongoDB setup.

---

## Agent's Discretion

- Entry point naming, npm versions, linter config, .gitignore contents

## Deferred Ideas

None — discussion stayed within phase scope.
