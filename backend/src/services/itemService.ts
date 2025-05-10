import { IItemRepository } from '../interfaces/repositories/itemRepository';
import { IItem } from '../entities/item';

export class ItemService {
  constructor(private itemRepo: IItemRepository) {}

  async createItem(item: IItem) {
    return this.itemRepo.create(item);
  }

  async getAllItems() {
    return this.itemRepo.findAll();
  }

  async getItemById(id: string) {
    return this.itemRepo.findById(id);
  }

  async updateItem(id: string, item: Partial<IItem>) {
    return this.itemRepo.update(id, item);
  }

  async deleteItem(id: string) {
    await this.itemRepo.delete(id);
  }

  async searchItems(query: string) {
    return this.itemRepo.search(query);
  }
}
