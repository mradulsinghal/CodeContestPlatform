import { Option } from "../Components/options";
import { ProblemDescription } from "../Components/ProblemDescription";
import { CodeEditor } from "../Components/Editor";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../Auth/Tokens";
import { BACKEND_URL } from "../Auth/role";
import type { test } from "../Components/ProblemDescription";

export type langtype = "java" | "javascript" | "c" | "cpp";
const languageId = {
  java: 91,
  javascript: 102,
  c: 110,
  cpp: 105,
} as const;

export interface probDetails {
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  timeLimit: number;
  memoryLimit: number;
  test: test[];
}

export function Submission() {
  const { problemId } = useParams();
  const [ref, setRef] = useState<langtype>("cpp");
  const [sourceCode, setSourceCode] = useState("");
  const [data, setData] = useState<probDetails | null>(null);

  useEffect(() => {
    async function getResult() {
      try {
        const result = await axios.get(
          `${BACKEND_URL}/get/getProblemDescription/${problemId}`,
        );
        setData(result.data);
      } catch (e) {
        console.error(e);
      }
    }
    getResult();
  }, [problemId]);

  function submitCode() {
    if (!sourceCode || !sourceCode.trim()) {
      alert("Write your code");
      return;
    }
    async function submit() {
      try {
        const result = await axios.post(
          `${BACKEND_URL}/submit/submission/${problemId}`,
          {
            language_id: `${languageId[ref]}`,
            code: sourceCode,
            memory: data?.memoryLimit,
            runtime: data?.timeLimit,
          },
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
        alert("Submitted!");
        console.log(result.data);
      } catch (e) {
        alert("Failed to submit.");
        console.error(e);
      }
    }
    submit();
  }

  if (!data)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-white text-3xl">Loading...</p>
      </div>
    );

  return (
    <>
      <div className="min-h-screen w-screen flex justify-center items-center text-white select-none gap-4 p-8 pt-24">
        <div className="h-[680px] w-1/2 border border-white/40 rounded-2xl flex flex-col p-2 bg-gray-900/60 shadow-lg">
          <ProblemDescription
            title={data.title}
            description={data.description}
            difficulty={data.difficulty}
            tags={data.tags}
            timeLimit={data.timeLimit}
            memoryLimit={data.memoryLimit}
            test={data.test}
          />
        </div>
        
        <div className="h-[680px] w-1/2 border border-white/40 rounded-2xl flex flex-col bg-[#1e1e1e] shadow-lg">
          <div className="h-16 w-full flex justify-between items-center px-4 bg-[#252526] border-b border-black/40 rounded-t-2xl">
            <Option setRef={setRef} />
            <div className="flex gap-4 items-center">
              <Link to="/mySubmissions" className="hover:underline text-sm font-medium">
                Submissions
              </Link>
              <button
                onClick={submitCode}
                className="bg-red-600 px-4 py-1 rounded text-white font-medium hover:bg-red-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
          <CodeEditor language={ref} setSourceCode={setSourceCode} />
        </div>
      </div>
    </>
  );
}
