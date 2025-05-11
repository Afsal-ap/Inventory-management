import { Request, Response, NextFunction } from 'express';
import { ReportService } from '../services/reportService';
import { exportItemsToExcel } from '../utils/export/itemReportExcelExporter';
import { ItemModel } from '../models/itemModel';
import { exportItemsToPDF } from '../utils/export/itemReportPdfExporter';
import PDFDocument from 'pdfkit';
import { sendEmailWithAttachment } from '../utils/email/emailService';
import { IItem } from '../entities/item';

const reportService = new ReportService();  

export const getSalesReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startDate, endDate, customerId, itemId } = req.query;
     
        
    const report = await reportService.getSalesReport({
      startDate: startDate as string,
      endDate: endDate as string,
      customerId: customerId as string,
      itemId: itemId as string,
    });
       
    res.json(report);
  } catch (err) {
    next(err);
  }
};
export const getItemReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search } = req.query;
  
      const report = await reportService.getItemReport(search as string);
              
      res.json(report);
    } catch (err) {
      next(err);
    }
  };

  export const getCustomerLedger = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { customerId } = req.params;
      const ledger = await reportService.getCustomerLedger(customerId); 

      console.log(ledger, "data")
      res.json(ledger);
    } catch (err) {
      next(err);
    }
  };

  export const exportItemReportExcel = async (req: Request, res: Response) => {
    const items = await ItemModel.find();
    const plainItems: IItem[] = items.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    }));
  
    await exportItemsToExcel(plainItems, res);
  };
  

  export const exportItemReportPDF = async (req: Request, res: Response) => {
    const items = await ItemModel.find();
    const plainItems: IItem[] = items.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    }));
  
    exportItemsToPDF(plainItems, res);
  };
  

  
export const emailItemReport = async (req: Request, res: Response) => {
    const { to } = req.body;
    const items = await ItemModel.find();
  
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];
  
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(buffers);
      await sendEmailWithAttachment(to, 'Item Report', 'Please find the attached Item Report.', 'ItemReport.pdf', pdfBuffer);
      res.status(200).json({ message: 'Email sent successfully' });
    });
  
    // PDF content
    doc.fontSize(16).text('Item Report', { align: 'center' });
    doc.moveDown();
    items.forEach(item => {
      const total = item.quantity * item.price;
      doc.text(`${item.name} | ${item.description || '-'} | Qty: ${item.quantity} | Price: ${item.price} | Total: ${total}`);
    });
}