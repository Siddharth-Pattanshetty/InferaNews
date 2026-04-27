# Architecture Research — InferaNews Backend

## Recommended Pattern

**Layered MVC with Service Layer** — Simple enough for this scope, structured enough to maintain.

```
┌────────────────────────────────────┐
│  Routes Layer                      │
│  Express route definitions         │
├────────────────────────────────────┤
│  Controller Layer                  │
│  Request parsing, response forming │
├────────────────────────────────────┤
│  Service Layer                     │
│  Business logic, ML orchestration  │
├────────────────────────────────────┤
│  Model Layer (Mongoose)            │
│  Data access, schema validation    │
├────────────────────────────────────┤
│  External Services                 │
│  ML microservice HTTP client       │
└────────────────────────────────────┘
```

## Component Boundaries

### 1. API Gateway / Routes
- Defines all endpoints
- Applies middleware (auth, validation)
- Delegates to controllers

### 2. Controllers
- Parse request parameters/body
- Call service functions
- Format and return responses
- Handle HTTP-specific concerns (status codes, headers)

### 3. Services
- **ArticleService** — CRUD operations, pagination, search
- **MLService** — HTTP client for FastAPI ML microservice
- **AuthService** — JWT token generation, verification, admin login
- **ProcessingService** — Orchestrates ML calls on article creation (classify → summarize → similar)

### 4. Models (Mongoose)
- **Article** — title, description, content, category, summary, similarArticles, createdAt, updatedAt
- **Admin** — username, password (hashed)

### 5. Middleware
- **authMiddleware** — JWT verification for admin routes
- **errorHandler** — Centralized error response formatting
- **validateRequest** — Joi/Zod schema validation
- **rateLimiter** — Request rate limiting

## Data Flow

### User reads articles:
```
Frontend → GET /api/v1/articles → Controller → ArticleService → MongoDB → Response
```

### User analyzes custom text:
```
Frontend → POST /api/v1/classify → Controller → MLService → FastAPI ML → Response
```

### Admin publishes article:
```
Frontend → POST /api/v1/admin/articles (JWT) → Controller → ProcessingService
  → MLService.classify() → category
  → MLService.summarize() → summary
  → MLService.similar() → relatedArticles
  → ArticleService.create({...enrichedData}) → MongoDB → Response
```

## ML Service Communication

- **Protocol:** HTTP REST (synchronous)
- **Client:** axios with configurable base URL
- **Error handling:** Circuit breaker pattern recommended (opossum library)
- **Timeout:** Set reasonable timeouts (30s for summarization, 10s for classify/similar)
- **ML service URL:** Environment variable `ML_SERVICE_URL` (default: `http://localhost:8000`)

## Build Order (Dependency-driven)

1. **Project setup** → Express app, config, directory structure
2. **Database connection** → MongoDB/Mongoose setup
3. **Models** → Article + Admin schemas
4. **Auth** → JWT middleware, admin login
5. **Article CRUD** → Basic endpoints
6. **ML integration** → HTTP client for FastAPI service
7. **Auto-processing** → Orchestrate ML on publish
8. **API docs** → Swagger annotations
9. **Polish** → Error handling, validation, rate limiting, testing
