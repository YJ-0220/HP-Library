import { Outlet } from "react-router";
import Advertisement from "../Advertisement";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="w-screen h-screen">
      <main className="h-full flex justify-center items-center gap-10">
        <div className="hidden lg:block w-1/4 h-1/2 lg:border">
          <Advertisement />
          <div className="flex justify-center items-center">
            <p>앱 지원</p>
          </div>
        </div>
        <div className="w-full sm:w-[600px] h-full md:border">
          <Header />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
