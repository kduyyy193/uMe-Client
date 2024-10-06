import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

interface IItem {
    path?: string;
    name: string;
}

interface IProps {
    items: IItem[];
}

const Breadcrumb: React.FC<IProps> = ({ items }) => {
    const navigate = useNavigate();

    const handleClick = (path?: string) => {
        if (path) {
            navigate(path);
        }
    };

    return (
        <div>
            {items.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        <span
                            onClick={() => handleClick(item.path)}
                            className={classNames("text-3.25 leading-4 font-normal", {
                                "text-tertiary cursor-pointer": index === 0,
                            })}
                        >
                            {item.name}
                        </span>
                        {index !== items.length - 1 && <i className="las la-angle-right text-3" />}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
