import { MappingAlgorithm } from "antd";
import { ComponentToken } from "antd/es/tabs/style";
import { AliasToken } from "antd/es/theme/internal";

const Tabs: Partial<ComponentToken> &
    Partial<AliasToken> & {
        algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[];
    } = {
    horizontalItemPadding: "6px 16px",
    horizontalItemGutter: 4,
    
};

export default Tabs;
