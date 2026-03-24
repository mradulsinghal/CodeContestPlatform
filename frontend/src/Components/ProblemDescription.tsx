import { Example } from "../Components/Example";
import type { test } from "../pages/Submission";

interface probDetailsProps {
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  timeLimit: number;
  memoryLimit: number;
  test: test[];
}

export function ProblemDescription({
  title,
  memoryLimit,
  timeLimit,
  tags,
  description,
  test,
  difficulty,
}: probDetailsProps) {
  return (
    <>
      <div className="overflow-y-scroll overflow-x-hidden h-full w-full border-white/20 border rounded p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-4xl font-bold">
            {title}
          </div>
          <div className="flex gap-4 text-sm text-gray-300">
            <div>Memory Limit: {memoryLimit} MB</div>
            <div>Time Limit: {timeLimit} ms</div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <div className={`px-3 py-1 text-sm font-semibold rounded-2xl border border-white/40 ${
                difficulty === "EASY" ? "text-green-400" :
                difficulty === "MEDIUM" ? "text-yellow-400" : "text-red-400"
              }`}
            >
              {difficulty}
            </div>
            <div className="px-3 py-1 flex items-center text-sm rounded-2xl border border-white/40 text-gray-300">
              Tags: {tags?.join(", ")}
            </div>
          </div>
          
          <div className="font-medium p-4 text-balance whitespace-pre-wrap text-lg bg-white/5 border border-white/20 rounded">
            {description}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {test?.map((t: test, i: number) => (
            <Example key={i} input={t.input} output={t.output} />
          ))}
        </div>
      </div>
    </>
  );
}
