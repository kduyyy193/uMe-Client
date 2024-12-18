import axiosInstance from "../axios-client";
import { ApiError, ApiResponse } from "services/types";
import { TMenuRequest, TMenuResponse } from "./types";

const MenuService = {
  nameApi: "menu",
  searchMenus: async (name?: string): Promise<ApiResponse<TMenuResponse[]> | ApiError> => {
    try {
      const params = {
        name,
      };
      console.log(params);
      const { data } = await axiosInstance.get<ApiResponse<TMenuResponse[]>>(
        `/${MenuService.nameApi}/search`,
        { params }
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Lỗi khi tìm kiếm món ăn",
        status: error?.response?.status,
      };
    }
  },
  getAllMenusByCategory: async (
    categoryId: string
  ): Promise<ApiResponse<TMenuResponse[]> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TMenuResponse[]>>(
        `/${MenuService.nameApi}/${categoryId}`
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Lỗi khi lấy danh sách món ăn",
        status: error?.response?.status,
      };
    }
  },
  createMenu: async (
    categoryId: string,
    menuData: TMenuRequest
  ): Promise<ApiResponse<TMenuResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<TMenuResponse>>(
        `/${MenuService.nameApi}/${categoryId}`,
        menuData
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Lỗi khi thêm món ăn",
        status: error?.response?.status,
      };
    }
  },
  updateMenu: async (
    categoryId: string,
    id: string,
    menuData: { name?: string; description?: string; price?: number }
  ): Promise<ApiResponse<TMenuResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.put<ApiResponse<TMenuResponse>>(
        `/${MenuService.nameApi}/${categoryId}/${id}`,
        menuData
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Lỗi khi cập nhật món ăn",
        status: error?.response?.status,
      };
    }
  },
  deleteMenu: async (
    categoryId: string,
    id: string
  ): Promise<ApiResponse<{ success: boolean }> | ApiError> => {
    try {
      const { data } = await axiosInstance.delete<ApiResponse<{ success: boolean }>>(
        `/${MenuService.nameApi}/${categoryId}/${id}`
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Lỗi khi xóa món ăn",
        status: error?.response?.status,
      };
    }
  },
};

export default MenuService;
