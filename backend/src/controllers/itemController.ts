import { Request, Response } from 'express';
import { ItemRepository } from '../repositories/itemRepositoryImpl';
import { ItemService } from '../services/itemService';

const itemService = new ItemService(new ItemRepository());

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await itemService.createItem(req.body);
    res.status(201).json(item);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getItems = async (req: Request, res: Response): Promise<void> => {
  const items = await itemService.getAllItems();
  res.json(items);
};

export const getItemById = async (req: Request, res: Response): Promise<void> => {
  const item = await itemService.getItemById(req.params.id);
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }
  res.json(item);
};

export const updateItem = async (req: Request, res: Response): Promise<void> => {
  const updated = await itemService.updateItem(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }
  res.json(updated);
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  await itemService.deleteItem(req.params.id);
  res.status(204).send();
};

export const searchItems = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  const items = await itemService.searchItems(query as string);
  res.json(items);
};