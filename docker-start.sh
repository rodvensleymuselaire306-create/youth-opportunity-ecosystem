#!/bin/bash

# Youth Opportunity Ecosystem - Docker Compose Helper
# Usage: ./docker-start.sh [start|stop|logs|reset]

set -e

COMMAND=${1:-start}

case $COMMAND in
    start)
        echo "Starting YOE with Docker Compose..."
        docker-compose up -d
        echo "Services started"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend: http://localhost:5000"
        echo "   Database: localhost:5432"
        echo "   Redis: localhost:6379"
        ;;
    stop)
        echo "Stopping YOE services..."
        docker-compose down
        echo "Services stopped"
        ;;
    logs)
        echo "Showing logs..."
        docker-compose logs -f
        ;;
    reset)
        echo "Resetting all containers and volumes..."
        docker-compose down -v
        echo "Reset complete"
        ;;
    test)
        echo "Running tests..."
        docker-compose exec backend npm run test
        ;;
    db-migrate)
        echo "Running database migrations..."
        docker-compose exec backend npm run db:migrate
        ;;
    db-studio)
        echo "Opening Prisma Studio..."
        docker-compose exec backend npm run db:studio
        ;;
    *)
        echo "Usage: $0 {start|stop|logs|reset|test|db-migrate|db-studio}"
        exit 1
        ;;
esac
