import React from "react";

interface IProps {
  message: string;
}

const HelperText: React.FC<IProps> = ({ message }) => {
  return <p className="text-red-500 text-sm leading-5.5 font-normal">{message}</p>;
};

export default HelperText;
