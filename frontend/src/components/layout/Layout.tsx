import { Outlet } from "react-router";
import Advertisement from "../Advertisement";
import Header from "./Header";
import GlobalNav from "./GlobalNav";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <main className="w-full mx-auto flex justify-center items-center gap-20">
        {/* 광고 영역 */}
        <div className="w-[360px] hidden lg:block sticky top-1/2 -translate-y-1/2 self-start">
          <Advertisement />
          <div className="mt-5 flex items-center">
            <p>앱 다운로드 qr코드라던지 뭐 그런거 영역</p>
          </div>
        </div>

        <div className="w-full max-w-[600px] min-h-screen bg-white shadow-md">
          {/* 헤더 영역 & 글로벌 네비게이션 영역 */}
          <Header />
          <GlobalNav />

          {/* 메인 콘텐츠 영역 & 푸터 영역 */}
          <div className="flex flex-col">
            <Outlet />
            <Footer />
          </div>

          {/* 모바일 하단 네비게이션 */}
          <div className="w-full fixed bottom-0">
            <BottomNav />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
