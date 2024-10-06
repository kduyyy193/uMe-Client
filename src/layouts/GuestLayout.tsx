import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  // if (token) {
  //   return <Navigate to={"/"} />;
  // }

  return <div>{<Outlet />}</div>;
};

export default GuestLayout;
