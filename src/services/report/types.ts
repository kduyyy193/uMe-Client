export type TReportItem = {
  totalRevenue: number;
  totalQuantity: number;
  menuItemId: string;
  menuItemName: string;
};

export type TTopMenuItem = {
  totalRevenue: number;
  totalQuantity: number;
  menuItemId: string;
  menuItemName: string;
};

export type TPaymentMethodReport = {
  _id: "CREDIT_CARD" | "CASH" | "NONE";
  totalAmount: number;
};

export type TTakeawayReport = {
  _id: string | null;
  totalAmount: number;
};

export type TReportResponse = {
  totalRevenue: number;
  totalCostIn: number;
  totalCostOut: number;
  report: TReportItem[];
  topMenuItems: TTopMenuItem[];
  paymentMethodReport: TPaymentMethodReport[];
  takeawayReport: TTakeawayReport[];
  nonTakeawayReport: TTakeawayReport[];
};
