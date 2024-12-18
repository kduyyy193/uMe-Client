import Table from "components/Table";
import useAsync from "hooks/useAsync";
import { useEffect, useState } from "react";
import MenuService from "services/menu";
import { TMenuRequest, TMenuResponse } from "services/menu/types";
import { ApiResponse } from "services/types";
import Columns from "./Columns";
import useModal from "hooks/useModal";
import AddMenuModal from "./components/AddMenuModal";
import { message, Spin } from "antd";
import Button from "components/FormV2/Button";
import Modal from "components/Modal";
import EditMenuModal from "./components/EditMenuModal";
import { useNavigate, useParams } from "react-router-dom";

const Menu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { open, handleClose, handleOpen } = useModal();
  const [menu, setMenu] = useState<TMenuResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<TMenuResponse | null>(null);

  const getAllMenuAPI = useAsync<ApiResponse<TMenuResponse[]>>(MenuService.getAllMenusByCategory);
  const addNewMenuAPI = useAsync<ApiResponse<TMenuResponse>>(MenuService.createMenu);
  const editMenuAPI = useAsync<ApiResponse<TMenuResponse>>(MenuService.updateMenu);
  const deleteMenuAPI = useAsync<ApiResponse<{ success: boolean }>>(MenuService.deleteMenu);

  const getAllMenu = async () => {
    const response = await getAllMenuAPI.run(id);
    if (response?.data) {
      const menuWithKeys = response.data.map((menu, idx) => ({
        ...menu,
        key: idx + 1,
      }));
      setMenu(menuWithKeys);
    }
  };

  const handleAddMenu = async (values: TMenuRequest) => {
    const response = await addNewMenuAPI.run(id, values);
    if (response?.data) {
      getAllMenu();
      message.success("Thêm mới món thành công");
      handleClose();
    } else {
      message.error("Đã xảy ra lỗi");
    }
  };

  const handleEditMenu = async (values: TMenuRequest) => {
    if (!selectedItem) return;
    const response = await editMenuAPI.run(id, selectedItem._id, values);
    if (response?.data) {
      getAllMenu();
      handleClose();
      return message.success("Chỉnh sửa món thành công");
    }
    message.error("Đã xảy ra lỗi");
  };

  const handleDeleteMenu = async (menuId: string) => {
    if (!menuId) return;
    const response = await deleteMenuAPI.run(id, menuId);
    if (response?.data?.success) {
      getAllMenu();
      handleClose();
      return message.success("Xoá món thành công");
    }
    message.error("Đã xảy ra lỗi");
  };

  const handleSelectItem = (value: TMenuResponse) => {
    setSelectedItem(value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getAllMenu();
  }, [id]);

  return (
    <Spin spinning={getAllMenuAPI.loading || addNewMenuAPI.loading || deleteMenuAPI.loading}>
      <div className="m-4">
        <h2 onClick={handleBack} className="font-semibold text-lg cursor-pointer">
          {"< Danh sách menu"}
        </h2>
        <div className="flex items-center">
          <div className="w-[156px] ml-auto">
            <Button onClick={() => handleOpen("add")}>
              <div className="flex items-center">
                <p className="ml-1 font-semibold text-white bg-blue-500 text-base px-4 py-2 rounded-lg">
                  Thêm mới
                </p>
              </div>
            </Button>
          </div>
        </div>
        <Table
          scroll={{ x: "100%" }}
          columns={Columns({
            onClickDelete: () => handleOpen("delete"),
            onClickEdit: () => handleOpen("edit"),
            handleSelectItem,
          })}
          count={0}
          data={menu}
          page={1}
          rowPerPage={10}
        />
        {open === "add" && (
          <AddMenuModal
            open={open === "add"}
            handleClose={handleClose}
            handleAddMenu={handleAddMenu}
          />
        )}
        {open === "edit" && selectedItem && (
          <EditMenuModal
            open={open === "edit"}
            values={selectedItem}
            handleClose={handleClose}
            handleEditMenu={handleEditMenu}
          />
        )}
        {open === "delete" && selectedItem && (
          <Modal.Delete
            open={open === "delete"}
            onCancel={handleClose}
            onConfirm={() => {
              handleDeleteMenu(selectedItem._id);
              handleClose();
            }}
          />
        )}
      </div>
    </Spin>
  );
};

export default Menu;
