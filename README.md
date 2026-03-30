# ShearGate (Block Shear Analyzer)

ShearGate is a full-stack engineering web app for parsing structural connection inputs and evaluating block shear checks against BS 5950 context. The project combines a FastAPI backend, PostgreSQL persistence, JWT auth with Google sign-in, and a React + TypeScript frontend.

This README is intentionally detailed and designed to be the single source of truth for setup, architecture, API behavior, environment variables, and deployment.

## 1. What This Project Does

Core capabilities:

1. Authenticate users with Google OAuth credential flow.
2. Parse/normalize connection input from free text (and currently mocked file extraction path).
3. Run backend block shear analysis.
4. Persist sessions and messages per user.
5. Generate AI explanations for both calculation results and code references.
6. Let users browse BS5950 clauses/tables in the frontend.

## 2. Current Tech Stack

Backend:

1. Python 3.11+
2. FastAPI
3. SQLAlchemy async ORM + asyncpg
4. Alembic migrations
5. Pydantic v2 + pydantic-settings
6. JWT via python-jose
7. Loguru logging
8. AI SDKs installed: OpenAI, Anthropic, Google Generative AI

Frontend:

1. React 18 + TypeScript
2. Vite
3. Tailwind CSS
4. React Router
5. React Query
6. Axios
7. KaTeX via react-katex

## 3. Repository Layout

Top-level:

1. `app/` backend source
2. `ui/` frontend source
3. `migrations/` Alembic scripts
4. `requirements.txt` backend dependencies
5. `alembic.ini` migration config
6. `start.sh` local orchestration script
7. `docker-compose.yml` and `Dockerfile` optional container setup
8. `.env.example` backend env template
9. `ui/.env.example` frontend env template

Backend noteworthy modules:

1. `app/main.py` FastAPI app construction, CORS, logging middleware, startup hooks
2. `app/core/config.py` typed settings and env parsing
3. `app/core/db.py` engine/session/base/table bootstrap helper
4. `app/models/domain.py` SQLAlchemy entities (`users`, `sessions`, `messages`)
5. `app/routers/auth.py` Google auth + token lifecycle
6. `app/routers/extract.py` extraction + calculation + optional persistence
7. `app/routers/explain.py` AI explanation endpoints
8. `app/routers/sessions.py` CRUD for user sessions
9. `app/services/ai_provider.py` AI provider switch dispatcher
10. `app/services/anthropic_ai.py` Anthropic implementation
11. `app/services/openai_ai.py` OpenAI implementation
12. `app/services/gemini.py` Gemini implementation
13. `app/services/claude.py` legacy Anthropic-compatible module for older routes

Frontend noteworthy modules:

1. `ui/src/api/client.ts` API client, auth token attach, refresh interceptor
2. `ui/src/contexts/AuthContext.tsx` auth state + login/logout flows
3. `ui/src/pages/AnalyzePage.tsx` input workflow
4. `ui/src/pages/ResultsPage.tsx` result rendering + AI narrative + references
5. `ui/src/pages/ClausesPage.tsx` clause/table browser
6. `ui/src/data/bs5950.ts` in-app clause/table source data
7. `ui/src/utils/parseDescription.tsx` reference + math parsing and rendering
8. `ui/src/utils/referenceIds.ts` clause/table reference normalization

## 4. Backend Runtime Behavior

Startup flow in `app/main.py`:

1. Configure Loguru logging.
2. Build FastAPI app metadata.
3. Apply CORS from settings.
4. Register request timing middleware.
5. Include active routers: `auth`, `extract`, `explain`, `sessions`.
6. On startup, ensure DB tables exist via `create_tables_if_not_exists()`.

Important note:

1. `parse` and `clauses` routers exist in code but are not currently included in `app/main.py`.

## 5. Database Model (Actual)

Tables defined in `app/models/domain.py`:

1. `users`
2. `sessions`
3. `messages`

Entity summary:

1. `users` has Google identity (`google_id`), profile metadata, and timestamps.
2. `sessions` belongs to a user and stores title + timestamps.
3. `messages` belongs to both session and user, and stores raw input, parsed payload, result JSON, pass flag, AI explanation.

