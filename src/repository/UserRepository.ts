import { UsersModel } from '../models/usersModel';
import { CreateUser } from '../interfaces/createUser';
class UserRepository {
  async getAll() {
    return await UsersModel.query();
  }

  async GetByEmail(email: string) {
    return await UsersModel.query().findOne({ email });
  }

  async GetById(id: number) {
    return await UsersModel.query().findById(id);
  }

  async create(data: CreateUser) {
    return await UsersModel.query().insert(data);
  }
}

export default UserRepository;
