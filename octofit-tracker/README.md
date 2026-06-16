# OctoFit Tracker - Multi-tier Application

A modern multi-tier application for fitness tracking using React 19, Express, Node.js, and MongoDB.

## Architecture

```
octofit-tracker/
├── frontend/          # React 19 + Vite
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express + TypeScript + Node.js
│   ├── src/
│   │   └── server.ts
│   ├── tsconfig.json
│   └── package.json
└── .env.example       # Environment configuration reference
```

## Technology Stack

### Frontend
- **React 19** - Latest React version
- **Vite** - Fast build tool and dev server
- **Port**: 5173

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Mongoose** - MongoDB object modeling
- **Port**: 8000

### Database
- **MongoDB** - NoSQL database
- **Port**: 27017

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB running locally or connection string configured

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
npm run dev
```

The backend API will be available at `http://localhost:8000`

### Backend Build

```bash
cd octofit-tracker/backend
npm run build
npm start
```

This compiles TypeScript to JavaScript and runs the compiled server.

## Available Endpoints

### API Health Check
- `GET /health` - Returns server health status

### API Root
- `GET /` - Returns API information and version

## Environment Variables

Copy `.env.example` to `.env` and configure:

```
VITE_API_URL=http://localhost:8000
NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
MONGODB_PORT=27017
```

## Port Configuration

| Service    | Port  | Environment             |
|-----------|-------|------------------------|
| Frontend  | 5173  | VITE development server|
| Backend   | 8000  | Express API server     |
| MongoDB   | 27017 | Database               |

## Development Commands

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start development server (ts-node)
npm run build    # Compile TypeScript
npm run start    # Run compiled JavaScript
npm test         # Run tests
```

## Project Structure

### Frontend
- React components for fitness tracking UI
- Integration with backend API
- Vite configuration for optimized builds

### Backend
- Express server with TypeScript
- Mongoose schemas for data modeling
- RESTful API endpoints
- MongoDB integration

## Next Steps

1. Start MongoDB service
2. Launch backend: `npm run dev` in backend folder
3. Launch frontend: `npm run dev` in frontend folder
4. Begin development!

## License

ISC
