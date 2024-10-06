import Fallback from "components/Fallback";
import DefaultLayout from "layouts/DefaultLayout";
import GuestLayout from "layouts/GuestLayout";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("pages/Login"));
const Notfound = lazy(() => import("pages/NotFound"));
const User = lazy(() => import("pages/User"));

interface IRoute {
  id: string;
  path: string;
  element: JSX.Element;
  children?: IRoute[];
  accessRoles?: string[];
}

const ROUTES: IRoute[] = [
  {
    id: "a1312acc-fd64-49a9-ad60-500cbd69836e",
    path: "/auth",
    element: <GuestLayout />,
    children: [
      {
        id: "b9e86a11-665f-47dd-90b5-eb6d1074b7c6",
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    id: "5",
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        id: "acbdfdaa-e864-4e00-8157-bb29b40f208d",
        path: "/",
        element: <User />,
      },
    ],
  },
  {
    id: "notFound",
    path: "*",
    element: <Notfound />,
  },
];

export default function AppRoutes() {
  const renderRoute = (route: IRoute) => {
    return (
      <Route
        key={route.id}
        path={route.path}
        element={<React.Suspense fallback={<Fallback />}>{route.element}</React.Suspense>}
      >
        {route.children
          ? route.children.map((item) => {
              return renderRoute(item);
            })
          : null}
      </Route>
    );
  };

  return (
    <React.Suspense fallback={<Fallback />}>
      <Routes>
        {ROUTES.map((item) => {
          return renderRoute(item);
        })}
      </Routes>
    </React.Suspense>
  );
}
