import { validateData, validateQueryParams } from '../../validation/validation';
import { createProduct, deleteProduct, editProduct, getProductId, getProducts } from '../../controllers/products';
import { Router } from 'express';
import { verifySeller, verifyToken } from '../../middleware/authMiddleware';
import {z, ZodError} from 'zod';

const ProductRouter = Router();

export const productValidation = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  category: z.string(),
  colors: z.array(z.string()).min(1),
  extraImages: z.array(z.string()),
  sizes: z.array(z.string()).min(1),
});

export const productEditValid = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  category: z.string(),
  colors: z.array(z.string()),
  extraImages: z.array(z.string()),
  sizes: z.array(z.string())
});

export const productParamsSchema = z.object({
  limit: z.number().catch(10), 
  category: z.string().catch(""), 
  sortBy: z.enum(["priceDesc","priceAsc","createdAtDesc","createdAtAsc"]).catch("createdAtDesc"), 
  name:z.string().catch("")
})


ProductRouter.get('/',
  validateQueryParams(productParamsSchema),
  getProducts
);
ProductRouter.get('/getProductById',getProductId);
ProductRouter.post('/', 
  verifyToken,
  verifySeller,
  validateData(productValidation),
  createProduct
);
ProductRouter.put('/',
  verifyToken,
  verifySeller,
  validateData(productEditValid),
  editProduct
);
ProductRouter.delete('/',
  verifyToken,
  verifySeller,
  deleteProduct
);




export default ProductRouter;