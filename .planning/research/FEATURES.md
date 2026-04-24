# Features Research — InferaNews Backend

## Table Stakes (Must Have)

Features users/admins expect from a news platform backend:

| Feature | Complexity | Notes |
|---------|-----------|-------|
| Article CRUD endpoints | Low | Standard REST operations |
| Pagination on article list | Low | Offset or cursor-based |
| Article search (keyword) | Low | MongoDB text index |
| Category filtering | Low | Query parameter on GET /articles |
| Admin authentication (JWT) | Medium | Login, token refresh, logout |
| Input validation | Low | Joi/Zod on all endpoints |
| Error handling (centralized) | Low | Consistent error response format |
| CORS configuration | Low | Allow frontend origin |
| API versioning (/api/v1/) | Low | Future-proofing |
| Health check endpoint | Low | GET /health for monitoring |
| Swagger/OpenAPI docs | Medium | Essential for frontend dev |
| ML service proxy endpoints | Medium | classify, summarize, similar |
| Auto-processing on publish | Medium | Orchestrate ML calls on article creation |

## Differentiators (Competitive Advantage)

| Feature | Complexity | Notes |
|---------|-----------|-------|
| Bulk article operations | Medium | Import/export multiple articles |
| Article status (draft/published) | Low | Content workflow |
| Sorting (by date, category, popularity) | Low | Query parameters |
| Rate limiting per endpoint | Low | Prevent abuse |
| Request logging with correlation IDs | Medium | Debugging and monitoring |
| Circuit breaker for ML service | Medium | Graceful degradation if ML is down |
| Article scheduling | Medium | Publish at future time |

## Anti-Features (Do NOT Build in v1)

| Feature | Why Not |
|---------|---------|
| User accounts/profiles | Scope says anonymous access |
| Comments/reactions | Not in v1 requirements |
| WebSocket real-time updates | Unnecessary complexity |
| File/image upload | Out of scope for backend |
| Email notifications | No user accounts |
| Social sharing | Frontend concern |
| Full-text search with Elasticsearch | MongoDB text index is sufficient |
| Caching layer (Redis) | Premature optimization |

## Dependencies Between Features

```
Admin Auth ──→ Admin Article CRUD ──→ Auto ML Processing
                                         │
MongoDB Setup ──→ Article Model ──→ Article Endpoints
                                         │
ML Service Client ──→ Proxy Endpoints ──→ Auto Processing
                                         │
Input Validation ──→ All Endpoints
                                         │
Error Handling ──→ All Endpoints
                                         │
Swagger Docs ──→ All Endpoints (annotated)
```
