# Structure — InferaNews

## Directory Layout

```
InferaNews/
├── LICENSE                          # Apache 2.0
├── README.md                        # Project overview (describes full-stack vision)
│
└── ml_services/                     # ML microservice (only implemented component)
    ├── .gitignore                   # Excludes models, cache, data files
    ├── ML_SERVICE_OVERVIEW.md       # Detailed ML service documentation
    ├── requirements.txt             # Python dependencies (unpinned)
    ├── venv/                        # Python virtual environment (local)
    │
    └── app/                         # FastAPI application
        ├── __pycache__/             # Python bytecode cache
        ├── config.py                # MODEL_PATH constant
        ├── main.py                  # FastAPI app + routes + request models
        │
        ├── models/                  # Pre-trained model files (gitignored)
        │   ├── faiss.index          # FAISS vector index (323 MB)
        │   ├── texts.pkl            # Text corpus for similarity (37 MB)
        │   ├── svm_model.pkl        # SVM model (3.4 MB) — NOT used by code
        │   └── vectorizer.pkl       # TF-IDF vectorizer (368 KB) — NOT used by code
        │
        └── services/               # ML service modules
            ├── __pycache__/
            ├── classifier.py        # News classification (TF-IDF + LogReg)
            ├── similarity.py        # Semantic search (FAISS + MiniLM)
            └── summarizer.py        # Abstractive summarization (BART)
```

## Key Locations

| What | Path |
|------|------|
| API entry point | `ml_services/app/main.py` |
| Classification logic | `ml_services/app/services/classifier.py` |
| Similarity search logic | `ml_services/app/services/similarity.py` |
| Summarization logic | `ml_services/app/services/summarizer.py` |
| Config | `ml_services/app/config.py` |
| Dependencies | `ml_services/requirements.txt` |
| ML model files | `ml_services/app/models/` |

## Naming Conventions

- **Files:** snake_case (`classifier.py`, `similarity.py`)
- **Functions:** snake_case (`classify_text`, `search_similar`, `summarize_text`)
- **Classes:** PascalCase (`ClassifyRequest`, `SummarizeRequest`)
- **Constants:** UPPER_SNAKE_CASE (`MODEL_PATH`, `MODEL_NAME`)

## File Counts

| Type | Count |
|------|-------|
| Python source files | 5 |
| Documentation files | 3 (README.md, ML_SERVICE_OVERVIEW.md, LICENSE) |
| Config files | 2 (requirements.txt, .gitignore) |
| Model files | 4 (gitignored binary) |
| **Total tracked files** | **~10** |

## What's Missing (per README)

The root README describes a full-stack architecture, but only the ML microservice exists:
- No `frontend/` directory (React)
- No `backend/` directory (Node.js / Spring Boot)
- No database configuration (MongoDB)
- No Docker/deployment configuration
