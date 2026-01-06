#!/bin/bash

# ============================================
# BudStack Deployment Script
# ============================================

set -e  # Exit on error

echo "=========================================="
echo "BudStack Platform Deployment"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo -e "${RED}❌ Error: .env.production file not found!${NC}"
    echo "Please create .env.production from .env.production.example"
    echo "cp .env.production.example .env.production"
    echo "Then edit .env.production with your actual credentials"
    exit 1
fi

echo -e "${GREEN}✓${NC} Found .env.production"
echo ""

# Check Docker installation
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    echo "Please install Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    echo "Please install Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

echo -e "${GREEN}✓${NC} Docker and Docker Compose are installed"
echo ""

# Ask for deployment type
echo "Select deployment type:"
echo "1) Development (with hot reload)"
echo "2) Production (optimized build)"
read -p "Enter choice [1-2]: " DEPLOY_TYPE

if [ "$DEPLOY_TYPE" == "1" ]; then
    ENV_FILE=".env"
    echo -e "${YELLOW}➤${NC} Starting in DEVELOPMENT mode..."
    
    # Install dependencies
    echo ""
    echo -e "${YELLOW}➤${NC} Installing dependencies..."
    cd nextjs_space
    yarn install
    cd ..
    
    # Start dev server
    cd nextjs_space
    yarn dev &
    cd ..
    
    echo -e "${GREEN}✓${NC} Development server starting on http://localhost:3000"
    
elif [ "$DEPLOY_TYPE" == "2" ]; then
    ENV_FILE=".env.production"
    echo -e "${YELLOW}➤${NC} Starting in PRODUCTION mode..."
    
    # Stop existing containers
    echo ""
    echo -e "${YELLOW}➤${NC} Stopping existing containers..."
    docker-compose --env-file $ENV_FILE down
    
    # Build and start containers
    echo ""
    echo -e "${YELLOW}➤${NC} Building Docker images..."
    docker-compose --env-file $ENV_FILE build --no-cache
    
    echo ""
    echo -e "${YELLOW}➤${NC} Starting containers..."
    docker-compose --env-file $ENV_FILE up -d
    
    # Wait for database to be ready
    echo ""
    echo -e "${YELLOW}➤${NC} Waiting for database to be ready..."
    sleep 10
    
    # Run migrations
    echo ""
    echo -e "${YELLOW}➤${NC} Running database migrations..."
    docker-compose --env-file $ENV_FILE exec -T app npx prisma migrate deploy
    
    # Check container status
    echo ""
    echo -e "${YELLOW}➤${NC} Checking container status..."
    docker-compose --env-file $ENV_FILE ps
    
    # Show logs
    echo ""
    echo -e "${GREEN}✓${NC} Deployment complete!"
    echo ""
    echo "=========================================="
    echo "Useful commands:"
    echo "=========================================="
    echo "View logs:        docker-compose logs -f app"
    echo "Stop services:    docker-compose down"
    echo "Restart:          docker-compose restart"
    echo "Database backup:  docker-compose exec postgres pg_dump -U budstack budstack_db > backup.sql"
    echo ""
    echo "Application URL: http://localhost:3000"
    
else
    echo -e "${RED}❌ Invalid choice${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✓${NC} Done!"
