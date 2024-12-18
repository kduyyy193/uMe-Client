import Table from "components/Table";
import useAsync from "hooks/useAsync";
import { useEffect, useState } from "react";
import IngredientService from "services/ingredient";
import { TIngredientRequest, TIngredientResponse } from "services/ingredient/types";
import { ApiResponse } from "services/types";
import useModal from "hooks/useModal";
import { message, Spin } from "antd";
import Button from "components/FormV2/Button";
import Modal from "components/Modal";
import Columns from "./Columns";
import AddIngredientModal from "./components/AddIngredientModal";
import EditIngredientModal from "./components/EditIngredientModal";

const Ingredient = () => {
  const { open, handleClose, handleOpen } = useModal();

  const getAllIngredientAPI = useAsync<ApiResponse<TIngredientResponse[]>>(
    IngredientService.getIngredients
  );
  const addNewIngredientAPI = useAsync<ApiResponse<TIngredientRequest>>(
    IngredientService.createIngredient
  );
  const editIngredientAPI = useAsync<ApiResponse<TIngredientRequest>>(
    IngredientService.updateIngredient
  );
  const deleteIngredientAPI = useAsync<ApiResponse<{ success: boolean }>>(
    IngredientService.deleteIngredient
  );

  const [ingredient, setIngredient] = useState<TIngredientResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<TIngredientResponse>();

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllIngredient = async (page: number, pageSize: number) => {
    const response = await getAllIngredientAPI.run(page, pageSize);
    if (response?.data) {
      const ingredientAddedKey = response?.data.map((d, idx) => ({ ...d, key: idx + 1 }));
      setIngredient(ingredientAddedKey || []);
    }
  };

  const handleAddIngredient = async (values: TIngredientRequest) => {
    const response = await addNewIngredientAPI.run(values);
    if (response?.data) {
      getAllIngredient(currentPage, pageSize); // Gọi lại API khi thêm mới nguyên liệu
      return message.success("Thêm mới nguyên liệu thành công");
    }
    message.error("Đã xảy ra lỗi");
  };

  const handleEditIngredient = async (values: TIngredientRequest) => {
    const response = await editIngredientAPI.run(selectedItem?._id, values);
    if (response?.data) {
      getAllIngredient(currentPage, pageSize); // Gọi lại API khi chỉnh sửa nguyên liệu
      return message.success("Chỉnh sửa nguyên liệu thành công");
    }
    message.error("Đã xảy ra lỗi");
  };

  const handleDeleteIngredient = async (id: string) => {
    if (!id) return;
    const response = await deleteIngredientAPI.run(id);
    if (response?.data) {
      getAllIngredient(currentPage, pageSize); // Gọi lại API khi xoá nguyên liệu
      return message.success("Xoá nguyên liệu thành công");
    }
    message.error("Đã xảy ra lỗi");
  };

  const handleSelectItem = (value: TIngredientResponse) => {
    setSelectedItem(value);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    getAllIngredient(page, pageSize);
  };

  const handleChangePerPage = (perPage: number) => {
    setPageSize(perPage);
    getAllIngredient(currentPage, perPage);
  };

  useEffect(() => {
    getAllIngredient(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <Spin
      spinning={
        getAllIngredientAPI.loading || addNewIngredientAPI.loading || deleteIngredientAPI.loading
      }
    >
      <div className="m-4">
        <h2 className="font-semibold text-lg">Danh sách nguyên liệu</h2>
        <div className="w-[156px] ml-auto">
          <Button onClick={() => handleOpen("add")}>
            <div className="flex items-center">
              <p className="ml-1 font-semibold text-white bg-blue-500 text-base px-4 py-2 rounded-lg">
                Thêm mới
              </p>
            </div>
          </Button>
        </div>
        <Table
          scroll={{ x: "100%" }}
          columns={Columns({
            onClickDelete: () => handleOpen("delete"),
            onClickEdit: () => handleOpen("edit"),
            handleSelectItem,
          })}
          data={ingredient}
          count={getAllIngredientAPI.value?.pageInfo?.count || 0}
          page={currentPage - 1}
          rowPerPage={pageSize}
          onPageChange={handleChangePage}
          onPerPageChange={handleChangePerPage}
        />
        {open === "add" && (
          <AddIngredientModal
            open={open === "add"}
            onClose={handleClose}
            handleAddIngredient={handleAddIngredient}
          />
        )}
        {open === "edit" && (
          <EditIngredientModal
            open={open === "edit"}
            ingredient={selectedItem!}
            onClose={handleClose}
            handleEditIngredient={handleEditIngredient}
          />
        )}
        {open === "delete" && (
          <Modal.Delete
            open={open === "delete"}
            onCancel={handleClose}
            onConfirm={() => {
              handleDeleteIngredient(selectedItem?._id as string);
              handleClose();
            }}
          />
        )}
      </div>
    </Spin>
  );
};

export default Ingredient;
