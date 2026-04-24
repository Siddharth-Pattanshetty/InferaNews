# Research Summary — InferaNews Backend

## Stack Decision

**Node.js 20 LTS + Express 4.x + MongoDB (Mongoose) + JWT**

Core packages: express, mongoose, jsonwebtoken, bcryptjs, dotenv, cors, helmet, express-rate-limit, axios, swagger-jsdoc + swagger-ui-express, joi/zod, morgan/pino.

Dev tools: nodemon, jest/vitest, supertest, eslint + prettier.

**Not recommended for v1:** TypeScript, NestJS, Passport.js, GraphQL, Redis caching.

## Table Stakes Features

1. Article CRUD with admin-only write access
2. Pagination on article listings
3. Keyword search via MongoDB text index
4. Category filtering
5. Admin JWT authentication
6. Input validation on all endpoints
7. Centralized error handling
8. CORS for frontend access
9. API versioning (/api/v1/)
10. Swagger/OpenAPI documentation
11. ML service proxy endpoints (classify, summarize, similar)
12. Auto-processing pipeline on article publish

## Architecture

Layered MVC with service layer. Four services: ArticleService, MLService, AuthService, ProcessingService. ML communication via synchronous HTTP (axios). Recommended build order: setup → DB → models → auth → CRUD → ML integration → auto-processing → docs → polish.

## Top Pitfalls to Avoid

1. **JWT secret hardcoding** → Use .env with strong random secrets
2. **ML service coupling** → Graceful degradation when ML is down
3. **No input validation** → NoSQL injection risk; use Joi/Zod
4. **No pagination** → Memory explosion with large article sets
5. **Slow ML processing** → Set timeouts; don't block publish indefinitely
6. **Existing bug** → Fix model file name mismatch in classifier.py before integration
