import pickle
from app.config import MODEL_PATH

model=pickle.load(open(f"{MODEL_PATH}svm_model.pkl", "rb"))
vectorizer=pickle.load(open(f"{MODEL_PATH}vectorizer.pkl", "rb"))

def classify_text(headline: str, short_description: str):
    text=headline+" "+short_description
    
    vec = vectorizer.transform([text])
    prediction = model.predict(vec)[0]

    return prediction
