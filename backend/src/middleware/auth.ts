import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "인증 토큰이 없습니다." });
    return;
  }

  try {
    const decoded = await verifyToken(token);

    req.user = decoded as { id: string };

    next();
  } catch (err) {
    res.status(403).json({ message: "유효하지 않거나 만료된 토큰입니다." });
    return;
  }
};
