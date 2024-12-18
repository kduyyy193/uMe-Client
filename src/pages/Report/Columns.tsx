import { type TableColumnsType } from "antd";

interface TopMenuItem {
  totalRevenue: number;
  totalQuantity: number;
  menuItemId: string;
  menuItemName: string;
}

export const ColumnsMenu = (): TableColumnsType<TopMenuItem> => {
  return [
    {
      title: "Tên món ăn",
      dataIndex: "menuItemName",
      key: "menuItemName",
    },
    {
      title: "Số lượng bán",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      render: (value: number) => value,
    },
    {
      title: "Tổng doanh thu",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (value: number) => `${value.toLocaleString()} VND`,
    },
  ];
};

interface PaymentMethodReport {
  _id: "CREDIT_CARD" | "CASH" | "NONE";
  totalAmount: number;
}

export const ColumnsPaymentMethod = (): TableColumnsType<PaymentMethodReport> => {
  return [
    {
      title: "Phương thức thanh toán",
      dataIndex: "_id",
      key: "_id",
      render: (value) => {
        switch (value) {
          case "CREDIT_CARD":
            return "Thẻ";
          case "CASH":
            return "Tiền mặt";
          case "NONE":
            return "Khác";
          default:
            return "Không xác định";
        }
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => `${value.toLocaleString()} VND`,
    },
  ];
};
