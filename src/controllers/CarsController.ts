import { Request, Response } from 'express';
import { CarsModel } from '../models/CarsModel';
import { Cars } from '../interfaces/Cars';
import { CreateCar } from '../interfaces/CreateCar';
import { carService } from '../services';
import cloudinaryHelper from '../utils/cloudinaryHelper';

function adminOnly(role: string) {
  return role === 'member';
}

class CarsController {
  async getAll(req: Request, res: Response) {
    try {
      if (adminOnly(req.user.role)) {
        return res.status(404).json({ message: 'unauthorize' });
      }
      const getCars: Cars[] = await carService.getAll();
      if (!getCars.length) {
        return res.status(404).json({
          message: 'No cars found',
        });
      }

      return res.status(200).json({
        message: 'Get all cars successfully',
        data: getCars,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message || 'An unknown error occurred',
      });
    }
  }

  async getByAvailability(req: Request, res: Response) {
    try {
      if (adminOnly(req.user.role)) {
        return res.status(404).json({ message: 'unauthorize' });
      }

      const getCars: Cars[] | undefined = await carService.getAll();

      if (!getCars) {
        return res.status(404).json({ message: 'Car not found' });
      }

      const stringToBoolean = req.params.condition == 'true' ? true : false;

      const filteredCars = getCars.filter((car) => car.availability === stringToBoolean);

      return res.status(200).json({
        message: 'Get car successfully',
        data: filteredCars,
      });
    } catch (error) {}
  }

  async getById(req: Request, res: Response) {
    try {
      if (adminOnly(req.user.role)) {
        return res.status(404).json({ message: 'unauthorize' });
      }
      const requestId: number = Number(req.params.id);

      if (isNaN(requestId)) {
        throw new Error('Invalid ID cars');
      }

      const getCar: Cars | undefined = await carService.getById(requestId);

      if (!getCar) {
        return res.status(404).json({ message: 'Car not found' });
      }

      return res.status(200).json({
        message: 'Get car successfully',
        data: getCar,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message || 'An unknown error occurred',
      });
    }
  }

  async insert(req: Request, res: Response) {
    try {
      if (adminOnly(req.user.role)) {
        return res.status(404).json({ message: 'unauthorize' });
      }

      const { name, price, category, availability, start_date, end_date } =
        req.body;

      if (
        !name ||
        !price ||
        !start_date ||
        !end_date ||
        !category ||
        !availability
      ) {
        return res.status(400).json({
          message: 'Invalid input data. Please provide all required fields',
        });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'Please upload a picture.' });
      }

      const fileBase64: string | undefined =
        req.file?.buffer.toString('base64');
      const file: string = `data:${req.file?.mimetype};base64,${fileBase64}`;

      const reqData: CreateCar = {
        name,
        price: Number(price),
        picture: '',
        category,
        availability,
        start_date,
        end_date,
        created_by: req.user.username,
      };

      const secureUrl: string = await cloudinaryHelper.upload(file);
      reqData.picture = secureUrl;
      const createCar = await carService.create(reqData);

      if (!createCar) {
        res.status(500).json({
          message: 'Failed to add car to the database',
        });
      }

      return res.status(201).json({ message: 'Cars successfully added' });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message || 'An unknown error occurred',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (adminOnly(req.user.role)) {
        return res.status(404).json({ message: 'unauthorize' });
      }

      const {
        name,
        price,
        picture,
        category,
        availability,
        start_date,
        end_date,
      } = req.body;
      const requestId: number = Number(req.params.id);
      const getCar: Cars | undefined = await CarsModel.query().findById(
        requestId
      );

      if (!getCar) {
        return res.status(404).json({
          message: 'Car not found',
        });
      }

      const updatedCar = {
        name: name || getCar.name,
        price: price || getCar.price,
        picture: getCar.picture,
        category: category || getCar.category,
        availability: availability || getCar.availability,
        start_date: start_date || getCar.start_date,
        end_date: end_date || getCar.end_date,
        updated_by: req.user.username,
        updated_at: new Date().toISOString(),
      };

      if (req.file) {
        const fileBase64: string | undefined =
          req.file?.buffer.toString('base64');
        const file: string = `data:${req.file?.mimetype};base64,${fileBase64}`;

        cloudinaryHelper.destroy(getCar.picture);
        updatedCar.picture = await cloudinaryHelper.upload(file);
      }

      const updated = await carService.update(requestId, updatedCar);

      if (updated) {
        return res.status(200).json({
          message: 'Car data successfully updated',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Failed to update car data',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      if (adminOnly(req.user.role)) {
        return res.status(404).json({ message: 'unauthorize' });
      }

      const requestId: number = Number(req.params.id);

      if (isNaN(requestId)) {
        throw new Error('Invalid ID cars');
      }

      const getCar: Cars | undefined = await carService.getById(requestId)
      const result = await carService.delete(requestId)

      if (!result) {
        return res.status(404).json({ message: 'Cars not found' });
      }

      if (getCar) {
        cloudinaryHelper.destroy(getCar.picture);
      }

      return res.status(200).json({ message: 'Cars successfully deleted' });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message || 'An unknown error occurred',
      });
    }
  }
}

export default CarsController;
