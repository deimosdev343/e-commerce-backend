import { Router } from 'express';
import { validateData, userValidation, loginValidation } from '../../validation/validation';
import { authUser, loginUser, registerUser } from '../../controllers/auth/index';
import { verifyToken } from '../../middleware/authMiddleware';
const AuthRouter = Router();

AuthRouter.post('/register', validateData(userValidation), registerUser);
AuthRouter.post('/', validateData(loginValidation), loginUser);
AuthRouter.get('/', verifyToken, authUser)
export default AuthRouter;