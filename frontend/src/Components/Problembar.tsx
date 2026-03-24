interface probDetails {
  index: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
}

export function ProblemBar({ index, title, difficulty, tags }: probDetails) {
  return (
    <>
      <div className="h-12 w-350 bg-gray-400/20 rounded-2xl flex justify-between px-10 items-center text-2xl text-white font-sans hover:text-white/50 hover:cursor-pointer m-auto">
        <div className="h-8 flex justify-start items-center hover:underline max-w-[50%]">
          <span className="mr-1">{index + 1 + "."}</span>
          <span className="truncate">{title}</span>
        </div>
        <div className="flex justify-center items-center gap-10">
          <div className="h-8 w-30 flex justify-center items-center">
            <div
              className={
                difficulty === "EASY"
                  ? "text-green-400"
                  : difficulty === "MEDIUM"
                    ? "text-yellow-400"
                    : difficulty === "HARD"
                      ? "text-red-400"
                      : "text-white"
              }
            >
              {difficulty === "EASY"
                ? "Easy"
                : difficulty === "MEDIUM"
                  ? "Med."
                  : "Hard"}
            </div>
          </div>
          <div className="h-8 w-60 flex justify-center items-center text-sm">
            {tags.join(", ")}
          </div>
        </div>
      </div>
    </>
  );
}
