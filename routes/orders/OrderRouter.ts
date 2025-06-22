import { Router } from 'express';
import { validateData } from '../../validation/validation';
import { verifyToken } from '../../middleware/authMiddleware';
import {z, ZodError} from 'zod';
import { createOrder } from '../../controllers/order';

const OrderRouter = Router();


const zodProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  amount: z.number(),
  color: z.string(),
  size: z.string()
})

const orderValidation = z.object({
  products: z.array(zodProductSchema),
});

OrderRouter.post('/', validateData(orderValidation), createOrder);

export default OrderRouter;