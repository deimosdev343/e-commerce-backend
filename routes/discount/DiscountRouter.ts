import { Router } from 'express';
import { validateData, validateQueryParams } from '../../validation/validation.ts';
import {z} from 'zod';
import { verifyToken, verifySeller } from '../../middleware/authMiddleware.ts';
import { addItemToDiscount, createDiscount, deleteDiscount, editDiscount, getDiscount, getDiscounts, getDiscountsForClient, getDiscountsProducts, removeItemToDiscount } from '../../controllers/discount';
import dayjs from 'dayjs';


export const discountValidation = z.object({
  description: z.string(),
  image: z.string(),
  discountAmount: z.number().min(1).max(99),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  background: z.string()
});

export const discountEditValidation = z.object({
  discountId: z.string(),
  description: z.string(),
  image: z.string(),
  discountAmount: z.number().min(1).max(99),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  background: z.string()
})

// Thank fuck for zod, I swear to god
export const discountParamValidation = z.object({
  description: z.string().catch(""),
  startDate: z.string().datetime().catch(dayjs().subtract(1, 'month').toISOString()),
  endDate: z.string().datetime().catch(dayjs().add(1, 'month').toISOString()),
  limit: z.number().catch(10)

});


export const addDiscountProdValidation = z.object({
  prodId: z.string(),
  discountId: z.string()
})

export const getDiscountValidation = z.object({
  discountId: z.string() 
});

const DiscountRouter = Router();

DiscountRouter.post('/', verifyToken, verifySeller,validateData(discountValidation), createDiscount);
DiscountRouter.get('/', verifyToken, verifySeller, validateQueryParams(discountParamValidation), getDiscounts);
DiscountRouter.get('/getDiscountsForClient', getDiscountsForClient);
DiscountRouter.delete('/', verifyToken, verifySeller, deleteDiscount);
DiscountRouter.put('/', verifyToken, verifySeller, validateData(discountEditValidation), editDiscount);
DiscountRouter.put('/items/', verifyToken, verifySeller, validateData(addDiscountProdValidation), addItemToDiscount);
DiscountRouter.put('/items/delete', verifyToken, verifySeller, validateData(addDiscountProdValidation), removeItemToDiscount);
DiscountRouter.get('/getDiscount', validateQueryParams(getDiscountValidation), getDiscount);
DiscountRouter.get('getDiscountProducts',validateQueryParams(getDiscountValidation), getDiscountsProducts);
export default DiscountRouter;