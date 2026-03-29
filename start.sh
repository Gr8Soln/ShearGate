#!/bin/bash

# Block Shear Analyzer Backend - Quick Start Script
# This script sets up and runs the backend API

set -e

echo "🚀 Block Shear Analyzer Backend Setup"
echo "======================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Python version
echo ""
echo "📌 Checking Python version..."
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo -e "${RED}❌ Python is not installed${NC}"
    exit 1
fi

PYTHON_VERSION=$($PYTHON_CMD --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo -e "${GREEN}✅ Python $PYTHON_VERSION found${NC}"

# Create virtual environment
echo ""
echo "📦 Creating virtual environment..."
if [ ! -d "venv" ]; then
    $PYTHON_CMD -m venv venv
    echo -e "${GREEN}✅ Virtual environment created${NC}"
else
    echo -e "${YELLOW}⚠️  Virtual environment already exists${NC}"
fi

# Activate virtual environment
echo ""
echo "🔌 Activating virtual environment..."
if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
elif [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
else
    echo -e "${RED}❌ Virtual environment activation script not found${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Virtual environment activated${NC}"

# Install dependencies
echo ""
echo "📥 Installing dependencies..."
pip install --upgrade pip > /dev/null
pip install -r requirements.txt
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Check for .env file
echo ""
echo "⚙️  Checking environment configuration..."
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo "Creating .env from template..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env file with your configuration${NC}"
    echo ""
    read -p "Press Enter to continue after editing .env..."
else
    echo -e "${GREEN}✅ .env file found${NC}"
fi

# Check database connections
echo ""
echo "🗄️  Checking database connections..."

# Check PostgreSQL
echo "   Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    echo -e "${GREEN}   ✅ PostgreSQL client found${NC}"
else
    echo -e "${YELLOW}   ⚠️  PostgreSQL client not found (install postgresql-client)${NC}"
fi




# Start backend server
echo ""
echo "🚀 Starting applications..."
echo -e "${GREEN}======================================"
echo "   Backend API will be available at:"
echo "   📍 http://localhost:8000"
echo "   📚 Documentation: http://localhost:8000/docs"
echo ""

# Start frontend in background if directory exists
if [ -d "ui" ]; then
    echo "🎨 Starting Frontend application..."
    echo "   📍 http://localhost:5173"
    cd ui
    npm install > /dev/null
    npm run dev -- --host &
    FRONTEND_PID=$!
    cd ..
else
    echo -e "${YELLOW}   ⚠️  UI folder not found. Skipping frontend startup.${NC}"
fi

echo "======================================"
echo -e "${NC}"
echo "Press Ctrl+C to stop the servers"
echo ""

# Define cleanup function for graceful exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down servers...${NC}"
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    exit 0
}

trap cleanup SIGINT SIGTERM

# Run uvicorn (blocks the script until interrupted)
uvicorn app.main:app --reload --port 8000 --host 0.0.0.0

