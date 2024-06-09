import { userRepository } from '../repository';
import { CreateUser } from '../interfaces/createUser';

class UserService {
  async getAll() {
    return await userRepository.getAll();
  }

  async getByEmail(email: string) {
    return await userRepository.GetByEmail(email);
  }

  async getById(id: number) {
    return await userRepository.GetById(id);
  }

  async create(data: CreateUser) {
    const users = await this.getAll();
    const uniqueUsername = users.find((user) => user.username === data.username);
    const uniqueEmail = users.find((user) => user.email === data.email);
    if(uniqueUsername || uniqueEmail){
      return false;
    }
    return await userRepository.create(data);
  }

}

export default UserService;
