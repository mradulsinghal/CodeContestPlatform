import z from "zod";

export const signup = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role: z.enum(["USER", "ADMIN"]),
});

export const signin = z.object({
  email: z.email(),
  password: z.string(),
});

export const problems = z.object({
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()),
  timeLimit: z.number(),
  memoryLimit: z.number(),
});

export const testcases = z.object({
  input: z.string(),
  output: z.string(),
});

export const submissiontype = z.object({
    language_id: z.string(),
    code: z.string(),
    memory: z.number(),
    runtime: z.number(),
});
