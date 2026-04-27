# Architecture — InferaNews

## Pattern

**Service-based monolith** — Single FastAPI application with domain-separated service modules. No microservice communication, no message queues, no event-driven patterns.

## Layers

```
┌─────────────────────────────────────┐
│  API Layer (main.py)                │
│  - FastAPI routes + Pydantic models │
├─────────────────────────────────────┤
│  Service Layer (services/)          │
│  - classifier.py                    │
│  - similarity.py                    │
│  - summarizer.py                    │
├─────────────────────────────────────┤
│  Model Layer (models/ — binary)     │
│  - Pre-trained ML models (pkl/index)│
│  - Downloaded transformer models    │
└─────────────────────────────────────┘
```

### API Layer
- `ml_services/app/main.py` — FastAPI app instance, route definitions, Pydantic request models
- Routes: `GET /`, `POST /classify`, `POST /summarize`, `POST /similar`
- No middleware, no error handling beyond FastAPI defaults
- No response models defined (returns raw dicts)

### Service Layer
- `ml_services/app/services/classifier.py` — Text classification via TF-IDF + Logistic Regression
- `ml_services/app/services/similarity.py` — Semantic search via FAISS + Sentence Transformers
- `ml_services/app/services/summarizer.py` — Abstractive summarization via BART

### Config
- `ml_services/app/config.py` — Single `MODEL_PATH` constant

## Data Flow

```
Client Request
    │
    ▼
FastAPI Router (main.py)
    │ Pydantic validation
    ▼
Service Function (classifier/similarity/summarizer)
    │ Uses pre-loaded models (loaded at import time)
    ▼
Return JSON Response
```

**Key characteristic:** All ML models are loaded at module import time (server startup). This means:
- Startup is slow (loading ~364MB of models + downloading transformers)
- After startup, inference is fast (no disk I/O per request)
- No lazy loading or on-demand model management

## Entry Points

| Entry | Path | Purpose |
|-------|------|---------|
| API server | `ml_services/app/main.py` | FastAPI app, started via `uvicorn app.main:app` |

## Abstractions

Minimal abstraction layer:
- No base classes or interfaces for services
- No dependency injection
- No middleware pipeline
- No shared utilities or helpers
- Each service is a standalone module with global model loading + single exported function

## Component Boundaries

Each service is fully independent:
- `classifier.py` — Uses sklearn (joblib), no shared state
- `similarity.py` — Uses FAISS + sentence-transformers, no shared state
- `summarizer.py` — Uses Hugging Face transformers, no shared state

No cross-service communication or shared data.
