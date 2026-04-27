# Phase 3 Discussion Log: Article Management

**Date:** 2026-04-26

## Questions & Answers

### Q1: Article Model Shape
**Options considered:**
- A) Core + ML fields together — single schema, ML populates later
- B) **Core fields only in Phase 3, ML fields in Phase 4** ✅
**User chose:** B — but we define all fields now with defaults to avoid migrations
**Final approach:** Schema includes category/summary/similarArticles with defaults; ML populates in Phase 4

### Q2: Pagination Default
**Options considered:** 10, 15, 20, 25
**User chose:** 10 items per page
**Max limit:** 50 (agent recommendation)

### Q3: Category Field Type
**Options considered:**
- A) Free-text String — flexible but messy
- B) **Enum controlled by ML classifier** ✅
**User chose:** B — enum with known categories from ML training labels
**Categories:** politics, entertainment, technology, sports, business, health, science, world, uncategorized

### Q4: Delete Behavior
**Options considered:**
- A) **Hard delete** ✅ — permanent removal
- B) Soft delete — flag as deleted, keep in DB
**User chose:** A — hard delete for v1 simplicity
