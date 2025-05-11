import { SaleModel } from '../models/saleModel';
import mongoose from 'mongoose';
import { ISale } from '../entities/sale';
import { IItem } from '../entities/item';
import { ICustomer } from '../entities/customer';
import { ItemModel } from '../models/itemModel';

interface SalesReportFilter {
  startDate?: string;
  endDate?: string;
  customerId?: string;
  itemId?: string;
}

export class ReportService {
  async getSalesReport(filters: SalesReportFilter) {
    const query: any = {};

    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) {
        query.date.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        query.date.$lte = new Date(filters.endDate);
      }
    }

    if (filters.customerId && mongoose.Types.ObjectId.isValid(filters.customerId)) {
      query.customer = filters.customerId;
    }

    if (filters.itemId && mongoose.Types.ObjectId.isValid(filters.itemId)) {
      query.item = filters.itemId;
    }

    const sales = await SaleModel.find(query)
      .populate('item')
      .populate('customer');

    // Tell TypeScript that item has type IItem
    const totalRevenue = sales.filter(item => item !== null && item !== undefined).reduce((sum, sale) => {
      const item = sale.item as unknown as IItem; 
       if(!item){
        return sum
       }
      return sum + sale.quantity * (item.price || 0);
    }, 0);

    const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantity, 0);

    return {
      totalSales: sales.length,
      totalQuantity,
      totalRevenue,
      sales,
    };
  } 
  async getItemReport(search?: string) {
    const query: any = {};
  
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
  
    // Step 1: Fetch items with optional search
    const items = await ItemModel.find(query);
  
    // Step 2: Aggregate sales to get total quantity sold and revenue per item
    const salesAggregation = await SaleModel.aggregate([
      {
        $group: {
          _id: '$item',
          totalQuantity: { $sum: '$quantity' },
          totalRevenue: { $sum: { $multiply: ['$quantity', '$item.price'] } } // Optional, requires $lookup if price not in Sale
        }
      }
    ]);
  
    // Step 3: Merge sales data into items
    const itemReport = items.map(item => {
      const saleInfo = salesAggregation.find(s => s._id.toString() === item._id.toString());
  
      return {
        _id: item._id,
        name: item.name,
        totalQuantity: saleInfo?.totalQuantity || 0,
        totalRevenue: (saleInfo?.totalQuantity || 0) * item.price, // Revenue = qty * price
      };
    });
  
    return {
      totalUniqueItems: items.length,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      items: itemReport
    };
  }
  


  async getCustomerLedger(customerId: string) {
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      throw new Error('Invalid customer ID');
    }
  
    const sales = await SaleModel.find({ customer: customerId })
      .populate('item')
      .populate('customer')
      .sort({ date: -1 });
  
    const transactions = sales.map((sale) => {
      const item = sale.item as any;
      return {
        date: sale.date,
        itemName: item.name,
        quantity: sale.quantity,
        price: item.price,
        total: item.price * sale.quantity,
        isCash: sale.isCash
      };
    });
  
    const totalAmount = transactions.reduce((sum, t) => sum + t.total, 0);
  
    return {
      customer: sales[0]?.customer || null,
      totalTransactions: transactions.length,
      totalAmount,
      transactions
    };
  }
  
}

