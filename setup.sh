#!/bin/bash

# Youth Opportunity Ecosystem - Setup Script
# This script sets up the development environment

set -e

echo "Launching Youth Opportunity Ecosystem setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}Node.js is installed${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}npm is installed${NC}"

if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}Git is installed${NC}"

# Backend setup
echo -e "\n${YELLOW}Setting up Backend...${NC}"
cd backend

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}Please update .env with your settings${NC}"
else
    echo -e "${GREEN}.env already exists${NC}"
fi

echo -e "${YELLOW}Installing backend dependencies...${NC}"
npm install
echo -e "${GREEN}Backend dependencies installed${NC}"

# Frontend setup
echo -e "\n${YELLOW}Setting up Frontend...${NC}"
cd ../frontend

echo -e "${YELLOW}Installing frontend dependencies...${NC}"
npm install
echo -e "${GREEN}Frontend dependencies installed${NC}"

cd ..

echo -e "\n${GREEN}Setup complete!${NC}"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Update backend/.env with your database URL"
echo -e "2. Run database migrations: cd backend && npm run db:migrate"
echo -e "3. Start backend: npm run dev"
echo -e "4. In another terminal, start frontend: cd frontend && npm run dev"
echo -e "5. Open http://localhost:3000 in your browser"

echo -e "\n${YELLOW}For more info, see docs/DEVELOPMENT.md${NC}"
