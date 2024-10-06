import { MappingAlgorithm } from "antd";
import { ComponentToken } from "antd/es/menu/style";
import { AliasToken } from "antd/es/theme/internal";

const Menu: Partial<ComponentToken> &
    Partial<AliasToken> & {
        algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[];
    } = {
    subMenuItemBg: "rgb(255, 255, 255)",
};

export default Menu;
