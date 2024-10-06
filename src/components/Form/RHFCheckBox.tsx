import { Checkbox } from "antd";
import { Control, Controller, FieldPath, RegisterOptions } from "react-hook-form";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import HelperText from "components/HelperText";
import Label from "components/Label";

interface IProps<T extends Record<string, any>> {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    showError?: boolean;
    labelRequired?: boolean;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    onCustomChange?: (event: CheckboxChangeEvent) => void;
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
}

const RHFCheckBox = <T extends Record<string, any>>({
    control,
    name,
    label,
    showError = true,
    labelRequired = true,
    disabled = false,
    className = "",
    rules,
    children,
    onCustomChange,
}: IProps<T>) => {
    return (
        <>
            {label && <Label title={label} htmlFor={name} required={labelRequired} />}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
                    <>
                        <Checkbox
                            id={name}
                            checked={Boolean(value)}
                            onChange={(event) => {
                                if (onCustomChange) {
                                    onCustomChange(event);
                                } else {
                                    onChange(event);
                                }
                                onBlur();
                            }}
                            className={className}
                            disabled={disabled}
                        >
                            {children}
                        </Checkbox>
                        {showError && <HelperText message={error?.message || ""} />}
                    </>
                )}
            />
        </>
    );
};

export default RHFCheckBox;
