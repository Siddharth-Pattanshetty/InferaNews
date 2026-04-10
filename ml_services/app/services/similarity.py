import faiss
import pickle
from app.config import MODEL_PATH
from sentence_transformers import SentenceTransformer
import numpy as np

index = faiss.read_index(f"{MODEL_PATH}faiss.index")

texts=pickle.load(open(f"{MODEL_PATH}texts.pkl", "rb"))
model=SentenceTransformer("all-MiniLM-L6-v2")
index.nprobe = 10

def search_similar(headline: str, short_description: str, k: int = 5):
    query = headline + " " + short_description

    q_emb = model.encode([query])
    q_emb = np.array(q_emb).astype('float32')

    distances, indices = index.search(q_emb, k)

    results = []
    for i, idx in enumerate(indices[0]):
        results.append({
            "text": texts[idx],
            "distance": float(distances[0][i])
        })

    return results