import { validateData, validateQueryParams } from '../../validation/validation';
import { createProduct, deleteProduct, editProduct, getProductId, getProducts, setFeatured } from '../../controllers/products';
import { Router } from 'express';
import { verifySeller, verifyToken } from '../../middleware/authMiddleware';
import {boolean, z, ZodError} from 'zod';

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


export const featuredGetSchema = z.object({
  limit: z.number().catch(10), 
  category: z.string().catch(""), 
  name:z.string().catch("")
});

export const featuredSchema = z.object({
  featured: z.boolean(),
  id: z.string(),
  feauredRanking: z.number().int().min(0, "Rank cannot be lower than zero").max(99, "Rank Cannot be higher than 99")
});

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

ProductRouter.put('/featured',
  verifyToken,
  verifySeller,
  validateData(featuredSchema),
  setFeatured
)
ProductRouter.get('/featured',
  validateQueryParams(featuredGetSchema),
  getProducts
);




export default ProductRouter;