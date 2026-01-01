import { Router } from 'express';
import { validateData,  loginValidation } from '../../validation/validation.ts';
import { authUser, loginUser, registerUser } from '../../controllers/auth/index.ts';
import { verifyToken } from '../../middleware/authMiddleware.ts';
import {z} from 'zod';

const AuthRouter = Router();


export const userValidation = z.object({
  email: z.string().email(),
  name: z.string(),
  address: z.string(),
  password: z.string().min(4) //placeholder
});

AuthRouter.post('/register', validateData(userValidation), registerUser);
AuthRouter.post('/', validateData(loginValidation), loginUser);
AuthRouter.get('/', verifyToken, authUser)
export default AuthRouter;