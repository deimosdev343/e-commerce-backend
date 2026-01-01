import { Router } from 'express';
import { validateData } from '../../validation/validation';

import {z, ZodError} from 'zod';
import { calculateOrder, createOrder } from '../../controllers/order';

const OrderRouter = Router();


const zodProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  color: z.string(),
  size: z.string(),
  discountId: z.union([z.string(), z.null()])
});

const orderValidation = z.object({
  products: z.array(zodProductSchema),
});

OrderRouter.post('/', validateData(orderValidation), createOrder);
OrderRouter.post('/calculateOrder', validateData(orderValidation), calculateOrder);

export default OrderRouter;