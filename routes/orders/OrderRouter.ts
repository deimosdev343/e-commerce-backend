import { Router } from 'express';
import { validateData } from '../../validation/validation';
import { verifyToken } from '../../middleware/authMiddleware';
import {z, ZodError} from 'zod';
import { createOrder } from '../../controllers/order';

const OrderRouter = Router();


const zodProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
})
const orderValidation = z.object({
  products: z.array(zodProductSchema),
});

OrderRouter.post('/', verifyToken, validateData(orderValidation), createOrder);

export default OrderRouter;