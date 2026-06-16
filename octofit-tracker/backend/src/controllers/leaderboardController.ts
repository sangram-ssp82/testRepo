import { Request, Response } from 'express';
import Activity from '../models/Activity';
import User from '../models/User';

// Get leaderboard
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const period = req.query.period || 'week'; // week, month, alltime
    
    let startDate = new Date();
    
    if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'alltime') {
      startDate.setFullYear(1970);
    }
    
    const activities = await Activity.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$userId',
          totalDuration: { $sum: '$duration' },
          totalCalories: { $sum: '$calories' },
          totalDistance: { $sum: '$distance' },
          activityCount: { $sum: 1 }
        }
      },
      {
        $sort: { totalCalories: -1 }
      },
      {
        $limit: 50
      }
    ]);
    
    // Populate user data
    const leaderboard = await Promise.all(
      activities.map(async (item) => {
        const user = await User.findById(item._id);
        return {
          rank: activities.indexOf(item) + 1,
          user: {
            id: user?._id,
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName
          },
          stats: {
            totalDuration: item.totalDuration,
            totalCalories: item.totalCalories,
            totalDistance: item.totalDistance,
            activityCount: item.activityCount
          }
        };
      })
    );
    
    res.json({
      period,
      leaderboard
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get user rank
export const getUserRank = async (req: Request, res: Response) => {
  try {
    const period = req.query.period || 'week';
    
    let startDate = new Date();
    
    if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'alltime') {
      startDate.setFullYear(1970);
    }
    
    const userActivity = await Activity.aggregate([
      {
        $match: {
          userId: new (require('mongoose')).Types.ObjectId(req.params.userId),
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$userId',
          totalDuration: { $sum: '$duration' },
          totalCalories: { $sum: '$calories' },
          totalDistance: { $sum: '$distance' },
          activityCount: { $sum: 1 }
        }
      }
    ]);
    
    if (userActivity.length === 0) {
      return res.json({
        rank: null,
        stats: {
          totalDuration: 0,
          totalCalories: 0,
          totalDistance: 0,
          activityCount: 0
        }
      });
    }
    
    const allActivities = await Activity.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$userId',
          totalCalories: { $sum: '$calories' }
        }
      },
      {
        $sort: { totalCalories: -1 }
      }
    ]);
    
    const rank = allActivities.findIndex(
      (item) => item._id.toString() === req.params.userId
    ) + 1;
    
    res.json({
      rank,
      stats: userActivity[0]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
