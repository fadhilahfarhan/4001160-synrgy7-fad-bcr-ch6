import { CreateCar } from '../interfaces/CreateCar';
import { carRepository } from '../repository';

class CarService {
  async getAll() {
    return carRepository.getAll();
  }

  async getById(id: number) {
    return carRepository.getById(id);
  }

  async create(data: CreateCar) {
    return carRepository.create(data);
  }

  async update(id: number, data: any) {
    return carRepository.update(id, data);
  }

  async delete(id: number) {
    return carRepository.delete(id);
  }
}

export default CarService;
