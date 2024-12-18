export type IUser = {
  _id?: string | null;
  username?: string;
  password?: string;
  role?: "Merchant" | "Waiter" | "Kitchen" | "Customer";
  businessName?: string | null;
  location?: string | null;
  isDeleted?: boolean;
  createdAt?: string;
};
