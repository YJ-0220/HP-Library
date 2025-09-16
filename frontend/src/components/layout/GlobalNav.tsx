import { Link } from "react-router";

const GlobalNav = () => {
  const menuItems = [
    { id: 1, name: "홈", path: "/" },
    { id: 2, name: "소개", path: "/about" },
    { id: 3, name: "커뮤니티", path: "/community" },
    { id: 4, name: "이벤트", path: "/event" },
    { id: 5, name: "Q&A", path: "/qna" },
  ];

  return (
    <nav className="sticky top-[60px] z-10 flex justify-start border-b border-t border-gray-200 items-center bg-white overflow-x-auto">
      {menuItems.map((item) => (
        <Link
          to={item.path}
          key={item.id}
          className="flex-shrink-0 px-4 py-3 text-sm font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors whitespace-nowrap"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default GlobalNav;
