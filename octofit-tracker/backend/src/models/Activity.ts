import mongoose, { Document, Schema } from 'mongoose';

interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  type: string; // 'running', 'cycling', 'swimming', etc.
  duration: number; // in minutes
  distance?: number; // in km
  calories?: number;
  intensity: 'low' | 'medium' | 'high';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'walking', 'strength', 'yoga', 'other']
    },
    duration: {
      type: Number,
      required: true,
      min: 1
    },
    distance: {
      type: Number,
      min: 0
    },
    calories: {
      type: Number,
      min: 0
    },
    intensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    notes: String
  },
  {
    timestamps: true
  }
);

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
