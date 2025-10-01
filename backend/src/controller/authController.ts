import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/jwt";
import { prisma } from "../prisma";

export const register = async (req: Request, res: Response) => {
  const { username, email, password, nickname } = req.body;

  // 1. 입력 검증 (간략화)
  if (!username || !email || !password || !nickname) {
    res.status(400).json({ message: "모든 필드를 입력해주세요." });
    return;
  }

  try {
    // 2. 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "이미 존재하는 이메일입니다." });
      return;
    }

    // 3. 비밀번호 해시화
    const hashedPassword = await hashPassword(password);

    // 4. 새 사용자 객체 생성 및 저장
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        nickname,
      },
      select: {
        id: true,
        username: true,
        email: true,
        nickname: true,
      },
    });

    // 5. 성공 응답
    res
      .status(201)
      .json({ message: "회원가입이 완료되었습니다.", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 일치하지 않습니다." });
      return;
    }

    // 2. 비밀번호 검증
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 일치하지 않습니다." });
      return;
    }

    // 3. 토큰 생성
    const token = await generateToken(user.id);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};
