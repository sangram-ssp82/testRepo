import express, { Express, Request, Response, NextFunction } from 'express';
import { connectDatabase } from './config/database';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import activityRoutes from './routes/activityRoutes';
import workoutRoutes from './routes/workoutRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';

const app: Express = express();
const PORT = 8000;

// Get API base URL based on environment
const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-${PORT}.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

const API_BASE_URL = getApiBaseUrl();

// CORS configuration for both localhost and Codespaces
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:8000',
      `https://${process.env.CODESPACE_NAME}-5173.app.github.dev`,
      `https://${process.env.CODESPACE_NAME}-3000.app.github.dev`,
      `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`,
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
  // CORS headers
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8000',
    `https://${process.env.CODESPACE_NAME}-5173.app.github.dev`,
    `https://${process.env.CODESPACE_NAME}-3000.app.github.dev`,
    `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`,
  ].filter(Boolean);

  const origin = req.headers.origin as string | undefined;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Database connection
const connectDB = async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
    version: '1.0.0',
    status: 'running',
    baseUrl: API_BASE_URL,
    environment: process.env.CODESPACE_NAME ? 'Codespaces' : 'localhost',
    endpoints: {
      health: `${API_BASE_URL}/health`,
      users: `${API_BASE_URL}/api/users`,
      teams: `${API_BASE_URL}/api/teams`,
      activities: `${API_BASE_URL}/api/activities`,
      workouts: `${API_BASE_URL}/api/workouts`,
      leaderboard: `${API_BASE_URL}/api/leaderboard`
    }
  });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    const environment = process.env.CODESPACE_NAME ? 'Codespaces' : 'localhost';
    console.log(`🚀 OctoFit Tracker API running on ${API_BASE_URL}`);
    console.log(`📊 Environment: ${environment}`);
    console.log(`📊 Database: octofit_db`);
    console.log(`📝 Health Check: ${API_BASE_URL}/health`);
    console.log(`📝 Users API: ${API_BASE_URL}/api/users`);
    console.log(`📝 Activities API: ${API_BASE_URL}/api/activities`);
  });
};

startServer();
