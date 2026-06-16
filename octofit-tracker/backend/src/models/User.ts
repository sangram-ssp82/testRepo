import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  height?: number; // in cm
  weight?: number; // in kg
  goal?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
      type: String,
      minlength: 6
    },
    firstName: String,
    lastName: String,
    age: {
      type: Number,
      min: 1,
      max: 150
    },
    height: {
      type: Number,
      min: 50,
      max: 300
    },
    weight: {
      type: Number,
      min: 20,
      max: 500
    },
    goal: String
  },
  {
    timestamps: true
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
