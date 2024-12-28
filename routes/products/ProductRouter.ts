import { productEditValid, productValidation, validateData } from '../../validation/validation';
import { createProduct, deleteProduct, editProduct, getProductId, getProducts } from '../../controllers/products';
import { Router } from 'express';
import { verifySeller, verifyToken } from '../../middleware/authMiddleware';
const ProductRouter = Router();

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