import { STATUS } from "@prisma/client";
import { prisma } from "../../config/db";
import type { job } from "../queue/queue";

export async function setVerdict(data: job, status: STATUS) {
  await prisma.submission.update({
    where: {
      id: data.submissionId,
      userId: data.userId,
      problemId: data.problemId,
    },
    data: {
      status: status,
    },
  });
}
