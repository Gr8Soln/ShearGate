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
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 is not installed${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo -e "${GREEN}✅ Python $PYTHON_VERSION found${NC}"

# Create virtual environment
echo ""
echo "📦 Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo -e "${GREEN}✅ Virtual environment created${NC}"
else
    echo -e "${YELLOW}⚠️  Virtual environment already exists${NC}"
fi

# Activate virtual environment
echo ""
echo "🔌 Activating virtual environment..."
source venv/bin/activate
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
    echo -e "${YELLOW}   Especially: ANTHROPIC_API_KEY, MONGODB_URL, POSTGRES_URL${NC}"
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

# Check MongoDB
echo "   Checking MongoDB..."
if command -v mongosh &> /dev/null || command -v mongo &> /dev/null; then
    echo -e "${GREEN}   ✅ MongoDB client found${NC}"
else
    echo -e "${YELLOW}   ⚠️  MongoDB client not found${NC}"
fi



# Start server
echo ""
echo "🚀 Starting FastAPI server..."
echo -e "${GREEN}======================================"
echo "   API will be available at:"
echo "   📍 http://localhost:8000"
echo "   📚 Documentation: http://localhost:8000/docs"
echo "======================================"
echo -e "${NC}"
echo "Press Ctrl+C to stop the server"
echo ""

# Run uvicorn
uvicorn app.main:app --reload --port 8000
