import { Router } from 'express';
import { verifySeller, verifyToken } from '../../middleware/authMiddleware';
import { 
  getLatestPurchases,
  getLatestViews,
  getMostViewedProduct 
} from '../../controllers/stats';
 
const StatsRouter = Router();

StatsRouter.get('/latestViews', verifyToken, verifySeller, getLatestViews)
StatsRouter.get('/latestPurchases', verifyToken, verifySeller, getLatestPurchases);
StatsRouter.get('/topViews',verifyToken, verifySeller, getMostViewedProduct);
// StatsRouter.get('/topSells', verifyToken, verifySeller, get)

export default StatsRouter;
