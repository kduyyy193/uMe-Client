import React from "react";
import { Input } from "antd";
import { TextAreaProps } from "antd/es/input/TextArea";

const { TextArea } = Input;

interface IProps extends TextAreaProps {}

const TextAreaField: React.FC<IProps> = ({ placeholder, value, autoSize, onChange, onBlur, ...props }) => {
    return (
        <TextArea
            placeholder={placeholder}
            value={value}
            autoSize={autoSize}
            onChange={onChange}
            onBlur={onBlur}
            rows={4}
            {...props}
        />
    );
};

export default TextAreaField;
