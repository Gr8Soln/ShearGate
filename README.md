# Block Shear Analyzer - Backend API

FastAPI backend for BS 5950 block shear analysis with AI-powered question parsing.

## 🚀 Tech Stack

- **FastAPI** - Modern Python web framework
- **MongoDB** - User calculations & history
- **PostgreSQL** - Users & BS 5950 clauses
- **Claude AI** - Question parsing (text & image)
- **JWT** - Authentication
- **Pydantic** - Data validation

---

## 📋 Features

### ✅ Authentication

- User registration & login
- JWT token-based auth
- Password hashing with bcrypt

### ✅ Block Shear Calculations

- Full BS 5950-1:2000 compliance
- Two failure modes (shear yielding + tension rupture)
- Step-by-step calculation generation
- Material property lookup (S275, S355, S235)
- Bolt grade support (4.6, 8.8)

### ✅ AI-Powered Input Parsing

- **Text questions** - Extract parameters from natural language
- **Image questions** - OCR and diagram analysis
- Powered by Claude AI (Anthropic)

### ✅ BS 5950 Clause Database

- Full clause text storage
- Search functionality
- Cross-references

---

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.10+
- MongoDB 6.0+
- PostgreSQL 14+
- Anthropic API key

### 1. Clone & Install

```bash
# Install dependencies
pip install -r requirements.txt

# Or create virtual environment first (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Database Setup

**PostgreSQL:**

```bash
# Create database
psql -U postgres
CREATE DATABASE blockshear;
\q
```

**MongoDB:**

```bash
# Start MongoDB
mongod

# Or with Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 3. Environment Configuration

```bash
# Copy example env file
cp .env.example .env

# Edit .env and fill in your values
nano .env
```

**Required variables:**

```env
# MongoDB
MONGODB_URL=mongodb://localhost:27017

# PostgreSQL
POSTGRES_URL=postgresql://postgres:password@localhost:5432/blockshear

# Security (generate with: openssl rand -hex 32)
SECRET_KEY=your-secret-key-here

# Anthropic AI
ANTHROPIC_API_KEY=your_api_key_here
```

### 4. Seed Database

```bash
# Seed BS 5950 clauses into PostgreSQL
python seed_db.py
```

### 5. Run Server

```bash
# Development mode (with auto-reload)
uvicorn app.main:app --reload --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Server will start at:** `http://localhost:8000`

**API Documentation:** `http://localhost:8000/docs`

---

## 📚 API Endpoints

### Authentication

```bash
POST   /api/auth/register       # Register new user
POST   /api/auth/login          # Login user
POST   /api/auth/token          # OAuth2 token endpoint
GET    /api/auth/me             # Get current user
```

### Calculations

```bash
POST   /api/calculate           # Create calculation
GET    /api/calculations        # Get user's calculations
GET    /api/calculations/{id}   # Get specific calculation
DELETE /api/calculations/{id}   # Delete calculation

# AI Parsing
POST   /api/parse-text          # Parse text question
POST   /api/parse-image         # Parse image question
```

### Clauses

```bash
GET    /api/clauses             # Get all clauses
GET    /api/clauses/search      # Search clauses
GET    /api/clauses/{number}    # Get specific clause
POST   /api/clauses             # Create clause (admin)
```

### Health & Info

```bash
GET    /                        # API info
GET    /health                  # Health check
```

---

## 🧪 Testing the API

### Using Swagger UI

1. Open `http://localhost:8000/docs`
2. Try the interactive API documentation

### Using cURL

**Register User:**

```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@university.edu",
    "name": "John Doe",
    "password": "SecurePassword123"
  }'
```

**Login:**

```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@university.edu",
    "password": "SecurePassword123"
  }'
```

**Create Calculation:**

```bash
curl -X POST "http://localhost:8000/api/calculate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "inputs": {
      "bolt_grade": "8.8",
      "bolt_diameter": 20,
      "number_of_bolts": 4,
      "pitch": 70,
      "edge_distance": 50,
      "end_distance": 50,
      "plate_material": "S275",
      "plate_thickness": 10,
      "gauge": 60,
      "connection_type": "bearing",
      "applied_load": 320
    }
  }'
```

**Parse Text Question:**

```bash
curl -X POST "http://localhost:8000/api/parse-text" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "A double angle connection with 4 x M20 Grade 8.8 bolts. Angles: 100x100x10mm, S275 steel. Check block shear capacity."
  }'
```

---

## 🔧 Project Structure

```
blockshear/
├── app/                       # FastAPI Backend
│   ├── core/
│   ├── database/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── routers/
│   ├── utils/
│   └── main.py
├── ui/                        # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml         # Full-stack orchestration
├── Dockerfile                 # Backend image
├── ui/Dockerfile              # Frontend image
├── start.sh                   # Dev launch script
└── README.md
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
railway variables set MONGODB_URL=mongodb+srv://...
railway variables set POSTGRES_URL=postgresql://...
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
  -e MONGODB_URL=mongodb://... \
  -e POSTGRES_URL=postgresql://... \
  -e ANTHROPIC_API_KEY=sk-... \
  blockshear-api
```

---

## 📊 Database Schemas

### MongoDB - Calculations

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

**MongoDB:**

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
