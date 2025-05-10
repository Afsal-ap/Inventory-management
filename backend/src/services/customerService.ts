import { ICustomerRepository } from '../interfaces/repositories/customerRepository';
import { ICustomer } from '../entities/customer';

export class CustomerService {
  constructor(private customerRepo: ICustomerRepository) {}

  async createCustomer(data: ICustomer) {
    return this.customerRepo.create(data);
  }

  async getAllCustomers() {
    return this.customerRepo.findAll();
  }

  async getCustomerById(id: string) {
    return this.customerRepo.findById(id);
  }

  async updateCustomer(id: string, data: Partial<ICustomer>) {
    return this.customerRepo.update(id, data);
  }

  async deleteCustomer(id: string) {
    await this.customerRepo.delete(id);
  }
}
