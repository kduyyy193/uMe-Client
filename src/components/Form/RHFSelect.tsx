import HelperText from "components/HelperText";
import Label from "components/Label";
import { Control, Controller, FieldPath, RegisterOptions } from "react-hook-form";
import Select, { ISelectProps } from "components/Select/Select";

interface IProps<T extends Record<string, any>> extends ISelectProps {
    control: Control<T>;
    name: FieldPath<T>;
    customOnChange?: (value: any) => void;
    placeholder?: string;
    label?: string;
    showError?: boolean;
    disabled?: boolean;
    labelRequired?: boolean;
    className?: string;
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
}

const RHFSelect = <T extends Record<string, any>>({
    control,
    name,
    placeholder,
    label,
    options,
    showError = true,
    labelRequired = true,
    disabled = false,
    showSearch,
    rootClassName,
    className = "",
    mode,
    rules,
    optionLabelProp,
    children,
    tagRender,
    dropdownRender,
    customOnChange,
}: IProps<T>) => {
    return (
        <>
            {label && <Label title={label} htmlFor={name} required={labelRequired} />}
            <Controller
                rules={rules}
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
                    <>
                        <Select
                            rootClassName={rootClassName}
                            options={options}
                            id={name}
                            value={value}
                            showSearch={showSearch}
                            onChange={(value) => {
                                if (customOnChange) {
                                    customOnChange(value);
                                } else {
                                    onChange(value);
                                }
                            }}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            className={className}
                            disabled={disabled}
                            mode={mode}
                            children={children}
                            tagRender={tagRender}
                            dropdownRender={dropdownRender}
                            optionLabelProp={optionLabelProp}
                        />
                        {showError && <HelperText message={error?.message || ""} />}
                    </>
                )}
            />
        </>
    );
};

export default RHFSelect;
