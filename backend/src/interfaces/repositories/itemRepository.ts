import { IItem } from '../../entities/item';

export interface IItemRepository {
  create(item: IItem): Promise<IItem>;
  findById(id: string): Promise<IItem | null>;
  findAll(): Promise<IItem[]>;
  update(id: string, item: Partial<IItem>): Promise<IItem | null>;
  delete(id: string): Promise<boolean>;
  search(query: string): Promise<IItem[]>; 

}
