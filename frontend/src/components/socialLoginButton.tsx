const SocialLoginButton = () => {
  return (
    <div className="flex gap-3">
      <button>
        <img src="/images/google.svg" alt="Google" />
      </button>
      <button>
        <img src="/images/apple.svg" alt="Apple" />
      </button>
      <button>
        <img src="/images/kakao.svg" alt="Kakao" />
      </button>
    </div>
  );
};

export default SocialLoginButton;