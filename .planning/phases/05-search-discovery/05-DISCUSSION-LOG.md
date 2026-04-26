# Phase 5 Discussion Log: Search & Discovery

**Date:** 2026-04-26

## Questions & Answers

### Q1: Result Sorting
**Options considered:**
- A) **Relevance** ✅ (MongoDB text score)
- B) Recency (Newest first)
**User chose:** A (Relevance)
**Rationale:** Best matches should surface at the top, which is expected for text-based keyword search.

### Q2: Empty Query Behavior
**Options considered:**
- A) Return 400 Bad Request
- B) Return empty array
- C) **Fallback to list view** ✅
**User chose:** C (Fallback to list view)
**Rationale:** If the search term is empty, just showing all articles provides a smoother user experience and handles the edge case gracefully.
