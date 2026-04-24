# Stack Research — InferaNews Backend

## Recommended Stack (2025)

### Runtime & Framework

| Component | Recommendation | Version | Confidence |
|-----------|---------------|---------|------------|
| Runtime | Node.js | 20 LTS | HIGH |
| Framework | Express.js | 4.x | HIGH |
| Language | JavaScript (ES2022+) | — | HIGH |
| Database | MongoDB + Mongoose | 7.x / 8.x | HIGH |
| Auth | JWT (jsonwebtoken) | — | HIGH |

### Core Dependencies

| Package | Purpose | Why |
|---------|---------|-----|
| `express` | Web framework | Industry standard, massive ecosystem |
| `mongoose` | MongoDB ODM | Schema validation, middleware hooks, query building |
| `jsonwebtoken` | JWT creation/verification | Stateless admin auth |
| `bcryptjs` | Password hashing | Secure credential storage |
| `dotenv` | Environment variables | Secret management |
| `cors` | Cross-origin support | Frontend on different origin |
| `helmet` | Security headers | Protection against common web vulnerabilities |
| `express-rate-limit` | Rate limiting | Prevent abuse/DDoS |
| `morgan` or `pino` | HTTP logging | Request/response logging |
| `swagger-jsdoc` + `swagger-ui-express` | API documentation | OpenAPI spec for frontend developer |
| `joi` or `zod` | Input validation | Request payload validation |
| `axios` or `node-fetch` | HTTP client | Communication with ML microservice |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| `nodemon` | Auto-restart during development |
| `jest` or `vitest` | Testing framework |
| `supertest` | HTTP endpoint testing |
| `eslint` + `prettier` | Code quality and formatting |

### What NOT to Use

| Avoid | Reason |
|-------|--------|
| TypeScript (for v1) | Adds complexity; can migrate later if needed |
| NestJS | Overkill for this scope; Express is sufficient |
| Passport.js | Over-engineered for admin-only JWT auth |
| GraphQL | REST is simpler and the frontend dev expects REST |
| Redis (for v1) | No caching requirement in v1 |

## Project Structure

```
backend/
├── src/
│   ├── config/          # DB connection, env vars, constants
│   ├── controllers/     # Route handlers
│   ├── middleware/       # Auth, validation, error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express route definitions
│   ├── services/        # Business logic + ML service client
│   └── utils/           # Helpers, response formatters
├── tests/               # Test files
├── .env.example         # Environment variable template
├── .gitignore
├── package.json
└── server.js            # Entry point
```
