import axiosInstance from "../axios-client";
import { IUser } from "interfaces/IUser";
import { ApiError, ApiResponse } from "services/types";
import { TokenResponse } from "./types";

const AuthUserService = {
  nameApi: "auth",
  login: async ({ username, password }: IUser): Promise<ApiResponse<TokenResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<TokenResponse>>(
        `/${AuthUserService.nameApi}/login`,
        { username, password }
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Login failed",
        status: error?.response?.status,
      };
    }
  },
  logout: async (): Promise<ApiResponse<any> | ApiError> => {
    try {
      const { data } = await axiosInstance.post("/logout");
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Logout failed",
        status: error?.response?.status,
      };
    }
  },
  register: async (
    username: string,
    password: string,
    role: string,
    businessName?: string,
    location?: string
  ): Promise<ApiResponse<IUser> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<IUser>>(
        `/${AuthUserService.nameApi}/register`,
        { username, password, role, businessName, location }
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Registration failed",
        status: error?.response?.status,
      };
    }
  },
  createWaiterOrKitchen: async ({
    username,
    password,
    role,
  }: {
    username: string;
    password: string;
    role: "Waiter" | "Kitchen";
  }): Promise<ApiResponse<IUser> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<IUser>>(
        `/${AuthUserService.nameApi}/createWaiterOrKitchen`,
        { username, password, role }
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Failed to create user",
        status: error?.response?.status,
      };
    }
  },
  updateWaiterOrKitchen: async (
    userId: string,
    {
      role,
    }: {
      role?: string;
    }
  ): Promise<ApiResponse<IUser> | ApiError> => {
    try {
      const { data } = await axiosInstance.put<ApiResponse<IUser>>(
        `/${AuthUserService.nameApi}/updateWaiterOrKitchen/${userId}`,
        { role }
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Failed to update user",
        status: error?.response?.status,
      };
    }
  },
  deleteWaiterOrKitchen: async (userId: string): Promise<ApiResponse<any> | ApiError> => {
    try {
      const { data } = await axiosInstance.delete(`/auth/deleteWaiterOrKitchen/${userId}`);
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Failed to delete user",
        status: error?.response?.status,
      };
    }
  },
  getUsers: async (): Promise<ApiResponse<IUser[]> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<IUser[]>>("/auth/users");
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Failed to fetch users",
        status: error?.response?.status,
      };
    }
  },
};

export default AuthUserService;
