import React from "react";
import ClearIcon from "@/assets/iconsV2/ClearIcon.svg";

interface IProps {
    name: string;
    onDelete: () => void;
}

const FilterTag: React.FC<IProps> = ({ name, onDelete }) => {
    return (
        <div className="w-max flex items-center space-x-1.25 py-1 pl-2 pr-1 rounded bg-lightest">
            <p className="text-3 leading-3.75 font-semibold text-light-dark">{name}</p>
            <div onClick={onDelete}>
                <img alt="Clear Icon" src={ClearIcon} />
            </div>
        </div>
    );
};

export default FilterTag;
