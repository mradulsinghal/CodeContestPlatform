export function Example({ input,output}: { input :string, output: string}) {
  return (
    <>
      <div className="w-195 min-h mt-2 hover:bg-gray-700/50 hover:transition duration-150 delay-75 ease-in-out grid gap-1 pl-2 mr-2">
        Example:  
        <div className="min-h whitespace-pre-line">Input : <div>{input}</div></div>
        <div className="min-h whitespace-pre-line">Output : <div>{output}</div> </div>
      </div>
    </>
  );
}
