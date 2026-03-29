# Block Shear Analyzer - Full Stack Evaluation Tool

A comprehensive web application designed to evaluate and verify block shear capacities in steel connections precisely according to the stipulations of **BS 5950-1:2000**. The robust system features a React-vite frontend, a FastAPI asynchronous backend with strictly maintained typed interfaces, and Anthropic's Claude AI for interpreting textual or image-based structural engineering question payloads.

## 🚀 Tech Stack

### Frontend

- **React.js & Vite** - Lightning-fast execution with Hot Module Replacement (HMR).
- **TypeScript** - Enforcing robust type safety across calculation data models.
- **Tailwind CSS** - Modern, utility-first UI styling.

### Backend

- **FastAPI** - High-performance asynchronous Python web framework.
- **PostgreSQL & SQLAlchemy (asyncio)** - Pure relational, scalable datastore handling user sessions and authentication alongside Alembic for migrations.
- **Pydantic** - Strict schema definitions for robust structural calculation input-validation.

### Intelligence

- **Claude AI (Anthropic)** - Processes natural language queries and diagram images to extract specific engineering parameters like bolt types, forces, and spatial geometries without strictly rigid form inputs.
- **BS 5950-1:2000 Integration** - A dynamic repository cross-referencing individual step calculations directly to normative clauses like `Clause 6.2.4` and spacing tables (`T.30`, `T.34`).

---

## 📋 Features

### ✅ Theoretical Core & BS 5950 Compliance

The calculation engine strictly respects block shear mechanics as per British Standards:

- **Mode 1 (Shear Yielding + Tension Rupture):** `P_{bs1} = 0.6 \cdot p_y \cdot A_v + p_y \cdot A_t`
- **Mode 2 (Shear Rupture + Tension Rupture):** `P_{bs2} = f_u \cdot A_v + 0.5 \cdot f_u \cdot A_{tn}`
- **Edge Distances:** Lookups for min/max edge definitions against table `T.30` and `T.31`.
- **Bolt Gradings:** Shear and bearing derivations via `T.34` for normal 4.6 and 8.8 grade setups.
- **Material Specs:** Integrated property definitions for typical S235, S275, and S355 steels.

### ✅ Authentication & Lifecycle

- Stateless JWT token-based robust security.
- Encrypted hashed passwords.
- Structured session persistence. Users can view historic calculation summaries tracking their utilized ratios and margins of safety.

### ✅ AI-Powered Parsing

- **Text Queries:** Provide paragraph descriptions of connections (e.g., "A double angle with 4 M20 8.8 bolts..."). The AI translates this to a typed `ConnectionInputs` object.
- **Image Intelligence:** OCR diagram detection to bridge conventional assignment handouts straight to computations.

---

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.11+
- Node.js & npm (or Bun/Yarn)
- PostgreSQL 14+
- Anthropic API Key

### 1. Database Setup (PostgreSQL)

```bash
psql -U postgres
CREATE DATABASE blockshear;
\q
```

### 2. Environment Configuration

Copy the example `.env` file to `.env`:

```bash
cp .env.example .env
```

**Required `.env` variables:**

```env
# Database Configuration
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/blockshear

# Security (Generate via: openssl rand -hex 32)
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120

# AI Parsing
ANTHROPIC_API_KEY=your_anthropic_key_here

# Internal Config
CORS_ORIGINS=http://localhost:5173
```

### 3. Application Startup

A unified startup bash script is provided for UNIX/POSIX-like environments (Linux, macOS, Git Bash on Windows):

```bash
chmod +x start.sh
./start.sh
```

This orchestrated script will automatically:

1. Detect your Python version
2. Verify existing virtual environments
3. Validate and sync Backend `requirements.txt` via pip
4. Invoke Alembic for iterative PostgreSQL datastore schema migrations
5. Boot up the Vite frontend in a background loop (`http://localhost:5173`)
6. Execute the Uvicorn FastAPI backend visibly (`http://localhost:8000`)

---

## 📚 Core Routing Mapping

The API encapsulates several distinct boundaries supporting the UI. All endpoints trace off `http://localhost:8000`.

- `POST /auth/login`, `POST /auth/signup` - Maps to frontend `authFetch().` Returns JWT contexts.
- `POST /calculate` - Directly submits standardized JSON typed forms against the `BS5950/block_shear.py` derivation engine.
- `POST /parse/text|image` - Interfaces Anthropic prompts. Returns inferred JSON shapes matching `ConnectionInputs`.
- `GET /clauses/T.{num}` - Dynamically renders BS 5950 engineering table contents straight to interactive React `ResultsPage.tsx` overlay components.

---

## 🔧 File Structure Hierarchy

```text
blockshear/
├── .env                       # Secrets and Environment Variables
├── docker-compose.yml         # Container Orchestration
├── requirements.txt           # Python Dependency Maps
├── start.sh                   # Main initialization pipeline
├── app/                       # FastAPI Backend Ecosystem
│   ├── config.py              # Pydantic Settings Validations
│   ├── db.py                  # PostgreSQL async engine definition
│   ├── main.py                # ASGI Route and App Integrator
│   ├── models/                # SQLAlchemy Entity Relational mappings
│   ├── routers/               # Isolated domain-specific logic handles (Auth, Parse)
│   ├── schemas/               # Validations (Connection Inputs, Calculation Steps)
│   └── services/              # Sub-domains
│       └── bs5950/            # Distinct mechanical evaluation logic engines (.py)
└── ui/                        # React + Vite Client
    ├── index.html             # Entry template
    ├── package.json           # Node Packages
    ├── vite.config.ts         # Fast-bundler configurations
    └── src/
        ├── api/               # Abstracted async logic fetching and error parsing
        ├── components/        # Isolated modular fragments (Navbar, Context Modals)
        ├── contexts/          # React Auth Providers & Access Controls
        ├── data/              # Default Fallback Models
        └── pages/             # Routing Component Tree Views
```

