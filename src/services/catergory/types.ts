export type TCategoryResponse = {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type TCategoryRequest = {
  name: string;
  description?: string;
};
