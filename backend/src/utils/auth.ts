import bcrypt from "bcrypt";

// 해시 강도
const SALT_ROUNDS = 12;

// 비밀번호 해시화
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// 비밀번호 비교
export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
