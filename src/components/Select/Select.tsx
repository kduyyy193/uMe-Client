import React from "react";
import classNames from "classnames";
import { Select as AntSelect, SelectProps } from "antd";

export interface ISelectProps extends SelectProps {
    className?: string;
}

const Select: React.FC<ISelectProps> = ({
    options,
    placeholder,
    value,
    showSearch = true,
    disabled = false,
    className = "",
    mode,
    optionLabelProp,
    children,
    rootClassName,
    suffixIcon,
    tagRender,
    onChange,
    onBlur,
    getPopupContainer,
    ...props
}) => {
    return (
        <AntSelect
            rootClassName={rootClassName}
            showSearch={showSearch}
            suffixIcon={suffixIcon}
            className={classNames(`${className} !text-3.5`, { "!text-black disabled": disabled })}
            value={value}
            options={options}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={placeholder}
            filterOption={(input, option) => {
                return (option?.label ?? "").toString().toLowerCase().includes(input.toLowerCase());
            }}
            optionLabelProp={optionLabelProp}
            disabled={disabled}
            mode={mode}
            getPopupContainer={getPopupContainer}
            tagRender={tagRender}
            children={children}
            {...props}
        />
    );
};

export default Select;
