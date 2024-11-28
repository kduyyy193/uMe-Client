export interface TOrderResponse {
  _id: string;
  tableId: string;
  items: {
    _id: string;
    name: string;
    quantity: number;
    price: number;
    status: string;
    note?: string;
  }[];

  totalAmount: number;
  isTakeaway: boolean;
  status: string;
  createdAt: string;
  isPaid: boolean;
  paymentMethod: "NONE" | "CASH" | "CREDIT_CARD";
}

export interface TOrderRequest {
  tableId: string;
  items: {
    _id: string;
    quantity: number;
  }[];
  isTakeaway: boolean;
}
