import { Router } from 'express';

import spaceshipsRouter from './spaceshipsRouter';
import crewmembersRouter from './crewmembersRouter';
import missionsRouter from './missionsRouter';

const router = Router();

router.use('/spaceships', spaceshipsRouter);
router.use('/crewmembers', crewmembersRouter);
router.use('/missions', missionsRouter);

export default router;
