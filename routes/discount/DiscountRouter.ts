import { Router } from 'express';
import { validateData } from '../../validation/validation';
import {z} from 'zod';
import { verifyToken, verifySeller } from '../../middleware/authMiddleware';
import { createDiscount } from '../../controllers/discount';


export const discountValidation = z.object({
  description: z.string(),
  image: z.string(),
  discountAmount: z.number(),
  startDate: z.date(),
  endDate: z.date()
})

const DiscountRouter = Router();

DiscountRouter.post('/', verifyToken, verifySeller,validateData(discountValidation), createDiscount);

export default DiscountRouter;