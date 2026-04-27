# Stack — InferaNews

## Languages

| Language | Version | Usage |
|----------|---------|-------|
| Python | 3.x (unspecified) | ML microservice, all business logic |

## Runtime

- **Python** — Standard CPython interpreter
- **Virtual environment** at `ml_services/venv/` (local, gitignored)

## Frameworks

| Framework | Role | Entry Point |
|-----------|------|-------------|
| FastAPI | HTTP API server | `ml_services/app/main.py` |
| Uvicorn | ASGI server | `uvicorn app.main:app --reload` |
| Pydantic | Request/response validation | Inline in `main.py` |

## Dependencies

From `ml_services/requirements.txt` (no pinned versions):

| Package | Purpose |
|---------|---------|
| `fastapi` | Web framework |
| `uvicorn` | ASGI server |
| `scikit-learn` | ML model loading (joblib) |
| `numpy` | Numerical operations |
| `transformers` | Hugging Face BART summarization model |
| `torch` | PyTorch backend for transformers |
| `sentencepiece` | Tokenizer support |
| `sentence-transformers` | MiniLM embeddings for similarity |
| `faiss-cpu` | Vector similarity index |
| `pydantic` | Data validation |
| `requests` | HTTP client (unused in current code) |

**Note:** No version pinning — all dependencies use latest at install time.

## Configuration

- `ml_services/app/config.py` — Single constant: `MODEL_PATH = "app/models/"`
- No environment variable support
- No `.env` file
- No configuration profiles (dev/staging/prod)

## Build & Run

```bash
cd ml_services
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**No Dockerfile, docker-compose, or CI/CD configuration present.**

## Model Files (Git-excluded)

Located at `ml_services/app/models/` (~364 MB total):

| File | Size | Used By |
|------|------|---------|
| `faiss.index` | 323 MB | `similarity.py` |
| `texts.pkl` | 37 MB | `similarity.py` |
| `svm_model.pkl` | 3.4 MB | **Not loaded by any code** |
| `vectorizer.pkl` | 368 KB | **Not loaded by any code** |

**Discrepancy:** Code in `classifier.py` loads `logistic_regression_model.pkl` and `tfidf_vectorizer.pkl`, but actual model files on disk are `svm_model.pkl` and `vectorizer.pkl`. This suggests a model name mismatch or that the classifier is currently broken.

## License

Apache License 2.0
