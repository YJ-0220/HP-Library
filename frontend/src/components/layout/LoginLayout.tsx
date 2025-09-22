import { Outlet, useNavigate } from "react-router";
import Advertisement from "../Advertisement";

const LoginLayout = () => {
  const navigate = useNavigate();

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

        <div className="w-full max-w-[600px] min-h-screen bg-white shadow-md">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-4 text-sm sm:text-lg font-medium hover:text-blue-600 transition-colors"
          >
            뒤로가기
          </button>
          <button onClick={() => navigate("/")}>
            로고
          </button>

          {/* 메인 콘텐츠 영역 & 푸터 영역 */}
          <div className="h-full bg-white flex flex-col flex-1">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginLayout;
