export type TTableResponse = {
  _id: string;
  tableNumber: number;
  seats: number;
  status: "available" | "dining" | "reserved";
  location: string;
  isTakeaway: boolean;
};
