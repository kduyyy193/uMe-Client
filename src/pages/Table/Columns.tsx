import { type TableColumnsType } from "antd";
import Actions from "components/Actions";
import { TTableResponse } from "services/table/types";
import cn from "utils/cn";

interface IProps {
  onClickEdit: () => void;
  onClickDelete: () => void;
  handleSelectItem: (value: TTableResponse) => void;
}

const Columns = ({
  onClickDelete,
  onClickEdit,
  handleSelectItem,
}: IProps): TableColumnsType<TTableResponse> => {
  return [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 50,
      align: "center",
    },
    {
      title: "Bàn",
      dataIndex: "tableNumber",
      key: "tableNumber",
      width: 150,
      render: (value) => <div className="font-semibold">{value}</div>,
    },
    {
      title: "Chỗ ngồi",
      dataIndex: "seats",
      key: "seats",
      width: 80,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 80,
      ellipsis: true,
      className: "capitalize",
      render: (value) => {
        return (
          <div className="flex items-center gap-4 w-fit">
            <div
              className={cn(
                "w-4 h-4 bg-purple-300 rounded-[2px]",
                value === "dining" && "bg-blue-500",
                value !== "available" && "bbg-gray-500"
              )}
            ></div>
            <span>{value}</span>
          </div>
        );
      },
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
      title: "Vị trí",
      dataIndex: "location",
      key: "location",
      width: 120,
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
