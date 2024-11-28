export type TMenuResponse = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TMenuRequest = { name: string; description?: string; price: number };