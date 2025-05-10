// types/sale.ts

export interface Sale {
    _id: string;
    item: {
      _id: string;
      name: string;
      price: number; 
    };
    customer: {
      _id: string;
      name: string;
    };
    quantity: number;
    isCash: boolean;
    date: string;
  }
  
  export interface SaleFormInput {
    itemId: string;      
    customerId: string;   
    quantity: number;
    isCash: boolean;
  }
  