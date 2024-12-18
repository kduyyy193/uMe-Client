import { type TableColumnsType } from "antd";
import Actions from "components/Actions";
import { IUser } from "interfaces/IUser";

interface IProps {
  onClickEdit: () => void;
  onClickDelete: () => void;
  handleSelectItem: (value: IUser) => void;
}

const Columns = ({
  onClickDelete,
  onClickEdit,
  handleSelectItem,
}: IProps): TableColumnsType<IUser> => {
  return [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 50,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên nhân viên",
      dataIndex: "username",
      key: "username",
      width: 200,
      render: (value) => <div className="font-semibold">{value}</div>,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      width: 150,
      render: (value) => <div>{value}</div>,
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
