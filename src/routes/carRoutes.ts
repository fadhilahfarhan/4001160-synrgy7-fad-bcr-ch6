import { Router } from 'express';
import { carsController } from '../controllers';
import { upload } from '../config/multer';
import authorize from '../middleware/authUser'

const carRoutes = Router();

carRoutes.get('/',authorize, carsController.getAll);
carRoutes.get('/availability/:condition',authorize, carsController.getByAvailability)
carRoutes.get('/detail/:id',authorize, carsController.getById);
carRoutes.post('/create', upload.single('picture'), authorize, carsController.insert);
carRoutes.delete('/detail/:id',authorize, carsController.delete);
carRoutes.put('/detail/:id',upload.single('picture'), authorize, carsController.update);

export default carRoutes;
