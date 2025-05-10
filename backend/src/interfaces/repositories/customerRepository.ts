import { ICustomer } from '../../entities/customer';

export interface ICustomerRepository {
  create(customer: ICustomer): Promise<ICustomer>;
  findAll(): Promise<ICustomer[]>;
  findById(id: string): Promise<ICustomer | null>;
  update(id: string, customer: Partial<ICustomer>): Promise<ICustomer | null>;
  delete(id: string): Promise<void>;
}
