import React from "react";
import cn from "utils/cn";

interface IProps extends React.ComponentPropsWithoutRef<"label"> {
  required: boolean;
  more?: JSX.Element;
}

const Label: React.FC<IProps> = ({ htmlFor, title, more, required = true }) => {
  return (
    <div className="pb-1.5">
      <label
        className={cn(
          "text-md font-medium text-secondary",
          required && "after:content-['*'] after:text-red-500"
        )}
        htmlFor={htmlFor}
        title={title}
      >
        {title}
        {more}
      </label>
    </div>
  );
};

export default Label;
