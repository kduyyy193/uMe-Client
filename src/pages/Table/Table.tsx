import TableService from "services/table";
import useAsync from "hooks/useAsync";
import { useEffect, useState } from "react";
import { ApiResponse } from "services/types";
import { TTableRequest, TTableResponse } from "services/table/types";
import Columns from "./Columns";
import useModal from "hooks/useModal";
import AddTableModal from "./components/AddTableModal";
import { message, Spin } from "antd";
import Button from "components/FormV2/Button";
import Modal from "components/Modal";
import EditTableModal from "./components/EditTableModal";
import TableComponent from "components/Table";

const TablePage = () => {
  const { open, handleClose, handleOpen } = useModal();
  const [tables, setTables] = useState<TTableResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<TTableResponse | null>(null);

  const getAllTablesAPI = useAsync<ApiResponse<TTableResponse[]>>(TableService.getAllTables);
  const addNewTableAPI = useAsync<ApiResponse<TTableResponse>>(TableService.createTable);
  const editTableAPI = useAsync<ApiResponse<TTableResponse>>(TableService.updateTable);
  const deleteTableAPI = useAsync<ApiResponse<{ msg: string }>>(TableService.deleteTable);

  const getAllTables = async () => {
    const response = await getAllTablesAPI.run();
    if (response?.data) {
      const tablesWithKeys = response.data.map((table, idx) => ({
        ...table,
        key: idx + 1,
      }));
      setTables(tablesWithKeys);
    }
  };

  const handleAddTable = async (values: TTableRequest) => {
    const response = await addNewTableAPI.run(values);
    if (response?.data) {
      getAllTables();
      message.success("Thêm mới bàn thành công");
      handleClose();
    } else {
      message.error("Đã xảy ra lỗi");
    }
  };

  const handleEditTable = async (values: TTableRequest) => {
    if (!selectedItem) return;
    const response = await editTableAPI.run(selectedItem._id, values);
    if (response?.data) {
      getAllTables();
      handleClose();
      message.success("Chỉnh sửa bàn thành công");
    } else {
      message.error("Đã xảy ra lỗi");
    }
  };

  const handleDeleteTable = async (tableId: string) => {
    if (!tableId) return;
    const response = await deleteTableAPI.run(tableId);
    if (response?.data) {
      getAllTables();
      handleClose();
      message.success("Xoá bàn thành công");
    } else {
      message.error("Đã xảy ra lỗi");
    }
  };

  const handleSelectItem = (value: TTableResponse) => {
    setSelectedItem(value);
  };

  useEffect(() => {
    getAllTables();
  }, []);

  return (
    <Spin spinning={getAllTablesAPI.loading || addNewTableAPI.loading || deleteTableAPI.loading}>
      <div className="m-4">
        <h2 className="font-semibold text-lg">Danh sách bàn</h2>
        <div className="w-[156px] ml-auto">
          <Button onClick={() => handleOpen("add")}>
            <div className="flex items-center">
              <p className="ml-1 font-semibold text-white bg-blue-500 text-base px-4 py-2 rounded-lg">
                Thêm mới
              </p>
            </div>
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
          data={tables}
          page={1}
          rowPerPage={10}
        />
        {open === "add" && (
          <AddTableModal
            open={open === "add"}
            handleClose={handleClose}
            handleAddTable={handleAddTable}
          />
        )}
        {open === "edit" && selectedItem && (
          <EditTableModal
            open={open === "edit"}
            values={selectedItem}
            handleClose={handleClose}
            handleEditTable={handleEditTable}
          />
        )}
        {open === "delete" && selectedItem && (
          <Modal.Delete
            open={open === "delete"}
            onCancel={handleClose}
            onConfirm={() => {
              handleDeleteTable(selectedItem._id);
              handleClose();
            }}
          />
        )}
      </div>
    </Spin>
  );
};

export default TablePage;
