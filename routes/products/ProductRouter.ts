import { validateData } from '../../validation/validation';
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
  category: z.string()
});

export const productEditValid = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  category: z.string()
})

ProductRouter.get('/', getProducts);
ProductRouter.get('/:id', getProductId);
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