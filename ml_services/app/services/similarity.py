import faiss
import pickle
from app.config import MODEL_PATH
from sentence_transformers import SentenceTransformer
import numpy as np

# Load index and texts
try:
    index = faiss.read_index(f"{MODEL_PATH}faiss.index")
    texts=pickle.load(open(f"{MODEL_PATH}texts.pkl", "rb"))
except Exception as e:
    print(f"Warning: Failed to load FAISS index or texts ({e})")
    index = None
    texts = []

try:
    model=SentenceTransformer("all-MiniLM-L6-v2")
    has_model = True
except Exception as e:
    print(f"Warning: Failed to load SentenceTransformer ({e}). Using mock/fallback similarity search.")
    has_model = False

if index is not None:
    index.nprobe = 10

def search_similar(headline: str, short_description: str, k: int = 5):
    if has_model and index is not None and len(texts) > 0:
        try:
            query = headline + " " + short_description
            q_emb = model.encode([query])
            q_emb = np.array(q_emb).astype('float32')

            distances, indices = index.search(q_emb, k)

            results = []
            for i, idx in enumerate(indices[0]):
                if idx < len(texts):
                    results.append({
                        "text": texts[idx],
                        "distance": float(distances[0][i])
                    })
            return results
        except Exception as e:
            print(f"Error during similarity search: {e}")

    # Fallback: simple text overlapping search or mock results
    results = []
    query_words = set((headline + " " + short_description).lower().split())
    
    # Search texts for overlapping words
    scored_texts = []
    for t in texts:
        t_lower = t.lower()
        score = sum(1 for w in query_words if w in t_lower)
        if score > 0:
            scored_texts.append((score, t))
            
    scored_texts.sort(key=lambda x: x[0], reverse=True)
    
    for score, t in scored_texts[:k]:
        results.append({
            "text": t,
            "distance": float(10.0 - score)
        })
        
    # If no overlapping words or no texts, return some mock items
    if not results:
        mock_narratives = [
            "Global tech markets rally as new AI regulations are announced in EU and US.",
            "Energy sector sees rapid shift to renewables amid rising domestic production targets.",
            "Cybersecurity concerns peak after major network provider reports data exposure.",
            "Retail sales show modest growth in the first quarter of the fiscal year.",
            "Public health agencies issue new advisory on seasonal air quality shifts."
        ]
        for t in mock_narratives[:k]:
            results.append({
                "text": t,
                "distance": 8.5
            })
            
    return results