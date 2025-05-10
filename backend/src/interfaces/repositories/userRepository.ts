import { IUser } from '../../entities/user';

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
