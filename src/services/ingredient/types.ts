export type TIngredientResponse = {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
};

export type TIngredientRequest = {
  name: string;
  quantity: number;
  unit: string;
};
