import { useEffect, useState } from "react";
import { MySolutionBar } from "../Components/Mysolution";
import axios from "axios";
import { getAccessToken } from "../Auth/Tokens";
import { BACKEND_URL } from "../Auth/role";

export interface Submissiontype {
  language: string;
  status: string;
  runtime: number;
  memory: number;
  createdAt: string | Date;
  user: {
    name: string;
  };
  problem: {
    title: string;
  };
}

export function MySubmission() {
  const [data, setData] = useState<Submissiontype[]>([]);

  useEffect(() => {
    async function getSubmission() {
      try {
        const result = await axios.get(`${BACKEND_URL}/get/getMySubmission`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        setData(result.data);
      } catch (e) {
        console.error(e);
      }
    }
    getSubmission();
  }, []);

  return (
    <>
      <div className="w-screen h-screen pt-20">
        <div className="min-h flex justify-center w-full">
          <div className="w-[1000px] border border-white/40 rounded flex flex-col p-2 gap-2 bg-gray-900/60">
            <div className="h-13 w-full border border-white/40 rounded flex justify-center items-center text-red-400 bg-white/10 font-semibold font-mono">
              <div className="h-12 w-48 border-r border-white/40 flex justify-center items-center text-lg">When</div>
              <div className="h-12 w-48 border-r border-white/40 flex justify-center items-center text-lg">Who</div>
              <div className="h-12 w-48 border-r border-white/40 flex justify-center items-center text-lg">Problem</div>
              <div className="h-12 w-48 border-r border-white/40 flex justify-center items-center text-lg">Lang</div>
              <div className="h-12 w-48 border-r border-white/40 flex justify-center items-center text-lg">Verdict</div>
              <div className="h-12 w-48 border-r border-white/40 flex justify-center items-center text-lg">Time (ms)</div>
              <div className="h-12 w-48 flex justify-center items-center text-lg">Memory (MB)</div>
            </div>
            {data.map((item, index) => (
              <MySolutionBar
                key={index}
                when={new Date(item.createdAt)}
                who={item.user.name}
                problem={item.problem.title}
                lang={item.language}
                memory={item.memory}
                time={item.runtime}
                status={item.status}
              />
            ))}
            {data.length === 0 && (
              <div className="p-10 text-center text-gray-400">No submissions found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
