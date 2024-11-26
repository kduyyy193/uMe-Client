import { Collapse, ConfigProvider } from "antd";
import MenuItem from "./MenuItem";
import ArrowRightIcon from "assets/svg/arrowRight.svg";

const MENU_ADMIN = [
  {
    id: 2,
    title: "R",
    name: "Table",
    path: "/table",
  },
  {
    id: 3,
    title: "R",
    name: "Menu",
    path: "/menu",
  },
  {
    id: 4,
    title: "R",
    name: "Order",
    path: "/order",
  },
  {
    id: 5,
    title: "C",
    name: "User",
    path: "/user",
  },
  {
    id: 1,
    title: "R",
    name: "Report",
    path: "/",
  },
];

const LeftMenu = () => {
  return (
    <div className="min-h-[calc(100%-61px)] overflow-y-auto scrollbar-white flex-shrink-0 ml-2 mt-2 md:w-[240px]">
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
          expandIcon={({ isActive }) => {
            return (
              <img
                className={`mt-3 ${isActive ? "rotate-90" : "rotate-0"}`}
                width={12}
                alt="Arrow Icon"
                src={ArrowRightIcon}
              />
            );
          }}
          items={[
            {
              key: 1,
              label: <p className="text-xl font-bold text-light-dark">Merchant</p>,
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
