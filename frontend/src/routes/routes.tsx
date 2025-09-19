import { createBrowserRouter } from "react-router";
import { Home, Login, Community, Event, Qna, About, MeetingDetail } from "@/pages/index";
import Layout from "@/components/layout/Layout";

export default createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "community", element: <Community /> },
      { path: "event", element: <Event /> },
      { path: "qna", element: <Qna /> },
      { path: "about", element: <About /> },
      { path: "meeting/:id", element: <MeetingDetail /> },
    ],
  },
]);
