import { Router } from 'express';
import { verifySeller, verifyToken } from '../../middleware/authMiddleware';
import { getLatestPurchases, getLatestViews } from '../../controllers/stats';
 
const StatsRouter = Router();

StatsRouter.get('/latestViews', verifyToken, verifySeller, getLatestViews)
StatsRouter.get('/latestPurchases', verifyToken, verifySeller, getLatestPurchases);

export default StatsRouter;
