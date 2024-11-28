import axiosInstance from "../axios-client";
import { ApiError, ApiResponse } from "services/types";
import { TTableRequest, TTableResponse } from "./types";

const TableService = {
  nameApi: "tables",
  getAllTables: async (): Promise<ApiResponse<TTableResponse[]> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TTableResponse[]>>(
        `/${TableService.nameApi}`
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
  createTable: async (
    tableData: TTableRequest
  ): Promise<ApiResponse<TTableResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<TTableResponse>>(
        `/${TableService.nameApi}`,
        tableData
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
  getTableById: async (id: string): Promise<ApiResponse<TTableResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TTableResponse>>(
        `/${TableService.nameApi}/${id}`
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
  updateTable: async (
    id: string,
    tableData: TTableRequest
  ): Promise<ApiResponse<TTableResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.put<ApiResponse<TTableResponse>>(
        `/${TableService.nameApi}/${id}`,
        tableData
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg,
        status: error?.response?.status,
      };
    }
  },
  deleteTable: async (id: string): Promise<ApiResponse<{ msg: string }> | ApiError> => {
    try {
      const { data } = await axiosInstance.delete<ApiResponse<{ msg: string }>>(
        `/${TableService.nameApi}/${id}`
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

export default TableService;
