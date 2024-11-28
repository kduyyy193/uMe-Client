import axiosInstance from "../axios-client";
import { ApiError, ApiResponse } from "services/types";
import { TOrderResponse } from "./types";

const OrderService = {
  nameApi: "orders",
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
      return {
        msg: error?.response?.data?.msg || "Lỗi khi tạo đơn hàng",
        status: error?.response?.status,
      };
    }
  },
  updateOrder: async (
    orderId: string,
    items: { menuItemId: string; quantity: number }[]
  ): Promise<ApiResponse<TOrderResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.put<ApiResponse<TOrderResponse>>(
        `/${OrderService.nameApi}/${orderId}`,
        { items }
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Lỗi khi cập nhật đơn hàng",
        status: error?.response?.status,
      };
    }
  },
  getOrderByTableId: async (tableId: string): Promise<ApiResponse<TOrderResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TOrderResponse>>(
        `/${OrderService.nameApi}/table/${tableId}`
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Lỗi khi lấy đơn hàng theo bàn",
        status: error?.response?.status,
      };
    }
  },
  getReceiptList: async (): Promise<ApiResponse<TOrderResponse[]> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TOrderResponse[]>>(
        `/${OrderService.nameApi}/checkout`
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Lỗi khi lấy đơn hàng theo bàn",
        status: error?.response?.status,
      };
    }
  },
  getOrderByUniqueId: async (uniqueId: string): Promise<ApiResponse<TOrderResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TOrderResponse>>(
        `/${OrderService.nameApi}/takeaway/${uniqueId}`
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Lỗi khi lấy đơn hàng",
        status: error?.response?.status,
      };
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
      return {
        msg: error?.response?.data?.msg || "Lỗi khi cập nhật trạng thái đơn hàng",
        status: error?.response?.status,
      };
    }
  },
  deleteOrder: async (orderId: string): Promise<ApiResponse<{ success: boolean }> | ApiError> => {
    try {
      const { data } = await axiosInstance.delete<ApiResponse<{ success: boolean }>>(
        `/${OrderService.nameApi}/${orderId}`
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Lỗi khi xóa đơn hàng",
        status: error?.response?.status,
      };
    }
  },
};

export default OrderService;
