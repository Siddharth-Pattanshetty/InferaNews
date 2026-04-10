from fastapi import FastAPI
from pydantic import BaseModel

from app.services.similarity import search_similar
from app.services.classifier import classify_text
from app.services.summarizer import summarize_text

app=FastAPI(title="AI News ML Service")

class ClassifyRequest(BaseModel):
    headline: str
    short_description: str

class SummarizeRequest(BaseModel):
    text: str

class SimilarityRequest(BaseModel):
    headline: str
    short_description: str
    k: int = 5

@app.get("/")
def home():
    return {"message": "ML Service is running 🚀"}

@app.post("/classify")
def classify(req: ClassifyRequest):
    category = classify_text(req.headline, req.short_description)
    return {"category": category}

@app.post("/summarize")
def summarize(req: SummarizeRequest):
    summary = summarize_text(req.text)
    return {"summary": summary}

@app.post("/similar")
def similar(req: SimilarityRequest):
    results = search_similar(
        req.headline,
        req.short_description,
        req.k
    )
    return {"results": results}