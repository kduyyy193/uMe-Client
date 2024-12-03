import { Modal, Input, Form, Spin } from "antd";
import { useState } from "react";
import { TIngredientRequest } from "services/ingredient/types";

type PropsType = {
  open: boolean;
  onClose: () => void;
  handleAddIngredient: (values: TIngredientRequest) => void;
};

const AddIngredientModal = ({ open, onClose, handleAddIngredient }: PropsType) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<TIngredientRequest>();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      handleAddIngredient(values);
      onClose();
    } catch (error) {
      console.error("Error adding ingredient", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm Nguyên Liệu"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" name="add_ingredient_form">
          <Form.Item
            name="name"
            label="Tên Nguyên Liệu"
            rules={[{ required: true, message: "Tên nguyên liệu là bắt buộc!" }]}
          >
            <Input placeholder="Nhập tên nguyên liệu" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Số Lượng"
            rules={[{ required: true, message: "Số lượng là bắt buộc!" }]}
          >
            <Input type="number" placeholder="Nhập số lượng nguyên liệu" />
          </Form.Item>

          <Form.Item
            name="unit"
            label="Đơn Vị"
            rules={[{ required: true, message: "Đơn vị là bắt buộc!" }]}
          >
            <Input placeholder="Nhập đơn vị (kg, lít, v.v.)" />
          </Form.Item>

          <Form.Item
            name="unitPrice"
            label="Giá trên một đơn vị"
            rules={[{ required: true, message: "Giá trên một đơn vị là bắt buộc!" }]}
          >
            <Input type="number" placeholder="Nhập giá trên một đơn vị nguyên liệu" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddIngredientModal;
