import axiosInstance from "../axios-client";
import { ApiError, ApiResponse } from "services/types";
import { TIngredientResponse, TIngredientRequest } from "./types";

const IngredientService = {
  nameApi: "ingredients",
  getIngredients: async (
    page: number = 1,
    pageSize: number = 10
  ): Promise<ApiResponse<TIngredientResponse[]> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TIngredientResponse[]>>("/ingredients", {
        params: {
          page,
          pageSize,
        },
      });
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
  createIngredient: async (
    payload: TIngredientRequest
  ): Promise<ApiResponse<TIngredientResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<TIngredientResponse>>(
        "/ingredients",
        payload
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },

  updateIngredient: async (
    id: string,
    payload: TIngredientRequest
  ): Promise<ApiResponse<TIngredientResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.put<ApiResponse<TIngredientResponse>>(
        `/ingredients/${id}`,
        payload
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
  deleteIngredient: async (id: string): Promise<ApiResponse<{ success: boolean }> | ApiError> => {
    try {
      const { data } = await axiosInstance.delete<ApiResponse<{ success: boolean }>>(
        `/ingredients/${id}`
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

export default IngredientService;
