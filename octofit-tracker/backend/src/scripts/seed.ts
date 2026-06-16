import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';

/**
 * OctoFit Tracker - Test Data Seed Script
 * 
 * This seed script populates the octofit_db MongoDB database with comprehensive test data.
 * 
 * TEST DATA SEED DESCRIPTION:
 * ===========================
 * 
 * USERS (4 test users):
 *   - john_doe: 28 years old, Weight loss goal, height 180cm, weight 75kg
 *   - jane_smith: 26 years old, Muscle building goal, height 165cm, weight 62kg  
 *   - mike_wilson: 32 years old, Stamina improvement goal, height 185cm, weight 85kg
 *   - sarah_jones: 24 years old, General fitness goal, height 170cm, weight 65kg
 * 
 * TEAMS (2 teams with members):
 *   - Fitness Warriors: john_doe (leader), jane_smith, mike_wilson (3 members)
 *   - Morning Runners: jane_smith (leader), sarah_jones (2 members)
 * 
 * ACTIVITIES (8 activities with various exercise types):
 *   - Running activities (2): 6-8.5km distance, 35-45 min duration, 450-600 calories
 *   - Cycling activities (2): 18-25km distance, 50-60 min duration, 420-500 calories
 *   - Swimming (1): 2km distance, 50 min duration, 550 calories
 *   - Strength training (1): 75 min duration, 700 calories
 *   - Yoga (1): 60 min duration, 200 calories
 *   - Walking (1): 4km distance, 45 min duration, 250 calories
 * 
 * WORKOUTS (4 structured workout plans):
 *   - Upper Body Strength: Bench Press (80kg), Pull-ups, Dumbbell Curls, 60 min, completed
 *   - Cardio Day: Treadmill, Elliptical, 45 min, completed
 *   - Leg Day: Squats (100kg), Leg Press (150kg), Lunges, 75 min, not completed
 *   - Full Body: Deadlifts (120kg), Push-ups, Planks, 60 min, completed
 * 
 * Usage: npm run seed
 */

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Workout.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // =====================================================
    // SEED: User Data (4 test users with profiles)
    // =====================================================
    // Creates diverse user profiles for testing:
    // - john_doe: Weight loss goal, age 28, height 180cm, weight 75kg
    // - jane_smith: Muscle building goal, age 26, height 165cm, weight 62kg
    // - mike_wilson: Stamina improvement, age 32, height 185cm, weight 85kg
    // - sarah_jones: General fitness, age 24, height 170cm, weight 65kg
    const users = await User.create([
      {
        username: 'john_doe',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        age: 28,
        height: 180,
        weight: 75,
        goal: 'Lose weight'
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        age: 26,
        height: 165,
        weight: 62,
        goal: 'Build muscle'
      },
      {
        username: 'mike_wilson',
        email: 'mike@example.com',
        firstName: 'Mike',
        lastName: 'Wilson',
        age: 32,
        height: 185,
        weight: 85,
        goal: 'Improve stamina'
      },
      {
        username: 'sarah_jones',
        email: 'sarah@example.com',
        firstName: 'Sarah',
        lastName: 'Jones',
        age: 24,
        height: 170,
        weight: 65,
        goal: 'General fitness'
      }
    ]);
    console.log(`✅ Created ${users.length} users`);

    // =====================================================
    // SEED: Team Data (2 teams with members)
    // =====================================================
    // Creates test teams:
    // - Fitness Warriors: john_doe (leader), jane_smith, mike_wilson (3 members)
    // - Morning Runners: jane_smith (leader), sarah_jones (2 members)
    const teams = await Team.create([
      {
        name: 'Fitness Warriors',
        description: 'A team dedicated to achieving fitness goals',
        members: [users[0]._id, users[1]._id, users[2]._id],
        leaderName: users[0]._id
      },
      {
        name: 'Morning Runners',
        description: 'Early risers who love running',
        members: [users[1]._id, users[3]._id],
        leaderName: users[1]._id
      }
    ]);
    console.log(`✅ Created ${teams.length} teams`);

    // =====================================================
    // SEED: Activity Data (8 activities with various types)
    // =====================================================
    // Creates diverse activity records:
    // - Running activities: 8.5km, 35-45 min, 450-600 calories
    // - Cycling activities: 18-25km, 50-60 min, 420-500 calories
    // - Swimming: 2km, 50 min, 550 calories
    // - Strength training: 75 min, 700 calories
    // - Yoga: 60 min, 200 calories
    // - Walking: 4km, 45 min, 250 calories
    // Activities distributed across 4 users with different intensities
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 8.5,
        calories: 600,
        intensity: 'high',
        notes: 'Morning run at the park'
      },
      {
        userId: users[0]._id,
        type: 'cycling',
        duration: 60,
        distance: 25,
        calories: 500,
        intensity: 'medium',
        notes: 'Evening bike ride'
      },
      {
        userId: users[1]._id,
        type: 'swimming',
        duration: 50,
        distance: 2,
        calories: 550,
        intensity: 'high',
        notes: 'Pool swimming session'
      },
      {
        userId: users[1]._id,
        type: 'yoga',
        duration: 60,
        calories: 200,
        intensity: 'low',
        notes: 'Relaxing yoga class'
      },
      {
        userId: users[2]._id,
        type: 'strength',
        duration: 75,
        calories: 700,
        intensity: 'high',
        notes: 'Full body strength training'
      },
      {
        userId: users[2]._id,
        type: 'walking',
        duration: 45,
        distance: 4,
        calories: 250,
        intensity: 'low',
        notes: 'Leisurely evening walk'
      },
      {
        userId: users[3]._id,
        type: 'running',
        duration: 35,
        distance: 6,
        calories: 450,
        intensity: 'medium',
        notes: 'Trail running'
      },
      {
        userId: users[3]._id,
        type: 'cycling',
        duration: 50,
        distance: 18,
        calories: 420,
        intensity: 'medium',
        notes: 'Weekend bike ride'
      }
    ]);
    console.log(`✅ Created ${activities.length} activities`);

    // =====================================================
    // SEED: Workout Data (4 structured workout plans)
    // =====================================================
    // Creates structured workout plans:
    // - Upper Body Strength: Bench Press (80kg, 4x8), Pull-ups (3x10), Dumbbell Curls (3x12, 15kg)
    // - Cardio Day: Treadmill (30 min), Elliptical (20 min)
    // - Leg Day: Squats (100kg, 4x10), Leg Press (150kg, 3x12), Lunges (3x12, 20kg)
    // - Full Body: Deadlifts (120kg, 3x8), Push-ups (3x20), Planks (3x60sec)
    // Includes team associations and completion status
    const workouts = await Workout.create([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        name: 'Upper Body Strength',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, weight: 80 },
          { name: 'Pull-ups', sets: 3, reps: 10, weight: 0 },
          { name: 'Dumbbell Curls', sets: 3, reps: 12, weight: 15 }
        ],
        duration: 60,
        date: new Date(),
        notes: 'Great session, feeling strong',
        completed: true
      },
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        name: 'Cardio Day',
        exercises: [
          { name: 'Treadmill', sets: 1, reps: 30, weight: 0 },
          { name: 'Elliptical', sets: 1, reps: 20, weight: 0 }
        ],
        duration: 45,
        date: new Date(),
        notes: 'Good cardio session',
        completed: true
      },
      {
        userId: users[2]._id,
        teamId: teams[0]._id,
        name: 'Leg Day',
        exercises: [
          { name: 'Squats', sets: 4, reps: 10, weight: 100 },
          { name: 'Leg Press', sets: 3, reps: 12, weight: 150 },
          { name: 'Lunges', sets: 3, reps: 12, weight: 20 }
        ],
        duration: 75,
        date: new Date(),
        notes: 'Intense leg workout',
        completed: false
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        name: 'Full Body',
        exercises: [
          { name: 'Deadlifts', sets: 3, reps: 8, weight: 120 },
          { name: 'Push-ups', sets: 3, reps: 20, weight: 0 },
          { name: 'Planks', sets: 3, reps: 60, weight: 0 }
        ],
        duration: 60,
        date: new Date(),
        notes: 'Balanced workout',
        completed: true
      }
    ]);
    console.log(`✅ Created ${workouts.length} workouts`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   - ${users.length} users`);
    console.log(`   - ${teams.length} teams`);
    console.log(`   - ${activities.length} activities`);
    console.log(`   - ${workouts.length} workouts`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
