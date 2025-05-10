import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../interfaces/repositories/userRepository';
import { IUser } from '../entities/user';

export class AuthService {
  constructor(private userRepo: IUserRepository) {}

  async register(user: IUser) {
    const existing = await this.userRepo.findByEmail(user.email);
    if (existing) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.userRepo.createUser({ ...user, password: hashedPassword });
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
}
