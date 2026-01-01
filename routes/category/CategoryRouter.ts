import { verifySeller, verifyToken } from '../../middleware/authMiddleware.ts';
import { createCategory, getCategories } from '../../controllers/categories';
import { Router } from 'express';
import { validateData } from '../../validation/validation.ts';
import {z} from 'zod';



export const categoryValidation = z.object({
  name: z.string(),
  image: z.string()
});

const CategoryRouter = Router();


CategoryRouter.get('/', getCategories);
CategoryRouter.post('/', verifyToken, verifySeller, validateData(categoryValidation), createCategory);
export default CategoryRouter;