export interface TOrderResponse {
  _id: string;
  tableId: string;
  items: {
    _id: string;
    name: string;
    status: "NEW" | "INPROGRESS" | "DONE";
    quantity: number;
    price: number;
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
