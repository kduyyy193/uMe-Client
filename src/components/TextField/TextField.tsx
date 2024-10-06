import classNames from "classnames";
import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"input"> {
  endAdornment?: React.ReactNode;
  moreclass?: string;
}

const TextField: React.FC<IProps> = ({
  name,
  id,
  value,
  placeholder,
  type = "text",
  endAdornment,
  onChange,
  onBlur,
  disabled,
  maxLength,
  moreclass,
}) => {
  return (
    <div className="relative flex items-center">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        className={classNames(
          "w-full h-10 text-gray-600 px-4 text-3.5 border rounded-md bg-white border-gray-300 focus:border-blue-500 focus:shadow focus:shadow-blue-500/30 focus:outline-0 placeholder:font-normal placeholder:text-gray-400",
          {
            "!bg-lightest !text-light-dark": disabled,
          },
          moreclass
        )}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
      />
      {endAdornment}
    </div>
  );
};

export default TextField;