Relationships:

1. `User` -> many `Session`
2. `User` -> many `Message`
3. `Session` -> many `Message`

## 6. Environment Variables (Backend)

Defined by `app/core/config.py`:

1. `DATABASE_URL` (required)
2. `JWT_SECRET` (required)
3. `ALGORITHM` (default `HS256`)
4. `ACCESS_TOKEN_EXPIRE_MINUTES` (default 10080)
5. `REFRESH_TOKEN_EXPIRE_MINUTES` (default 43200)
6. `GOOGLE_CLIENT_ID` (required)
7. `AI_PROVIDER` (default `anthropic`, allowed: `anthropic`, `openai`, `gemini`)
8. `OPENAI_API_KEY` (optional unless provider is `openai`)
9. `OPENAI_MODEL` (default `gpt-4o-mini`)
10. `GEMINI_API_KEY` (optional unless provider is `gemini`)
11. `GEMINI_MODEL` (default `gemini-2.0-flash`)
12. `ANTHROPIC_API_KEY` (optional unless provider is `anthropic`)
13. `ANTHROPIC_MODEL` (default `claude-3-5-haiku-20241022`)
14. `ENVIRONMENT` (default `development`)
15. `CORS_ORIGINS` (comma-separated string)
16. `CORS_ORIGIN_REGEX` (default ngrok pattern)

Template file:

1. Backend template in `.env.example`

Example backend `.env`:

```env
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/blockshear
JWT_SECRET=replace-with-long-random-secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
REFRESH_TOKEN_EXPIRE_MINUTES=43200

GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

AI_PROVIDER=anthropic

OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini

GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash

ANTHROPIC_API_KEY=your-anthropic-key
ANTHROPIC_MODEL=claude-3-5-haiku-20241022

ENVIRONMENT=development
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 7. Environment Variables (Frontend)

From `ui/.env.example`:

1. `VITE_API_URL`
2. `VITE_GOOGLE_CLIENT_ID`

Example frontend `.env`:

```env
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

## 8. AI Provider System

Selector:

1. `app/services/ai_provider.py` reads `settings.AI_PROVIDER` and dispatches to one of:
2. `app/services/anthropic_ai.py`
3. `app/services/openai_ai.py`
4. `app/services/gemini.py`

What is currently used by active API routes:

1. `extract` and `explain` routes call `app/services/ai_provider.py`

Provider behavior notes:

1. Anthropic implementation includes model fallback attempts for model-not-found errors.
2. Explanation prompts enforce cleaner output formatting and inline LaTeX guidance.
3. File extraction endpoint is currently placeholder/mock in backend (`/extract/file`).

## 9. API Endpoints (Active)

Base URL (local):

1. `http://localhost:8000`

Health:

1. `GET /`

Auth:

1. `POST /auth/google`
2. `POST /auth/refresh`
3. `GET /auth/me`
4. `POST /auth/logout`

Extraction:

1. `POST /extract/text`
2. `POST /extract/file`

Explain:

1. `POST /explain/result`
2. `POST /explain/reference`

Sessions:

1. `GET /sessions`
2. `POST /sessions`
3. `GET /sessions/{session_id}`
4. `PATCH /sessions/{session_id}`
5. `DELETE /sessions/{session_id}`

Legacy/not currently mounted in app:

1. `/parse/*` routes in `app/routers/parse.py`
2. `/clauses/*` route in `app/routers/clauses.py`

## 10. Frontend API Client Contracts

In `ui/src/api/client.ts`:

1. Access token attached from localStorage.
2. 401 interceptor attempts refresh with `refresh_token`.
3. On refresh failure, tokens are cleared and user redirected.

Mapped helper APIs:

1. `authApi`: loginWithGoogle/getMe/logout
2. `extractApi`: extractText/extractFile
3. `explainApi`: explainResult/explainReference
4. `sessionApi`: list/get/create/update/delete

## 11. Local Development Setup (No Docker)

Prerequisites:

1. Python 3.11+
2. Node 18+
3. npm
4. PostgreSQL

Steps:

