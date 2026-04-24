# Conventions — InferaNews

## Code Style

- **No formatter or linter configured** (no `pyproject.toml`, `setup.cfg`, `.flake8`, or `ruff.toml`)
- Inconsistent spacing around `=` in assignments (e.g., `app=FastAPI(...)` vs `model = joblib.load(...)`)
- No type hints on return values (only Pydantic models for input validation)
- No docstrings on any functions or modules

## Import Style

```python
# Standard library first, then third-party, then local
import joblib                           # stdlib/third-party
from pathlib import Path                # stdlib
from app.config import MODEL_PATH       # local
```

Imports are generally organized but not enforced by tooling.

## Function Patterns

All service functions follow the same pattern:
1. Accept raw parameters (strings, ints)
2. Preprocess input (combine text, lowercase)
3. Run model inference
4. Return result directly (no wrapping)

```python
# Pattern in every service file:
def service_function(input_params) -> result:
    preprocessed = preprocess(input_params)
    result = model.predict(preprocessed)
    return result
```

## Model Loading Pattern

All services load models at module level (import time):

```python
# classifier.py — loads from disk via joblib
model = joblib.load(MODEL_PATH / "logistic_regression_model.pkl")

# similarity.py — loads from disk + downloads from HuggingFace
index = faiss.read_index(f"{MODEL_PATH}faiss.index")
model = SentenceTransformer("all-MiniLM-L6-v2")

# summarizer.py — downloads from HuggingFace
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
```

**No lazy loading, no error handling on model load failure.**

## Error Handling

- **None.** No try/except blocks anywhere in the codebase
- No custom exception classes
- No error response models
- Relies entirely on FastAPI's default exception handling
- If a model file is missing, the server will crash on startup with an unhandled exception

## Route Patterns

```python
@app.post("/endpoint")
def endpoint_name(req: PydanticModel):
    result = service_function(req.field1, req.field2)
    return {"key": result}
```

- Synchronous route handlers (no `async def`)
- Return raw dicts (no response models)
- No status codes specified
- No dependency injection

## Configuration Pattern

Single hardcoded constant in `config.py`:
```python
MODEL_PATH = "app/models/"
```

- No environment variable support
- No configuration validation
- Relative path — depends on working directory being `ml_services/`
