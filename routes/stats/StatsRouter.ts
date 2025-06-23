import { Router } from 'express';
import { verifySeller, verifyToken } from '../../middleware/authMiddleware';
import { getLatestViews } from '../../controllers/stats';
 
const StatsRouter = Router();

StatsRouter.get('/latestViews', verifyToken, verifySeller, getLatestViews)

export default StatsRouter;
