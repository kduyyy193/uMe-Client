import Table from "components/Table";
import useAsync from "hooks/useAsync";
import { useEffect, useState } from "react";
import CategoryService from "services/catergory";
import { TCategoryRequest, TCategoryResponse } from "services/catergory/types";
import { ApiResponse } from "services/types";
import Columns from "./Columns";
import useModal from "hooks/useModal";
import AddCategoryModal from "./components/AddCategoryModal";
import { message, Spin } from "antd";
import Button from "components/FormV2/Button";
import Modal from "components/Modal";
import EditCategoryModal from "./components/EditCategoryModal";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const { open, handleClose, handleOpen } = useModal();

  const getAllCategoryAPI = useAsync<ApiResponse<TCategoryResponse[]>>(
    CategoryService.getAllCategories
  );
  const addNewCategoryAPI = useAsync<ApiResponse<TCategoryRequest>>(CategoryService.createCategory);
  const editCategoryAPI = useAsync<ApiResponse<TCategoryRequest>>(CategoryService.updateCategory);
  const deleteCategoryAPI = useAsync<ApiResponse<{ success: boolean }>>(
    CategoryService.deleteCategory
  );

  // const [activeTab, setActiveTab] = useState<"category" | "menu">("category");
  const [category, setCategory] = useState<TCategoryResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<TCategoryResponse>();

  const getAllCategory = async () => {
    const response = await getAllCategoryAPI.run();
    if (response?.data) {
      const categoryAddedKey = response?.data.map((d, idx) => ({ ...d, key: idx + 1 }));
      setCategory(categoryAddedKey || []);
    }
  };

  const handleAddCategory = async (values: TCategoryRequest) => {
    const response = await addNewCategoryAPI.run(values);
    if (response?.data) {
      getAllCategory();
      return message.success("Thêm mới danh mục thành công");
    }
    message.error("Đã xảy ra lỗi");
  };

  const handleEditCategory = async (values: TCategoryRequest) => {
    const response = await editCategoryAPI.run(selectedItem?._id, values);
    if (response?.data) {
      getAllCategory();
      return message.success("Chỉnh sửa danh mục thành công");
    }
    message.error("Đã xảy ra lỗi");
  };

  const handleDeleteCategory = async (id: string) => {
    if (!id) return;
    const response = await deleteCategoryAPI.run(id);
    if (response?.data) {
      getAllCategory();
      return message.success("Xoá danh mục thành công");
    }
    message.error("Đã xảy ra lỗi");
  };

  const handleSelectItem = (value: TCategoryResponse) => {
    setSelectedItem(value);
  };

  const handleViewMenu = (categoryId: string) => {
    navigate("/menu/" + categoryId);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Spin
      spinning={getAllCategoryAPI.loading || addNewCategoryAPI.loading || deleteCategoryAPI.loading}
    >
      <div className="m-4">
        <h2 className="font-semibold text-lg">Danh sách danh mục</h2>
        {/* <div className="relative">
          <div className="flex gap-8 ml-auto w-fit mr-8">
            <div
              onClick={() => setActiveTab("category")}
              className={`text-base font-medium py-1 px-2 rounded-lg cursor-pointer ${
                activeTab === "category" ? "text-purple-500" : "text-gray-500"
              }`}
            >
              Category
            </div>
            <div
              onClick={() => setActiveTab("menu")}
              className={`text-base font-medium py-1 px-2 rounded-lg cursor-pointer ${
                activeTab === "menu" ? "text-purple-500" : "text-gray-500"
              }`}
            >
              Menu
            </div>
          </div>
          <div
            className={cn(
              `absolute bottom-0 h-[2px] bg-purple-500 transition-all duration-300 ease-in-out translate-x-[-100%] ${
                activeTab === "category" ? "right-[50px] w-20" : "right-[-22px] w-[56px]"
              }`
            )}
          ></div>
        </div> */}
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
          onRowClick={(record) => handleViewMenu(record._id)}
          count={0}
          data={category}
          page={1}
          rowPerPage={10}
        />
        {open === "add" && (
          <AddCategoryModal
            open={open === "add"}
            handleClose={handleClose}
            handleAddCategory={handleAddCategory}
          />
        )}
        {open === "edit" && (
          <EditCategoryModal
            open={open === "edit"}
            values={selectedItem!}
            handleClose={handleClose}
            handleEditCategory={handleEditCategory}
          />
        )}
        {open === "delete" && (
          <Modal.Delete
            open={open === "delete"}
            onCancel={handleClose}
            onConfirm={() => {
              handleDeleteCategory(selectedItem?._id as string);
              handleClose();
            }}
          />
        )}
      </div>
    </Spin>
  );
};

export default Category;
