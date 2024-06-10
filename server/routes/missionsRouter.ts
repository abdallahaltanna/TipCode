import { Router } from 'express';
import missionsController from '../controllers/missionsController';

const {
  getAllMissions,
  createMission,
  deleteMission,
  getMission,
  updateMission
} = missionsController;

const router = Router();

router.route('/').get(getAllMissions).post(createMission);

router
  .route('/:id')
  .get(getMission)
  .put(updateMission)
  .patch(updateMission)
  .delete(deleteMission);

export default router;
