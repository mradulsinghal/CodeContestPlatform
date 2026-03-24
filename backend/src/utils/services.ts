import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";

export const HashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const ComparePassword = async (
  password: string,
  HashPassword: string,
) => {
  return await bcrypt.compare(password, HashPassword);
};

export const GenerateToken = async (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY || "secret");
};

export const VerifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY || "secret");
};

export async function GetHiddenTest(problemId: string) {
  return await prisma.hidden_testcases.findMany({
    where: {
      problemId,
    },
    select: {
      inputPath: true,
      outputPath: true,
    },
  });
}

export async function GetVisibleTest(problemId: string) {
  return await prisma.visible_testcases.findMany({
    where: {
      problemId,
    },
    select: {
      inputPath: true,
      outputPath: true,
    },
  });
}
