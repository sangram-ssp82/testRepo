import { Request, Response } from 'express';
import Workout from '../models/Workout';

// Get all workouts
export const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId').populate('teamId');
    res.json(workouts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get workouts by user
export const getWorkoutsByUser = async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId })
      .populate('userId')
      .populate('teamId');
    res.json(workouts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get workout by ID
export const getWorkoutById = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id)
      .populate('userId')
      .populate('teamId');
    
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    
    res.json(workout);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create workout
export const createWorkout = async (req: Request, res: Response) => {
  try {
    const { userId, teamId, name, exercises, duration, date, notes } = req.body;
    
    const newWorkout = new Workout({
      userId,
      teamId,
      name,
      exercises,
      duration,
      date,
      notes,
      completed: false
    });
    
    await newWorkout.save();
    await newWorkout.populate('userId').populate('teamId');
    res.status(201).json(newWorkout);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Update workout
export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId').populate('teamId');
    
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    
    res.json(workout);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Complete workout
export const completeWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    ).populate('userId').populate('teamId');
    
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    
    res.json(workout);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete workout
export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    
    res.json({ message: 'Workout deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
