import HelperText from "components/HelperText";
import Label from "components/Label";
import { Control, Controller, FieldPath, RegisterOptions } from "react-hook-form";
import { InputNumberProps } from "antd";

import "./index.css";
import cn from "utils/cn";

export interface IDay {
  dayOfWeek: string;
  date: string;
}

interface RHFInputDateProps<T extends Record<string, any>> extends InputNumberProps {
  control: Control<T>;
  days: IDay[];
  name: FieldPath<T>;
  label?: string;
  showError?: boolean;
  labelRequired?: boolean;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

const RHFInputDate = <T extends Record<string, any>>({
  control,
  name,
  days,
  label,
  className,
  showError = true,
  labelRequired = true,
  rules,
}: RHFInputDateProps<T>) => {
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
                <div className="date max-w-screen flex items-center gap-4 overflow-x-scroll">
                  {days.map((day, idx) => {
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "flex flex-col items-center justify-center min-w-24 h-14 rounded-full",
                          value.dayOfWeek === day.dayOfWeek && "bg-red text-tertiary font-semibold",
                          value.dayOfWeek !== day.dayOfWeek &&
                            "bg-tertiary-dark text-secondary font-medium",
                          className
                        )}
                        onClick={() => {
                          onChange(day);
                        }}
                      >
                        <span className="text-xs">{day.dayOfWeek}</span>
                        <span className="text-base">{day.date}</span>
                      </div>
                    );
                  })}
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

export default RHFInputDate;
