import HelperText from "components/HelperText";
import Label from "components/Label";
import { Control, Controller, FieldPath, RegisterOptions } from "react-hook-form";
import { InputNumberProps } from "antd";

import "./index.css";
import Select from "components/Select";

interface RHFInputTimeProps<T extends Record<string, any>> extends InputNumberProps {
  control: Control<T>;
  times: string[];
  name: FieldPath<T>;
  label?: string;
  showError?: boolean;
  labelRequired?: boolean;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

const RHFInputTime = <T extends Record<string, any>>({
  control,
  name,
  times,
  label,
  showError = true,
  labelRequired = true,
  rules,
}: RHFInputTimeProps<T>) => {
  return (
    <>
      {label && <Label title={label} htmlFor={name} required={labelRequired} />}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center gap-4">
                <Select
                  options={times.map((time) => ({ key: time, value: time }))}
                  onSelect={(value) => onChange(value)}
                  showSearch={false}
                  className="w-full h-14 bg-field"
                  value={value}
                />
              </div>
              {showError && error && <HelperText message={error.message || ""} />}
            </div>
          );
        }}
      />
    </>
  );
};

export default RHFInputTime;
