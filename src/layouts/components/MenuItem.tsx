import classNames from "classnames";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  name: string;
  title: string;
  path: string;
  icon?: string;
}

const MenuItem: React.FC<IProps> = ({ name, icon, path }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(path);
  };

  const location = useLocation();

  return (
    <div
      onClick={handleNavigate}
      className={classNames(
        "px-5 py-3 flex items-center space-x-3 cursor-pointer border-l-[5px] border-l-white hover:bg-lightest hover:border-l-tertiary mb-1.5",
        {
          "bg-[#8a81f6]/30 !border-l-primary": location?.pathname === path,
        }
      )}
    >
      {icon && <img alt={name} src={icon} />}
      <p className="text-light-dark text-3.75 leading-4.5 font-semibold">{name}</p>
    </div>
  );
};

export default MenuItem;
