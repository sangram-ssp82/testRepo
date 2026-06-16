import { Request, Response } from 'express';
import Activity from '../models/Activity';

// Get all activities
export const getAllActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json(activities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get activities by user
export const getActivitiesByUser = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId }).populate('userId');
    res.json(activities);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create activity
export const createActivity = async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, distance, calories, intensity, notes } = req.body;
    
    const newActivity = new Activity({
      userId,
      type,
      duration,
      distance,
      calories,
      intensity,
      notes
    });
    
    await newActivity.save();
    await newActivity.populate('userId');
    res.status(201).json(newActivity);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Update activity
export const updateActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId');
    
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    
    res.json(activity);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete activity
export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    
    res.json({ message: 'Activity deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
