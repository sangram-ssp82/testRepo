# OctoFit Tracker - API Hosting & Codespaces Configuration

## Overview

This guide explains how to configure and run the OctoFit Tracker multi-tier application with support for both local development and GitHub Codespaces environments.

## Architecture

- **Backend API**: Express.js on port `8000`
- **Frontend**: React 19 with Vite on port `5173`
- **Database**: MongoDB on port `27017`

## Environment-Aware API Configuration

### API Base URL Resolution

The application automatically detects the environment and constructs the appropriate API URL:

#### Local Development
```
http://localhost:8000
```

#### GitHub Codespaces
```
https://$CODESPACE_NAME-8000.app.github.dev
```

Where `$CODESPACE_NAME` is automatically set by GitHub in the Codespaces environment.

## Backend Configuration

### Server Setup

The backend server (`src/server.ts`) includes:

1. **Environment Detection**: Automatically detects Codespaces via `process.env.CODESPACE_NAME`
2. **CORS Configuration**: Allows requests from:
   - `http://localhost:5173` (local frontend)
   - `http://localhost:3000` (alternative frontend port)
   - `http://localhost:8000` (API itself)
   - `https://$CODESPACE_NAME-*.app.github.dev` (Codespaces)

3. **API Endpoints**:
   - `GET /` - Root endpoint with environment info
   - `GET /health` - Health check
   - `GET/POST /api/users` - User management
   - `GET/POST /api/activities` - Activity logging
   - `GET/POST /api/teams` - Team management
   - `GET/POST /api/workouts` - Workout planning
   - `GET /api/leaderboard` - Fitness leaderboard

### Starting the Backend

```bash
# Install dependencies
npm install

# Run development server (with auto-reload)
npm run dev

# Expected output:
# 🚀 OctoFit Tracker API running on http://localhost:8000
# 📊 Environment: localhost
# 📊 Database: octofit_db
```

## Frontend Configuration

### API Configuration

The frontend uses `src/config/api.js` to manage API endpoints:

```javascript
import { API_BASE_URL, API_ENDPOINTS, fetchFromApi } from './config/api.js';

// Automatically uses correct environment
// localhost: http://localhost:8000
// Codespaces: https://$CODESPACE_NAME-8000.app.github.dev
```

### Environment Variables

Create `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_CODESPACE_NAME=
```

### Starting the Frontend

```bash
cd frontend
npm install
npm run dev

# Expected output:
# ✓ ready in 123 ms
# ➜  Local:   http://localhost:5173/
```

## Testing API Endpoints

### Using the Test Script

#### PowerShell (Windows)
```powershell
cd octofit-tracker/backend
./test-api.ps1
```

#### Bash (Linux/Mac)
```bash
cd octofit-tracker/backend
chmod +x test-api.sh
./test-api.sh
```

### Manual Testing with curl

#### Health Check
```bash
curl http://localhost:8000/health
```

#### Get All Users
```bash
curl http://localhost:8000/api/users
```

#### Get All Activities
```bash
curl http://localhost:8000/api/activities
```

#### Create a New User
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "age": 28,
    "height": 180,
    "weight": 75,
    "goal": "build muscle"
  }'
```

## GitHub Codespaces Setup

### Step 1: Start Codespace
1. Go to the repository on GitHub
2. Click **Code** → **Codespaces** → **Create codespace on build-octofit-app**
3. Wait for the environment to load

### Step 2: Install Dependencies
```bash
# Backend
cd octofit-tracker/backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 3: Start Services
In separate terminals:

```bash
# Terminal 1: Backend API (port 8000)
cd octofit-tracker/backend
npm run dev

# Terminal 2: Frontend (port 5173)
cd octofit-tracker/frontend
npm run dev
```

### Step 4: Access Services

The application will be accessible at:

- **Frontend**: `https://$CODESPACE_NAME-5173.app.github.dev`
- **Backend API**: `https://$CODESPACE_NAME-8000.app.github.dev`
- **Health Check**: `https://$CODESPACE_NAME-8000.app.github.dev/health`

Codespaces automatically creates accessible URLs for all forwarded ports.

## Database Setup

### MongoDB Installation

#### Local Machine
```bash
# Windows (with MongoDB installed)
mongod

# Mac (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Codespaces
MongoDB can be installed in Codespaces using:
```bash
# Install MongoDB in container
sudo apt-get update
sudo apt-get install -y mongodb

# Start service
sudo service mongodb start
```

### Seed Database

```bash
# Populate with test data
npm run seed
```

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/octofit_db
PORT=8000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_PORT=5173
VITE_ENV=development
```

## Troubleshooting

### CORS Errors
- Ensure backend is running on port 8000
- Check that frontend origin is in CORS allowed list
- For Codespaces: Verify `CODESPACE_NAME` environment variable is set

### API Connection Issues
1. Check if backend is running: `curl http://localhost:8000/health`
2. Verify database connection: Check MongoDB logs
3. Check CORS configuration in `src/server.ts`

### Port Conflicts
- Backend: Use `PORT=3001 npm run dev` to use different port
- Frontend: Use `npm run dev -- --port 3000` to use different port

## Next Steps

1. ✅ Configure API hosting for localhost and Codespaces
2. ⬜ Implement React components for user management
3. ⬜ Build activity tracking UI
4. ⬜ Implement team management interface
5. ⬜ Create leaderboard visualization

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [GitHub Codespaces](https://github.com/features/codespaces)
- [Vite Documentation](https://vitejs.dev/)
