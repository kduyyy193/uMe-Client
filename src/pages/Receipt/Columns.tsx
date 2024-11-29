import { type TableColumnsType } from "antd";
import { TOrderResponse } from "services/order/types";

const Columns = (): TableColumnsType<TOrderResponse> => {
  return [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      width: 140,
      render: (value) => <>#{value}</>,
    },
    {
      title: "Bàn",
      dataIndex: "tableNumber",
      key: "tableNumber",
      width: 80,
    },
    {
      title: "PT Thanh Toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 120,
      align: "center",
      render: (value) => (
        <div>{value === "NONE" ? "Khác" : value === "CASH" ? "Tiền mặt" : "Thẻ"}</div>
      ),
    },
    {
      title: "Tổng",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 80,
      ellipsis: true,
      render: (value) => <div>{value?.toLocaleString()}VND</div>,
    },
    {
      title: "Hình thức",
      dataIndex: "isTakeaway",
      key: "isTakeaway",
      width: 80,
      ellipsis: true,
      render: (value) => <>{value ? "Mang đi" : "Tại bàn"}</>,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      ellipsis: true,
    },
  ];
};

export default Columns;
