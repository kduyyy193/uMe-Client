export type TTableResponse = {
  _id: string;
  tableNumber: number;
  seats: number;
  status: "available" | "occupied" | "reserved";
  location: string;
  isTakeaway: boolean;
};

export type TTableRequest = {
  tableNumber: number;
  seats: number;
  location?: string;
};
