import axiosInstance from "../axios-client";
import { IUser } from "interfaces/IUser";
import { ApiError, ApiResponse } from "services/types";
import { TokenResponse } from "./types";

const AuthService = {
  nameApi: "auth",
  login: async ({ username, password }: IUser): Promise<ApiResponse<TokenResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<TokenResponse>>(
        `/${AuthService.nameApi}/login`,
        {
          username,
          password,
        }
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response.status,
      };
    }
  },
  logout: async () => {
    try {
      const { data } = await axiosInstance.post("/logout");
      return data;
    } catch (error) {
      return error;
    }
  },
};

export default AuthService;
