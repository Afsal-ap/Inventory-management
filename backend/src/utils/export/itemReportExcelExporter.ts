import ExcelJS from 'exceljs';
import { IItem } from '../../entities/item';
import { Response } from 'express';

export const exportItemsToExcel = async (items: IItem[], res: Response) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Item Report');

  worksheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Description', key: 'description', width: 30 },
    { header: 'Quantity', key: 'quantity', width: 15 },
    { header: 'Price', key: 'price', width: 15 },
    { header: 'Total Value', key: 'totalValue', width: 20 }
  ];

  items.forEach(item => {
    worksheet.addRow({
      ...item,
      totalValue: item.price * item.quantity
    });
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=ItemReport.xlsx');

  await workbook.xlsx.write(res);
  res.end();
};
