import type { NextFunction, Request, Response } from "express";
import { VerifyToken } from "../utils/services";
import { type JwtPayload } from "jsonwebtoken";

export interface AdminReq extends Request {
  id: string;
  role: "ADMIN" | "USER";
}

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).json({ error: "token missing " });
  }
  const decode = VerifyToken(token) as JwtPayload;

  if (!decode) {
    return res.status(401).json({ error: "Not a valid Token || Unauthorized" });
  }

  (req as AdminReq).id = decode.userId;
  (req as AdminReq).role = decode.role;

  next();
}
