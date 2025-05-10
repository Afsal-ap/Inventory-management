import { ISale } from '../../entities/sale';

export interface ISaleRepository {
  create(sale: ISale): Promise<ISale>;
  findAll(): Promise<ISale[]>;
  findById(id: string): Promise<ISale | null>;
}
