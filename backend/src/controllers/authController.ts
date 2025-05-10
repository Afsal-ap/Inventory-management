import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { UserRepository } from '../repositories/userRepositoryImpl';

const authService = new AuthService(new UserRepository());

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; 
    console.log(req.body,"backend working");
    
    const result = await authService.login(email, password); 

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
