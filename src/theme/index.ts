import { ThemeConfig } from "antd/es/config-provider";
import Button from "./overrides/Button";
import InputNumber from "./overrides/InputNumber";
import Table from "./overrides/Table";
import Menu from "./overrides/Menu";
import Tabs from "./overrides/Tabs";

const validateMessages = {
  required: "Trường bắc buộc nhập!",
};

export const formConfig = {
  validateMessages,
};

const Theme: ThemeConfig = {
  components: {
    Button: Button,
    InputNumber: InputNumber,
    Table: Table,
    Menu: Menu,
    Select: {
      controlHeight: 40,
      zIndexBase: 40,
      zIndexPopup: 40,
      zIndexPopupBase: 40,
    },
    Tabs: Tabs,
  },
};

export default Theme;
