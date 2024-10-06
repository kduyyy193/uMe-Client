export type TUserResponse = {
  id: string;
  username: string;
  role: string;
  businessName: string;
  location: string;
};

export type TokenResponse = {
  token: string;
  user: TUserResponse;
};
