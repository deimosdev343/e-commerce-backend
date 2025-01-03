import { verifySeller, verifyToken } from '../../middleware/authMiddleware';
import { getCategories } from '../../controllers/categories';
import { Router } from 'express';
import { validateData } from '../../validation/validation';
import {z} from 'zod';



export const categoryValidation = z.object({
  name: z.string(),
});

const CategoryRouter = Router();


CategoryRouter.get('/', getCategories);
CategoryRouter.post('/', verifyToken, verifySeller, validateData(categoryValidation));
export default CategoryRouter;