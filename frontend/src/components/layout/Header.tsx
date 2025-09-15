import { Link } from "react-router";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <Link to="/" className="px-4 py-6 text-xl font-bold">로고</Link>
      <Link to="/login" className="px-4 py-6 text-xl font-bold">로그인</Link>
    </div>
  )
};

export default Header;