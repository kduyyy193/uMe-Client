import { Collapse, ConfigProvider } from "antd";
import MenuItem from "./MenuItem";

const MENU_ADMIN = [
  {
    id: 1,
    title: "R",
    name: "User",
    path: "/user",
  },
  {
    id: 2,
    title: "C",
    name: "Customer",
    path: "/customer",
  },
];

const LeftMenu = () => {
  return (
    <div className="min-h-full h-[calc(100%-80px)] overflow-y-auto scrollbar-white flex-shrink-0 ml-2 mt-2">
      <ConfigProvider
        theme={{
          components: {
            Collapse: {
              contentPadding: 0,
            },
          },
        }}
      >
        <Collapse
          className="!bg-white"
          rootClassName="sider-bar"
          bordered={false}
          defaultActiveKey={[1, 2]}
          expandIconPosition="end"
          items={[
            {
              key: 1,
              label: (
                <p className="text-3.75 leading-4.5 font-bold text-light-dark">ADMINISTRATOR</p>
              ),
              children: (
                <div className="-mt-1">
                  {MENU_ADMIN.map((item) => {
                    return (
                      <MenuItem
                        key={item.id}
                        name={item.name}
                        title={item.title}
                        path={item.path}
                      />
                    );
                  })}
                </div>
              ),
            },
          ]}
        />
      </ConfigProvider>
    </div>
  );
};

export default LeftMenu;
