import { Router } from 'express';
import { userController } from '../controllers';
import authorize from '../middleware/authUser';

const userRoutes = Router();

userRoutes.get('/', userController.getAll);
userRoutes.post('/superadmin/createadmin', authorize, userController.register);
userRoutes.post('/register/member', userController.register);
userRoutes.post('/login/superadmin', userController.login);
userRoutes.post('/login/member', userController.login);

export default userRoutes;
