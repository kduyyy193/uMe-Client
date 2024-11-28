import { Navigate, Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import { useStateContext } from "contexts/ContextProvider";
import { Drawer } from "antd";
import LeftMenu from "./components/LeftMenu";
import { useState } from "react";

const DefaultLayout = () => {
  const { token } = useStateContext();
  const [openDrawerMenu, setOpenDrawerMenu] = useState(false);

  const handleCloseDrawer = () => setOpenDrawerMenu(false);
  const handleOpenDrawer = () => setOpenDrawerMenu(true);

  if (!token) return <Navigate to="/auth/login" />;

  return (
    <div className="w-full h-full min-h-screen">
      <Header
        openDrawer={handleOpenDrawer}
        closeDrawer={handleCloseDrawer}
        openDrawerMenu={openDrawerMenu}
      />
      <div className="w-full flex flex-row h-full">
        <div className="block h-auto min-h-full lg:hidden">
          <Drawer
            rootClassName="customer-menu-drawer"
            placement="left"
            closable={false}
            open={openDrawerMenu}
            width={"80%"}
            onClose={handleCloseDrawer}
          >
            <LeftMenu />
          </Drawer>
        </div>
        <div className="hidden h-auto min-h-full lg:block">
          <LeftMenu />
        </div>
        <div className="w-full h-full lg:w-[calc(100%-240px)] min-h-full bg-[#fafafa]">
          <div className="min-h-full sm:min-h-full pt-[60px] pb-[54px]">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
