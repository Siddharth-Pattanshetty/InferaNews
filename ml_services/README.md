# 🧠 AI News ML Service

This project implements a **modular Machine Learning microservice** for news processing, including:

* 🏷️ News Classification (SVM)
* 🔍 Similarity Search (FAISS with Voronoi/IVF)
* 📝 Text Summarization (Transformer-based model)

The service is built using **FastAPI** and is designed to integrate with frontend or backend systems.

---

# 🚀 Features

## 1️⃣ News Classification

* Model: Support Vector Machine (SVM)
* Input: Headline + Short Description
* Output: Predicted news category
* Technique: TF-IDF + LinearSVC

---

## 2️⃣ Similarity Search

* Library: FAISS
* Technique: IVF Index (Voronoi Cells)
* Embedding Model: Sentence Transformers (MiniLM)
* Functionality:

  * Converts news text into vector embeddings
  * Finds top-K similar articles efficiently

---

## 3️⃣ Text Summarization

* Model: Transformer-based (BART / DistilBART)
* Approach: Abstractive summarization
* Handles long text using chunking

---

# 📁 Project Structure

```
ml_services/
│
├── app/
│   ├── main.py
│   │
│   ├── services/
│   │   ├── classifier.py
│   │   ├── similarity.py
│   │   ├── summarizer.py
│   │
│   ├── models/   # (Not included in repo)
│
├── requirements.txt
├── .gitignore
└── README.md
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```
git clone https://github.com/Siddharth-Pattanshetty/InferaNews.git
cd ml_services
```

---

## 2️⃣ Install Dependencies

```
pip install -r requirements.txt
```

---

## 3️⃣ Add Model Files

Download trained models from Google Drive:

👉 **[Download Models]**
"https://drive.google.com/file/d/1Ut3z8g8TisC29Ji3ikdtjV7wl9UH0zPg/view?usp=sharing"

Extract and place inside:

```
app/models/
```

Required files:

* `svm_model.pkl`
* `vectorizer.pkl`
* `faiss.index`
* `texts.pkl`

---

## ▶️ Run the Service

```
uvicorn app.main:app --reload
```

---

## 🌐 API Documentation

Open in browser:

```
http://127.0.0.1:8000/docs
```

---

# 📡 API Endpoints

## 🔹 1. Classification

**POST /classify**

```
{
  "headline": "AI revolution",
  "short_description": "New AI tools released"
}
```

---

## 🔹 2. Summarization

**POST /summarize**

```
{
  "text": "Long news article..."
}
```

---

## 🔹 3. Similarity Search

**POST /similar**

```
{
  "headline": "Stock market crash",
  "short_description": "Investors panic",
  "k": 5
}
```

---

# 🧠 Technical Highlights

* Multi-class classification with imbalanced dataset handling
* Efficient vector search using FAISS IVF (Voronoi partitioning)
* Transformer-based abstractive summarization
* Modular microservice architecture
* Clean separation of API and ML logic

---

# ⚠️ Notes

* Model files are excluded from GitHub due to large size
* Download them from the provided Google Drive link
* Ensure models are placed in `app/models/`

---



# 👨‍💻 Author

Developed as part of an AI-integrated web project.
