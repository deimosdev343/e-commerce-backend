import { Router } from 'express';
import { validateData, userValidation } from '../../validation/validation';
import { registerUser } from '../../controllers/auth/index';
const AuthRouter = Router();
AuthRouter.post('/register', validateData(userValidation), registerUser);


export default AuthRouter;