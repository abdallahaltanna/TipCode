import { Router } from 'express';
import CrewMembersController from '../controllers/crewmembersController';

const {
  getAllCrewmembers,
  createCrewmember,
  deleteCrewmember,
  getCrewmember,
  updateCrewmember,
  patchCrewmember
} = CrewMembersController;

// Crewmembers router
const router = Router();

// Crewmembers routes
router.route('/').get(getAllCrewmembers).post(createCrewmember);

router
  .route('/:id')
  .get(getCrewmember)
  .put(updateCrewmember)
  .patch(patchCrewmember)
  .delete(deleteCrewmember);

export default router;
