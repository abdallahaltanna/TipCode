import { Router } from 'express';
import SpaceshipsController from '../controllers/spaceshipsController';

const {
  getAllSpaceships,
  createSpaceship,
  deleteSpaceship,
  getSpaceship,
  updateSpaceship,
  patchSpaceship
} = SpaceshipsController;

const router = Router();

// Spaceships routes
router.route('/').get(getAllSpaceships).post(createSpaceship);
router
  .route('/:id')
  .get(getSpaceship)
  .put(updateSpaceship)
  .patch(patchSpaceship)
  .delete(deleteSpaceship);

export default router;
