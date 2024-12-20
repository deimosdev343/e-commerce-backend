import { productValidation, validateData } from '../../validation/validation';
import { createProduct, deleteProduct, editProduct, getProductId, getProducts } from '../../controllers/products';
import { Router } from 'express';
const ProductRouter = Router();

ProductRouter.get('/', getProducts);
ProductRouter.get('/:id', getProductId);
ProductRouter.post('/', 
  validateData(productValidation),
  createProduct
);
ProductRouter.put('/', editProduct);
ProductRouter.delete('/', deleteProduct);




export default ProductRouter;