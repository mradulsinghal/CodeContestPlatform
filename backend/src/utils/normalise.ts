export function normalize(text: string): string {
  if (!text) return "";
  return text
    .split(/\r?\n/)                   // split lines (handles Windows + Linux)
    .map(line => line.trim())         // trim each line
    .filter(line => line.length > 0)  // remove empty lines
    .join("\n")                       // join back cleanly
    .replace(/\s+/g, " ")             // collapse multiple spaces
    .trim();                          // final trim
}
