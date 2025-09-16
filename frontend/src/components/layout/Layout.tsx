import { Outlet } from "react-router";
import Advertisement from "../Advertisement";
import Header from "./Header";
import GlobalNav from "./GlobalNav";
import BottomNav from "./BottomNav";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <main className="w-full min-h-screen mx-auto flex justify-center items-center gap-20">
        {/* 광고 영역 */}
        <div className="w-[360px] min-h-full hidden lg:block sticky top-1/2 -translate-y-1/2 self-start">
          <Advertisement />
          <div className="mt-5 flex items-center">
            <p>앱 다운로드 qr코드라던지 뭐 그런거 영역</p>
          </div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="w-full max-w-[600px] min-h-screen bg-white shadow-md">
          <Header />
          <GlobalNav />
          <div className="min-h-screen pb-safe-area-inset-bottom px-4 bg-gray-200">
            <Outlet />
          </div>
          {/* 모바일 하단 네비게이션 */}
          <div className="sticky bottom-0">
            <BottomNav />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