1. Create Python virtual environment.
2. Install backend deps.
3. Configure backend env.
4. Run migrations.
5. Install frontend deps.
6. Start backend and frontend.

Commands (manual):

```bash
# from repo root
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env

alembic upgrade head

# backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

```bash
# frontend
cd ui
npm install
cp .env.example .env
npm run dev
```

Helpful frontend commands:

1. `npm run dev`
2. `npm run type-check`
3. `npm run build`
4. `npm run preview`

## 12. Local Development via start.sh

`start.sh` does the following:

1. Ensures Python and virtualenv.
2. Installs requirements if needed.
3. Loads `.env`.
4. Runs `alembic upgrade head` if Alembic config exists.
5. Installs UI dependencies if needed.
6. Runs frontend in background.
7. Runs backend with uvicorn.

Run:

```bash
chmod +x start.sh
./start.sh
```

## 13. Migrations and Schema Management

Alembic:

1. Config file: `alembic.ini`
2. Environment: `migrations/env.py`
3. Metadata source: `app.core.db.Base.metadata`

Create migration:

```bash
alembic revision --autogenerate -m "describe change"
```

Apply migration:

```bash
alembic upgrade head
```

Important:

1. App startup also calls `create_tables_if_not_exists()`.
2. Prefer migrations for controlled schema changes in production.

## 14. Deployment (Render, No Docker)

Create a Render Web Service:

1. Environment: Python
2. Root: repo root
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Optional pre-deploy command: `alembic upgrade head`

Required env on Render:

1. `DATABASE_URL`
2. `JWT_SECRET`
3. `GOOGLE_CLIENT_ID`
4. `AI_PROVIDER`
5. provider API key/model pair for selected provider
6. `CORS_ORIGINS`
7. `ENVIRONMENT=production`

## 15. Docker Files (Optional)

Docker artifacts included:

1. `Dockerfile` for backend image
2. `docker-compose.yml` for local multi-service setup

These are optional and not required for local no-Docker or Render no-Docker workflows.

## 16. Known Gaps / Current Implementation Notes

1. `extract/file` currently returns mocked parsed params and uses analysis on that mock payload.
2. Some legacy routes/modules exist (`parse`, `clauses`, `claude.py`) and may be kept for compatibility or experimentation.
3. README and code should be kept aligned whenever routes/providers are switched.

## 17. Troubleshooting Guide

Auth fails:

1. Verify `GOOGLE_CLIENT_ID` backend value and frontend `VITE_GOOGLE_CLIENT_ID` match expected OAuth app.
2. Ensure allowed origins/redirect setup in Google Cloud console.

401 loops on frontend:

1. Check `/auth/refresh` success path.
2. Verify `JWT_SECRET` consistency and token expiry settings.

CORS blocked:

1. Add frontend origin to `CORS_ORIGINS`.
2. Keep comma-separated values without spaces or trim them.

Anthropic model not found:

1. Use `ANTHROPIC_MODEL=claude-3-5-haiku-20241022`.
2. Service includes fallback attempts for compatible models.

Database migration errors:

1. Confirm `DATABASE_URL` has `postgresql+asyncpg://` scheme.
2. Run `alembic upgrade head` manually and inspect output.

Frontend build/type issues:

1. Run `cd ui && npm run type-check` first.
2. Then run `npm run build`.

## 18. Security Notes

1. Never commit real `.env` secrets.
2. Rotate exposed keys immediately if leaked.
3. Keep JWT secret long/random.
4. Limit CORS to known frontend domains in production.

## 19. Contribution Workflow

Recommended dev flow:

1. Create feature branch.
2. Implement changes.
3. Run backend sanity + frontend type-check.
4. Update docs if behavior/config changes.
5. Open PR with screenshots/log snippets where applicable.

## 20. Quick Start Cheatsheet

Backend quick start:

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

Frontend quick start:

```bash
cd ui
npm install
copy .env.example .env
npm run dev
```

Done. You should now have:

1. Backend on `http://localhost:8000`
2. Frontend on `http://localhost:5173` (or Vite-selected port)
3. Swagger docs at `http://localhost:8000/docs`
