import { Request, Response } from 'express';
import Team from '../models/Team';

// Get all teams
export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members').populate('leaderName');
    res.json(teams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get team by ID
export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('members').populate('leaderName');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json(team);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create team
export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, description, leaderName } = req.body;
    
    const newTeam = new Team({
      name,
      description,
      members: [],
      leaderName
    });
    
    await newTeam.save();
    await newTeam.populate('leaderName');
    res.status(201).json(newTeam);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Add member to team
export const addMemberToTeam = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $push: { members: userId } },
      { new: true }
    ).populate('members').populate('leaderName');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json(team);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Remove member from team
export const removeMemberFromTeam = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: userId } },
      { new: true }
    ).populate('members').populate('leaderName');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json(team);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Update team
export const updateTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('members').populate('leaderName');
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json(team);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete team
export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    
    res.json({ message: 'Team deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
