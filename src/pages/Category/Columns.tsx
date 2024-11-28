import { type TableColumnsType } from "antd";
import Actions from "components/Actions";
import { TCategoryResponse } from "services/catergory/types";

interface IProps {
  onClickEdit: () => void;
  onClickDelete: () => void;
  handleSelectItem: (value: TCategoryResponse) => void;
}

const Columns = ({
  onClickDelete,
  onClickEdit,
  handleSelectItem,
}: IProps): TableColumnsType<TCategoryResponse> => {
  return [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 50,
      align: "center",
    },
    {
      title: "Danh mục",
      dataIndex: "name",
      key: "name",
      width: 150,
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
