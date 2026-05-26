import joblib
from pathlib import Path
from app.config import MODEL_PATH

MODEL_PATH = Path(MODEL_PATH)

try:
    model = joblib.load(MODEL_PATH / "logistic_regression_model.pkl")
    vectorizer = joblib.load(MODEL_PATH / "tfidf_vectorizer.pkl")
    has_classifier = True
except Exception as e:
    print(f"Warning: Failed to load classifier model/vectorizer ({e}). Using mock/fallback classifier.")
    has_classifier = False

def classify_text(headline: str, short_description: str):
    if has_classifier:
        try:
            text=(headline+" "+short_description).lower()
            vec = vectorizer.transform([text])
            prediction = model.predict(vec)[0]
            return prediction
        except Exception as e:
            print(f"Error during classification: {e}")
            
    # Fallback classifier (rule-based)
    text = (headline + " " + short_description).lower()
    categories = {
        "business": ["market", "stocks", "sales", "finance", "deal", "company", "retail"],
        "technology": ["ai", "software", "cybersecurity", "tech", "network", "digital"],
        "science": ["health", "medical", "space", "environment", "climate", "discovery"],
        "politics": ["senate", "court", "law", "president", "policy", "election"]
    }
    for cat, keywords in categories.items():
        if any(kw in text for kw in keywords):
            return cat
    return "general"
