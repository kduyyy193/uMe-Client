import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Fallback = () => {
  return (
    <div className="w-full h-[70vh] flex justify-center items-center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 44 }} spin />} />
    </div>
  );
};

export default Fallback;
