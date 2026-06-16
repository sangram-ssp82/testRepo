# OctoFit Tracker Backend Implementation

## Overview
The backend implements a multi-tier Express.js application with TypeScript, MongoDB integration, and comprehensive API endpoints for user management, teams, activities, workouts, and leaderboards.

## Database Configuration

### MongoDB Connection
- **Database**: `octofit_db`
- **Connection String**: `mongodb://localhost:27017/octofit_db`
- **Collections**: Users, Teams, Activities, Workouts

## Project Structure

```
backend/
├── src/
│   ├── models/
│   │   ├── User.ts          # User schema and model
│   │   ├── Team.ts          # Team schema and model
│   │   ├── Activity.ts      # Activity schema and model
│   │   └── Workout.ts       # Workout schema and model
│   ├── controllers/
│   │   ├── userController.ts        # User CRUD operations
│   │   ├── teamController.ts        # Team operations with member management
│   │   ├── activityController.ts    # Activity tracking operations
│   │   ├── workoutController.ts     # Workout management operations
│   │   └── leaderboardController.ts # Leaderboard & ranking logic
│   ├── routes/
│   │   ├── userRoutes.ts            # User API endpoints
│   │   ├── teamRoutes.ts            # Team API endpoints
│   │   ├── activityRoutes.ts        # Activity API endpoints
│   │   ├── workoutRoutes.ts         # Workout API endpoints
│   │   └── leaderboardRoutes.ts     # Leaderboard API endpoints
│   ├── scripts/
│   │   └── seed.ts                  # Database seeding script
│   └── server.ts                    # Express server configuration
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Users (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `POST /` - Create new user
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user

**User Schema**:
```typescript
{
  username: string (required, unique)
  email: string (required, unique)
  firstName?: string
  lastName?: string
  age?: number
  height?: number (cm)
  weight?: number (kg)
  goal?: string
  createdAt: Date
  updatedAt: Date
}
```

### Teams (`/api/teams`)
- `GET /` - Get all teams
- `GET /:id` - Get team by ID
- `POST /` - Create new team
- `POST /:id/members` - Add member to team
- `DELETE /:id/members` - Remove member from team
- `PUT /:id` - Update team
- `DELETE /:id` - Delete team

**Team Schema**:
```typescript
{
  name: string (required)
  description?: string
  members: ObjectId[] (User references)
  leaderName: ObjectId (User reference, required)
  createdAt: Date
  updatedAt: Date
}
```

### Activities (`/api/activities`)
- `GET /` - Get all activities
- `GET /user/:userId` - Get activities by user
- `POST /` - Create new activity
- `PUT /:id` - Update activity
- `DELETE /:id` - Delete activity

**Activity Schema**:
```typescript
{
  userId: ObjectId (User reference, required)
  type: string ('running', 'cycling', 'swimming', 'walking', 'strength', 'yoga', 'other')
  duration: number (minutes, required)
  distance?: number (km)
  calories?: number
  intensity: 'low' | 'medium' | 'high' (required)
  notes?: string
  createdAt: Date
  updatedAt: Date
}
```

### Workouts (`/api/workouts`)
- `GET /` - Get all workouts
- `GET /:id` - Get workout by ID
- `GET /user/:userId` - Get workouts by user
- `POST /` - Create new workout
- `PUT /:id` - Update workout
- `POST /:id/complete` - Mark workout as completed
- `DELETE /:id` - Delete workout

**Workout Schema**:
```typescript
{
  userId: ObjectId (User reference, required)
  teamId?: ObjectId (Team reference)
  name: string (required)
  exercises: Array<{
    name: string (required)
    sets: number (required)
    reps: number (required)
    weight?: number
  }>
  duration: number (minutes, required)
  date: Date (required)
  notes?: string
  completed: boolean (default: false)
  createdAt: Date
  updatedAt: Date
}
```

### Leaderboard (`/api/leaderboard`)
- `GET /` - Get leaderboard (sorted by calories)
  - Query params: `period` (week|month|alltime, default: week)
- `GET /rank/:userId` - Get user rank and stats
  - Query params: `period` (week|month|alltime, default: week)

**Leaderboard Response**:
```typescript
{
  period: string
  leaderboard: Array<{
    rank: number
    user: {
      id: string
      username: string
      firstName?: string
      lastName?: string
    }
    stats: {
      totalDuration: number (minutes)
      totalCalories: number
      totalDistance: number (km)
      activityCount: number
    }
  }>
}
```

## Database Seeding

### Run Seed Script
```bash
npm run seed
```

### Seed Data Includes
- **4 Users**: john_doe, jane_smith, mike_wilson, sarah_jones
- **2 Teams**: Fitness Warriors, Morning Runners
- **8 Activities**: Diverse workout types with durations, distances, and calories
- **4 Workouts**: Complete workout plans with exercises and sets

## Development Workflow

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

Server runs on `http://localhost:8000`

### Build TypeScript
```bash
npm run build
```

Outputs to `dist/` directory

### Run Production Server
```bash
npm start
```

### Seed Database
```bash
npm run seed
```

## Key Features

1. **User Management**
   - Complete CRUD operations
   - Profile information tracking
   - Fitness goals

2. **Team Management**
   - Create teams with members
   - Designate team leaders
   - Add/remove members dynamically

3. **Activity Tracking**
   - Log various exercise types
   - Track duration, distance, calories
   - Intensity levels and notes

4. **Workout Planning**
   - Create structured workout plans
   - Track exercises, sets, reps, weights
   - Mark workouts as completed
   - Team-based or individual workouts

5. **Leaderboard System**
   - Rank users by activity (calories burned)
   - Time-based filtering (week/month/all-time)
   - Individual user rank lookup
   - Activity statistics aggregation

## Error Handling

- Global error middleware catches all exceptions
- Consistent JSON error responses
- HTTP status codes (400, 404, 500)
- Descriptive error messages

## Technologies Used

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Mongoose** - MongoDB ODM
- **ts-node** - TypeScript execution
- **Node.js** - Runtime environment

## Database Indexing

Recommended indexes for performance:
```typescript
// User
db.users.createIndex({ email: 1 })
db.users.createIndex({ username: 1 })

// Activity
db.activities.createIndex({ userId: 1, createdAt: -1 })

// Workout
db.workouts.createIndex({ userId: 1, date: -1 })

// Team
db.teams.createIndex({ members: 1 })
```

## Future Enhancements

1. Authentication & Authorization (JWT)
2. Rate limiting
3. Pagination for list endpoints
4. Advanced filtering and search
5. Social features (friend requests, activity sharing)
6. Notifications system
7. File upload for profile pictures
8. Analytics and reporting

## Notes

- All timestamps use UTC
- Distances in kilometers
- Weight in kilograms
- Height in centimeters
- Duration in minutes
- Database auto-timestamps on create/update
