import { Router } from 'express';
import { validateData, validateQueryParams } from '../../validation/validation';
import {z} from 'zod';
import { verifyToken, verifySeller } from '../../middleware/authMiddleware';
import { createDiscount, getDiscounts } from '../../controllers/discount';
import dayjs from 'dayjs';


export const discountValidation = z.object({
  description: z.string(),
  image: z.string(),
  discountAmount: z.number().min(1).max(99),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  background: z.string()
});

// Thank fuck for zod, I swear to god
export const discountParamValidation = z.object({
  description: z.string().catch(""),
  startDate: z.string().datetime().catch(dayjs().subtract(1, 'month').toISOString()),
  endDate: z.string().datetime().catch(dayjs().add(1, 'month').toISOString()),
  limit: z.number().catch(10)
});

const DiscountRouter = Router();

DiscountRouter.post('/', verifyToken, verifySeller,validateData(discountValidation), createDiscount);
DiscountRouter.get('/', verifyToken, verifySeller, validateQueryParams(discountParamValidation), getDiscounts);
export default DiscountRouter;