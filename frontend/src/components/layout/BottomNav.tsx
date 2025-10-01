import { Link, useLocation } from "react-router";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { id: 1, name: "홈", path: "/", icon: "🏠" },
    { id: 2, name: "게시판", path: "/about", icon: "ℹ️" },
    { id: 3, name: "커뮤니티", path: "/community", icon: "👥" },
    { id: 4, name: "이벤트", path: "/event", icon: "🎉" },
    { id: 5, name: "Q&A", path: "/qna", icon: "❓" },
  ];

  // 로그인 페이지에서는 하단 네비 숨김
  if (location.pathname === "/login") {
    return null;
  }

  return (
    <nav className="sm:hidden w-full bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.id}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-[60px] ${
                isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
