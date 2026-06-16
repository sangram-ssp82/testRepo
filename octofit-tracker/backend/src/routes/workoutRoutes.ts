import express from 'express';
import {
  getAllWorkouts,
  getWorkoutsByUser,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  completeWorkout,
  deleteWorkout
} from '../controllers/workoutController';

const router = express.Router();

router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);
router.get('/user/:userId', getWorkoutsByUser);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.post('/:id/complete', completeWorkout);
router.delete('/:id', deleteWorkout);

export default router;
