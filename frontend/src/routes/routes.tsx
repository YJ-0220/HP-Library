import { createBrowserRouter } from "react-router";
import { Home, Login } from "@/pages/index";
import Layout from "@/components/layout/Layout";

export default createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
    ],
  },
]);
