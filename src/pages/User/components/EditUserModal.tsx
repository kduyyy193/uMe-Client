// components/EditUserModal.tsx
import { Form as FormAnt, Modal, ModalProps, Select } from "antd";
import { useState } from "react";
import FormV2 from "components/FormV2";
import { ItemForm } from "components/FormV2/Form";
import { IUser } from "interfaces/IUser";

type PropsType = {
  values: IUser;
  handleClose: () => void;
  handleEditUser: (values: IUser) => void;
} & ModalProps;

const EditUserModal = (props: PropsType) => {
  const { handleEditUser, handleClose, open, values } = props;
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields();
      if (Object.keys(values).length) {
        handleEditUser(values);
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
          title={"Chỉnh sửa nhân viên"}
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
              values={values}
              form={form}
              items={FormItems()}
              name="edit_user"
              getButtonSubmit={false}
              classNameBtn="p-6 !mt-8 !text-xl uppercase"
            />
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default EditUserModal;

const FormItems = (): ItemForm[] => {
  return [
    {
      name: "role",
      label: "Vai trò",
      rules: [{ required: true }],
      field: (
        <Select placeholder="Chọn vai trò" style={{ width: "100%" }}>
          <Select.Option value="Waiter">Waiter</Select.Option>
          <Select.Option value="Kitchen">Kitchen</Select.Option>
        </Select>
      ),
      style: {
        width: "100%",
      },
    },
  ];
};
