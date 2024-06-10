import { Router } from 'express';
import SpaceshipsController from '../controllers/spaceshipsController';

const {
  getAllSpaceships,
  createSpaceship,
  deleteSpaceship,
  getSpaceship,
  updateSpaceship
} = SpaceshipsController;

const router = Router();

router.route('/').get(getAllSpaceships).post(createSpaceship);
router
  .route('/:id')
  .get(getSpaceship)
  .put(updateSpaceship)
  .patch(updateSpaceship)
  .delete(deleteSpaceship);

export default router;
