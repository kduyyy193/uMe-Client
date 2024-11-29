import Table from "components/Table";
import useAsync from "hooks/useAsync";
import { useEffect, useState } from "react";
import { ApiResponse } from "services/types";
import { ColumnsMenu, ColumnsPaymentMethod } from "./Columns";
import { DatePicker, Spin } from "antd";
import dayjs from "dayjs";
import ReportService from "services/report";
import { TReportResponse } from "services/report/types";
const { RangePicker } = DatePicker;

const todayDate = dayjs().format("YYYY-MM-DD");
const tomorrowDate = dayjs().add(1, "day").format("YYYY-MM-DD");

const Report = () => {
  const getAllReportAPI = useAsync<ApiResponse<TReportResponse>>(ReportService.getReport);

  const [report, setReport] = useState<TReportResponse>();
  const [searchDate, setSearchDate] = useState<string[] | null>();

  const getAllReport = async ({ searchDate }: { searchDate?: string[] }) => {
    const response = await getAllReportAPI.run({
      startDate: searchDate?.[0],
      endDate: searchDate?.[1],
    });
    if (response?.data) {
      setReport(response?.data);
    }
  };

  const handleDateChange = (
    startDate: string | null | undefined,
    endDate: string | null | undefined
  ) => {
    if (startDate && endDate) {
      const dates = [startDate, endDate];
      setSearchDate(dates);
    }
  };

  useEffect(() => {
    const dates = searchDate || [todayDate, tomorrowDate];
    getAllReport({
      searchDate: dates,
    });
  }, [searchDate]);

  return (
    <Spin spinning={getAllReportAPI.loading}>
      <div className="m-4">
        <h2 className="font-semibold text-lg">Báo cáo</h2>
        <div className="mb-4 w-fit ml-auto">
          <RangePicker
            onChange={(values) => {
              if (values) {
                handleDateChange(
                  values?.[0]?.format("YYYY-MM-DD"),
                  values?.[1]?.format("YYYY-MM-DD")
                );
              }
            }}
            size="large"
            style={{
              padding: "8px 12px",
              fontSize: 16,
            }}
            defaultValue={[dayjs(todayDate), dayjs(tomorrowDate)]}
          />
        </div>
        <div className="text-xl font-medium mb-4">
          Tổng thu nhập:{" "}
          <span className="text-blue-500 ml-1">
            {report?.totalRevenue?.toLocaleString() || 0} VND
          </span>
        </div>
        <div className="text-lg font-medium mb-2">
          Thu nhập bán mang đi:{" "}
          <span className="text-blue-500 ml-1">
            {report?.takeawayReport?.[0]?.totalAmount?.toLocaleString() || 0} VND
          </span>
        </div>
        <div className="text-lg font-medium mb-2">
          Thu nhập bán tại bàn:{" "}
          <span className="text-blue-500 ml-1">
            {report?.nonTakeawayReport?.[0]?.totalAmount?.toLocaleString() || 0} VND
          </span>
        </div>
        <div className="mt-4 h-[2px] bg-gray-500 w-full" />
        <div className="flex flex-wrap gap-10 mt-4">
          <div className="h-fit my-4 w-[50%]">
            <h4 className="text-lg font-medium mb-2">Những món ăn bán chạy nhất</h4>
            <Table
              scroll={{ x: "100%" }}
              columns={ColumnsMenu()}
              data={report?.report || []}
              count={0}
              page={1}
              rowPerPage={10}
              style={{
                width: "100%",
                minWidth: 600,
              }}
            />
          </div>
          <div className="h-fit my-4 w-[40%]">
            <h4 className="text-lg font-medium mb-2">Báo cáo theo phương thức thanh toán</h4>
            <Table
              scroll={{ x: "100%" }}
              columns={ColumnsPaymentMethod()}
              data={report?.paymentMethodReport || []}
              count={0}
              page={1}
              rowPerPage={10}
              style={{
                minWidth: 400,
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Report;
