import HelperText from "components/HelperText";
import Label from "components/Label";
import PlusIcon from "assets/icons/PlusIcon";
import MinusIcon from "assets/icons/MinusIcon";
import { Control, Controller, FieldPath, RegisterOptions } from "react-hook-form";
import { InputNumber, InputNumberProps } from "antd";
import cn from "utils/cn";

import "./index.css";

interface RHFTextFieldProps<T extends Record<string, any>> extends InputNumberProps {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  showError?: boolean;
  labelRequired?: boolean;
  min: number;
  max: number;
  moreLabel?: JSX.Element;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

const RHFTextField = <T extends Record<string, any>>({
  control,
  name,
  disabled,
  label,
  className,
  showError = true,
  labelRequired = true,
  rules,
  min,
  max,
  moreLabel,
  ...props
}: RHFTextFieldProps<T>) => {
  return (
    <>
      {label && <Label more={moreLabel} title={label} htmlFor={name} required={labelRequired} />}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, name }, fieldState: { error } }) => {
          const handleDecrease = () => {
            console.log(value);
            if (value > min) {
              onChange(value - 1);
            }
          };

          const handleIncrease = () => {
            if (value < max) {
              onChange(value + 1);
            }
          };

          return (
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center gap-4">
                <div
                  onClick={handleDecrease}
                  className={cn("cursor-pointer", value <= min && "opacity-50 pointer-events-none")}
                >
                  <MinusIcon />
                </div>
                <InputNumber
                  id={name}
                  className={cn(
                    "w-full !min-w-[140px] text-seconday !bg-field !shadow-none !border-none focus:border-blue-500 focus:shadow focus:shadow-blue-500/30 focus:outline-0 placeholder:font-light placeholder:text-gray-300",
                    className,
                    disabled && "!text-gray-600 !bg-input-number"
                  )}
                  inputMode="numeric"
                  onMouseEnter={(e) => e.preventDefault()}
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  min={min}
                  max={max}
                  {...props}
                />
                <div
                  onClick={handleIncrease}
                  className={cn("cursor-pointer", value >= max && "opacity-50 pointer-events-none")}
                >
                  <PlusIcon />
                </div>
              </div>
              {showError && error && <HelperText message={error.message || ""} />}
            </div>
          );
        }}
      />
    </>
  );
};

export default RHFTextField;
