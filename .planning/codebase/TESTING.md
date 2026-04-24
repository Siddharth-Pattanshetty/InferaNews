# Testing — InferaNews

## Current State

**No tests exist.** There are:
- No test files
- No test directories
- No test framework in `requirements.txt` (no pytest, unittest, etc.)
- No CI/CD pipeline configuration
- No test coverage configuration

## Test Infrastructure

| Aspect | Status |
|--------|--------|
| Test framework | None installed |
| Test directory | Does not exist |
| Unit tests | None |
| Integration tests | None |
| API tests | None |
| CI/CD | None |
| Coverage tool | None |

## Manual Testing

The only documented testing approach is manual via FastAPI's interactive docs:
```
http://127.0.0.1:8000/docs
```

## Recommendations for Future Testing

If tests are added, the codebase would benefit from:

1. **API endpoint tests** — FastAPI's `TestClient` for route testing
2. **Service unit tests** — Mock model files, test preprocessing logic
3. **Model loading tests** — Verify graceful failure when model files are missing
4. **Input validation tests** — Edge cases for Pydantic models (empty strings, very long text)
