# Concerns — InferaNews

## Critical Issues

### 1. Model File Name Mismatch (Severity: HIGH)

**Location:** `ml_services/app/services/classifier.py` lines 7-8

The classifier code loads `logistic_regression_model.pkl` and `tfidf_vectorizer.pkl`, but the actual files on disk are `svm_model.pkl` and `vectorizer.pkl`.

```python
# Code expects:
model = joblib.load(MODEL_PATH / "logistic_regression_model.pkl")
vectorizer = joblib.load(MODEL_PATH / "tfidf_vectorizer.pkl")

# Files on disk:
# svm_model.pkl (3.4 MB)
# vectorizer.pkl (368 KB)
```

**Impact:** The `/classify` endpoint will crash with `FileNotFoundError` on startup. Either the model files need renaming or the code needs updating.

### 2. README vs Reality Mismatch (Severity: MEDIUM)

The root `README.md` describes a full-stack system (React + Node.js/Spring Boot + MongoDB + ML Service), but **only the ML microservice exists**. This creates false expectations for contributors.

Additionally, the README says "SVM" classifier but `ML_SERVICE_OVERVIEW.md` says "Logistic Regression" and the code references `logistic_regression_model.pkl`. The actual model file on disk is `svm_model.pkl`.

## Technical Debt

### 3. No Version Pinning (Severity: MEDIUM)

`requirements.txt` has no version constraints. Any `pip install` could break the build with incompatible updates.

### 4. Models Loaded at Import Time (Severity: MEDIUM)

All three services load ML models at module import time. This means:
- Server startup downloads ~1GB+ of transformer models on first run
- If any model file is missing, the entire server fails to start
- No graceful degradation — one broken service takes down all services
- No health check to verify models are loaded correctly

### 5. No Error Handling (Severity: MEDIUM)

Zero try/except blocks in the entire codebase. If a model prediction fails, the user gets an unformatted 500 error.

### 6. No Authentication (Severity: LOW for dev, HIGH for prod)

All endpoints are publicly accessible with no authentication or rate limiting. Acceptable for development but a concern for any deployment.

### 7. Synchronous Handlers (Severity: LOW)

All route handlers are synchronous despite using FastAPI (which supports async). ML inference (especially BART summarization) can be slow and would block the event loop.

## Security

- No API authentication or authorization
- No input sanitization beyond Pydantic type validation
- No rate limiting
- Model download from Hugging Face Hub happens on untrusted network (no hash verification)
- Pickle files (`texts.pkl`) loaded with `pickle.load()` — vulnerable to arbitrary code execution if files are tampered with

## Performance

- BART summarization model is large and slow for single requests
- No request queuing or batching
- No caching of repeated requests
- FAISS index loaded fully into memory (323 MB)
- No GPU support configured (CPU-only inference)

## Fragile Areas

| Area | Risk | Impact |
|------|------|--------|
| Model file paths | Hardcoded, relative to working directory | Server crashes if run from wrong directory |
| Model downloads | Network-dependent on first startup | Fails in air-gapped environments |
| Pickle loading | `pickle.load` with no validation | Security risk if model files tampered |
| Global model state | Module-level loading, no reload capability | Models cannot be updated without restart |
