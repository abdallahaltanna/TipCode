import { Router } from 'express';
import missionsController from '../controllers/missionsController';

const {
  getAllMissions,
  createMission,
  deleteMission,
  getMission,
  updateMission,
  patchMission
} = missionsController;

const router = Router();

// Missions routes
router.route('/').get(getAllMissions).post(createMission);

router
  .route('/:id')
  .get(getMission)
  .put(updateMission)
  .patch(patchMission)
  .delete(deleteMission);

export default router;
