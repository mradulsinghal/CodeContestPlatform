import { Search } from "../icons/search";
import { ProblemBar } from "../Components/Problembar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL, getRole } from "../Auth/role";

interface probDetails {
  index: number;
  title: string;
  tags: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD";
  id: string;
}

export function Problem() {
  const [problems, setProblems] = useState<probDetails[]>([]);

  useEffect(() => {
    async function getProblems() {
      const data = await axios.get(`${BACKEND_URL}/get/problems`);
      setProblems(data.data);
    }
    getProblems();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full pt-10">
        <div className="bg-gray-900/60 max-w-5xl mx-auto mt-25 border border-white/40 rounded-2xl flex flex-col p-6">
          <div className="h-10 w-full flex justify-between items-center mb-8 px-8">
            <div className="relative flex items-center">
              <span className="absolute left-3">
                <Search />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="h-8 w-65 pl-10 pr-4 rounded-3xl focus:outline-white bg-transparent border border-white/40 text-white"
              />
            </div>

            {getRole() === "ADMIN" && (
              <Link to="/addProblem">
                <button className="bg-red-500/70 h-8 px-4 rounded-xl border border-white/50 hover:bg-red-500 transition-colors">
                  Add questions
                </button>
              </Link>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {problems.map((problem, index) => (
              <Link key={problem.id} to={`/submission/${problem.id}`}>
                <ProblemBar
                  index={index}
                  title={problem.title}
                  difficulty={problem.difficulty}
                  tags={problem.tags}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
