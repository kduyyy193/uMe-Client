import { type TableColumnsType } from "antd";
import { TInventoryHistoryResponse } from "services/history/types";

const Columns = (): TableColumnsType<TInventoryHistoryResponse> => {
  return [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 50,
      align: "center",
    },
    {
      title: "Nguyên liệu",
      dataIndex: "ingredientId",
      key: "ingredientId",
      width: 150,
      render: (value) => <div>{value?.name}</div>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
    },
    {
      title: "Số lượng",
      dataIndex: "ingredientId",
      key: "ingredientId",
      width: 100,
      render: (value) => <div>{value?.unit}</div>,
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type: string) => (
        <span>{type === "IN" ? "Nhập" : type === "OUT" ? "Xuất" : "-"} Kho</span>
      ),
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      width: 150,
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 200,
      ellipsis: true,
    },
  ];
};

export default Columns;
