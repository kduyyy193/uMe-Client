import Fallback from "components/Fallback";
import DefaultLayout from "layouts/DefaultLayout";
import GuestLayout from "layouts/GuestLayout";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("pages/Login"));
const Notfound = lazy(() => import("pages/NotFound"));
const Report = lazy(() => import("pages/Report"));
const TableView = lazy(() => import("pages/TableView"));
const Table = lazy(() => import("pages/Table"));
const Category = lazy(() => import("pages/Category"));
const Menu = lazy(() => import("pages/Category/Menu"));
const Order = lazy(() => import("pages/Receipt"));
const Kitchen = lazy(() => import("pages/Kitchen"));
const Receipt = lazy(() => import("pages/Receipt"));
const Ingredient = lazy(() => import("pages/Ingredient"));
const History = lazy(() => import("pages/History"));
const User = lazy(() => import("pages/User"));
const TableDetails = lazy(() => import("pages/TableView/TableDetails"));

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
        id: "acbdfdaa-e864-4e00-8157-Table",
        path: "table-view",
        element: <TableView />,
      },
      {
        id: "acbdfdaa-e864-4e00-8157-Cate",
        path: "category",
        element: <Category />,
      },
      {
        id: "acbdfdaa-e864-4e00-8157-Menu",
        path: "menu/:id",
        element: <Menu />,
      },
      {
        id: "acbdfdaa-e864-4e00-8157-Table",
        path: "table",
        element: <Table />,
      },
      {
        id: "acbdfdaa-e864-4e00-8157-receipt",
        path: "receipt",
        element: <Receipt />,
      },
      {
        id: "acbdfdaa-e864-4e00-8157-kitchen",
        path: "kitchen",
        element: <Kitchen />,
      },
      {
        id: "acbdfdaa-e864-4e00-8157-Order",
        path: "order/:id",
        element: <Order />,
      },
      {
        id: "acbdfdaa-e864-4e00-8157-history",
        path: "history",
        element: <History />,
      },
      {
        id: "acbdfdaa-e864-4e00-8157-ingredient",
        path: "ingredient",
        element: <Ingredient />,
      },
      {
        id: "acbdfdaa-e864-4e00-8157-details",
        path: "table-details/:id",
        element: <TableDetails />,
      },
      {
        id: "acbdfdaa-e864-4e00-8157-dsssetails",
        path: "report",
        element: <Report />,
      },
      {
        id: "acbdfdaa-e864-4e00-8157-user",
        path: "user",
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
