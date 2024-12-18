// components/AddUserModal.tsx
import { Form as FormAnt, Input, Modal, ModalProps, Select } from "antd";
import { useState } from "react";
import FormV2 from "components/FormV2";
import { ItemForm } from "components/FormV2/Form";
import { IUser } from "interfaces/IUser";

type PropsType = {
  handleClose: () => void;
  handleAddUser: (values: IUser) => void;
} & ModalProps;

const AddUserModal = (props: PropsType) => {
  const { handleAddUser, handleClose, open } = props;
  const [form] = FormAnt.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const values = await form.validateFields();
      if (Object.keys(values).length) {
        handleAddUser(values);
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
          title={"Tạo mới nhân viên"}
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
              name="create_user"
              getButtonSubmit={false}
              classNameBtn="p-6 !mt-8 !text-xl uppercase"
            />
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default AddUserModal;

const FormItems = (): ItemForm[] => {
  return [
    {
      name: "username",
      label: "Tên nhân viên",
      rules: [{ required: true }],
      field: <Input placeholder="Tên nhân viên" />,
      style: {
        width: "100%",
      },
    },
    {
      name: "password",
      label: "Mật khẩu",
      rules: [{ required: true }],
      field: <Input.Password placeholder="Mật khẩu" />,
      style: {
        width: "100%",
      },
    },
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
