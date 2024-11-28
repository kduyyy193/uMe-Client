import { type TableColumnsType } from "antd";
import Actions from "components/Actions";
import { TMenuResponse } from "services/menu/types";

interface IProps {
  onClickEdit: () => void;
  onClickDelete: () => void;
  handleSelectItem: (value: TMenuResponse) => void;
}

const Columns = ({
  onClickDelete,
  onClickEdit,
  handleSelectItem,
}: IProps): TableColumnsType<TMenuResponse> => {
  return [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 50,
      align: "center",
    },
    {
      title: "Menu",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 120,
    },
    {
      title: "Số lương",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Hành động",
      dataIndex: "allowAction",
      key: "allowAction",
      align: "center",
      fixed: "right",
      width: 120,
      className: "capitalize",
      render: (_, record) => {
        return (
          <div onClick={() => handleSelectItem(record)}>
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
