import { Router } from 'express';
import { validateData } from '../../validation/validation';
import { verifyToken } from '../../middleware/authMiddleware';

const OrderRouter = Router();

export default OrderRouter;