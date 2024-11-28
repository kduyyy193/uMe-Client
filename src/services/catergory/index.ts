import axiosInstance from "../axios-client";
import { ApiError, ApiResponse } from "services/types";
import { TCategoryRequest, TCategoryResponse } from "./types";

const CategoryService = {
  nameApi: "category",
  getAllCategories: async (): Promise<ApiResponse<TCategoryResponse[]> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TCategoryResponse[]>>(
        `/${CategoryService.nameApi}`
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
  createCategory: async (
    categoryData: TCategoryRequest
  ): Promise<ApiResponse<TCategoryResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<TCategoryResponse>>(
        `/${CategoryService.nameApi}`,
        categoryData
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
  updateCategory: async (
    id: string,
    categoryData: { name?: string; description?: string }
  ): Promise<ApiResponse<TCategoryResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.put<ApiResponse<TCategoryResponse>>(
        `/${CategoryService.nameApi}/${id}`,
        categoryData
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
  deleteCategory: async (id: string): Promise<ApiResponse<{ success: boolean }> | ApiError> => {
    try {
      const { data } = await axiosInstance.delete<ApiResponse<{ success: boolean }>>(
        `/${CategoryService.nameApi}/${id}`
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
};

export default CategoryService;
