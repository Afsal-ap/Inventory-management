import { Request, Response, NextFunction } from 'express';
import { ExportService } from '../services/exportService';

const exportService = new ExportService();

export const exportSalesExcel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await exportService.exportSalesToExcel(res);
  } catch (err) {
    next(err);
  }
};

export const exportSalesPDF = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await exportService.exportSalesToPDF(res);
    } catch (err) {
      next(err);
    }
  };
  
  export const emailSalesReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { toEmail } = req.body;
      await exportService.sendSalesReportByEmail(toEmail);
      res.status(200).json({ message: 'Report emailed successfully' });
    } catch (err) {
      next(err);
    }
  };
  