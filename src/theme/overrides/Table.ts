import { MappingAlgorithm } from "antd";
import { ComponentToken } from "antd/es/table/style";
import { AliasToken } from "antd/es/theme/internal";

const Table: Partial<ComponentToken> &
    Partial<AliasToken> & {
        algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[];
    } = {
    headerBg: "#F4F4F4",
    headerSortActiveBg: "#F4F4F4",
    headerBorderRadius: 0,
    colorText: "#363636",
    cellPaddingBlock: 16,
};

export default Table;
