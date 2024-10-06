import classNames from "classnames";
import React from "react";
import { NavLink, To } from "react-router-dom";

interface IProps {
    to: To;
    title: string;
}

const MerchantTabLink: React.FC<IProps> = ({ to, title }) => {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <span
                    className={classNames(
                        "uppercase text-3.25 font-bold",
                        { "!text-white": isActive },
                        { "!text-black hover:!text-blue-500": !isActive }
                    )}
                >
                    {title}
                </span>
            )}
        </NavLink>
    );
};

export default MerchantTabLink;
