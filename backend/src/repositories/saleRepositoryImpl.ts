import { ISaleRepository } from '../interfaces/repositories/saleRepository';
import { SaleModel } from '../models/saleModel';
import { ISale } from '../entities/sale';

export class SaleRepository implements ISaleRepository {
  async create(sale: ISale): Promise<ISale> {
    const created = await new SaleModel(sale).save();
    return this.toISale(created);
  }

  async findAll(): Promise<any[]> {
    const sales = await SaleModel.find().populate('item', 'name price').populate('customer', 'name');
     
    console.log(sales , "saless");
    

    return sales
  }

  async findById(id: string): Promise<ISale | null> {
    const sale = await SaleModel.findById(id).populate('item customer');
    return sale ? this.toISale(sale) : null;
  }

  private toISale(doc: any): ISale {
    return {
      id: doc._id.toString(),
      item: typeof doc.item === 'object' ? doc.item._id.toString() : doc.item.toString(),
      customer: typeof doc.customer === 'object' ? doc.customer._id.toString() : doc.customer.toString(),
      quantity: doc.quantity,
      date: doc.date,
      isCash: doc.isCash,
    };
  }
}
