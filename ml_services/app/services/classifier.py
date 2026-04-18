import joblib
from pathlib import Path
from app.config import MODEL_PATH

MODEL_PATH = Path(MODEL_PATH)

model = joblib.load(MODEL_PATH / "logistic_regression_model.pkl")
vectorizer = joblib.load(MODEL_PATH / "tfidf_vectorizer.pkl")

def classify_text(headline: str, short_description: str):
    text=(headline+" "+short_description).lower()
    
    vec = vectorizer.transform([text])
    prediction = model.predict(vec)[0]

    return prediction
