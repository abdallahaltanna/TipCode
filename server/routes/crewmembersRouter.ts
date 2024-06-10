import { Router } from 'express';
import CrewMembersController from '../controllers/crewmembersController';

const {
  getAllCrewmembers,
  createCrewmember,
  deleteCrewmember,
  getCrewmember,
  updateCrewmember
} = CrewMembersController;

const router = Router();

router.route('/').get(getAllCrewmembers).post(createCrewmember);

router
  .route('/:id')
  .get(getCrewmember)
  .put(updateCrewmember)
  .patch(updateCrewmember)
  .delete(deleteCrewmember);

export default router;
