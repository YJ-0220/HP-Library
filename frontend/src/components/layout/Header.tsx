import { Link } from "react-router";

const Header = () => {
  return (
    <div className="sticky top-0 z-10 flex justify-between items-center bg-white border-b border-gray-200">
      <Link to="/" className="px-4 py-4 text-lg sm:text-xl font-bold">
        로고
      </Link>
      <Link
        to="/login"
        className="px-4 py-4 text-sm sm:text-lg font-medium hover:text-blue-600 transition-colors"
      >
        로그인
      </Link>
    </div>
  );
};

export default Header;
