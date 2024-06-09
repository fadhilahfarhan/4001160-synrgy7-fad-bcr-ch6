import { CreateCar } from '../interfaces/CreateCar';
import { CarsModel } from '../models/CarsModel';

class CarRepository {
  async getAll() {
    return await CarsModel.query();
  }

  async getById(id: number) {
    return await CarsModel.query().findById(id);
  }

  async create(data: CreateCar) {
    return await CarsModel.query().insert(data);
  }

  async update(id: number, data: any) {
    console.log(data);

    return await CarsModel.query().findById(id).update(data);
  }

  async delete(id: number) {
    return await CarsModel.query().findById(id).delete();
  }
}

export default CarRepository;
