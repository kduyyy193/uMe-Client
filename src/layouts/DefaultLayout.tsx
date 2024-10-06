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
      <div className="pt-[60px] lg:pt-[81px] w-full min-h-full flex flex-row h-full">
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
        <div className="w-full h-full lg:w-[calc(100%-308px)] min-h-full bg-[#fafafa]">
          <div className="h-full overflow-y-auto">
            <div className="min-h-[calc(100%-80px)] sm:min-h-[calc(100%-70px)]">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
