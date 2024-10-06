import HelperText from "components/HelperText";
import TextAreaField from "components/TextAreaField";
import Label from "components/Label";
import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldPath, RegisterOptions } from "react-hook-form";

interface IProps<T extends Record<string, any>> {
  control: Control<T>;
  name: FieldPath<T>;
  moreclass?: string;
  placeholder?: string;
  label?: string;
  endAdornment?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  labelRequired?: boolean;
  rows?: number;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  maxLength?: number;
}

const RHFTextAreaField = <T extends Record<string, any>>({
  control,
  name,
  placeholder,
  label,
  disabled,
  labelRequired = true,
  rules,
  rows = 2,
  maxLength,
}: IProps<T>) => {
  return (
    <>
      {label && <Label title={label} htmlFor={name} required={labelRequired} />}
      <Controller
        rules={rules}
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
          <div className="flex flex-col gap-y-1">
            <TextAreaField
              name={name}
              id={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              maxLength={maxLength}
            />
            <HelperText message={error?.message || ""} />
          </div>
        )}
      />
    </>
  );
};

export default RHFTextAreaField;
