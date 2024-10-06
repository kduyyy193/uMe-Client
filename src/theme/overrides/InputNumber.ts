import { MappingAlgorithm } from "antd";
import { ComponentToken } from "antd/es/input-number/style";
import { AliasToken } from "antd/es/theme/internal";

const InputNumber: Partial<ComponentToken> &
    Partial<AliasToken> & {
        algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[];
    } = {
    controlHeight: 40,
    controlWidth: 250,
    paddingInline: 16,
};

export default InputNumber;
