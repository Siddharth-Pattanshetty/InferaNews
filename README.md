# 🧠 InferaNews – AI-Powered News Intelligence Platform

## 🚀 Overview

InferaNews is a full-stack AI-powered news platform that intelligently processes news articles by performing **classification, summarization, and similarity search**.

The system is designed using a modular architecture that integrates a **React frontend**, **backend API layer**, and a **FastAPI-based ML microservice**.

---

## ✨ Features

* 🏷️ Automated News Classification using Machine Learning (SVM)
* 📝 Real-time News Summarization using Transformer models (BART / DistilBART)
* 🔍 Semantic Similarity Search using FAISS (IVF / Voronoi indexing)
* ⚡ High-performance ML microservice using FastAPI
* 🌐 Interactive frontend built with React
* 🔗 Seamless integration between frontend, backend, and ML services

---

## 🧠 AI Capabilities

### 🔹 Text Classification

* Model: Support Vector Machine (SVM)
* Technique: TF-IDF + LinearSVC
* Handles multi-class news categorization

---

### 🔹 Abstractive Summarization

* Model: BART / DistilBART (Hugging Face)
* Generates concise summaries from long articles
* Handles long text using chunking

---

### 🔹 Semantic Similarity Search

* Embeddings: Sentence Transformers (MiniLM)
* Vector Database: FAISS
* Technique: IVF Index (Voronoi partitioning)
* Efficient top-K nearest neighbor retrieval

---

## 🏗️ Architecture

```text
React (Frontend)
        ↓
Backend API (Node.js / Spring Boot)
        ↓
ML Microservice (FastAPI)
        ↓
ML Models (SVM + FAISS + Transformer)
```

---

## 🧪 ML Models Used

* Support Vector Machine (SVM)
* TF-IDF Vectorizer
* Sentence Transformers (MiniLM)
* FAISS (IVF Index for similarity search)
* BART / DistilBART (Summarization)

---

## 📊 Dataset

* News Category Dataset (Kaggle)

---

## ⚙️ Tech Stack

**Frontend:** React, Tailwind CSS
**Backend:** Node.js / Spring Boot
**ML Service:** Python, FastAPI
**ML Libraries:** Scikit-learn, FAISS, Hugging Face Transformers
**Database:** MongoDB

---

## 📡 API Endpoints

* `POST /classify` → Predict news category
* `POST /summarize` → Generate summary of article
* `POST /similar` → Retrieve similar news articles

---


## 🔥 Key Highlights

* Multi-class classification using real-world dataset
* Efficient similarity search using FAISS IVF (Voronoi cells)
* Transformer-based summarization without training from scratch
* Modular microservice architecture
* Clean separation of frontend, backend, and ML layers


---

## 👨‍💻 Author

Developed as part of an AI-integrated full-stack project.
