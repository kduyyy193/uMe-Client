// pages/User.tsx
import { useEffect, useState } from "react";
import useAsync from "hooks/useAsync";
import { ApiResponse } from "services/types";
import { IUser } from "interfaces/IUser";
import { message, Spin } from "antd";
import Button from "components/FormV2/Button";
import Modal from "components/Modal";
import EditUserModal from "./components/EditUserModal";
import AddUserModal from "./components/AddUserModal";
import TableComponent from "components/Table";
import Columns from "./Columns";
import useModal from "hooks/useModal";
import AuthUserService from "services/auth";

const User = () => {
  const { open, handleClose, handleOpen } = useModal();
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const getAllUsersAPI = useAsync<ApiResponse<IUser[]>>(AuthUserService.getUsers);
  const addNewUserAPI = useAsync<ApiResponse<IUser>>(AuthUserService.createWaiterOrKitchen);
  const editUserAPI = useAsync<ApiResponse<IUser>>(AuthUserService.updateWaiterOrKitchen);
  const deleteUserAPI = useAsync<ApiResponse<{ msg: string }>>(
    AuthUserService.deleteWaiterOrKitchen
  );

  const getAllUsers = async () => {
    const response = await getAllUsersAPI.run();
    if (response?.data) {
      const usersWithKeys = response.data.map((user, idx) => ({
        ...user,
        key: idx + 1,
      }));
      setUsers(usersWithKeys);
    }
  };

  const handleAddUser = async (values: IUser) => {
    const response = await addNewUserAPI.run(values);
    if (response?.data) {
      getAllUsers();
      message.success("Thêm mới nhân viên thành công");
      handleClose();
    } else {
      message.error("Đã xảy ra lỗi");
    }
  };

  const handleEditUser = async (values: IUser) => {
    if (!selectedUser) return;
    const response = await editUserAPI.run(selectedUser._id, values);
    if (response?.data) {
      getAllUsers();
      handleClose();
      message.success("Chỉnh sửa nhân viên thành công");
    } else {
      message.error("Đã xảy ra lỗi");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const response = await deleteUserAPI.run(userId);
    if (response?.data) {
      getAllUsers();
      handleClose();
      message.success("Xoá nhân viên thành công");
    } else {
      message.error("Đã xảy ra lỗi");
    }
  };

  const handleSelectItem = (value: IUser) => {
    setSelectedUser(value);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Spin spinning={getAllUsersAPI.loading || addNewUserAPI.loading || deleteUserAPI.loading}>
      <div className="m-4">
        <h2 className="font-semibold text-lg">Danh sách nhân viên</h2>
        <div className="w-[156px] ml-auto">
          <Button onClick={() => handleOpen("add")}>
            <p className="ml-1 font-semibold text-white bg-blue-500 text-base px-4 py-2 rounded-lg">
              Thêm mới
            </p>
          </Button>
        </div>
        <TableComponent
          scroll={{ x: "100%" }}
          columns={Columns({
            onClickDelete: () => handleOpen("delete"),
            onClickEdit: () => handleOpen("edit"),
            handleSelectItem,
          })}
          count={0}
          data={users}
          page={1}
          rowPerPage={10}
        />
        {open === "add" && (
          <AddUserModal
            open={open === "add"}
            handleClose={handleClose}
            handleAddUser={handleAddUser}
          />
        )}
        {open === "edit" && selectedUser && (
          <EditUserModal
            open={open === "edit"}
            values={selectedUser}
            handleClose={handleClose}
            handleEditUser={handleEditUser}
          />
        )}
        {open === "delete" && selectedUser && (
          <Modal.Delete
            open={open === "delete"}
            onCancel={handleClose}
            onConfirm={() => {
              handleDeleteUser(selectedUser._id as string);
              handleClose();
            }}
          />
        )}
      </div>
    </Spin>
  );
};

export default User;
