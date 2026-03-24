import axios from "axios";
import type { job } from "../queue/queue";

export async function submitCode(data: job) {
  const result = await axios.post("https://ce.judge0.com/submissions", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return result.data.token;
}

export async function getResult(token: string) {
  const result = await axios.get(`https://ce.judge0.com/submissions/${token}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return result.data;
}
