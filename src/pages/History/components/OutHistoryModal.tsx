import { Form as FormAnt, Input, Modal, ModalProps, Select } from "antd";
import { useEffect, useState } from "react";
import FormV2 from "components/FormV2";
import { ItemForm } from "components/FormV2/Form";
import { TInventoryHistoryRequest } from "services/history/types";
import useAsync from "hooks/useAsync";
import { ApiResponse } from "services/types";
import { TIngredientResponse } from "services/ingredient/types";
import IngredientService from "services/ingredient";

type PropsType = {
  handleClose: () => void;
  handleOutHistory: (values: TInventoryHistoryRequest) => void;
} & ModalProps;

const OutHistoryModal = (props: PropsType) => {
  const { handleOutHistory, handleClose, open } = props;
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields();
      if (Object.keys(values).length) {
        handleOutHistory(values);
        handleClose();
      }
    } catch {
      console.log("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {open ? (
        <Modal
          centered
          title={"Tạo mới lịch sử xuất kho"}
          onOk={handleSubmit}
          onCancel={handleClose}
          okText="Lưu"
          closable={false}
          className="min-w-[694px]"
          confirmLoading={isLoading}
          {...props}
        >
          <div className="my-4 mx-0">
            <FormV2
              form={form}
              items={FormItems()}
              name="create_history"
              getButtonSubmit={false}
              classNameBtn="p-6 !mt-8 !text-xl uppercase"
            />
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default OutHistoryModal;

const FormItems = (): ItemForm[] => {
  const getAllIngredientAPI = useAsync<ApiResponse<TIngredientResponse[]>>(
    IngredientService.getIngredients
  );

  const getAllIngredient = async () => {
    await getAllIngredientAPI.run();
  };
  useEffect(() => {
    getAllIngredient();
  }, []);

  return [
    {
      name: "ingredientId",
      label: "Nguyên liệu",
      rules: [{ required: true, message: "Chọn nguyên liệu" }],
      field: (
        <Select placeholder="Chọn nguyên liệu">
          {getAllIngredientAPI.value?.data?.map((g) => {
            return (
              <Select.Option key={g._id} value={g._id}>
                {g.name}
              </Select.Option>
            );
          })}
        </Select>
      ),
      style: {
        width: "100%",
      },
    },
    {
      name: "quantity",
      label: "Số lượng",
      rules: [{ required: true, message: "Nhập số lượng" }],
      field: <Input type="number" placeholder="Số lượng" />,
      style: {
        width: "100%",
      },
    },
    {
      name: "description",
      label: "Mô tả",
      field: <Input.TextArea placeholder="Mô tả" rows={4} />,
      style: {
        width: "100%",
      },
    },
  ];
};
