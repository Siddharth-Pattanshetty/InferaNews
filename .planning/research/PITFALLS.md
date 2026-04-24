# Pitfalls Research — InferaNews Backend

## Critical Pitfalls

### 1. JWT Secret Hardcoding (Security)

**Warning signs:** JWT secret defined directly in source code or committed to git.

**Prevention:**
- Store JWT secret in `.env` file (gitignored)
- Use `crypto.randomBytes(64).toString('hex')` to generate strong secrets
- Provide `.env.example` with placeholder values
- **Phase:** Should be addressed in Phase 1 (project setup)

### 2. ML Service Coupling Without Error Handling

**Warning signs:** Backend crashes when ML service is down; 500 errors propagated directly.

**Prevention:**
- Wrap all ML service calls in try/catch
- Return meaningful error messages ("ML service unavailable, article saved without processing")
- Consider circuit breaker pattern (opossum library)
- Allow article creation to succeed even if ML processing fails (process later)
- **Phase:** Should be addressed when building ML integration

### 3. Missing Input Validation = NoSQL Injection

**Warning signs:** Request body passed directly to MongoDB queries without validation.

**Prevention:**
- Validate ALL inputs with Joi or Zod before touching the database
- Use Mongoose schema validation as a second layer
- Never construct MongoDB queries from raw user input
- **Phase:** Should be addressed from the first endpoint

### 4. No Pagination = Memory Explosion

**Warning signs:** `Article.find({})` returns all documents; works with 10 articles, crashes with 10,000.

**Prevention:**
- Implement pagination from day one (skip/limit or cursor-based)
- Default page size (e.g., 20), max page size (e.g., 100)
- Return pagination metadata in response (total, page, pages)
- **Phase:** Should be addressed in article endpoints

### 5. Synchronous ML Processing Blocking Publish

**Warning signs:** Admin clicks "Publish" and waits 30+ seconds while BART generates summary.

**Prevention:**
- Option A: Process synchronously but set reasonable timeouts
- Option B: Save article immediately, process async (background job)
- For v1, Option A is simpler — but set clear timeouts (30s max)
- Show processing status in response
- **Phase:** Should be addressed in auto-processing implementation

## Medium-Priority Pitfalls

### 6. CORS Misconfiguration

**Prevention:** Explicitly configure allowed origins. Never use `cors({ origin: '*' })` in production.

### 7. No Request Logging

**Prevention:** Add Morgan or Pino middleware from the start. Invaluable for debugging.

### 8. Model File Mismatch (Existing Bug)

The ML service `classifier.py` references `logistic_regression_model.pkl` but the actual file is `svm_model.pkl`. This will cause the `/classify` endpoint to fail.

**Prevention:** Fix before integrating backend with ML service.

### 9. Missing .gitignore for Node.js

**Prevention:** Create proper `.gitignore` with `node_modules/`, `.env`, coverage reports, etc.

### 10. No API Versioning

**Prevention:** Prefix all routes with `/api/v1/` from the start. Much harder to add retroactively.
