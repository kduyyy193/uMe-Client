import axiosInstance from "../axios-client";
import { ApiError, ApiResponse } from "services/types";
import { TInventoryHistoryResponse, TInventoryHistoryRequest } from "./types";

const InventoryHistoryService = {
  nameApi: "inventory",
  getInventoryHistory: async ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }): Promise<ApiResponse<TInventoryHistoryResponse[]> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TInventoryHistoryResponse[]>>(
        "/inventory/history",
        {
          params: {
            startDate,
            endDate,
          },
        }
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
  outInventory: async (
    payload: TInventoryHistoryRequest
  ): Promise<ApiResponse<TInventoryHistoryResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<TInventoryHistoryResponse>>(
        "/inventory/out",
        { ...payload, type: "OUT" }
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
  inInventory: async (
    payload: TInventoryHistoryRequest
  ): Promise<ApiResponse<TInventoryHistoryResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<TInventoryHistoryResponse>>(
        "/inventory/in",
        { ...payload, type: "IN" }
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

export default InventoryHistoryService;
