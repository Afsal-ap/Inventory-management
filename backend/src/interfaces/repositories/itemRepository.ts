import { IItem } from '../../entities/item';

export interface IItemRepository {
  create(item: IItem): Promise<IItem>;
  findById(id: string): Promise<IItem | null>;
  findByName(name: string): Promise<IItem | null>; // ✅ Add this line
  findAll(): Promise<IItem[]>;
  update(id: string, item: Partial<IItem>): Promise<IItem | null>;
  delete(id: string): Promise<boolean>;
  search(query: string): Promise<IItem[]>; 

}
