import { Control, Controller, FieldPath, RegisterOptions } from "react-hook-form";
import { InputNumber, InputNumberProps } from "antd";
import HelperText from "components/HelperText";
import Label from "components/Label";
import cn from "utils/cn";

interface IProps<T extends Record<string, any>> extends InputNumberProps {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  showError?: boolean;
  labelRequired?: boolean;
  min?: number;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  customOnChange?: (value: any) => void;
}

const RHFInputNumber = <T extends Record<string, any>>({
  control,
  name,
  disabled,
  label,
  className,
  showError = true,
  labelRequired = true,
  rules,
  min,
  customOnChange,
  ...props
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
            <div className="relative custom-input-number">
              <InputNumber
                id={name}
                className={cn(
                  "w-full !min-w-[140px] text-gray-600 border bg-white border-gray-300 focus:border-blue-500 focus:shadow focus:shadow-blue-500/30 focus:outline-0 placeholder:font-light placeholder:text-gray-300",
                  className,
                  disabled && "!text-gray-600 !bg-input-number disabled"
                )}
                value={value}
                onChange={(value) => {
                  if (customOnChange) {
                    customOnChange(value);
                  } else {
                    onChange(value);
                  }
                }}
                onBlur={onBlur}
                disabled={disabled}
                min={min}
                {...props}
              />
            </div>
            {showError && <HelperText message={error?.message || ""} />}
          </>
        )}
      />
    </>
  );
};

export default RHFInputNumber;
