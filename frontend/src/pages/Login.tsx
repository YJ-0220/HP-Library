import { Link } from "react-router";
import SocialLoginButton from "@/components/socialLoginButton";

const Login = () => {
  return (
    <div className="pt-20 flex flex-col items-center justify-center">
      <div className="p-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-center">로그인</h1>
        <span className="text-sm text-gray-500">
          더 많은 정보를 알고 싶으시다면 로그인 후 이용해주세요.
        </span>
      </div>
      <form className="w-full p-6 sm:p-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-100 border border-gray-300 p-2 rounded"
        >
          로그인
        </button>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="remember-me"
            name="remember-me"
            className="size-4"
          />
          <label htmlFor="remember-me">기억하기</label>
        </div>
      </form>

      <div className="text-center flex flex-col gap-2">
        <span>༼ つ ◕_◕ ༽つ 아직 회원이 아니신가요? ༼ つ ◕_◕ ༽つ</span>
        <div className="flex justify-center gap-2">
          <Link to="/signup">회원가입</Link>
          <span>|</span>
          <Link to="/find-password">비밀번호 찾기</Link>
          <span>|</span>
          <Link to="/find-id">아이디 찾기</Link>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <SocialLoginButton />
      </div>
    </div>
  );
};

export default Login;
