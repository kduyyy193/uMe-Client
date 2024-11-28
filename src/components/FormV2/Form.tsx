import { useEffect } from "react";
import { Form as FormAnt } from "antd";
import { FormInstance } from "antd/lib";
import { FormItemProps } from "antd/es/form";
import { Store } from "antd/es/form/interface";

import Button from "./Button";

export type ItemForm = FormItemProps & {
  field: any;
};

type FormProps = {
  name: string;
  form: FormInstance<any>;
  values?: object;
  items: ItemForm[];
  getButtonSubmit: boolean;
  textBtnSubmit?: string;
  classNameBtn?: string;
  onFinish?: ((values: Store) => void) | undefined;
};

const FormV2 = ({
  name,
  form,
  values,
  items,
  getButtonSubmit,
  textBtnSubmit,
  classNameBtn,
  onFinish,
}: FormProps) => {
  useEffect(() => {
    if (values) {
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
    return () => {
      form.resetFields();
    };
  }, []);

  return (
    <FormAnt
      form={form}
      name={name}
      defaultValue={Object.keys(form.getFieldsValue()).length ? form.getFieldsValue() : values}
      initialValues={Object.keys(form.getFieldsValue()).length ? form.getFieldsValue() : values}
      onFinish={onFinish}
      layout="vertical"
    >
      {items?.map((item, idx) => (
        <FormAnt.Item
          key={idx}
          name={`${item.name}`}
          label={item.label}
          rules={item.rules}
          style={item?.style}
          hidden={item?.hidden}
          colon={false}
        >
          {item?.field}
        </FormAnt.Item>
      ))}
      {getButtonSubmit && (
        <Button
          className={classNameBtn!}
          title={textBtnSubmit || "Submit"}
          type="submit"
          htmlType="submit"
          style={{
            minHeight: "60px",
          }}
        />
      )}
    </FormAnt>
  );
};

export default FormV2;
