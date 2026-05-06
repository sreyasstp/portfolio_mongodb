# Portfolio + Magento Knowledge Platform

Production-grade portfolio and learning platform for Magento 2 expertise.

**Stack:** Laravel 11 · Next.js 14 · GraphQL (Lighthouse) · MySQL 8 · Redis · Docker

---

## Architecture

```
Portfolio/
├── backend/          # Laravel 11 (GraphQL API)
│   ├── app/
│   │   ├── DTOs/          # Data Transfer Objects
│   │   ├── GraphQL/       # Mutations + Queries
│   │   ├── Models/        # Eloquent models
│   │   ├── Repositories/  # Data access layer
│   │   ├── Services/      # Business logic
│   │   └── Jobs/          # Queue jobs
│   ├── database/
│   │   └── migrations/    # 12 normalized tables
│   └── graphql/
│       └── schema.graphql # Full GraphQL schema
│
├── frontend/         # Next.js 14 (App Router)
│   ├── app/          # Pages + layouts
│   ├── components/   # UI components
│   └── lib/
│       ├── apollo/   # Apollo Client setup
│       ├── graphql/  # Queries + mutations
│       └── store/    # Zustand auth store
│
└── docker/           # Docker config
    ├── nginx/
    ├── php/
    └── mysql/
```

---

## Quick Start (Docker)

```bash
# 1. Clone and enter
cd Portfolio

# 2. Configure backend
cp backend/.env.example backend/.env

# 3. Start all services
docker-compose up -d

# 4. First-time setup
docker exec portfolio_app composer install
docker exec portfolio_app php artisan key:generate
docker exec portfolio_app php artisan jwt:secret
docker exec portfolio_app php artisan migrate --seed
docker exec portfolio_app php artisan storage:link

# 5. Frontend
cd frontend && cp .env.local.example .env.local
# Edit .env.local with your values
npm install && npm run dev
```

Access:
- Frontend: http://localhost:3000
- GraphQL API: http://localhost:8000/graphql
- GraphQL Playground: http://localhost:8000/graphql-playground

---

## Manual Setup (No Docker)

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret

# Configure .env: DB_*, JWT_*, GOOGLE_*
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Set NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql
npm run dev
```

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description |
|---|---|
| `DB_*` | MySQL connection |
| `JWT_SECRET` | Run `php artisan jwt:secret` |
| `GOOGLE_CLIENT_ID` | Google OAuth app ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret |
| `AWS_*` | S3 config (optional, falls back to local) |
| `QUEUE_CONNECTION` | `redis` (prod) or `sync` (dev) |

### Frontend (`frontend/.env.local`)
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_GRAPHQL_URL` | Laravel GraphQL endpoint |
| `NEXT_PUBLIC_API_URL` | Laravel base URL |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Same Google Client ID |

---

## GraphQL API

All queries/mutations available at `POST /graphql`.

**Public queries:**
```graphql
# Get all published blogs
{ blogs(first: 10, status: PUBLISHED) { data { title slug } } }

# Get extensions
{ extensions(first: 12, type: EXTENSION) { data { title slug download_count } } }

# Get certifications
{ certifications { title issuer study_guide } }
```

**Auth mutations:**
```graphql
mutation {
  login(input: { email: "admin@sreyas.dev", password: "password" }) {
    access_token
    user { name role }
  }
}
```

---

## Database Schema

12 normalized tables with soft deletes, full-text search, and strategic indexing:

```
users ─── profiles
       ├── blogs ─── categories
       ├── projects ─── skills (pivot)
       ├── extensions
       ├── learning_resources
       ├── downloads (polymorphic)
       ├── bookmarks (polymorphic)
       ├── comments (polymorphic, self-referential)
       └── certifications
```

---

## Key Features

- **JWT Auth** with Google OAuth (stateless, mobile-ready)
- **GraphQL** with depth/complexity limits, pagination, search
- **File Downloads** with access control (free/registered/premium)
- **Download tracking** via Redis queue jobs (async, non-blocking)
- **Bookmarks** system (polymorphic — works on blogs, extensions, resources)
- **Blog CMS** with Markdown, tags, SEO fields, reading time
- **Dark futuristic UI** — glassmorphism, brand glow (`#f80f01`), Framer Motion
- **S3-ready** storage (falls back to local)
- **Docker** production setup with queue worker

---

## Adding Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:8000/api/auth/google/callback`
4. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `backend/.env`
