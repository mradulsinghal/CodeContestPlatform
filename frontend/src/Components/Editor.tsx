import Editor from "@monaco-editor/react";
const path = {
  javascript: "// write javascript",
  java: "// write java code",
  cpp: "//write C++ code",
  c: "// write C code ",
};

export function CodeEditor({
  language,
  setSourceCode,
}: {
  language: string;
  setSourceCode: (value: string) => void;
}) {
  return (
    <Editor
      onChange={(value) => {
        setSourceCode(value as string);
      }}
      key={language}
      className="bg-black border-white/40 border-2 rounded-b"
      height="620px"
      width="600px"
      defaultLanguage={language}
      defaultValue={path[language as keyof typeof path]}
      theme="vs-dark"
      options={{
        cursorBlinking: "blink",
        formatOnPaste: true,
        minimap: {
          enabled: false,
        },
      }}
    />
  );
}
