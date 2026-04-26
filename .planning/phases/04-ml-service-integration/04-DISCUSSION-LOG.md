# Phase 4 Discussion Log: ML Service Integration

**Date:** 2026-04-26

## Questions & Answers

### Q1: Auto-Enrichment Flow (Create/Update Article)
**Options considered:**
- A) **Synchronous** ✅ — Wait for ML service to finish before returning 201 response.
- B) Asynchronous — Save immediately, populate ML data in background.
**User chose:** Synchronous
**Rationale:** Simpler to implement. The admin UI will show a loading state while saving.

### Q2: Proxy Endpoints Access
**Options considered:**
- A) Public
- B) **Protected** ✅
**User chose:** Protected (only allowed for Frontend)
**Rationale:** Prevents unauthorized abuse of the expensive ML endpoints. We will use the existing JWT `protect` middleware for these proxy routes.

### Q3: HTTP Client
**Options considered:**
- A) **Native `fetch`** ✅
- B) `axios`
**User chose:** Native `fetch`
**Rationale:** Node.js v24 has built-in `fetch`, so no extra dependencies are needed.

### Q4: Graceful Degradation Strategy
**Options considered:**
- A) Fail the article creation
- B) **Use defaults and log error** ✅
**User chose:** Agent discretion (Use defaults)
**Rationale:** If the ML service is offline, the CMS should still function. The article will save with 'uncategorized' and no summary, and an error will be logged. Admins can update it later.
