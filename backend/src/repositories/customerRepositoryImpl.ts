import { ICustomerRepository } from '../interfaces/repositories/customerRepository';
import { CustomerModel } from '../models/customerModel';
import { ICustomer } from '../entities/customer';

export class CustomerRepository implements ICustomerRepository {
  async create(customer: ICustomer): Promise<ICustomer> {
    return await new CustomerModel(customer).save();
  }

  async findAll(): Promise<ICustomer[]> {
    return await CustomerModel.find();
  }

  async findById(id: string): Promise<ICustomer | null> {
    return await CustomerModel.findById(id);
  }

  async update(id: string, customer: Partial<ICustomer>): Promise<ICustomer | null> {
    return await CustomerModel.findByIdAndUpdate(id, customer, { new: true });
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.findByIdAndDelete(id);
  }
}
