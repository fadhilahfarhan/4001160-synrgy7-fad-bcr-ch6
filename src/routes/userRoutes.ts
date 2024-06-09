import { Router } from 'express';
import { userController } from '../controllers';
import authorize from '../middleware/authUser';

const userRoutes = Router();

userRoutes.get('/',authorize, userController.getAll);
userRoutes.get('/whoami', authorize, userController.whoami);
userRoutes.post('/superadmin/createadmin', authorize, userController.register);
userRoutes.post('/register/member', userController.register);
userRoutes.post('/login/superadmin', userController.login);
userRoutes.post('/login/member', userController.login);

export default userRoutes;
