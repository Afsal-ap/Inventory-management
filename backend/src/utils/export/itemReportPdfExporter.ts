import PDFDocument from 'pdfkit';
import { IItem } from '../../entities/item';
import { Response } from 'express';

export const exportItemsToPDF = (items: IItem[], res: Response) => {
  const doc = new PDFDocument({ margin: 30, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=ItemReport.pdf');

  doc.pipe(res);

  doc.fontSize(18).text('Item Report', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12);
  doc.text('Name', 50, doc.y, { continued: true });
  doc.text('Description', 150, doc.y, { continued: true });
  doc.text('Qty', 350, doc.y, { continued: true });
  doc.text('Price', 400, doc.y, { continued: true });
  doc.text('Total', 450);

  doc.moveDown();

  items.forEach(item => {
    const total = item.quantity * item.price;
    doc.text(item.name, 50, doc.y, { continued: true });
    doc.text(item.description || '-', 150, doc.y, { continued: true });
    doc.text(item.quantity.toString(), 350, doc.y, { continued: true });
    doc.text(item.price.toFixed(2), 400, doc.y, { continued: true });
    doc.text(total.toFixed(2), 450);
  });

  doc.end();
};
