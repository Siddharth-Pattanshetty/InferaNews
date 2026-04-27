# InferaNews Backend API Documentation

**Base URL:** `http://localhost:5000/api/v1`

---

## 1. Authentication

### `POST /auth/login`
Authenticates an admin user and returns a JSON Web Token (JWT).
- **Access:** Public
- **Body:**
  ```json
  {
    "username": "admin",
    "password": "yourpassword"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

## 2. Articles (Public)

### `GET /articles`
Retrieves a paginated list of articles, ordered by newest first.
- **Access:** Public
- **Query Parameters:**
  - `page` (optional) - Page number (default: 1)
  - `limit` (optional) - Articles per page (default: 10, max: 50)
  - `category` (optional) - Filter by category enum (e.g., `technology`)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "60d5ecb8b392d70015b6c2a1",
        "title": "Example Article",
        "description": "Short description.",
        "content": "Full article text...",
        "category": "technology",
        "summary": "AI summary text.",
        "similarArticles": [],
        "createdAt": "2026-04-26T12:00:00.000Z",
        "updatedAt": "2026-04-26T12:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 42,
      "page": 1,
      "pages": 5,
      "limit": 10
    }
  }
  ```

### `GET /articles/:id`
Retrieves a single article by its MongoDB ID.
- **Access:** Public
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "60d5ecb8b392d70015b6c2a1",
      "title": "Example Article"
      // ...other fields
    }
  }
  ```

### `GET /articles/search`
Searches articles by keyword using text relevance.
- **Access:** Public
- **Query Parameters:**
  - `q` (required) - Search term
  - `page` (optional)
  - `limit` (optional)
- **Note:** If `q` is empty, acts identically to `GET /articles`.

---

## 3. Articles (Protected)

*All routes in this section require the `Authorization: Bearer <token>` header.*

### `POST /articles`
Creates a new article. Automatically triggers the ML microservice to populate the `category` and `summary` fields before saving.
- **Access:** Private (Admin)
- **Body:**
  ```json
  {
    "title": "New Article",
    "description": "Short description",
    "content": "Full text body here."
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "new_id",
      "title": "New Article",
      "category": "technology", 
      "summary": "Auto-generated summary from ML service."
      // ...
    }
  }
  ```

### `PUT /articles/:id`
Updates an existing article.
- **Access:** Private (Admin)
- **Body:** Any article fields to update.

### `DELETE /articles/:id`
Permanently deletes an article from the database.
- **Access:** Private (Admin)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Article deleted"
  }
  ```

---

## 4. ML Service Proxies

*All routes in this section require the `Authorization: Bearer <token>` header.*

### `POST /ml/classify`
Directly calls the ML classifier.
- **Body:**
  ```json
  {
    "headline": "Tech stocks rally",
    "short_description": "Market sees surge in tech."
  }
  ```
- **Response:** `{ "success": true, "category": "business" }`

### `POST /ml/summarize`
Directly calls the ML summarizer.
- **Body:** `{ "text": "Long article content..." }`
- **Response:** `{ "success": true, "summary": "Short summary." }`

### `POST /ml/similar`
Directly queries the FAISS index for similar articles.
- **Body:**
  ```json
  {
    "headline": "Tech stocks",
    "short_description": "Market rally",
    "k": 5
  }
  ```
- **Response:** `{ "success": true, "results": [...] }`
