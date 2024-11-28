import axiosInstance from "../axios-client";
import { ApiError, ApiResponse } from "services/types";
import { TOrderResponse } from "../order/types";

const CheckoutService = {
  checkoutOrder: async (
    orderId: string,
    paymentMethod: "NONE" | "CASH" | "CREDIT_CARD"
  ): Promise<ApiResponse<TOrderResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.post<ApiResponse<TOrderResponse>>(
        `/checkout/${orderId}`,
        { paymentMethod }
      );
      return data;
    } catch (error: any) {
      return {
        msg: error?.response?.data?.msg || "Lỗi khi thanh toán đơn hàng",
        status: error?.response?.status,
      };
    }
  },
};

export default CheckoutService;
