import ExcelJS from 'exceljs';
import { Response } from 'express';
import { SaleModel } from '../models/saleModel';
import PDFDocument from 'pdfkit';
import { transporter } from '../utils/email';
import { PassThrough } from 'stream';

export class ExportService {
  async exportSalesToExcel(res: Response): Promise<void> {
    const sales = await SaleModel.find().populate('item customer');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sales Report');

    // Add headers
    worksheet.addRow(['Date', 'Item', 'Customer', 'Quantity', 'Price', 'Total']);

    // Add rows
    sales.forEach((sale) => {
      const item = sale.item as any;
      const customer = sale.customer as any;
      const total = sale.quantity * item.price;
      worksheet.addRow([
        sale.date.toDateString(),
        item.name,
        customer.name,
        sale.quantity,
        item.price,
        total
      ]);
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="sales-report.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } 

  async exportSalesToPDF(res: Response): Promise<void> {
    const sales = await SaleModel.find().populate('item customer');

    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="sales-report.pdf"');
    
    doc.pipe(res);

    doc.fontSize(18).text('Sales Report', { align: 'center' });
    doc.moveDown();

    sales.forEach((sale) => {
      const item = sale.item as any;
      const customer = sale.customer as any;
      const total = item.price * sale.quantity;

      doc.fontSize(12).text(`Date: ${sale.date.toDateString()}`);
      doc.text(`Item: ${item.name}`);
      doc.text(`Customer: ${customer.name}`);
      doc.text(`Quantity: ${sale.quantity}`);
      doc.text(`Price: ${item.price}`);
      doc.text(`Total: ${total}`);
      doc.moveDown();
    });

    doc.end();
  }


  async sendSalesReportByEmail(toEmail: string): Promise<void> {
    const sales = await SaleModel.find().populate('item customer');

    const doc = new PDFDocument();
    const bufferStream = new PassThrough();

    let buffers: Uint8Array[] = [];
    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(buffers);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Sales Report',
        text: 'Please find attached the latest sales report.',
        attachments: [
          {
            filename: 'sales-report.pdf',
            content: pdfBuffer
          }
        ]
      });
    });

    // Write content to PDF
    doc.fontSize(18).text('Sales Report', { align: 'center' });
    doc.moveDown();

    sales.forEach((sale) => {
      const item = sale.item as any;
      const customer = sale.customer as any;
      const total = item.price * sale.quantity;

      doc.fontSize(12).text(`Date: ${sale.date.toDateString()}`);
      doc.text(`Item: ${item.name}`);
      doc.text(`Customer: ${customer.name}`);
      doc.text(`Quantity: ${sale.quantity}`);
      doc.text(`Price: ${item.price}`);
      doc.text(`Total: ${total}`);
      doc.moveDown();
    });

    doc.pipe(bufferStream);
    doc.end();
  }
}