---

## 🎯 Core Features Explained

### Block Shear Calculator

Located in `app/services/calculator.py`

**BS 5950 Clause 6.2.4 Implementation:**

```python
# Mode 1: Shear yielding + Tension rupture
Pbs1 = 0.6 × py × Av + py × At

# Mode 2: Shear rupture + Tension rupture
Pbs2 = fu × Av + 0.5 × fu × Atn

# Design capacity
Pbs = min(Pbs1, Pbs2)
```

**Material Properties:**

- S235: py=235 N/mm², fu=360 N/mm²
- S275: py=275 N/mm², fu=430 N/mm²
- S355: py=355 N/mm², fu=510 N/mm²

**Bolt Grades:**

- 4.6: ps=160 N/mm², pt=195 N/mm²
- 8.8: ps=375 N/mm², pt=450 N/mm²

### AI Question Parser

Located in `app/services/ai_parser.py`

**Capabilities:**

- Extract bolt specifications (grade, diameter, count)
- Identify material properties
- Parse geometric dimensions
- Handle both text and image inputs
- Fill missing values with sensible defaults

**Example Input:**

```
"4 M20 Grade 8.8 bolts, S275 10mm plate,
pitch 70mm, edge 50mm, gauge 60mm, load 320kN"
```

**Extracted Output:**

```json
{
  "bolt_grade": "8.8",
  "bolt_diameter": 20,
  "number_of_bolts": 4,
  "plate_material": "S275",
  "plate_thickness": 10,
  "pitch": 70,
  "edge_distance": 50,
  "gauge": 60,
  "applied_load": 320
}
```

---

## 🔐 Security

### Authentication Flow

1. User registers with email + password
2. Password is hashed with bcrypt
3. User logs in with credentials
4. Server returns JWT access token
5. Client sends token in `Authorization: Bearer <token>` header
6. Server validates token and returns user data

### JWT Token Structure

```json
{
  "sub": "user@email.com",
  "exp": 1234567890
}
```

**Token expires after:** 30 minutes (configurable)

---

## 🚢 Deployment

### Option 1: Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set DATABASE_URL=postgresql://...
railway variables set ANTHROPIC_API_KEY=sk-...
railway variables set SECRET_KEY=$(openssl rand -hex 32)

# Deploy
railway up
```

### Option 2: Render

1. Connect GitHub repo
2. Add environment variables in dashboard
3. Deploy automatically on push

### Option 3: Docker

```bash
# Build image
docker build -t blockshear-api .

# Run container
docker run -d -p 8000:8000 \
  -e DATABASE_URL=postgresql://... \
  -e ANTHROPIC_API_KEY=sk-... \
  blockshear-api
```

---

## 📊 Database Schemas

```javascript
{
  _id: ObjectId,
  user_id: Integer,
  timestamp: DateTime,
  question_text: String (optional),
  inputs: {
    bolt_grade: String,
    bolt_diameter: Number,
    // ... all input fields
  },
  result: {
    block_shear_occurs: Boolean,
    block_shear_capacity: Number,
    // ... result fields
  },
  steps: [
    {
      step: Number,
      title: String,
      content: String,
      clause: String,
      formulas: [String]
    }
  ]
}
```

### PostgreSQL - Users

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### PostgreSQL - Clauses

```sql
CREATE TABLE clauses (
  id SERIAL PRIMARY KEY,
  number VARCHAR(10) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  section VARCHAR(100),
  content TEXT NOT NULL,
  equation TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🐛 Troubleshooting

### Database Connection Issues

**PostgreSQL:**

```bash
# Check if running
pg_isready

# Restart service
sudo service postgresql restart
```

```bash
# Check status
mongosh --eval "db.adminCommand('ping')"

# Restart
sudo service mongod restart
```

### API Key Issues

```bash
# Test Claude API key
curl https://api.anthropic.com/v1/messages \
  -H "anthropic-version: 2023-06-01" \
  -H "x-api-key: YOUR_KEY" \
  -H "content-type: application/json" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":10,"messages":[{"role":"user","content":"Hi"}]}'
```

### CORS Issues

Add your frontend URL to `CORS_ORIGINS` in `.env`:

```env
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://yourapp.com
```

---

## 📝 Development Notes

### Adding New Clauses

```python
# In seed_db.py, add to CLAUSES_DATA list
{
    "number": "X.X.X",
    "title": "Clause title",
    "section": "Section name",
    "content": "Full clause text...",
    "equation": "Optional equation"
}
```

Then run:

```bash
python seed_db.py
```

### Extending Calculator

Edit `app/services/calculator.py` to add:

- New failure modes
- Additional checks
- Different connection types

### Custom AI Prompts

Edit `app/services/ai_parser.py` to customize:

- Extraction prompts
- Default values
- Validation logic

---

## 🤝 Contributing

This is an academic project for CVE505. Suggestions welcome!

---

## 📄 License

Educational project - all rights reserved.

---

**Built with ❤️ for structural engineering education**

CVE505: Design of Steel Structures
