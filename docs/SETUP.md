# Quickmart Setup Guide

Complete step-by-step guide to set up the Quickmart E-Commerce Platform.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** - Download from https://nodejs.org
- **npm 9+** or **yarn** - Comes with Node.js
- **PostgreSQL 14+** - Download from https://www.postgresql.org
- **Redis 7+** - Download from https://redis.io
- **Docker & Docker Compose** (optional, for containerized setup)
- **Git** - For version control

### Verify Installation

```bash
node --version    # v18.x.x
npm --version     # 9.x.x
psql --version    # 14+
redis-cli --version  # 7+
```

## Option 1: Docker Compose Setup (Recommended for Development)

### Step 1: Clone Repository
```bash
git clone https://github.com/ratswat/Quickmart.git
cd Quickmart
```

### Step 2: Start Services
```bash
# Start all services (PostgreSQL, Redis, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Step 3: Access Applications
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api/v1
- **pgAdmin**: http://localhost:5050 (admin@quickmart.local / admin)

### Step 4: Verify Setup
```bash
# Check all services are running
docker-compose ps

# Test API
curl http://localhost:3001/api/v1/health
```

## Option 2: Manual Setup (Development)

### Step 1: Clone Repository
```bash
git clone https://github.com/ratswat/Quickmart.git
cd Quickmart
```

### Step 2: Database Setup

#### Create PostgreSQL Database
```bash
# Using psql command line
psql -U postgres

# Inside psql prompt
CREATE DATABASE quickmart_db;
CREATE USER quickmart WITH PASSWORD 'quickmart_dev';
GRANT ALL PRIVILEGES ON DATABASE quickmart_db TO quickmart;
\q
```

#### Or Using pgAdmin
1. Open pgAdmin: http://localhost:5050
2. Create new database: `quickmart_db`
3. Create new user: `quickmart` with password `quickmart_dev`
4. Grant all privileges

#### Verify Database Connection
```bash
psql -U quickmart -d quickmart_db -h localhost
# Should connect successfully
\q
```

### Step 3: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
nano .env  # or use your favorite editor
```

**Key environment variables to set:**
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://quickmart:quickmart_dev@localhost:5432/quickmart_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev_secret_key_change_in_production
```

```bash
# Run database migrations
npm run db:migrate

# (Optional) Seed sample data
npm run db:seed

# Start backend server
npm run dev

# Backend should be running at http://localhost:3001
```

### Step 4: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update .env.local (usually works as-is for local development)
nano .env.local
```

```bash
# Start frontend development server
npm run dev

# Frontend should be running at http://localhost:3000
```

### Step 5: Verify Installation

#### Check Backend
```bash
curl http://localhost:3001/api/v1/health
# Should return: { "status": "ok" }
```

#### Check Frontend
Open browser and go to http://localhost:3000

## Option 3: Production Setup with Docker Compose

### Step 1: Prepare Production Environment
```bash
# Create .env file for production secrets
cp .env.example .env.production

# Update with production values
nano .env.production
```

**Required production environment variables:**
- JWT_SECRET (strong random string)
- REDIS_PASSWORD (strong password)
- DB_PASSWORD (strong password)
- All payment gateway keys
- Email service credentials

### Step 2: Build and Deploy
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps
```

## Configuration Files

### Frontend Configuration
**File**: `frontend/.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=Quickmart
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
```

### Backend Configuration
**File**: `backend/.env`

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
REDIS_URL=redis://host:port
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
STRIPE_SECRET_KEY=your_key
```

### Database Configuration
**File**: `database/.env` (if using separate database service)

```env
POSTGRES_USER=quickmart
POSTGRES_PASSWORD=quickmart_dev
POSTGRES_DB=quickmart_db
```

## Development Workflow

### Start Development Environment
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: (Optional) Database monitoring
pgAdmin or DBeaver
```

### Common Development Tasks

#### Database Operations
```bash
cd backend

# View migrations status
npm run db:migrate:status

# Create new migration
npm run db:migrate:create --name=migration_name

# Rollback last migration
npm run db:rollback

# Reset database and reseed
npm run db:reset
```

#### Code Quality
```bash
# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Formatting
npm run format
```

#### Testing
```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Troubleshooting

### Database Connection Issues
```bash
# Test PostgreSQL connection
psql -U quickmart -d quickmart_db -h localhost

# Check if Redis is running
redis-cli ping
# Should return: PONG
```

### Port Already in Use
```bash
# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=3002
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Docker Issues
```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

## Next Steps

1. Review **[ARCHITECTURE.md](./ARCHITECTURE.md)** for system design
2. Check **[API.md](./API.md)** for API endpoints
3. Read **[CONTRIBUTING.md](./CONTRIBUTING.md)** for development guidelines
4. Explore **[DATABASE.md](./DATABASE.md)** for schema details

## Support

For issues:
1. Check **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**
2. Review GitHub issues
3. Create new issue with detailed information

---

**Last Updated**: 2024
**Version**: 1.0.0
