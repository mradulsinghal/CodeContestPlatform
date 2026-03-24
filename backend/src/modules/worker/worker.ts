import { Worker } from "bullmq";
import { submitCode } from "../judge/execution";
import { GetHiddenTest, GetVisibleTest } from "../../utils/services";
import { DownloadFile } from "../Supabase/downloadFile";
import { setVerdict } from "../verdict/verdict";
import { Result } from "./resultjudge0";
import { normalize } from "../../utils/normalise";

const worker = new Worker(
  "Code",
  async (job) => {
    try {
      let result;
      let testcasePassed = 1;
      const data = job.data;
      const HiddenTestCase = await GetHiddenTest(data.problemId);
      const VisibleTestCase = await GetVisibleTest(data.problemId);

      for (const test of VisibleTestCase) {
        const input = await DownloadFile(test.inputPath);
        const output = await DownloadFile(test.outputPath);
        data.stdin = input;

        const token = await submitCode(data);
        result = await Result(token);
        if (result === -1 || result === 6)
          return await setVerdict(data, "FAILED");
        else if (result === 5) return await setVerdict(data, "TLE");

        if (normalize(output as string) === normalize(result?.stdout?.trim() || "")) {
          testcasePassed++;
        } else {
          console.log("testCase failed At ", testcasePassed);
          await setVerdict(data, "FAILED");
          return `testCase failed At ${testcasePassed}`;
        }
        if (result.time > data.time) {
          await setVerdict(data, "TLE");
          return;
        } else if (result.memory > data.memory * 1024) {
          await setVerdict(data, "MLE");
          return;
        }
      }
      for (const test of HiddenTestCase) {
        const input = await DownloadFile(test.inputPath);
        const output = await DownloadFile(test.outputPath);
        data.stdin = input;
        const token = await submitCode(data);
        result = await Result(token);
        if (result === -1 || result === 6)
          return await setVerdict(data, "FAILED");
        else if (result === 5) return await setVerdict(data, "TLE");

        if (normalize(output as string) === normalize(result?.stdout?.trim() || "")) {
          testcasePassed++;
        } else {
          console.log("testCase failed At ", testcasePassed);
          await setVerdict(data, "FAILED");
          return `testCase failed At ${testcasePassed}`;
        }

        if (result.time > data.time) {
          return await setVerdict(data, "TLE");
        } else if (result.memory > data.memory * 1024) {
          return await setVerdict(data, "MLE");
        }
      }
      if (result.status.description === "Accepted") {
        await setVerdict(data, "AC");
      } else {
        await setVerdict(data, "FAILED");
      }

      return console.log("TestCase passed : ", testcasePassed);
    } catch (e) {
      console.log("Server Crashed: ", e);
      return;
    }
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);

worker.on("failed", (job, err) => {
  console.log("Error in job ", err);
});
worker.on("error", (err) => {
  console.log("Error in worker", err);
});
