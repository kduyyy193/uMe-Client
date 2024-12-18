import Table from "components/Table";
import useAsync from "hooks/useAsync";
import { useEffect, useState } from "react";
import { ApiResponse } from "services/types";
import Columns from "./Columns";
import useModal from "hooks/useModal";
import { DatePicker, message, Spin } from "antd";
import Button from "components/FormV2/Button";
import InventoryHistoryService from "services/history";
import { TInventoryHistoryResponse, TInventoryHistoryRequest } from "services/history/types";
import OutHistoryModal from "./components/OutHistoryModal";
import InHistoryModal from "./components/InHistoryModal";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const todayDate = dayjs().format("YYYY-MM-DD");
const tomorrowDate = dayjs().add(1, "day").format("YYYY-MM-DD");

const InventoryHistory = () => {
  const { open, handleClose, handleOpen } = useModal();

  const [history, setHistory] = useState<TInventoryHistoryResponse[]>([]);
  const [searchDate, setSearchDate] = useState<string[] | null>();

  const getAllHistoryAPI = useAsync<ApiResponse<TInventoryHistoryResponse[]>>(
    InventoryHistoryService.getInventoryHistory
  );
  const outHistoryAPI = useAsync<ApiResponse<TInventoryHistoryRequest>>(
    InventoryHistoryService.outInventory
  );
  const inHistoryAPI = useAsync<ApiResponse<TInventoryHistoryRequest>>(
    InventoryHistoryService.inInventory
  );
  const getAllHistory = async () => {
    try {
      const response = await getAllHistoryAPI.run({
        startDate: searchDate?.[0],
        endDate: searchDate?.[1],
      });
      console.log(response);
      if (response?.data) {
        const historyAddedKey = response?.data.map((d, idx) => ({ ...d, key: idx + 1 }));
        setHistory(historyAddedKey || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOutHistory = async (values: TInventoryHistoryRequest) => {
    const response = await outHistoryAPI.run(values);
    if (response?.data) {
      getAllHistory();
      return message.success("Thêm mới lịch sử xuất kho thành công");
    }
    message.error("Đã xảy ra lỗi");
  };

  const handleInHistory = async (values: TInventoryHistoryRequest) => {
    const response = await inHistoryAPI.run(values);
    if (response?.data) {
      getAllHistory();
      return message.success("Thêm mới lịch sử nhập kho thành công");
    }
    message.error("Đã xảy ra lỗi");
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
    getAllHistory();
  }, []);

  return (
    <Spin spinning={getAllHistoryAPI.loading || outHistoryAPI.loading}>
      <div className="m-4">
        <h2 className="font-semibold text-lg">Lịch sử xuất nguyên liệu</h2>
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
        <div className="flex w-fit ml-auto">
          <div className="w-[156px] -mr-4">
            <Button onClick={() => handleOpen("export")}>
              <div className="flex items-center">
                <p className="ml-1 font-semibold text-white bg-blue-500 text-base px-4 py-2 rounded-lg">
                  Xuất Kho
                </p>
              </div>
            </Button>
          </div>
          {/* <div className="w-[156px]">
            <Button onClick={() => handleOpen("import")}>
              <div className="flex items-center">
                <p className="ml-1 font-semibold text-white bg-blue-500 text-base px-4 py-2 rounded-lg">
                  Nhập Kho
                </p>
              </div>
            </Button>
          </div> */}
        </div>
        <Table
          scroll={{ x: "100%" }}
          columns={Columns()}
          count={0}
          data={history}
          page={1}
          rowPerPage={10}
        />
        {open === "export" && (
          <OutHistoryModal
            open={open === "export"}
            handleClose={handleClose}
            handleOutHistory={handleOutHistory}
          />
        )}
        {open === "import" && (
          <InHistoryModal
            open={open === "import"}
            handleClose={handleClose}
            handleInHistory={handleInHistory}
          />
        )}
      </div>
    </Spin>
  );
};

export default InventoryHistory;
