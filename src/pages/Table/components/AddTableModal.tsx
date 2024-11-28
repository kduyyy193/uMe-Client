import { Form as FormAnt, Input, Modal, ModalProps } from "antd";

import { useState } from "react";
import FormV2 from "components/FormV2";
import { ItemForm } from "components/FormV2/Form";
import { TTableRequest } from "services/table/types";

type PropsType = {
  handleClose: () => void;
  handleAddTable: (values: TTableRequest) => void;
} & ModalProps;

const AddTableModal = (props: PropsType) => {
  const { handleAddTable, handleClose, open } = props;
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields();
      if (Object.keys(values).length) {
        handleAddTable(values);
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
          title={"Tạo mới bàn"}
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

export default AddTableModal;

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
