import type { Request, Response } from "express";
import {
  problems,
  signin,
  signup,
  submissiontype,
  testcases,
} from "../types/types";
import { prisma } from "../config/db";
import {
  ComparePassword,
  GenerateToken,
  HashPassword,
} from "../utils/services";
import type { AdminReq } from "../Middlewares/AuthMiddleware";
import { UploadTest } from "../modules/Supabase/uploadFile";
import { AddQueue } from "../modules/queue/queue";
import { DownloadFile } from "../modules/Supabase/downloadFile";

export const Signup = async (req: Request, res: Response) => {
  const parsed = signup.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
      details: parsed.error?.errors
    });
  }
  const data: any = parsed.data;
  try {
    const checkEmail = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (checkEmail) {
      return res.status(409).json({
        success: false,
        error: "Email Already Exists !",
      });
    }
    const password = await HashPassword(data.password);
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: password,
        role: data.role,
      },
    });

    res.status(201).json({
      success: true,
      message: "User Successfully created",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const Signin = async (req: Request, res: Response) => {
  const parsed = signin.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  const data: any = parsed.data;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Incorrect email",
      });
    }
    const checkpassword = await ComparePassword(data.password, user.password);
    if (!checkpassword) {
      return res.status(401).json({
        success: false,
        error: "Incorrect Password",
      });
    }
    const accessToken = await GenerateToken({
      userId: user.id,
      role: user.role,
    });
    
    res.status(201).json({
      success: true,
      accessToken: accessToken,
      name: user.name,
      role: user.role,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const Problems = async (req: Request, res: Response) => {
  const parsed = problems.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  const data: any = parsed.data;

  try {
    const result = await prisma.problem.create({
      data: {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        tags: data.tags,
        timeLimit: data.timeLimit,
        memoryLimit: data.memoryLimit,
        userId: (req as AdminReq).id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Problem uploaded",
      problemId: result.id,
    });
  } catch (e) {
    res.status(500).json({ error: "Internal Error " });
  }
};

export const visibleTestcases = async (req: Request, res: Response) => {
  const problemId = <string>req.params.problemId;
  const parsed = testcases.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  const data = parsed.data;
  try {
    const prob = await prisma.problem.findFirst({
      where: { id: problemId, userId: (req as AdminReq).id },
    });
    if (!prob) {
      return res.status(404).json({ message: "You dont have problem created" });
    }
    const test = await prisma.visible_testcases.findMany({
      where: { problemId: problemId },
    });
    const len = test.length;
    const inputfilepath = `VisibleTestCase/INPUT/${problemId}file${len + 1}`;
    const outputfilepath = `VisibleTestCase/OUTPUT/${problemId}file${len + 1}`;
    await UploadTest(inputfilepath, data.input);
    await UploadTest(outputfilepath, data.output);
    await prisma.visible_testcases.create({
      data: {
        inputPath: inputfilepath,
        outputPath: outputfilepath,
        problemId,
      },
    });
    res.send("done");
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const hiddenTestcases = async (req: Request, res: Response) => {
  const problemId = <string>req.params.problemId;
  const parsed = testcases.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
  }
  const data = parsed.data;
  try {
    const prob = await prisma.problem.findFirst({
      where: { id: problemId, userId: (req as AdminReq).id },
    });
    if (!prob) {
      return res.status(404).json({ message: "You dont have problem created" });
    }
    const test = await prisma.hidden_testcases.findMany({
      where: { problemId: problemId },
    });
    const len = test.length;
    const inputfilepath = `HiddenTestCase/INPUT/${problemId}file${len + 1}`;
    const outputfilepath = `HiddenTestCase/OUTPUT/${problemId}file${len + 1}`;
    await UploadTest(inputfilepath, data.input);
    await UploadTest(outputfilepath, data.output);
    await prisma.hidden_testcases.create({
      data: {
        inputPath: inputfilepath,
        outputPath: outputfilepath,
        problemId,
      },
    });
    res.send("done");
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const lang: Record<string, string> = {
  "91": "java",
  "102": "javascript",
  "110": "C",
  "105": "CPP",
};

export const submission = async (req: Request, res: Response) => {
  const problemId = <string>req.params.problemId;

  const parsed = submissiontype.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: "Invalid Input",
    });
    return;
  }
  const data = parsed.data;
  try {
    const sub = await prisma.submission.create({
      data: {
        language: lang[data.language_id] as string,
        memory: data.memory,
        runtime: data.runtime,
        sourceCode: data.code,
        problemId: problemId,
        userId: (req as AdminReq).id,
      },
    });

    await AddQueue({
      submissionId: sub.id,
      userId: (req as AdminReq).id,
      language_id: data.language_id,
      time: data.runtime,
      memory: data.memory,
      stdin: "",
      source_code: data.code,
      problemId: problemId,
    });

    console.log("code submit");
    res.json({
      submissionId: sub.id,
      message: "Code Submitted",
    });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" + e });
  }
};

export const getProblemDetails = async (req: Request, res: Response) => {
  try {
    const data = await prisma.problem.findMany({
      select: {
        title: true,
        tags: true,
        difficulty: true,
        id: true,
      },
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProblemDescription = async (req: Request, res: Response) => {
  const problemId = req.params.problemId;
  try {
    const data = await prisma.problem.findFirst({
      where: {
        id: problemId as string,
      },
      include: {
        visible_testcases: true,
      },
    });
    if (!data) {
      return res.status(400).json({
        success: false,
        error: "Problem Not found",
      });
    }
    const testcased = await Promise.all(
      data?.visible_testcases.map(async (test) => ({
        input: await DownloadFile(test.inputPath),
        output: await DownloadFile(test.outputPath),
      })),
    );

    res.status(200).send({
      title: data?.title,
      description: data?.description,
      difficulty: data?.difficulty,
      tags: data?.tags,
      timeLimit: data?.timeLimit,
      memoryLimit: data?.memoryLimit,
      test: testcased,
    });
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error ",
    });
  }
};

export const getMySubmission = async (req: Request, res: Response) => {
  const userId = (req as AdminReq).id;

  try {
    const data = await prisma.submission.findMany({
      where: {
        userId: userId,
      },
      select: {
        language: true,
        status: true,
        runtime: true,
        memory: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
        problem: {
          select: {
            title: true,
          },
        },
      }
    });

    res.send(data);
  } catch (e) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
