import express from 'express';
import {
  getAllTeams,
  getTeamById,
  createTeam,
  addMemberToTeam,
  removeMemberFromTeam,
  updateTeam,
  deleteTeam
} from '../controllers/teamController';

const router = express.Router();

router.get('/', getAllTeams);
router.get('/:id', getTeamById);
router.post('/', createTeam);
router.post('/:id/members', addMemberToTeam);
router.delete('/:id/members', removeMemberFromTeam);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

export default router;
