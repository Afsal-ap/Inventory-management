import { Request, Response } from 'express';
import { SaleRepository } from '../repositories/saleRepositoryImpl';
import { ItemRepository } from '../repositories/itemRepositoryImpl';
import { SaleService } from '../services/saleService';

const saleService = new SaleService(new SaleRepository(), new ItemRepository());

export const createSale = async (req: Request, res: Response) => {
  try {
    const sale = await saleService.recordSale(req.body); 
    console.log(req.body,"datataaa");
    
    res.status(201).json(sale);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getSales = async (_: Request, res: Response) => {
  const sales = await saleService.getAllSales();
  res.json(sales);
};

export const getSaleById = async (req: Request, res: Response):Promise<void> => {
  const sale = await saleService.getSaleById(req.params.id);
  if (!sale) {
      res.status(404).json({ message: 'Sale not found' });
  return
  } 
  res.json(sale);
};
