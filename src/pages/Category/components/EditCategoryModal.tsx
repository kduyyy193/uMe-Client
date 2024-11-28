import { Form as FormAnt, Input, Modal, ModalProps } from "antd";

import { useState } from "react";
import FormV2 from "components/FormV2";
import { ItemForm } from "components/FormV2/Form";
import { TCategoryRequest } from "services/catergory/types";

type PropsType = {
  values: TCategoryRequest;
  handleClose: () => void;
  handleEditCategory: (values: TCategoryRequest) => void;
} & ModalProps;

const EditCategoryModal = (props: PropsType) => {
  const { handleEditCategory, handleClose, open, values } = props;
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields();
      if (Object.keys(values).length) {
        handleEditCategory(values);
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
          title={"Chỉnh sửa category"}
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
      name: "name",
      label: "Danh mục",
      rules: [{ required: true }],
      field: <Input placeholder="Danh mục" />,
      style: {
        width: "100%",
      },
    },
    {
      name: "description",
      label: "Description",
      field: <Input.TextArea placeholder="Description" rows={4} />,
      style: {
        width: "100%",
      },
    },
  ];
};
