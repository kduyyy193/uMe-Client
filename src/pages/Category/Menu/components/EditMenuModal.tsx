import { Form as FormAnt, Input, Modal, ModalProps } from "antd";

import { useState } from "react";
import FormV2 from "components/FormV2";
import { ItemForm } from "components/FormV2/Form";
import { TMenuRequest } from "services/menu/types";

type PropsType = {
  values: TMenuRequest;
  handleClose: () => void;
  handleEditMenu: (values: TMenuRequest) => void;
} & ModalProps;

const EditMenuModal = (props: PropsType) => {
  const { handleEditMenu, handleClose, open, values } = props;
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields();
      if (Object.keys(values).length) {
        handleEditMenu(values);
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
          title={"Chỉnh sửa món"}
          onOk={handleSubmit}
          onCancel={handleClose}
          okText="Save"
          closable={false}
          className="min-w-[694px]"
          confirmLoading={isLoading}
          {...props}
        >
          <div className="my-4 mx-0">
            <FormV2
              values={values}
              form={form}
              items={FormItems()}
              name="create_account"
              getButtonSubmit={false}
              classNameBtn="p-6 !mt-8 !text-xl uppercase"
            />
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default EditMenuModal;

const FormItems = (): ItemForm[] => {
  return [
    {
      name: "name",
      label: "Tên món",
      rules: [{ required: true }],
      field: <Input placeholder="Tên món" />,
      style: {
        width: "100%",
      },
    },
    {
      name: "price",
      label: "Giá",
      rules: [{ required: true }],
      field: <Input type="number" min={1} placeholder="Giá" />,
      style: {
        width: "100%",
      },
    },
    {
      name: "quantity",
      label: "Số lượng",
      rules: [{ required: true }],
      field: <Input type="number" min={1} placeholder="Số lượng" />,
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
