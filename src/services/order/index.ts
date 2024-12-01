import axiosInstance from "../axios-client";
import { ApiError, ApiResponse } from "services/types";
import { TOrderResponse } from "./types";
import { TMenuResponse } from "services/menu/types";

const OrderService = {
  nameApi: "orders",
  handleError(error: any): ApiError {
    return {
      msg: error?.response?.data?.msg || "Có lỗi xảy ra. Vui lòng thử lại sau.",
      status: error?.response?.status,
    };
  },
  createOrder: async (
    tableId: string,
    items: { menuItemId: string; quantity: number }[],
    isTakeaway: boolean,
    paymentMethod: string
  ): Promise<ApiResponse<TOrderResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<TOrderResponse>>(
        `/${OrderService.nameApi}`,
        { tableId, items, isTakeaway, paymentMethod }
      );
      return data;
    } catch (error: any) {
      return OrderService.handleError(error);
    }
  },
  updateOrder: async (
    orderId: string,
    items: { menuItemId: string; quantity: number }[]
  ): Promise<ApiResponse<TOrderResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.put<ApiResponse<TOrderResponse>>(
        `/${OrderService.nameApi}/update-items/${orderId}`,
        { items }
      );
      return data;
    } catch (error: any) {
      return OrderService.handleError(error);
    }
  },
  updateStatusItem: async (
    orderId: string,
    itemId: string,
    newStatus: string
  ): Promise<ApiResponse<TMenuResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.put<ApiResponse<TMenuResponse>>(
        `/${OrderService.nameApi}/update-status`,
        { newStatus, orderId, itemId }
      );
      return data;
    } catch (error: any) {
      return OrderService.handleError(error);
    }
  },
  getOrderByTableId: async (tableId: string): Promise<ApiResponse<TOrderResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TOrderResponse>>(
        `/${OrderService.nameApi}/table/${tableId}`
      );
      return data;
    } catch (error: any) {
      return OrderService.handleError(error);
    }
  },
  getOrderItems: async (): Promise<ApiResponse<TMenuResponse[]> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TMenuResponse[]>>(
        `/${OrderService.nameApi}/order-items`
      );
      return data;
    } catch (error: any) {
      return OrderService.handleError(error);
    }
  },
  getReceiptList: async ({
    searchDate,
    currentPage = 1,
    pageSize = 10,
  }: {
    searchDate?: string[];
    currentPage?: number;
    pageSize?: number;
  }): Promise<ApiResponse<TOrderResponse[]> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TOrderResponse[]>>(
        `/${OrderService.nameApi}/checkout?page=${currentPage}&pageSize=${pageSize}&startDate=${searchDate?.[0]}&endDate=${searchDate?.[1]}`
      );
      return data;
    } catch (error: any) {
      return OrderService.handleError(error);
    }
  },
  getOrderByUniqueId: async (uniqueId: string): Promise<ApiResponse<TOrderResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TOrderResponse>>(
        `/${OrderService.nameApi}/takeaway/${uniqueId}`
      );
      return data;
    } catch (error: any) {
      return OrderService.handleError(error);
    }
  },
  updateOrderStatus: async (
    orderId: string,
    status: string
  ): Promise<ApiResponse<TOrderResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.put<ApiResponse<TOrderResponse>>(
        `/${OrderService.nameApi}/update-status/${orderId}`,
        { status }
      );
      return data;
    } catch (error: any) {
      return OrderService.handleError(error);
    }
  },
  deleteOrder: async (orderId: string): Promise<ApiResponse<{ success: boolean }> | ApiError> => {
    try {
      const { data } = await axiosInstance.delete<ApiResponse<{ success: boolean }>>(
        `/${OrderService.nameApi}/${orderId}`
      );
      return data;
    } catch (error: any) {
      return OrderService.handleError(error);
    }
  },
  deleteItem: async (
    orderId: string,
    itemId: string
  ): Promise<ApiResponse<{ success: boolean }> | ApiError> => {
    try {
      const { data } = await axiosInstance.delete<ApiResponse<{ success: boolean }>>(
        `/${OrderService.nameApi}/delete-done-items`,
        {
          params: {
            orderId,
            itemId,
          },
        }
      );
      return data;
    } catch (error: any) {
      return OrderService.handleError(error);
    }
  },
};

export default OrderService;
