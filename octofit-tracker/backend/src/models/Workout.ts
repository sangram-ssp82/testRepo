import mongoose, { Document, Schema } from 'mongoose';

interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  name: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }>;
  duration: number; // in minutes
  date: Date;
  notes?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    exercises: [{
      name: {
        type: String,
        required: true
      },
      sets: {
        type: Number,
        required: true,
        min: 1
      },
      reps: {
        type: Number,
        required: true,
        min: 1
      },
      weight: Number
    }],
    duration: {
      type: Number,
      required: true,
      min: 1
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    notes: String,
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
