import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// 토큰 생성
export const generateToken = async (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};

// 토큰 검증
export const verifyToken = async (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};