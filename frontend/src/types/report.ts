// In types/report.ts
export interface SalesReport {
    totalSales: number;
    totalQuantity: number;
    totalRevenue: number;
    sales: Array<{
      _id: string;
      item: { name: string 
      price: number;
      };
      customer: { name: string };
      quantity: number;
      isCash: boolean;
      date: string;
    }>;
  }
  
  export interface ItemReport {
    items: Array<{
      _id: string;
      name: string;
      totalQuantity: number;
      totalRevenue: number;
    }>;
  }
  
  export interface CustomerLedger {
    _id: string;
    name: string;
    totalPurchases: number;
    totalAmount: number;
  }
  