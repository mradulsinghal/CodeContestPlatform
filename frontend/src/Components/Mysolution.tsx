export function MySolutionBar({
  when,
  who,
  problem,
  lang,
  status,
  time,
  memory,
}: {
  when: Date;
  who: string;
  problem: string;
  lang: string;
  status: string;
  time: number;
  memory: number;
}) {
  return (
    <>
      <div className="h-12 flex justify-center items-center gap-1 text-white/80 border-b border-white/40">
        <div className="h-10 w-48 border-r border-white/40 flex justify-center items-center text-sm">
          {`[${when.toString().substring(0, 10)}] `} <br />
          {` ${when.toString().substring(11, 22)}`}
        </div>
        <div className="h-10 w-48 border-r border-white/40 flex justify-center items-center text-sm">
          {who}
        </div>
        <div className="h-10 w-48 border-r border-white/40 flex justify-center items-center text-sm">
          {problem}
        </div>
        <div className="h-10 w-48 border-r border-white/40 flex justify-center items-center text-sm">
          {lang}
        </div>
        <div className="h-10 w-48 border-r border-white/40 flex justify-center items-center text-sm">
          <span
            className={
              status === "AC"
                ? "text-green-400"
                : status === "PENDING"
                  ? "text-yellow-200"
                  : status === "RE" || status === "TLE" || status === "FAILED"
                    ? "text-red-400"
                    : ""
            }
          >
            {status}
          </span>
        </div>
        <div className="h-10 w-48 border-r border-white/40 flex justify-center items-center text-sm">
          {time}
        </div>
        <div className="h-10 w-48 flex justify-center items-center text-sm">
          {memory}
        </div>
      </div>
    </>
  );
}
