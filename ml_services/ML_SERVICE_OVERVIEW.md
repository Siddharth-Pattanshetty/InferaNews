# 🧠 AI News Processing Service

---

# 🎯 Overview

This project implements a **modular Machine Learning microservice** for processing and analyzing news data.

It provides capabilities for:

* 🏷️ News Classification
* 🔍 Semantic Similarity Search
* 📝 Text Summarization

The system is built using **FastAPI** and follows a **service-based architecture**, enabling seamless integration with frontend or backend applications.

---

# 🚀 Core Features

## 1️⃣ News Classification

* **Model:** Logistic Regression
* **Technique:** TF-IDF Vectorization
* **Input:** Headline + Short Description
* **Output:** Predicted News Category

This component performs **multi-class classification** using optimized feature engineering and class balancing techniques.

---

## 2️⃣ Similarity Search

* **Library:** FAISS
* **Technique:** IVF Index (Voronoi Partitioning)
* **Embedding Model:** Sentence Transformers (MiniLM)

### Functionality:

* Converts text into dense vector embeddings
* Retrieves top-K semantically similar articles
* Enables fast and scalable search

---

## 3️⃣ Text Summarization

* **Model:** Transformer-based (BART)
* **Approach:** Abstractive Summarization

### Features:

* Handles long text via chunking
* Generates coherent summaries
* Suitable for real-world news articles

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
│   ├── models/   # (excluded from repository)
│
├── requirements.txt
├── .gitignore
└── ML_SERVICE_OVERVIEW.md
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

Download trained model files and place them inside:
"https://drive.google.com/file/d/1OV8y86lv6LnHNwJpTMZpEEV2mVORXzw4/view?usp=sharing"

```
app/models/
```

### Required Files:

* `logistic_regression_model.pkl`
* `tfidf_vectorizer.pkl`
* `faiss.index`
* `texts.pkl`

---

# ▶️ Run the Service

```
uvicorn app.main:app --reload
```

---

# 🌐 API Documentation

Access interactive API docs:

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

* Multi-class classification using TF-IDF + Logistic Regression
* Efficient vector similarity search with FAISS
* Transformer-based abstractive summarization
* Modular service-oriented architecture
* Clean separation of ML logic and API layer

---

# ⚠️ Notes

* Model files are excluded due to size constraints
* Ensure all required files are placed in `app/models/`
* The service is optimized for performance and scalability

---

# 👨‍💻 Author

Developed as part of an AI-integrated system for intelligent news processing.
