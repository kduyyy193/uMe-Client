import { MappingAlgorithm } from "antd";
import { ComponentToken } from "antd/es/button/style";
import { AliasToken } from "antd/es/theme/internal";

const Button: Partial<ComponentToken> &
  Partial<AliasToken> & {
    algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[];
  } = {
  algorithm: true,
  contentFontSize: 14,
  fontWeight: 600,
  lineHeight: 18 / 14,
  paddingBlock: 10,
  paddingInline: 16,
  controlHeight: 40,
  primaryShadow: "none",
  marginXS: 5,
};

export default Button;
