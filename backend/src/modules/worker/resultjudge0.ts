import { getResult } from "../judge/execution";

export async function Result(token: string) {
  let result;
  for (let i = 0; i < 30; i++) {
    result = await getResult(token);
    const id = result.status.id;
    if (id === 3) return result;
    else if (id === 1 || id === 2) {
       await new Promise((res) => setTimeout(res, 200));
       continue;
    }
    else if (id === 5) return 5;
    else if (id === 6) return 6;
    await new Promise((res) => setTimeout(res, 200));
  }
  return -1;
}
