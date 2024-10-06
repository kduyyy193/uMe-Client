import React from "react";

interface IProps {
  onClick: () => void;
}

const ClearTag: React.FC<IProps> = ({ onClick }) => {
  return (
    <div
      className="flex h-6 items-center bg-dark text-white text-3 font-semibold rounded p-2 cursor-pointer"
      onClick={onClick}
    >
      Clear all
    </div>
  );
};

export default ClearTag;
