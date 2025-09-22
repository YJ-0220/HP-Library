const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">로그인</h1>
        <span>더 많은 정보를 알고 싶으시다면 로그인 후 이용해주세요.</span>
      </div>
      <form className="w-full p-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" name="username" className="p-2 border border-gray-300 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" className="p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="mt-2 bg-blue-100 border border-gray-300 p-2 rounded">로그인</button>
      </form>
    </div>
  );
};

export default Login;