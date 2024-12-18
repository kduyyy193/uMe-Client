import { Collapse, ConfigProvider } from "antd";
import MenuItem from "./MenuItem";
import ArrowRightIcon from "assets/svg/arrowRight.svg";
import { KEY_USER } from "configs/auth";

const MENU_ADMIN = [
  {
    id: 2,
    title: "R",
    name: "Bàn gọi món",
    path: "/table-view",
    role: "Merchant Waiter",
  },
  {
    id: 7,
    title: "N",
    name: "Nhà Bếp",
    path: "/kitchen",
    role: "Merchant Kitchen",
  },
  {
    id: 3,
    title: "R",
    name: "Danh mục",
    path: "/category",
    role: "Merchant",
  },
  {
    id: 6,
    title: "R",
    name: "Cấu hình bàn",
    path: "/table",
    role: "Merchant",
  },
  {
    id: 4,
    title: "R",
    name: "Hoá đơn",
    path: "/receipt",
    role: "Merchant",
  },
  {
    id: 8,
    title: "R",
    name: "Nguyên liệu",
    path: "/ingredient",
    role: "Merchant",
  },
  {
    id: 9,
    title: "R",
    name: "Lịch sử xuất nguyên liệu",
    path: "/history",
    role: "Merchant",
  },
  {
    id: 1,
    title: "R",
    name: "Báo cáo",
    path: "/report",
    role: "Merchant",
  },
];

const LeftMenu = () => {
  const user = localStorage.getItem(KEY_USER)
    ? JSON.parse(localStorage.getItem(KEY_USER) as string)
    : {};
  return (
    <div className="mt-[60px] min-h-[calc(100%-61px)] overflow-y-auto scrollbar-white flex-shrink-0 ml-2 md:w-[240px]">
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
              label: (
                <p className="text-xl font-bold text-light-dark">
                  {user?.role === "Merchant"
                    ? "Chủ quán"
                    : user?.role === "Waiter"
                      ? "Phục vụ"
                      : "Đầu bếp"}
                </p>
              ),
              children: (
                <div className="-mt-1">
                  {MENU_ADMIN.map((item) => {
                    if (!item.role?.includes(user?.role)) {
                      return null;
                    }
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
