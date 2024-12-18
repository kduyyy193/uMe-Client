import { type TableColumnsType } from "antd";
import Actions from "components/Actions";
import { TIngredientResponse } from "services/ingredient/types";

interface IProps {
  onClickEdit: () => void;
  onClickDelete: () => void;
  handleSelectItem: (value: TIngredientResponse) => void;
}

const Columns = ({
  onClickDelete,
  onClickEdit,
  handleSelectItem,
}: IProps): TableColumnsType<TIngredientResponse> => {
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
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
      width: 100,
    },
    {
      title: "Giá trên 1ĐV",
      dataIndex: "unitPrice",
      key: "unitPrice",
      width: 120,
      render: (value) => <div>{value?.toLocaleString()} VND</div>,
    },
    {
      title: "Tổng giá",
      dataIndex: "totalCost",
      key: "totalCost",
      width: 150,
      render: (value) => <div>{value?.toLocaleString()} VND</div>,
    },
    {
      title: "Thời gian nhập",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 100,
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Hành động",
      dataIndex: "allowAction",
      key: "allowAction",
      align: "center",
      fixed: "right",
      width: 120,
      render: (_, record) => {
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleSelectItem(record);
            }}
          >
            <Actions
              action={{
                allowDelete: true,
                allowEdit: true,
              }}
              onEdit={onClickEdit}
              onDelete={onClickDelete}
            />
          </div>
        );
      },
    },
  ];
};

export default Columns;
