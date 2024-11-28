import { Form as FormAnt, Input, Modal, ModalProps } from "antd";

import { useState } from "react";
import FormV2 from "components/FormV2";
import { ItemForm } from "components/FormV2/Form";
import { TTableRequest } from "services/table/types";

type PropsType = {
  values: TTableRequest;
  handleClose: () => void;
  handleEditTable: (values: TTableRequest) => void;
} & ModalProps;

const EditCategoryModal = (props: PropsType) => {
  const { handleEditTable, handleClose, open, values } = props;
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields();
      if (Object.keys(values).length) {
        handleEditTable(values);
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
          title={"Chỉnh sửa bàn"}
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

export default EditCategoryModal;

const FormItems = (): ItemForm[] => {
  return [
    {
      name: "tableNumber",
      label: "Bàn",
      rules: [{ required: true }],
      field: <Input placeholder="Bàn" />,
      style: {
        width: "100%",
      },
    },
    {
      name: "seats",
      label: "Chỗ ngồi",
      rules: [{ required: true }],
      field: <Input type="number" min={1} placeholder="Chỗ ngồi" />,
      style: {
        width: "100%",
      },
    },
    {
      name: "location",
      label: "Vị trí",
      field: <Input.TextArea placeholder="Vị trí" rows={4} />,
      style: {
        width: "100%",
      },
    },
  ];
};
