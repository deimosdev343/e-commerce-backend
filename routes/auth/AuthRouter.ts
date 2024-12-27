import { Router } from 'express';
import { validateData, userValidation, loginValidation } from '../../validation/validation';
import { loginUser, registerUser } from '../../controllers/auth/index';
const AuthRouter = Router();

AuthRouter.post('/register', validateData(userValidation), registerUser);
AuthRouter.post('/', validateData(loginValidation), loginUser);

export default AuthRouter;