import { Request, Response } from 'express';
import { CustomerRepository } from '../repositories/customerRepositoryImpl';
import { CustomerService } from '../services/customerService';

const customerService = new CustomerService(new CustomerRepository());

export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getCustomers = async (_: Request, res: Response):Promise<void> => {
  const customers = await customerService.getAllCustomers();
  res.json(customers);
};

export const getCustomerById = async (req: Request, res: Response):Promise<void> => {
  const customer = await customerService.getCustomerById(req.params.id);
  if (!customer){
    res.status(404).json({ message: 'Customer not found' });
    return;
  } 
  res.json(customer);
};

export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  const updated = await customerService.updateCustomer(req.params.id, req.body);
  if (!updated){
      res.status(404).json({ message: 'Customer not found' });
   return;
  } 
  res.json(updated);
};

export const deleteCustomer = async (req: Request, res: Response):Promise<void> => {
  await customerService.deleteCustomer(req.params.id);
  res.status(204).send();
};
