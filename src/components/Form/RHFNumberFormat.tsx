import HelperText from "components/HelperText";
import Label from "components/Label";
import classNames from "classnames";
import { Control, Controller, FieldPath, RegisterOptions } from "react-hook-form";
import { NumberFormatValues, NumericFormat } from "react-number-format";

interface IProps<T extends Record<string, any>> {
    control: Control<T>;
    name: FieldPath<T>;
    placeholder?: string;
    label?: string;
    showError?: boolean;
    decimalScale?: number;
    fixedDecimalScale?: boolean;
    thousandSeparator?: string | boolean;
    max?: number;
    className?: string;
    disabled?: boolean;
    labelRequired?: boolean;
    allowNegative?: boolean;
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
    onChangeCustom?: (value: string) => void;
}

const RHFNumberFormat = <T extends Record<string, any>>({
    control,
    name,
    placeholder,
    decimalScale,
    thousandSeparator,
    label,
    max,
    showError = true,
    disabled = false,
    labelRequired = true,
    className = "",
    allowNegative,
    fixedDecimalScale = false,
    rules,
    onChangeCustom,
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
                        <div className="flex flex-col gap-y-1">
                            <NumericFormat
                                id={name}
                                className={classNames(
                                    "w-full h-10 text-gray-600 px-4 border rounded-md bg-white border-gray-300 focus:border-blue-500 focus:shadow focus:shadow-blue-500/30 focus:outline-0 placeholder:font-light placeholder:text-gray-300",
                                    className,
                                    {
                                        "!bg-lightest !text-light-dark": disabled,
                                    }
                                )}
                                value={value}
                                max={max}
                                onValueChange={(values: NumberFormatValues) => {
                                    if (onChangeCustom) {
                                        onChangeCustom(values.value);
                                    } else {
                                        onChange(values.value);
                                    }
                                }}
                                onBlur={onBlur}
                                placeholder={placeholder}
                                decimalScale={decimalScale}
                                thousandSeparator={thousandSeparator}
                                disabled={disabled}
                                fixedDecimalScale={fixedDecimalScale}
                                allowNegative={allowNegative}
                            />
                            {showError && <HelperText message={error?.message || ""} />}
                        </div>
                    </>
                )}
            />
        </>
    );
};

export default RHFNumberFormat;
