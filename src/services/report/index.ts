import axiosInstance from "../axios-client";
import { ApiError, ApiResponse } from "services/types";
import { TReportResponse } from "./types";

const ReportService = {
  nameApi: "orders",
  getReport: async ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }): Promise<ApiResponse<TReportResponse> | ApiError> => {
    try {
      const { data } = await axiosInstance.get<ApiResponse<TReportResponse>>(
        `/report?startDate=${startDate}&endDate=${endDate}`
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

export default ReportService;
