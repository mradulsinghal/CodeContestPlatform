import type { NextFunction, Request, Response } from "express";
import type { AdminReq } from "./AuthMiddleware";

export function AdminCheck(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req as AdminReq).role === role) {
      next();
    } else {
      res.status(401).json({
        error: "Admin role is required",
      });
    }
  };
}
