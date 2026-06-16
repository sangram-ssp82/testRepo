import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';

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

    // Create users
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

    // Create teams
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

    // Create activities
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

    // Create workouts
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
