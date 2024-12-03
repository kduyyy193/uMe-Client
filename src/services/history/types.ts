export type TInventoryHistoryResponse = {
  _id: string;
  ingredientId: string;
  type: "IN" | "OUT";
  quantity: number;
  description?: string;
  date: string;
};

export type TInventoryHistoryRequest = {
  ingredientId: string;
  type: "IN" | "OUT";
  quantity: number;
  description?: string;
};
