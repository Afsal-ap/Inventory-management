import { ISale } from '../entities/sale';
import { ISaleRepository } from '../interfaces/repositories/saleRepository';
import { IItemRepository } from '../interfaces/repositories/itemRepository';

export class SaleService {
  constructor(
    private saleRepo: ISaleRepository,
    private inventoryRepo: IItemRepository
  ) {}

  async recordSale(sale: ISale): Promise<ISale> {
    const item = await this.inventoryRepo.findById(sale.item); 
      
    if (!item || item.quantity < sale.quantity) {
      throw new Error('Insufficient stock or item not found');
    }

    // Deduct quantity
    await this.inventoryRepo.update(sale.item, {
      quantity: item.quantity - sale.quantity,
    });

    return this.saleRepo.create(sale);
  }

  async getAllSales() {
    return this.saleRepo.findAll();
  }

  async getSaleById(id: string) {
    return this.saleRepo.findById(id);
  }
}
