#!/bin/bash
set -euo pipefail

# Block Shear Analyzer - local development startup script.

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}$1${NC}"
}

log_ok() {
    echo -e "${GREEN}âœ… $1${NC}"
}

log_warn() {
    echo -e "${YELLOW}âš ï¸ $1${NC}"
}

log_error() {
    echo -e "${RED}âŒ $1${NC}"
}

echo "íº€ Block Shear Analyzer Setup"
echo "======================================"

log_info "í³Œ Checking Python version..."
if python -c "import sys" >/dev/null 2>&1; then
    PYTHON_BIN="python"
elif python3 -c "import sys" >/dev/null 2>&1; then
    PYTHON_BIN="python3"
else
    log_error "Python is not installed or not on PATH."
    exit 1
fi

PYTHON_VERSION=$("$PYTHON_BIN" --version 2>&1 | cut -d' ' -f2 | cut -d'.' -f1,2)
log_ok "Python $PYTHON_VERSION found"

if [ ! -d "venv" ]; then
    log_info "í³¦ No venv found. Creating virtual environment..."
    "$PYTHON_BIN" -m venv venv
    log_ok "Created virtual environment"
fi

if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
elif [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
else
    log_error "Unable to find activation script for venv"
    exit 1
fi

log_ok "Activated virtual environment (venv)"

log_info "í³¥ Updating pip..."
python -m pip install --upgrade pip > /dev/null

if [ ! -f "requirements.txt" ]; then
    log_error "requirements.txt not found"
    exit 1
fi

REQ_STAMP="venv/.requirements.installed"
if [ ! -f "$REQ_STAMP" ] || [ "requirements.txt" -nt "$REQ_STAMP" ]; then
    log_info "Installing/updating dependencies from requirements.txt..."
    python -m pip install -r requirements.txt
    touch "$REQ_STAMP"
    log_ok "Dependencies installed"
else
    log_ok "Dependencies already up-to-date"
fi

log_info "âš™ï¸  Checking environment configuration..."
if [ ! -f ".env" ]; then
    log_warn ".env file not found"
    log_info "Creating .env from template..."
    cp .env.example .env
    log_warn "Please edit .env file with your configuration"
    echo ""
    read -p "Press Enter to continue after editing .env..."
else
    log_ok ".env file found"
fi

# Export variables so Alembic/Uvicorn can use them
if [ -f ".env" ]; then
    set -a
    source .env
    set +a
fi

log_info "í·„ï¸  Checking database connections..."
if command -v psql >/dev/null 2>&1; then
    log_ok "PostgreSQL client found"
else
    log_warn "PostgreSQL client not found (install postgresql-client)"
fi

if [ -f "alembic.ini" ]; then
    log_info "Running database migrations..."
    python -m alembic upgrade head
    log_ok "Migrations complete"
else
    log_warn "alembic.ini not found, skipping migrations"
fi

# Start frontend in background if directory exists
FRONTEND_PID=""
if [ -d "ui" ]; then
    log_info "í¾¨ Starting Frontend application..."
    cd ui
    npm install > /dev/null
    npm run dev -- --host &
    FRONTEND_PID=$!
    cd ..
    log_ok "Frontend available at: http://localhost:5173"
else
    log_warn "UI folder not found. Skipping frontend startup."
fi

# Define cleanup function for graceful exit
cleanup() {
    echo ""
    log_warn "Shutting down servers..."
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    exit 0
}

trap cleanup SIGINT SIGTERM

echo "======================================"
log_ok "Starting Backend API on port 8000"
log_info "API docs: http://localhost:8000/docs"
echo "Press Ctrl+C to stop the servers"
echo "======================================"

# Run uvicorn (blocks the script until interrupted)
uvicorn app.main:app --reload --port 8000 --host 0.0.0.0
