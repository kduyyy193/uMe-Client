import { Modal, Input, Form, Spin } from "antd";
import { useState, useEffect } from "react";
import { TIngredientRequest, TIngredientResponse } from "services/ingredient/types";

type PropsType = {
  open: boolean;
  ingredient?: TIngredientResponse;
  onClose: () => void;
  handleEditIngredient: (values: TIngredientRequest) => void;
};

const EditIngredientModal = ({ open, ingredient, onClose, handleEditIngredient }: PropsType) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<TIngredientRequest>();

  useEffect(() => {
    if (ingredient) {
      form.setFieldsValue({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      });
    }
  }, [ingredient, form]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      handleEditIngredient(values);
      onClose();
    } catch (error) {
      console.error("Error editing ingredient", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Chỉnh Sửa Nguyên Liệu"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" name="edit_ingredient_form">
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
        </Form>
      </Spin>
    </Modal>
  );
};

export default EditIngredientModal;
