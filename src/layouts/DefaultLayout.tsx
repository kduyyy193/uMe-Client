import { Navigate, Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";

import logo from "assets/svg/logo.svg";
import { token } from "services/axios-client";

const DefaultLayout = () => {
  if (!token) return <Navigate to="booking" />;

  return (
    <div id="defaultLayout">
      <main>
        <div className="leading-10" />
        <Header />
        <div className="flex items-center justify-between text-gray-800 hover:text-gray-500 h-20 fixed top-0 left-0 px-5 font-bold transition-all duration-300 ease-in-out z-10">
          <div>
            <a href="/" className="flex items-center">
              <img className="w-10" src={logo} alt="" />
              <div
                id="nameApplication"
                className="transition-all duration-300 ease-in-out absolute left-16 w-48 overflow-ellipsis overflow-hidden ml-2"
              >
                Admin
              </div>
            </a>
          </div>
        </div>
        <Menu />
        <section
          id="main"
          className={
            "flex flex-col px-5 transition-all duration-300 ease-in-out z-10 h-[calc(100vh-5rem)] relative"
          }
        >
          <Outlet />
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default DefaultLayout;
