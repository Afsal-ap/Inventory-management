import { IItem } from '../entities/item';
import { IItemRepository } from '../interfaces/repositories/itemRepository';
import { ItemModel } from '../models/itemModel';

export class ItemRepository implements IItemRepository {
  async create(item: IItem): Promise<IItem> {
    const existingItem = await this.findByName(item.name);
    if (existingItem) {
      throw new Error("Item with this name already exists.");
    }
  
    const created = await ItemModel.create(item);
    return this.toIItem(created);
  }
  

  async findById(id: string): Promise<IItem | null> {
    const doc = await ItemModel.findById(id);
    return doc ? this.toIItem(doc) : null;
  }


  async findByName(name: string): Promise<IItem | null> {
    const item = await ItemModel.findOne({ name });
    return item ? this.toIItem(item) : null;
  }
  

  async findAll(): Promise<IItem[]> {
    const items = await ItemModel.find();
    return items.map(this.toIItem);
  }

  async update(id: string, item: Partial<IItem>): Promise<IItem | null> {
    const updated = await ItemModel.findByIdAndUpdate(id, item, { new: true });
    return updated ? this.toIItem(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ItemModel.findByIdAndDelete(id);
    return !!result;
  }
  async search(query: string): Promise<IItem[]> {
    const items = await ItemModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
    return items.map(this.toIItem);
  }

  private toIItem(doc: any): IItem {
    return {
      id: doc._id.toString(),
      name: doc.name,
      quantity: doc.quantity,
      price: doc.price,
      description: doc.description,
    };
  }
}
