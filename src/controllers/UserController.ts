import { Request, Response } from 'express';
import { userService } from '../services';
import bcryptHelper from '../utils/BcryptHelper';
import { Users } from '../interfaces/users';
import createToken from '../utils/tokenHelper';

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const getUsers: Users[] = await userService.getAll();

      if (!getUsers.length) {
        return res.status(404).json({
          message: 'No Users found',
        });
      }

      return res.status(200).json({
        message: 'Get all users successfully',
        data: getUsers,
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message || 'An unknown error occurred',
      });
    }
  }

  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const encryptedPassword = await bcryptHelper.encryptPassword(password);
    const newUserData = {
      username,
      email,
      password: encryptedPassword,
      role: 'member',
    };

    if(req.user){
      newUserData.role = 'admin'

      if(req.user.role === 'admin'){
        return res.status(404).json({ message: 'unauthorize' });
      }
    }
    
    try {
      if (!username || !email || !password) {
        return res.status(404).json({ message: 'Please Fill all fields' });
      }
      
      const user = await userService.create(newUserData);
      console.log(user);

      if (!user) {
        return res.status(404).json({ message: 'Failed to create user' });
      }

      return res.status(201).json({
        message: 'create user successfully',
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(404).json({ message: 'Failed to create user' });
    }
  }

  async login(req: Request, res: Response) {
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {
      if (!email || !password) {
        return res.status(404).json({ message: 'Please Fill All Fields' });
      }

      const user = await userService.getByEmail(email.toLowerCase());

      if (!user) {
        return res.status(200).json({ message: 'user tidak ditemukan' });
      }

      const isPasswordCorrect = await bcryptHelper.checkPassword(
        user.password,
        password
      );

      if (!isPasswordCorrect) {
        return res.status(404).json({ message: 'wrong password' });
      }

      const token = createToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      return res.status(201).json({
        id: user.id,
        email: user.email,
        token,
        role: user.role,
      });
    } catch (error) {
      return res.status(404).json({ message: 'something wrong' });
    }
  }
}

export default UserController;
