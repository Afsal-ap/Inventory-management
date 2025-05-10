import { IUserRepository } from '../interfaces/repositories/userRepository';
import { UserModel } from '../models/userModel';
import { IUser } from '../entities/user';

export class UserRepository implements IUserRepository {
  async createUser(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }
}
