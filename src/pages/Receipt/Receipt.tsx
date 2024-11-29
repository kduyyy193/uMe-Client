import Table from "components/Table";
import useAsync from "hooks/useAsync";
import { useEffect, useState } from "react";
import { TOrderResponse } from "services/checkout/types";
import OrderService from "services/order";
import { ApiResponse } from "services/types";
import Columns from "./Columns";
import { DatePicker, Spin } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const todayDate = dayjs().format("YYYY-MM-DD");
const tomorrowDate = dayjs().add(1, "day").format("YYYY-MM-DD");

const Receipt = () => {
  const getAllReceiptAPI = useAsync<ApiResponse<TOrderResponse[]>>(OrderService.getReceiptList);

  const [receiptList, setReceiptList] = useState<TOrderResponse[]>([]);
  const [searchDate, setSearchDate] = useState<string[] | null>();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllReceipt = async ({
    currentPage,
    pageSize,
    searchDate,
  }: {
    searchDate?: string[];
    currentPage?: number;
    pageSize?: number;
  }) => {
    const response = await getAllReceiptAPI.run({ searchDate, currentPage, pageSize });
    if (response?.data) {
      const dataAddedKey = response.data.map((menu, idx) => ({
        ...menu,
        key: idx + 1,
      }));
      setReceiptList(dataAddedKey);
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

  const handleChangePerPage = (perPage: number) => {
    const dates = searchDate || [todayDate, tomorrowDate];
    getAllReceipt({
      searchDate: dates,
      currentPage: 1,
      pageSize: perPage,
    });
    setPageSize(perPage);
  };

  const handleChangePage = (page: number) => {
    const dates = searchDate || [todayDate, tomorrowDate];
    getAllReceipt({
      searchDate: dates,
      currentPage: page,
      pageSize: 10,
    });
    setCurrentPage(page);
  };

  useEffect(() => {
    const dates = searchDate || [todayDate, tomorrowDate];
    getAllReceipt({
      searchDate: dates,
      currentPage,
      pageSize,
    });
  }, [searchDate]);

  return (
    <Spin spinning={getAllReceiptAPI.loading}>
      <div className="m-4">
        <h2 className="font-semibold text-lg">Danh sách hoá đơn</h2>
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
        <Table
          scroll={{ x: "100%" }}
          columns={Columns()}
          data={receiptList}
          count={getAllReceiptAPI.value?.pageInfo?.count || 0}
          page={(getAllReceiptAPI.value?.pageInfo?.currentPage || 1) - 1}
          rowPerPage={getAllReceiptAPI.value?.pageInfo?.pageSize || 10}
          onPageChange={handleChangePage}
          onPerPageChange={handleChangePerPage}
        />
      </div>
    </Spin>
  );
};

export default Receipt;
