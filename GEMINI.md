<!-- GSD:project-start source:PROJECT.md -->
## Project

**InferaNews — Backend API**

A Node.js backend API layer for InferaNews, an AI-powered news intelligence platform. The backend sits between a React frontend (built by another developer) and an existing FastAPI ML microservice, handling article management, admin authentication, ML service orchestration, and serving structured APIs for the frontend to consume. Users browse and analyze news anonymously; admins authenticate to publish and manage content.

**Core Value:** When an admin publishes an article, the backend automatically processes it through the ML service (classification, summarization, similarity indexing) and stores the enriched result in MongoDB — so users see categorized, summarized, discoverable news without any manual tagging.

### Constraints

- **Tech stack**: Node.js + Express.js for backend, MongoDB for database
- **API contract**: Backend must expose RESTful endpoints compatible with React frontend
- **ML service dependency**: Backend must communicate with FastAPI ML service at runtime
- **Admin-only writes**: All article mutations require JWT authentication
- **No user auth**: Regular users access all read endpoints without authentication
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

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
## Configuration
- `ml_services/app/config.py` — Single constant: `MODEL_PATH = "app/models/"`
- No environment variable support
- No `.env` file
- No configuration profiles (dev/staging/prod)
## Build & Run
## Model Files (Git-excluded)
| File | Size | Used By |
|------|------|---------|
| `faiss.index` | 323 MB | `similarity.py` |
| `texts.pkl` | 37 MB | `similarity.py` |
| `svm_model.pkl` | 3.4 MB | **Not loaded by any code** |
| `vectorizer.pkl` | 368 KB | **Not loaded by any code** |
## License
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Code Style
- **No formatter or linter configured** (no `pyproject.toml`, `setup.cfg`, `.flake8`, or `ruff.toml`)
- Inconsistent spacing around `=` in assignments (e.g., `app=FastAPI(...)` vs `model = joblib.load(...)`)
- No type hints on return values (only Pydantic models for input validation)
- No docstrings on any functions or modules
## Import Style
## Function Patterns
## Model Loading Pattern
## Error Handling
- **None.** No try/except blocks anywhere in the codebase
- No custom exception classes
- No error response models
- Relies entirely on FastAPI's default exception handling
- If a model file is missing, the server will crash on startup with an unhandled exception
## Route Patterns
- Synchronous route handlers (no `async def`)
- Return raw dicts (no response models)
- No status codes specified
- No dependency injection
## Configuration Pattern
- No environment variable support
- No configuration validation
- Relative path — depends on working directory being `ml_services/`
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern
## Layers
```
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
```
- Startup is slow (loading ~364MB of models + downloading transformers)
- After startup, inference is fast (no disk I/O per request)
- No lazy loading or on-demand model management
## Entry Points
| Entry | Path | Purpose |
|-------|------|---------|
| API server | `ml_services/app/main.py` | FastAPI app, started via `uvicorn app.main:app` |
## Abstractions
- No base classes or interfaces for services
- No dependency injection
- No middleware pipeline
- No shared utilities or helpers
- Each service is a standalone module with global model loading + single exported function
## Component Boundaries
- `classifier.py` — Uses sklearn (joblib), no shared state
- `similarity.py` — Uses FAISS + sentence-transformers, no shared state
- `summarizer.py` — Uses Hugging Face transformers, no shared state
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.agent/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
