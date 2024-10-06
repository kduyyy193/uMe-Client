import { useStateContext } from "contexts/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout = () => {
  const { token } = useStateContext();
  console.log(token);
  if (token) {
    console.log("navigate nè");
    return <Navigate to={"/"} />;
  }

  return <div>{<Outlet />}</div>;
};

export default GuestLayout;
