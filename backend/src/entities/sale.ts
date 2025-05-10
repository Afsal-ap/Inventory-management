export interface ISale {
    id: string;
    item: string;       // Reference to item ID
    customer: string;   // Reference to customer ID
    quantity: number;
    date: Date;
    isCash: boolean;
  }
  