# Phase 6 Discussion Log: API Polish & Documentation

**Date:** 2026-04-26

## Questions & Answers

### Q1: Rate Limiting Strategy
**Options considered:**
- A) Standard
- B) Strict
- C) Relaxed
**User chose:** Skipped ("no need")
**Rationale:** Not necessary for the current scope/milestone. Keeps the stack lighter.

### Q2: API Documentation Format
**Options considered:**
- A) Swagger (YAML/JSON)
- B) Swagger (Code Comments)
- C) **Markdown (`API_DOCS.md`)** ✅
**User chose:** Markdown
**Rationale:** User specifically requested to "just add read inside backend/ where it can be used by other devs like frontend to know what api are there and how to use those". A well-written Markdown file is perfect for this.

### Q3: Input Validation
**Options considered:**
- A) **Mongoose validation is fine (keep it simple)** ✅
- B) Add `express-validator`
**User chose:** A
**Rationale:** Mongoose already provides robust schema validation. Keeping it simple avoids bloating the route handlers with extra validation middleware.
